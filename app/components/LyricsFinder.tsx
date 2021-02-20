import React, {FC} from 'react';
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useDimensions} from '../utils/useDimensions';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
}
const LyricsFinder: FC<Props> = ({isOpen, onDismiss, children}) => {
  const {isLandscape, windowData} = useDimensions();

  if (!isOpen) return null;

  const maxHeight = windowData.height;
  const heightStyle = isLandscape ? {height: maxHeight - 50} : {};
  return (
    <Modal transparent onDismiss={onDismiss}>
      <TouchableOpacity
        style={styles.backgroundOverlayer}
        onPress={onDismiss}
      />
      <SafeAreaView style={styles.card}>
        {/* <ScrollView bounces={false} contentContainerStyle={[styles.card]}>
          {children}
        </ScrollView> */}
        {children}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundOverlayer: {
    flex: 1,
    backgroundColor: '#00000020',
  },
  fixed: {
    flex: 1,
    padding: 0,
  },
  card: {
    //flex: 1,
    padding: 0,
    //display: 'flex',
    backgroundColor: 'white',
    margin: 0,
    height: Dimensions.get('window').height * 0.8,
  },
});
export default LyricsFinder;
