import React, { useState, useEffect, FunctionComponent, useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Song, Artist } from '../db'
import TouchableIcon from "../components/TouchableIcon";
import ChordSheetJS from 'chordsheetjs'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "../AppNavigation";
import LanguageContext from "../languages/LanguageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

type SongEditScreenRouteProp = RouteProp<RootStackParamList, 'SongEdit'>
type SongEditScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SongEdit'
>
type Props = {
  route: SongEditScreenRouteProp
  navigation: SongEditScreenNavigationProp;
}
const SongEdit: FunctionComponent<Props> = (props) => {
  const { navigation } = props
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [content, setContent] = useState("")
  const [lyricist, setLyricist] = useState("")
  const [changeLyricist, setChangeLyricist] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'CHORD_PRO' | 'CHORD_SHEET'>('CHORD_PRO')
  const { t } = useContext(LanguageContext)
  const [isActive, setActive] = useState(false)

  function removeMetaTags(text: string) {
    text = text.replace(/{title:[^}]*}\s\n/g, '')
    text = text.replace(/{t:[^}]*}\s\n/g, '')
    text = text.replace(/{artist:[^}]*}\s\n/g, '')
    text = text.replace(/{a:[^}]*}\s\n/g, '')
    text = text.replace(/{lyricist:[^}]*}\s\n/g, '')
    return text
  }
  useEffect(() => {
    let id = props.route.params?.id
    if (id != null) {
      let song = Song.getById(id)!
      setTitle(song.title)
      setArtist(song.artist.name)
      setLyricist(song.lyricist)
      setContent(removeMetaTags(song.content))
      setChangeLyricist(false)
    }
  }, [])

  function saveSong() {
    if (title.trim() == '') return setError(t('invalid_title'))
    if (artist.trim() == '') return setError(t('invalid_artist'))
    if (content.trim() == '') return setError(t('invalid_content'))
    if (lyricist.trim() == '') return setError(t('invalid_lyricist'))

    let artistName = artist.trim()
    let songTitle = title.trim()
    let lyricistName = lyricist.trim()
    let chordPro = content

    if (mode == 'CHORD_SHEET') {
      const formatter = new ChordSheetJS.ChordProFormatter();
      let chordSheetSong = new ChordSheetJS.ChordSheetParser({ preserveWhitespace: false }).parse(content)
      chordPro = formatter.format(chordSheetSong)
    }
    let songId = props.route.params?.id
    let artistDb: Artist | undefined = Artist.getByName(artistName)
    if (artistDb == null) {
      artistDb = Artist.create(artistName)
    }
    if (songId) {
      Song.update(songId, artistDb, songTitle, lyricistName, chordPro)
    } else {
      let song = Song.create(artistDb, songTitle, lyricistName, chordPro)
      songId = song.id
    }
    props.navigation.replace('SongView', { id: songId, title: songTitle})
  }

  function switchToChordPro() {
    let song = new ChordSheetJS.ChordSheetParser({ preserveWhitespace: false }).parse(content)
    let chordPro = new ChordSheetJS.ChordProFormatter().format(song)
    chordPro = compress(chordPro)
    setContent(chordPro)
    setMode('CHORD_PRO')
  }
  function switchToChordSheet() {
    let song = new ChordSheetJS.ChordProParser().parse(content)
    let plainText = new ChordSheetJS.TextFormatter().format(song)
    plainText = compress(plainText)
    setContent(plainText)
    setMode('CHORD_SHEET')
  }
  /**
   * Remove extra while line produced by the switch
   */
  function compress(text: string) {
    let compressedText = ""
    let count_length_zero = 0

    for (let line of text.split("\n")) {
      if (line.length == 0 && count_length_zero < 2) {
        compressedText += "\n"
        count_length_zero++;
      } else if (count_length_zero >= 2) {
        count_length_zero = 0
      }
      if (line.length > 0)
        compressedText += line +"\n"
    }
    return compressedText;
  }
  function setActiveAndContent() {
    setActive(true)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <TouchableIcon onPress={saveSong} name="content-save" />,
    });
  }, [navigation, title, content, artist]);

  const contentPlaceholder = mode == 'CHORD_PRO' ?
    "You can edit any song here\n" +
    "U[C]sing the [Dm]chordPro format[G]\n\n\n" :
    "You can edit any song here\n" +
    " C              Dm          G\n" +
    "Using the chord sheet format\n\n\n"

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode="none"
    >
      <KeyboardAvoidingView>
        {error != null && <Text style={{ color: 'red' }}>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder={t('song_title')}
          autoFocus={false}
          autoCorrect={false}
          autoCapitalize='words'
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder={t('artist_name')}
          autoFocus={false}
          autoCorrect={false}
          autoCapitalize='words'
          onChangeText={setArtist}
          value={artist}
        />
        <TextInput
          style={styles.input}
          placeholder={t('lyricist_name')}
          editable= {changeLyricist}
          autoFocus={false}
          autoCorrect={false}
          autoCapitalize='words'
          onChangeText={setLyricist}
          value={lyricist}
        />
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={mode == 'CHORD_PRO' ? styles.tabActive : styles.tabInactive}
            onPress={switchToChordPro} disabled={mode == 'CHORD_PRO'}>
            <Text>ChordPro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={mode == 'CHORD_SHEET' ? styles.tabActive : styles.tabInactive}
            onPress={switchToChordSheet} disabled={mode == 'CHORD_SHEET'}>
            <Text>{t('chords_over_lyrics')}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          textAlignVertical="top"
          style={styles.content}
          placeholder={contentPlaceholder}
          numberOfLines={4}
          placeholderTextColor="#aaa"
          multiline={true}
          autoFocus={true}
          autoCorrect={false}
          autoCapitalize='sentences'
          onChangeText={setContent}
          onSelectionChange={() => { setActiveAndContent() }}
          value={content}
          selection={isActive?undefined:{start:0}}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
  tabsContainer: {
    flexDirection: 'row'
  },
  tabActive: {
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee'
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  input: {
    fontSize: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 5
  },
  content: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    flex: 1,
    minHeight: 300,
    height: 300,
    padding: 10,
    backgroundColor: '#eee',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    textAlignVertical: 'top'
  },
  sideMenuContainer: {
    backgroundColor: '#eee',
    flex: 1
  },
  toolbarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc'
  }
})
export default SongEdit