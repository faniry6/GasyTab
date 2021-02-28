import React, {
  useState,
  useEffect,
  FunctionComponent,
  useRef,
  useContext,
  useLayoutEffect,
  FC,
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {Song} from '../../db';
import SideMenu from './components/SideMenu';
import SongRender, {SongRenderRef} from '../../components/SongRender';
import TouchableIcon from '../../components/TouchableIcon';
import Chord from 'chordjs';
import ChordTab from '../../components/ChordTab';
import SongTransformer from '../../components/SongTransformer';
import AutoScrollSlider from '../../components/AutoScrollSlider';
import {RootStackParamList} from '../../AppNavigation';
import SelectPlaylist from './components/SelectPlaylist';
import PageTurner from './components/PageTurner';
import LanguageContext from '../../languages/LanguageContext';
import {GlobalSettings} from '../../db/GlobalSettings';
import {
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  FONT_SIZE_STEP,
} from '../Settings/FontSizeSelect';
import clamp from '../../utils/clamp';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {createBundle} from '../../db/bundler';
import createFile from '../../utils/createFile';
import Share from 'react-native-share';
import {services, getService} from '../../services';

type SongViewScreenRouteProp = RouteProp<RootStackParamList, 'SongView'>;
type SongViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SongView'
>;
type Props = {
  route: SongViewScreenRouteProp;
  navigation: SongViewScreenNavigationProp;
};
interface ToolButtonProps {
  onPress: () => void;
  name: string;
}
const ToolButton: FC<ToolButtonProps> = ({onPress, name}) => (
  <TouchableIcon
    style={{borderWidth: 1, borderRadius: 2, marginLeft: 8}}
    size={25}
    onPress={onPress}
    name={name}
  />
);
const Divider: FC = () => (
  <View style={{borderBottomWidth: 0.5, borderColor: '#00000020'}} />
);
const SongView: FunctionComponent<Props> = props => {
  const {navigation} = props;
  const songId = props.route.params.id;
  const [content, setContent] = useState<string>('');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [tone, setTone] = useState<number>(0);
  const [showAutoScrollSlider, setShowAutoScrollSlider] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(
    GlobalSettings.get().fontSize,
  );
  const [selectedChord, selectChord] = useState<Chord | null>(null);
  const [showTabs, setShowTabs] = useState(GlobalSettings.get().showTablature);
  const [showPlaylistSelection, setShowPlaylistSelection] = useState(false);
  const [showPageTurner, setShowPageTurner] = useState(
    GlobalSettings.get().enablePageTurner,
  );
  const songRenderRef = useRef<SongRenderRef>(null);
  const {t} = useContext(LanguageContext);

  function transposeUp() {
    setTone(tone + 1 >= 12 ? 0 : tone + 1);
    selectChord(null);
  }
  function transposeDown() {
    setTone(tone - 1 <= -12 ? 0 : tone - 1);
    selectChord(null);
  }
  function changeFontSize(amount: number) {
    let newFontSize = clamp(fontSize + amount, MIN_FONT_SIZE, MAX_FONT_SIZE);
    setFontSize(newFontSize);
    Song.setPreferences(Song.getById(songId)!, {fontSize: newFontSize});
  }
  function increaseFontSize() {
    changeFontSize(FONT_SIZE_STEP);
  }
  function decreaseFontSize() {
    changeFontSize(-FONT_SIZE_STEP);
  }
  function openSideMenu() {
    setIsSideMenuOpen(!isSideMenuOpen);
  }
  function onPressNextPage() {
    if (songRenderRef.current) songRenderRef.current.nextPage();
  }
  function onPressPreviousPage() {
    if (songRenderRef.current) songRenderRef.current.previousPage();
  }
  function onChangeShowTabs(value: boolean) {
    setShowTabs(value);
    Song.setPreferences(Song.getById(songId)!, {showTablature: value});
  }
  function onClickChord(allChords: Array<Chord>, chordString: string) {
    selectChord(allChords.find(c => c.toString() == chordString)!);
  }
  function editSong() {
    props.navigation.replace('SongEdit', {id: songId});
  }
  function uploadSong() {
    let song = Song.getById(songId)!;
    let metainfo =
      '{title:' +
      song.title +
      '}\n' +
      '{artist:' +
      song.artist.name +
      '}\n' +
      '{lyricist:' +
      song.lyricist +
      '}\n';
    let v = 's+';
    let content = {
      id: songId,
      artist: song.artist.name,
      title: song.title,
      chordPro: metainfo + song.content,
      lyricist: song.lyricist,
      song_lower: song.title.replace(/\s/g, '_').toLowerCase(),
      artist_lower: song.artist.name.replace(/\s/g, '_').toLowerCase(),
      chordSheet: 'false',
      premium: song.lyricist == 'GasyTab' ? 'yes' : 'no',
    };
    if (getService(services[1].name)!.postSong(JSON.stringify(content))) {
      Alert.alert('Info', t('post_success'));
    }
  }
  function showTone(tone: number) {
    if (tone === 0) return null;
    if (tone > 0) return '+' + tone;
    return tone;
  }
  function onPressArtist() {
    let song = Song.getById(songId)!;
    props.navigation.navigate('ArtistView', {
      id: song.artist.id!,
      title: song.artist.name,
    });
  }
  function tooglePageTurner(value: boolean) {
    if (value) {
      setShowAutoScrollSlider(false);
      setScrollSpeed(0);
    }
    setShowPageTurner(value);
  }

  async function onPressShare() {
    let song = Song.getById(songId)!;
    let title = song.title;
    let lyricist = song.lyricist;
    if (song.lyricist.toUpperCase() == 'GASYTAB') {
      Alert.alert('Tsy mety', t('not_sharable_song'));
      return;
    }
    try {
      let bundle = createBundle([], [songId]);
      let bundleString = JSON.stringify(bundle);
      let path = await createFile(
        'documents',
        'Hira' + '_' + title.toLowerCase() + '_' + lyricist,
        bundleString,
      );
      await Share.open({
        url: 'file://' + path,
        message: t('share_message'),
      });
    } catch (e) {
      console.warn(e.message);
    }
  }

  useEffect(() => {
    let song = Song.getById(songId)!;
    setContent(Song.getChordPro(song));
    setTone(song.transposeAmount ? song.transposeAmount : 0);
    if (song.fontSize != null) {
      setFontSize(song.fontSize);
    }
    if (song.showTablature != null) {
      setShowTabs(song.showTablature);
    }
  }, []);

  useEffect(() => {
    let song = Song.getById(songId)!;
    Song.setPreferences(song, {transposeAmount: tone});
  }, [tone]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.flexRow}>
          <TouchableIcon onPress={onPressShare} name="share" />
          <TouchableHighlight
            underlayColor="#ccc"
            onPress={() => {
              setIsSideMenuOpen(false);
              setShowPlaylistSelection(!showPlaylistSelection);
            }}>
            <TouchableIcon
              onPress={() => {
                setIsSideMenuOpen(false);
                setShowPlaylistSelection(!showPlaylistSelection);
              }}
              name="playlist-plus"
            />
          </TouchableHighlight>
          <TouchableIcon onPress={openSideMenu} name="settings" />
        </View>
      ),
    });
    setShowAutoScrollSlider(true);
  }, [navigation, isSideMenuOpen]);

  return (
    <>
      <SideMenu
        isOpen={isSideMenuOpen}
        onDismiss={() => {
          setIsSideMenuOpen(false);
        }}>
        <View style={styles.tool}>
          <View style={styles.toolLabel}>
            <Text style={styles.toolLabelSmall}>{t('transpose')}</Text>
            <Text style={styles.toolBadge}>{showTone(tone)}</Text>
          </View>
          <View style={styles.toolButtonContainer}>
            <ToolButton onPress={transposeDown} name="minus" />
            <ToolButton onPress={transposeUp} name="plus" />
          </View>
        </View>
        <Divider />
        <View style={styles.tool}>
          <View style={styles.toolLabel}>
            <Text style={styles.toolLabelSmall}>{t('text_size')}</Text>
            <Text style={styles.toolBadge}>{fontSize}</Text>
          </View>
          <View style={styles.toolButtonContainer}>
            <ToolButton
              onPress={decreaseFontSize}
              name="format-font-size-decrease"
            />
            <ToolButton
              onPress={increaseFontSize}
              name="format-font-size-increase"
            />
          </View>
        </View>
        <Divider />
        <TouchableHighlight
          underlayColor="#ccc"
          onPress={() => onChangeShowTabs(!showTabs)}>
          <View style={styles.tool}>
            <Text style={styles.toolLabel}>{t('show_tabs')}</Text>
            <Switch onValueChange={onChangeShowTabs} value={showTabs} />
          </View>
        </TouchableHighlight>
        <Divider />
        <TouchableHighlight
          underlayColor="#ccc"
          onPress={() => tooglePageTurner(!showPageTurner)}>
          <View style={styles.tool}>
            <Text style={styles.toolLabel}>{t('page_turner')}</Text>
            <Switch onValueChange={tooglePageTurner} value={showPageTurner} />
          </View>
        </TouchableHighlight>
        <Divider />
        <Divider />
        <TouchableHighlight underlayColor="#ccc" onPress={() => editSong()}>
          <View style={styles.tool}>
            <Text style={styles.toolLabel}>{t('edit')}</Text>
            <TouchableIcon onPress={editSong} size={25} name="pencil" />
          </View>
        </TouchableHighlight>
        <Divider />
        <TouchableHighlight underlayColor="#ccc" onPress={() => uploadSong()}>
          <View style={styles.tool}>
            <Text style={styles.toolLabel}>{t('upload_to_gasytab')}</Text>
            <TouchableIcon onPress={uploadSong} size={25} name="upload" />
          </View>
        </TouchableHighlight>
      </SideMenu>
      <SongTransformer
        chordProSong={content}
        transposeDelta={tone}
        showTabs={showTabs}
        fontSize={fontSize}>
        {songProps => (
          <View style={{flex: 1}}>
            <SongRender
              ref={songRenderRef}
              onPressArtist={onPressArtist}
              onPressChord={chordString =>
                onClickChord(songProps.chords, chordString)
              }
              chordProContent={songProps.htmlSong}
              scrollSpeed={scrollSpeed}
            />
            <ChordTab
              onPressClose={() => selectChord(null)}
              selectedChord={selectedChord}
              allChords={songProps.chords}
              closeLabel={t('close')}
            />
            <AutoScrollSlider
              show={showAutoScrollSlider}
              onValueChange={setScrollSpeed}
              onClose={() => setShowAutoScrollSlider(false)}
            />
            <SelectPlaylist
              songId={songId}
              show={showPlaylistSelection}
              onPressClose={() => setShowPlaylistSelection(false)}
            />
            <PageTurner
              show={showPageTurner}
              onPressNext={onPressNextPage}
              onPressPrevious={onPressPreviousPage}
            />
          </View>
        )}
      </SongTransformer>
    </>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  tool: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  toolButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolLabelSmall: {
    maxWidth: 100,
    paddingRight: 0,
    textTransform: 'uppercase',
  },
  toolLabel: {
    position: 'relative',
    textAlign: 'left',
    textTransform: 'uppercase',
    paddingVertical: 10,
  },
  toolBadge: {
    position: 'absolute',
    top: -5,
    right: -15,
    width: 30,
    height: 20,
    color: 'tomato',
  },
});
export default SongView;
