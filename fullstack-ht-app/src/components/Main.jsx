import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import Home from './Home';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SideMenu from './SideMenu';
import theme from '../theme';


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <SideMenu/>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/sign-in" exact>
          <SignIn />
        </Route>
        <Route path="/sign-up" exact>
          <SignUp />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;