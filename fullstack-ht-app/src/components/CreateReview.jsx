import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory, useParams } from 'react-router-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Moment from 'moment';
import FormikTextInput from './FormikTextInput';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
});

const initialValues = {
  nosing: '',
  taste: '',
  finish: '',
  rating: '',
  comment: '',
};

const validationSchema = yup.object().shape({
  nosing: yup.string().required('Nosing is required'),
  taste: yup.string().required('Taste is required'),
  finish: yup.string().required('Finish is required'),
  rating: yup
    .number('Rating must be a number')
    .min(0, 'Rating must be greater or equal to 0')
    .max(100, 'Rating must be less or equal to 100')
    .required('Rating is required'),
  comment: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => (
  <View>
    <View style={styles.fieldContainer}>
      <FormikTextInput placeholder="Nosing" name="nosing" />
    </View>
    <View style={styles.fieldContainer}>
      <FormikTextInput placeholder="Taste" name="taste" />
    </View>
    <View style={styles.fieldContainer}>
      <FormikTextInput placeholder="Finish" name="finish" />
    </View>
    <View style={styles.fieldContainer}>
      <FormikTextInput
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        name="rating"
      />
    </View>
    <View style={styles.fieldContainer}>
      <FormikTextInput placeholder="Comment" name="comment" multiline />
    </View>

    <Button mode="outlined" onPress={onSubmit}>Create a review</Button>
  </View>
);

const CreateReview = () => {
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState();
  const [imgURL, setImgURL] = useState();

  useEffect(() => {

    const fetchData = async () => {

      const dURL = await firebase.firestore().collection('images').doc(firebase.auth().currentUser.uid).collection('userImages')
      .doc('profilePicture')
      .get()
  
      setImgURL(dURL.data().downloadURL)

      const userName = await firebase.firestore().collection('userinfo').doc(firebase.auth().currentUser.uid)
      .get()
      
      setName(userName.data().name)

    }

    fetchData()

  }, []);

  const onSubmit = async (values) => {
    const {
      nosing, taste, finish, rating, comment,
    } = values;

    { firebase.auth().currentUser && firebase.firestore().collection('whiskies').doc(id).collection('reviews')
      .doc(firebase.auth().currentUser.uid)
      .set({
        name,
        imgURL,
        nosing,
        taste,
        finish,
        rating,
        comment,
        time: Moment(new Date()).calendar(),
      })
      .catch((error) => {
        console.log('Error: ', error);
      }); }

    { firebase.auth().currentUser && firebase.firestore().collection('reviews').doc(
      firebase.auth().currentUser.uid,
    ).collection('userReviews')
      .doc(id)
      .set({
        name,
        imgURL,
        nosing,
        taste,
        finish,
        rating,
        comment,
        time: Moment(new Date()).calendar(),
      })
      .catch((error) => {
        console.log('Error: ', error);
      }); }

    const oldData = await firebase.firestore().collection('whiskies').doc(id).get()

    firebase.firestore().collection('whiskies').doc(id).update({
      reviewCount: oldData.data().reviewCount + 1,
      rating: (parseInt(oldData.data().rating, 10) + parseInt(rating, 10))
      / parseInt(oldData.data().reviewCount + 1, 10),
    });

    history.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text color="primary" fontSize="heading" fontWeight="bold">Create review</Text>
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default CreateReview;
