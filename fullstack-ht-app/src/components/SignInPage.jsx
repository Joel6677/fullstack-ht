import React, { useContext, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { SignInWithGoogle, SignInWithFacebook } from '../firebase/auth';
import SignUpPhone from './SignUpPhone';
import CustomButton from './CustomButton';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    zIndex: 1000,
    height: '100%'
  },
  button: {
    margin: 30
  },
  heading: {
    alignItems: 'center'
  }
});


const SignInPage = () => {

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

        <View style={styles.heading}>
          <Text color={'primary'} fontSize={'heading'} fontWeight={'bold'}>
            Sign up
        </Text>
        </View>
        <CustomButton onPress={() => {history.push("/sign-up-email");}} style={styles.button}>
            Sign up with Email
        </CustomButton>
        <CustomButton onPress={submitSignInWithGoogle} style={styles.button}>
            Sign up with Google
        </CustomButton>
        <CustomButton onPress={submitSignInWithFacebook}  style={styles.button}>
            Sign up with Facebook
        </CustomButton>
        <CustomButton onPress={SignUpPhone()} style={styles.button}>
            Sign up with phonenumber
        </CustomButton>
       </View>
    </>

  );
};

export default SignInPage;