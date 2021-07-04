import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import CustomButton from './CustomButton';
import FormikTextInput from './FormikTextInput';
import { SignInWithEmail } from '../firebase/auth';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  button: {
    padding: 10,
  },
});

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <View style={styles.fieldContainer}>
      <FormikTextInput name="email" placeholder="Email" testID="emailField" />
    </View>
    <View style={styles.fieldContainer}>
      <FormikTextInput
        name="password"
        placeholder="Password"
        testID="passwordField"
        secureTextEntry
      />
    </View>
    <CustomButton onPress={onSubmit} testID="submitButton">Sign in</CustomButton>
  </View>
);

export const SignInContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>
);

const SignInEmail = () => {
  const history = useHistory();

  const onSubmit = async (values) => {
    const { email, password } = values;

    try {
      SignInWithEmail(email, password);
    } catch (err) {
      console.log(err);
    }
    history.push('/');
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignInEmail;
