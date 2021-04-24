import React , {useState, useEffect} from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { Link } from 'react-router-native';
// import * as firebase from 'firebase';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import ReviewItem from './ReviewItem';


const styles = StyleSheet.create({
container: {
    flexDirection: 'column',
    zIndex: 1,
    // position: 'absolute',
    height: '100%',
    width: '100%',
    // paddingTop: 80,
    paddingBottom: 60
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
    marginTop: 5

  },
  lastActionButton: {

  },
});

// const DeleteReviewButton = ({ onPress }) => {
//     const alertButtons = [
//       {
//         text: 'Cancel',
//         style: 'cancel',
//       },
//       {
//         text: 'Delete',
//         onPress: () => onPress(),
//       },
//     ];
  
//     const deleteWithConfirmation = () => {
//       console.log('delte with confirmation');
//       // Alert.alert(
//       //   'Delete review',
//       //   'Are you sure you want to delete this review?',
//       //   alertButtons,
//       //   { cancelable: false },
//       // );
//     };
  
//     return (
//       <Button onPress={deleteWithConfirmation}>
//         Delete review
//       </Button>
//     );
//   };



const ReviewItemWithActions = ({ review, onDelete }) => {

  console.log('review: ', review._id);

  return (
    <View style={styles.reviewItemWrapper}>
        <ReviewItem review={review}/> 
        <Link
          component={Button}
          to={`/whiskies/${review._id}`}
          style={styles.actionButton}
        >
          View whisky
        </Link>
        <Button onPress={onDelete}>Delete review</Button>
        {/* <DeleteReviewButton
          onPress={onDelete}
          style={[styles.actionButton, styles.lastActionButton]}
        />  */}
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {

      const reviewsListener = firebase.firestore()
      .collection('reviews')
      .doc(firebase.auth().currentUser.uid)
      .collection('userReviews')
      .onSnapshot(querySnapshot => {
          const reviews = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data();
              console.log('firebaseData: ', firebaseData);

              const data = {
                  _id: doc.id,
                  ...firebaseData
              };

              // if (!firebaseData.system) {
              //     data.user = {
              //         ...firebaseData.user,
              //         name: firebaseData.user.email
              //     };
              // }

              return data;
          });

          setReviews(reviews);
      });


  return () => reviewsListener();

        // {firebase.auth().currentUser&&firebase.firestore()
        //     .collection('reviews').doc(firebase.auth().currentUser.uid).collection('userReviews')
        //     .get()
        //     .then((querySnapshot) => {
        //         let posts = querySnapshot.docs.map(doc => {
        //             const data = doc.data();
        //             const id = doc.id;
        //             return { id, ...data };
        //         });
        //         setReviews(posts);
        //     })
        //     .catch((error) => {
        //         console.log("Error getting documents: ", error);
        //     });
}, []);
 // use transaction instead
  const onDelete = (id) => {

    // let batch = firebase.firestore().batch();

    let reviewRef = firebase.firestore().collection('reviews').doc(firebase.auth().currentUser.uid).collection('userReviews')
      .doc(id);

    // batch.delete(reviewRef);

    let reviewRef2 = firebase.firestore().collection('whiskies').doc(id)
      .collection('reviews').doc(firebase.auth().currentUser.uid);
    // batch.delete(reviewRef2);

    // batch.commit().then(() => { console.log('review deleted'); }).catch((error) => { console.log(error); });

    let docFromWhiskiesRef = firebase.firestore().collection('whiskies').doc(id);
    let docFromUserReviewsRef = firebase.firestore().collection('whiskies').doc(id)
    .collection('reviews').doc(firebase.auth().currentUser.uid);

    firebase.firestore().runTransaction((transaction) => {
      return transaction.get(docFromWhiskiesRef).then((docFromWhiskies) => {
        if (!docFromWhiskies.exists) {
          throw "Document does not exist!";
        }
        let newReviewCount = docFromWhiskies.data().reviewCount - 1;
        let whiskyRating = docFromWhiskies.data().rating;
        transaction.update(docFromWhiskiesRef, { reviewCount: newReviewCount });
        return {whiskyRating: whiskyRating, newReviewCount: newReviewCount};
      });
    })
    .then((values) => {
      console.log('whiskyRating: ', values.whiskyRating);
      console.log('newReviewCount: ', values.newReviewCount);

      firebase.firestore().runTransaction((transaction) => {
        return transaction.get(docFromUserReviewsRef).then((docFromUserReviews) => {
          let userRating = docFromUserReviews.data().rating;
          let newRating = values.newReviewCount !== 0 ? (values.whiskyRating - userRating) / values.newReviewCount : 0;
          console.log('userRating: ', userRating);
          console.log('newRating: ', newRating);
          transaction.update(docFromWhiskiesRef, { rating: newRating });

          transaction.delete(reviewRef);
          transaction.delete(reviewRef2);
      });
    });
    })
    .then(() => {
      console.log("Transaction successfully committed!");
      
    }).catch((error) => {
      console.log("Transaction failed: ", error);
    });

  };

  console.log('my reviews: ', reviews);

  return (
      <>
      <View style={styles.container}>
      <Snackbar visible={visible}>
            Review deleted
        </Snackbar>
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