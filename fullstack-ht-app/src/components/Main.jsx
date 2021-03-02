import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import Home from './Home';
import AppBar from './AppBar';
import SignUpPage from './SignUpPage';
import SignUpEmail from './SignUpEmail';
import SignInPage from './SignInPage';
import SideMenu from './SideMenu';
import theme from '../theme';
import BottomBar from './BottomBar';
import Userpage from './Userpage';
import { SignInWithEmail } from '../firebase/firebaseFunctions';
import SignUpPhone from './SignUpPhone';
import UploadUserInfo from './UploadUserInfo';
import ChoosePic from './ChoosePic';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
    position: 'relative',
    zIndex: 0
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      {/* <SideMenu/> */}
      {/* <AppBar/> */}
      <BottomBar/>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/sign-up" exact>
          <SignUpPage />
        </Route>
        <Route path="/sign-up-phone" exact>
          <SignUpPhone />
        </Route>
        <Route path="/sign-up-email" exact>
          <SignUpEmail/>
        </Route>
        <Route path="/userpage" exact>
          <Userpage />
        </Route>
        <Route path="/upload-userinfo" exact>
          <UploadUserInfo/>
        </Route>
        <Route path='/choose-pic' exact>
          <ChoosePic/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;