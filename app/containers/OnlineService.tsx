import React, {useState, useContext, useCallback} from 'react';
import {FlatList, StatusBar} from 'react-native';
import {Artist} from '../db';
import ListItem from '../components/ListItem';

import {RootStackParamList, MainTabParamList} from '../AppNavigation';
import LanguageContext from '../languages/LanguageContext';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomHeader from '../components/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {services} from '../services';

type OnlineServiceScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'OnlineService'>,
  StackNavigationProp<RootStackParamList, 'MainTab'>
>;

type Props = {
  navigation: OnlineServiceScreenNavigationProp;
};

const OnlineService = (props: Props) => {
  const [artists, setArtists] = useState(Artist.getAll());
  const [error, setError] = useState<string | null>(null);
  const [showEditArtistModal, setShowEditArtistModal] = useState(false);
  const [artistEditName, setArtistEditName] = useState<string>('');
  const [artistEditId, setArtistEditId] = useState<string | null>(null);
  const {t} = useContext(LanguageContext);

  function getCommunityTab(serviceName: string) {
    props.navigation.navigate('OnlineTabListView', {name: serviceName});
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeader title={t('online_search')} />

      <FlatList
        data={services.slice(1)}
        contentContainerStyle={services.length <= 0 ? {flex: 1} : {}}
        renderItem={({item}) => {
          return (
            <ListItem
              key={item.name!}
              title={item.name}
              onPress={() => getCommunityTab(item.name)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default OnlineService;
