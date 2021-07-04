import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Image, ActivityIndicator, useWindowDimensions, ImageBackground,
} from 'react-native';
import { Button, Avatar, Divider } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import firebase from 'firebase/app';
import { StateContext } from '../state';
import Text from './Text';

import MyReviews from './MyReviews';
import MyCollection from './MyCollection';
import MyWishList from './MyWishList';
import MyInfo from './MyInfo';

import 'firebase/auth';
import 'firebase/firestore';

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    zIndex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    position: 'absolute',
    // alignItems: 'center',
  },

});

const renderScene = SceneMap({
  first: MyReviews,
  second: MyCollection,
  third: MyWishList,
  fourth: MyInfo,
});

const Userpage = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'My Reviews' },
    { key: 'second', title: 'My Collection' },
    { key: 'third', title: 'My Wish List' },
    { key: 'fourth', title: 'My Info' },
  ]);

  return (
    <View style={styles.container}>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

    </View>

  );
};

export default Userpage;
