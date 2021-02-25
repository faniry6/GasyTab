import React, {useState, useContext, FC, useEffect} from 'react';
import {FlatList, Text, Alert} from 'react-native';
import {Song, Artist} from '../db';
import ListItem from '../components/ListItem';
import LanguageContext from '../languages/LanguageContext';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../AppNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {alertDelete} from '../utils/alertDelete';
import {services, getService} from '../services';
import {SongDoc} from '../services/BaseService';

type OnlineTabListViewScreenRouteProp = RouteProp<
  RootStackParamList,
  'OnlineTabListView'
>;
type OnlineTabListViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OnlineTabListView'
>;
type Props = {
  route: OnlineTabListViewScreenRouteProp;
  navigation: OnlineTabListViewScreenNavigationProp;
};
const OnlineTabListView: FC<Props> = props => {
  let serviceName = props.route.params.name;
  const [docs, setDocs] = useState<SongDoc[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {t} = useContext(LanguageContext);

  async function getSongList() {
    const fetchData = async () => {
      const docs = await getService(serviceName)!.getAllSong();
      setDocs(docs);
    };
    try {
      setIsLoading(true);
      setError(null);
      await fetchData();
      setIsLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setIsLoading(false);
        setError(e.message);
      } else {
        throw e;
      }
    }
  }

  useEffect(() => {
    getSongList();
  }, []);

  return (
    <FlatList
      data={docs}
      ListEmptyComponent={() => {
        return docs != null && !isLoading ? (
          <Text style={{textAlign: 'center'}}>
            {t('artist_or_song_not_found')}
          </Text>
        ) : null;
      }}
      renderItem={({item}) => {
        return (
          <ListItem
            key={item.title}
            title={item.title}
            subtitle={item.artist + ' | ' + item.lyricist}
            onPress={() => {
              props.navigation.navigate('SongPreview', {
                path: item.path,
                title: item.title,
                artist: item.artist,
                lyricist: item.lyricist,
                chordSheet: item.chordSheet,
                serviceName,
              });
            }}
          />
        );
      }}
    />
  );
};

export default OnlineTabListView;
