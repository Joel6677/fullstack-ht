import React, { useContext } from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import AuthStorageContext from '../contexts/AuthStorageContext';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

import { StateContext } from '../state';
import { IconButton } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    width: '100%',
    position: 'fixed',
    zIndex: 5
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

  const { authorizedUser } = useAuthorizedUser();

  const { state, dispatch } = useContext(StateContext);

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal> 
      <IconButton icon="menu" color={theme.colors.primary} size={40} onPress={() => dispatch({type: "SET_OPEN", payload: !state.open})} 
        ></IconButton>
        {authorizedUser ? (
          <>
            <AppBarTab onPress={onSignOut}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <Link to="/sign-in" component={AppBarTab}>
              Sign in
            </Link>
            <Link to="/sign-up" component={AppBarTab}>
              Sign up
            </Link>
            <Link to="/" component={AppBarTab}>
              Home
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;