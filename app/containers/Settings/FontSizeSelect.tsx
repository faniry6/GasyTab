import React, {useState, FC} from 'react';
import Slider from '@react-native-community/slider';
import {View, Text, StyleSheet} from 'react-native';
import SongTransformer from '../../components/SongTransformer';
import SongRender from '../../components/SongRender';
import {GlobalSettings} from '../../db/GlobalSettings';
import ListItem from '../../components/ListItem';
import PickerModal from '../../components/PickerModal';

export const MIN_FONT_SIZE = 14;
export const MAX_FONT_SIZE = 24;
export const FONT_SIZE_STEP = 2;

const FontSizeSelect: FC = () => {
  const [fontSize, setFontSize] = useState(GlobalSettings.get().fontSize);
  const [fontType, setFontType] = useState(GlobalSettings.get().fontType);
  const [activeFontSelect, setActiveFontSelect] = useState(false);
  const fonts = ['monospace', 'Courier'];

  let chordSheet =
    '' +
    'This[C] is an example[D] song\n' +
    'Lor[F#m]em ipsum dolor sit ame[G]t\n' +
    'C[C]onsectetur adipiscing elit[D]\n' +
    'Sed do eiusm[F#m]od tempor incididunt u[C]t\n' +
    'labore et dolore magna aliqua\n';

  function onChange(value: number) {
    GlobalSettings.setFontSize(value);
    setFontSize(value);
  }

  function onSelectFont(value: string) {
    GlobalSettings.setFontType(value);
    setFontType(value);
  }
  function capitalize(s: string) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return (
    <View style={[styles.f1, styles.bgWhite]}>
      <ListItem
        onPress={() => setActiveFontSelect(true)}
        title={'Font'}
        subtitle={GlobalSettings.get().fontType}
      />

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.f1}
          value={fontSize}
          step={FONT_SIZE_STEP}
          minimumValue={MIN_FONT_SIZE}
          maximumValue={MAX_FONT_SIZE}
          onValueChange={onChange}
        />
        <Text style={styles.sliderLabel}>{fontSize}</Text>
      </View>

      <SongTransformer
        fontSize={fontSize}
        transposeDelta={0}
        chordProSong={chordSheet}>
        {({chords, htmlSong}) => (
          <View style={styles.f1}>
            <SongRender chordProContent={htmlSong} fontType={fontType} />
          </View>
        )}
      </SongTransformer>
      <PickerModal
        show={activeFontSelect}
        onChange={onSelectFont}
        onDismiss={() => setActiveFontSelect(false)}
        value={GlobalSettings.get().fontType}
        options={fonts.map(l => ({
          key: 'lang-option-' + l,
          label: capitalize(l),
          value: l,
        }))}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: 'white',
  },
  sliderContainer: {
    paddingBottom: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomColor: '#00000020',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  sliderLabel: {
    marginLeft: 10,
  },
  f1: {
    flex: 1,
  },
});
export default FontSizeSelect;
