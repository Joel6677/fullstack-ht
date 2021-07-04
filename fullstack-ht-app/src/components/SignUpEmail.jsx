import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import { Button } from 'react-native-paper';
import { SignUpWithEmail } from '../firebase/auth';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

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
    margin: 15,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 30,
  },
});

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 6 characters long')
    .max(50, 'Password must be at most 50 characters long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Password confirmation must match the password',
    )
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => (
  <View>
    <View style={styles.fieldContainer}>
      <FormikTextInput
        name="email"
        placeholder="Email"
      />
    </View>

    <View style={styles.fieldContainer}>
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
      />
    </View>

    <View style={styles.fieldContainer}>
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
    </View>

    <Button style={styles.fieldContainer} mode="contained" onPress={onSubmit}>
      Sign up
    </Button>
  </View>
);

const SignUp = () => {
  const history = useHistory();

  const onSubmit = async (values) => {
    const { email, password } = values;

    if (await SignUpWithEmail(email, password)) history.push('/choose-pic');
  };

  return (
    <View style={styles.container}>

      <View style={styles.heading}>
        <Text color={'primary'} fontSize={'heading'} fontWeight={'bold'}>
          Sign up with email
        </Text>
      </View>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;
