import React, {useEffect, useState, useRef, FunctionComponent} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StyleProp,
  ViewStyle,
} from 'react-native';
import ChordChart from '../components/ChordChart';
import chords from '../assets/chords/guitar.json';

interface Props {
  selectedChord: Chord | null | undefined;
  allChords: Array<Chord>;
  onPressClose: () => void;
  closeLabel: string;
}
const ChordTab: FunctionComponent<Props> = ({
  selectedChord,
  allChords,
  onPressClose,
  closeLabel,
}) => {
  const flatList = useRef();

  if (selectedChord == null) return null;

  let possibleFingering = [{positions: [], fingerings: []}];
  let firstFingering = possibleFingering[0];

  if (selectedChord != null) {
    let databaseChords: any = chords;
    if (databaseChords[selectedChord.toString()]) {
      possibleFingering = databaseChords[selectedChord.toString()];
      firstFingering = possibleFingering[0];
    }
    if (flatList.current != null)
      flatList.current.scrollToOffset({animated: true, offset: 0});
  }

  return (
    <View style={styles.tabContainter}>
      <TouchableOpacity style={styles.closeButton} onPress={onPressClose}>
        <Text style={styles.closeButtonText}>{closeLabel}</Text>
      </TouchableOpacity>
      <FlatList
        //ref={flatList}
        data={possibleFingering}
        style={styles.chordList}
        extraData={selectedChord}
        horizontal
        renderItem={({item}) => {
          return (
            <View
              key={item.toString()}
              style={[styles.item, styles.itemSelected]}>
              <ChordChart width={100} height={120} chord={item.positions} />
              <Text>{selectedChord.toString()}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default ChordTab;

const styles = StyleSheet.create({
  tabContainter: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 180,
    zIndex: 999,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 2,
    fontSize: 14,
  },
  closeButtonText: {
    fontSize: 16,
  },
  chordList: {
    backgroundColor: '#eee',
  },
  item: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
  },
  itemSelected: {
    borderBottomColor: 'tomato',
    borderBottomWidth: 5,
  },
});
