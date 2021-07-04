import React, { useState, useEffect } from 'react';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'react-router-native';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    zIndex: 1,
    // position: 'absolute',
    height: '100%',
    width: '100%',
    // paddingTop: 80,
    paddingBottom: 60,
  },
  reviewItemWrapper: {
    padding: 15,
    backgroundColor: '#FFD700',
  },
  separator: {
    height: 10,
  },
  actionsContainer: {
    marginTop: 15,
    borderWidth: 3,
    flexDirection: 'row',
  },
  actionButton: {
    marginTop: 5,

  },
  lastActionButton: {

  },
});

const ReviewItemWithActions = ({ review, onDelete }) => {
  console.log('review: ', review._id);

  return (
    <View style={styles.reviewItemWrapper}>
      <ReviewItem review={review} />
      <Link
        component={Button}
        to={`/whiskies/${review._id}`}
        style={styles.actionButton}
      >
        View whisky
      </Link>
      <Button onPress={onDelete}>Delete review</Button>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const reviewsListener = firebase.firestore()
      .collection('reviews')
      .doc(firebase.auth().currentUser.uid)
      .collection('userReviews')
      .onSnapshot((querySnapshot) => {
        const reviews = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          console.log('firebaseData: ', firebaseData);

          const data = {
            _id: doc.id,
            ...firebaseData,
          };
          return data;
        });

        setReviews(reviews);
      });

    return () => reviewsListener();
  }, []);

  const onDelete = (id) => {
    const reviewRef = firebase.firestore().collection('reviews').doc(firebase.auth().currentUser.uid).collection('userReviews')
      .doc(id);

    const reviewRef2 = firebase.firestore().collection('whiskies').doc(id)
      .collection('reviews')
      .doc(firebase.auth().currentUser.uid);
    const docFromWhiskiesRef = firebase.firestore().collection('whiskies').doc(id);
    const docFromUserReviewsRef = firebase.firestore().collection('whiskies').doc(id)
      .collection('reviews')
      .doc(firebase.auth().currentUser.uid);
    firebase.firestore()
      .runTransaction((transaction) => transaction.get(docFromWhiskiesRef)
        .then((docFromWhiskies) => {
          if (!docFromWhiskies.exists) {
            console.log('Document does not exist');
          }
          const newReviewCount = docFromWhiskies.data().reviewCount - 1;
          const whiskyRating = docFromWhiskies.data().rating;
          transaction.update(docFromWhiskiesRef, { reviewCount: newReviewCount });
          return { whiskyRating, newReviewCount };
        }))
      .then((values) => {
        console.log('whiskyRating: ', values.whiskyRating);
        console.log('newReviewCount: ', values.newReviewCount);

        firebase.firestore().runTransaction((transaction) => transaction.get(docFromUserReviewsRef)
          .then((docFromUserReviews) => {
            const userRating = docFromUserReviews.data().rating;
            const newRating = values.newReviewCount !== 0 ? (values.whiskyRating - userRating)
             / values.newReviewCount : 0;
            console.log('userRating: ', userRating);
            console.log('newRating: ', newRating);
            transaction.update(docFromWhiskiesRef, { rating: newRating });

            transaction.delete(reviewRef);
            transaction.delete(reviewRef2);
          }));
      })
      .then(() => {
        console.log('Transaction successfully committed!');
      })
      .catch((error) => {
        console.log('Transaction failed: ', error);
      });
  };

  console.log('my reviews: ', reviews);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <ReviewItemWithActions
              review={item}
              onDelete={() => onDelete(item._id)}
            />
          )}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </>
  );
};

export default MyReviews;
