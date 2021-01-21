import React, { useContext, useRef, useEffect } from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';
import useResizeAware from 'react-resize-aware';

import theme from '../theme';
import Text from './Text';
import AuthStorageContext from '../contexts/AuthStorageContext';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

import { StateContext } from '../state';
import { IconButton } from 'react-native-paper';

import { Appbar } from 'react-native-paper';

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: theme.colors.primary,
    zIndex: 99
    
  },
  container: {
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    width: '100%',
    position: 'fixed',
    zIndex: 99
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  }
});

const AppBarTab = ({ children, ...props }) => { 
  return (
    <TouchableWithoutFeedback style={styles.tabTouchable} {...props}>
      <View style={styles.tabContainer}>
        <Text fontWeight="bold" style={styles.tabText}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const [resizeListener, sizes] = useResizeAware();
  const newWidth = `${((sizes.width - 200) / sizes.width) * 100}%`;

  const { authorizedUser } = useAuthorizedUser();

  const { state, dispatch } = useContext(StateContext);
  const resizeAnim = useRef(new Animated.Value(0)).current; 

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };

  

  const moveAppbar = () => {

    Animated.spring(
      resizeAnim,
      {
        toValue: state.open ? 600 : 0
      }
    ).start();
  
  };

  useEffect(() => {
    moveAppbar();
  });


  return (
  //   <>

  //   <View>
  //     {resizeListener}
  //   </View>
  //   <Animated.View style={[styles.appbar, {
  //     transform: [{
  //       translateX: resizeAnim
  //     }]
  //   }]}>
      <Appbar style={styles.appbar}>
      <Appbar.Action
        icon="menu"
        onPress={() => dispatch({type: "SET_OPEN", payload: !state.open})}
      />
      <Appbar.Action icon="mail" onPress={() => history.push("sign-up")} />
      <Appbar.Action icon="home" onPress={() => history.push("/")} />
      <Appbar.Action
        icon="magnify"
        onPress={() => console.log('Pressed delete')}
      />
        <Appbar.Action
        icon="account"
        onPress={() => history.push("/userpage")}
      />
    </Appbar>
  //   </Animated.View>


  //  </>
    
      // <View style={styles.container}>
      // <View>

      //   <Animated.View style={[styles.container, {
      //     transform: [{
      //       translateX: resizeAnim
      //     }]
      //   }]}>
      //     {resizeListener}
      //  <ScrollView style={styles.scrollView} horizontal> 
      //  <IconButton icon="menu" color={theme.colors.primary} size={40} onPress={() => dispatch({type: "SET_OPEN", payload: !state.open})} 
      //   ></IconButton>
      //   {authorizedUser ? (
      //     <>
      //       <AppBarTab onPress={onSignOut}>Sign out</AppBarTab>
      //     </>
      //   ) : (
      //     <>
      //       <Link to="/sign-in" component={AppBarTab}>
      //         Sign in
      //       </Link>
      //       <Link to="/sign-up" component={AppBarTab}>
      //         Sign up
      //       </Link>
      //       <Link to="/" component={AppBarTab}>
      //         Home
      //       </Link>
      //     </>
      //   )}
      // </ScrollView>
      // </Animated.View>
  ); 
};

export default AppBar;