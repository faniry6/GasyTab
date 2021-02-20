import React, {useState, useEffect, FunctionComponent} from 'react';
import {FlatList} from 'react-native';
import ListItem from '../components/ListItem';
import {getService} from '../services';
import {SongDoc} from '../services/BaseService';
import LoadingIndicator from '../components/LoadingIndicator';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../AppNavigation';
import {RouteProp} from '@react-navigation/native';

type OnlineArtistViewScreenRouteProp = RouteProp<
  RootStackParamList,
  'OnlineArtistView'
>;
type OnlineArtistViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OnlineArtistView'
>;
type Props = {
  route: OnlineArtistViewScreenRouteProp;
  navigation: OnlineArtistViewScreenNavigationProp;
};
const OnlineArtistView: FunctionComponent<Props> = (props: Props) => {
  const [songs, setSongs] = useState<SongDoc[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  let serviceName = props.route.params.serviceName;
  let path = props.route.params.path;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let docs = await getService(serviceName)!.getArtistSongs(path);
        setSongs(docs);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          setIsLoading(false);
        } else {
          throw e;
        }
      }
    };
    fetchData();
  }, []);

  function onSelectSong(
    path: string,
    title: string,
    artist: string,
    lyricist: string,
    chordSheet: string,
    serviceName: string,
  ) {
    props.navigation.navigate('SongPreview', {
      path: path,
      title: title,
      artist: artist,
      lyricist: lyricist,
      chordSheet: chordSheet,
      serviceName,
    });
  }

  return (
    <FlatList
      keyExtractor={item => item.path}
      data={songs}
      ListHeaderComponent={
        <LoadingIndicator error={error} loading={isLoading} />
      }
      renderItem={({item}) => {
        return (
          <ListItem
            title={item.title}
            onPress={() =>
              onSelectSong(
                item.path,
                item.title,
                item.artist,
                item.lyricist,
                item.chordSheet,
                serviceName,
              )
            }
          />
        );
      }}
    />
  );
};

export default OnlineArtistView;
