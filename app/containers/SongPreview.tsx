import React, {useState, useEffect, FunctionComponent, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import SongRender from '../components/SongRender';
import SongTransformer from '../components/SongTransformer';
import {getService} from '../services';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChordSheetJS from 'chordsheetjs';
import {Artist, Song} from '../db';
import {RootStackParamList} from '../AppNavigation';
import LoadingIndicator from '../components/LoadingIndicator';
import LanguageContext from '../languages/LanguageContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type SongPreviewScreenRouteProp = RouteProp<RootStackParamList, 'SongPreview'>;
type SongPreviewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SongPreview'
>;

type Props = {
  route: SongPreviewScreenRouteProp;
  navigation: SongPreviewScreenNavigationProp;
};
const SongPreview: FunctionComponent<Props> = props => {
  const [chordSheet_content, setChordCheet] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {t} = useContext(LanguageContext);
  let serviceName = props.route.params.serviceName;
  let path = props.route.params.path;
  let title = props.route.params.title;
  let artist_ = props.route.params.artist;
  let lyricist = props.route.params.lyricist;
  let chordSheet = props.route.params.chordSheet;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let service = getService(serviceName)!;
        let chordPro = await service.getChordProSong(path);
        if (chordSheet == 'true') {
          const formatter = new ChordSheetJS.ChordProFormatter();
          let chordSheetSong = new ChordSheetJS.ChordSheetParser({
            preserveWhitespace: false,
          }).parse(chordPro);
          let header = '{title:' + title + '}\n';
          header += '{artist:' + artist_ + '}\n';
          header += '{lyricist:' + lyricist + '}\n';

          chordPro = header + formatter.format(chordSheetSong);
        }
        setChordCheet(chordPro);
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

  function saveSong() {
    if (isSaving) return;
    setIsSaving(true);
    if (serviceName == 'LyricsService') {
      props.navigation.navigate('SongEdit', {
        title: title,
        artist: artist_,
        lyrics: chordSheet_content,
        id: null,
      });
    } else {
      const parser = new ChordSheetJS.ChordProParser();
      const parsedSong = parser.parse(chordSheet_content!);
      let artistName = parsedSong.getMetaData('artist')!;
      let songTitle = parsedSong.getMetaData('title')!;
      let lyricist = parsedSong.getMetaData('lyricist')!;

      let headerlessContent = chordSheet_content!;
      // headerlessContent = headerlessContent.replace(/{artist:[^}]*}\n/g, '');
      // headerlessContent = headerlessContent.replace(/{title:[^}]*}\n/g, '');
      // headerlessContent = headerlessContent.replace(/{lyricist:[^}]*}\n/g, '');
      headerlessContent = headerlessContent.replace(/{title:(.*)}\n/g, '');
      headerlessContent = headerlessContent.replace(/{artist:(.*)}\n/g, '');
      headerlessContent = headerlessContent.replace(/{lyricist:(.*)}\n/g, '');
      console.log(headerlessContent);
      let artist: Artist | undefined = Artist.getByName(artistName);
      if (artist == null) {
        artist = Artist.create(artistName);
      }
      let song = Song.create(artist, songTitle, lyricist, headerlessContent);

      props.navigation.replace('SongView', {
        id: song.id,
        title: song.title,
      });
      Alert.alert(t('info'), t('song_downloaded'));
    }
  }

  return (
    <View style={{flex: 1}}>
      <LoadingIndicator error={error} loading={isLoading} />
      {chordSheet_content != null && (
        <SongTransformer transposeDelta={0} chordProSong={chordSheet_content}>
          {({chords, htmlSong}) => (
            <View style={{flex: 1}}>
              <SongRender chordProContent={htmlSong} />
              <TouchableOpacity style={styles.fabButton} onPress={saveSong}>
                <Icon color="white" size={30} name="download" />
              </TouchableOpacity>
            </View>
          )}
        </SongTransformer>
      )}
    </View>
  );
};
export default SongPreview;

const styles = StyleSheet.create({
  fabButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 100,
    backgroundColor: 'tomato',
    padding: 15,
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  itemTitle: {
    fontSize: 18,
  },
});
