import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import * as firebase from 'firebase';

import Button from './Button';
import FormikTextInput from './FormikTextInput';
import { CREATE_REVIEW } from '../graphql/mutations';

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
  whiskyName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  whiskyName: yup.string().required('Whisky name is required'),
  rating: yup
  .number('Rating must be a number')
  .min(0, 'Rating must be greater or equal to 0')
  .max(100, 'Rating must be less or equal to 100')
  .required('Rating is required'),
  text: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput placeholder="Name of the whisky" name="whiskyname" />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          placeholder="Rating between 0 and 100"
          keyboardType="numeric"
          name="rating"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput placeholder="Review" name="text" multiline />
      </View>

      <Button onPress={onSubmit}>Create a review</Button>
    </View>
  );
};

const CreateReview = () => {
  
  const history = useHistory();

  const onSubmit = async (values) => {

    // useCollection hook 
    // firebase.firestore().collection('whiskies').getClicked whisky id

    });

    const review = {
      ...values,
      rating: parseInt(values.rating),
    };

    const { data } = await createReview({ variables: { review } });

    if (data && data.createReview) {
      history.push(`/repositories/${data.createReview.repositoryId}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;