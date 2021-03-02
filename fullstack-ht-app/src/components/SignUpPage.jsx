import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button } from 'react-native-paper';
import { SignInWithGoogle, SignInWithFacebook } from '../firebase/firebaseFunctions';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1
  },
  button: {
    margin: 30
  },
  heading: {
    paddingBottom: 17
  }
});


const SignUpPage = () => {

  const history = useHistory();

const submitSignInWithGoogle = () => {
    SignInWithGoogle();
    history.push('/');
};

const submitSignInWithFacebook = () => {
  SignInWithFacebook();
  history.push('/');
};




  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading} color={'primary'} fontSize={'heading'} fontWeight={'bold'}>
          Sign up
        </Text>
        <Button icon="email" mode="contained" onPress={ ()=> {history.push("/sign-up-email");}} color={theme.colors.primary}style={styles.button}>
          Sign up with Email
        </Button>
        <Button icon="google" mode="contained" onPress={submitSignInWithGoogle} color={theme.colors.primary}style={styles.button}>
          Sign up with Google
        </Button>
        <Button icon="facebook-box" mode="contained" onPress={submitSignInWithFacebook} color={theme.colors.primary}style={styles.button}>
          Sign up with Facebook
        </Button>
        <Button icon="phone" mode="contained" onPress={() => { history.push('/sign-up-phone'); }} color={theme.colors.primary}style={styles.button}>
          Sign up with Phonenumber
        </Button>

      </View>
    </>

  );
};

export default SignUpPage;