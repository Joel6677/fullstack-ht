import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import { SignUpWithEmail } from '../firebase/firebaseFunctions';

import CustomButton from './CustomButton';
import FormikTextInput from './FormikTextInput';


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  // username: yup
  //   .string()
  //   .min(1, 'Username must be at least 1 character long')
  //   .max(30, 'Username must be at most 30 characters long')
  //   .required('Username is required'),
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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>

      {/* 
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View> */}


      <View style={styles.fieldContainer}>
        <FormikTextInput 
        name="email" 
        placeholder="Email" />
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

      <CustomButton onPress={onSubmit} testID="submitButton">
        Sign up
      </CustomButton>
    </View>
  );
};

const SignUp = () => {
  const history = useHistory();

  const onSubmit = async (values) => {
    const { email, password } = values;

    SignUpWithEmail(email, password);

    history.push('/upload-userinfo');
  };

  return (

    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;