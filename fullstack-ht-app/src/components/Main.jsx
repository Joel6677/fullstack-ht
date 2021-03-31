import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

// import Home from './Home';
import AppBar from './AppBar';
import SignUpPage from './SignUpPage';
import SignUpEmail from './SignUpEmail';
import SignInEmail from './SignInEmail';
import SideMenu from './SideMenu';
import theme from '../theme';
import BottomBar from './BottomBar';
import Userpage from './Userpage';
import SignUpPhone from './SignUpPhone';
import UploadUserInfo from './UploadUserInfo';
import ChoosePic from './ChoosePic';
import UploadMedia from './UploadMedia';
import MyInfo from './MyInfo';
import MyReviews from './MyReviews';
import SignIn from './SignIn';
import UploadWhisky from './UploadWhisky';
import WhiskyList from './WhiskyList';
import SingleWhisky from './SingleWhisky';
import CreateReview from './CreateReview';

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
      <SideMenu/>
      <AppBar/>    
      <BottomBar/>
      <Switch>
        <Route path="/" exact>
          <WhiskyList/>
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
          <Userpage/>
        </Route>
        <Route path="/upload-userinfo" exact>
          <UploadUserInfo/>
        </Route>
        <Route path="/upload-media" exact>
          <UploadMedia/>
        </Route>
        <Route path='/choose-pic' exact>
          <ChoosePic/>
        </Route>
        <Route path='/my-info' exact>
          <MyInfo/>
        </Route>
        <Route path='/sign-in' exact>
          <SignIn/>
        </Route>
        <Route path='/my-reviews' exact>
          <MyReviews/>
        </Route>
        <Route path='/sign-in-email' exact>
          <SignInEmail/>
        </Route>
        <Route path='/upload-whisky' exact>
          <UploadWhisky/>
        </Route>
        <Route path="/whiskies/:id" exact>
          <SingleWhisky />
        </Route>
        <Route path="/create-review" exact>
          <CreateReview />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;