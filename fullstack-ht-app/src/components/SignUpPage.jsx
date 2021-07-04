import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button } from 'react-native-paper';
import { SignInWithGoogle, SignInWithFacebook } from '../firebase/auth';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  button: {
    margin: 30,
  },
  heading: {
    paddingBottom: 17,
    alignSelf: 'center',
  },
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

  const route = (route) => {
    history.push(route);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading} color={'primary'} fontSize={'heading'} fontWeight={'bold'}>
          Sign up
        </Text>
        <Button icon="email" mode="contained" onPress={() => { route('/sign-up-email'); }} style={styles.button}>
          Sign up with Email
        </Button>
        <Button icon="google" mode="contained" onPress={submitSignInWithGoogle} style={styles.button}>
          Sign up with Google
        </Button>
        <Button icon="facebook" mode="contained" onPress={submitSignInWithFacebook} style={styles.button}>
          Sign up with Facebook
        </Button>
        <Button icon="phone" mode="contained" onPress={() => { route('/sign-up-phone'); }} style={styles.button}>
          Sign up with Phonenumber
        </Button>

      </View>
    </>

  );
};

export default SignUpPage;
