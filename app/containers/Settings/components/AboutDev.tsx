import React, {useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import LanguageContext from '../../../languages/LanguageContext';

const AboutDev = () => {
  const {t} = useContext(LanguageContext);

  async function goToWebURL() {
    try {
      await Linking.openURL('https://www.gasytablature.com');
    } catch (e) {
      console.warn(e);
    }
  }
  async function goToDevURL() {
    try {
      await Linking.openURL('https://github.com/faniry6/GasyTab');
    } catch (e) {
      console.warn(e);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.lightGray}>{t('developed_by')} </Text>
      <TouchableOpacity onPress={goToWebURL} style={styles.devButton}>
        <Text style={styles.primaryColor}>{'GasyTab'}</Text>
      </TouchableOpacity>
      <Text style={styles.lightGray}>{' fork us at '}</Text>
      <TouchableOpacity onPress={goToDevURL} style={styles.devButton}>
        <Text style={styles.primaryColor}>GitHub</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  devButton: {
    paddingVertical: 20,
  },
  lightGray: {
    color: '#888',
  },
  primaryColor: {
    color: 'tomato',
  },
});
export default AboutDev;
