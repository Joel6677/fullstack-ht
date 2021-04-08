import React , {useState, useEffect} from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { Link } from 'react-router-native';
import * as firebase from 'firebase';
import ReviewItem from './ReviewItem';


const styles = StyleSheet.create({
container: {
    zIndex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
},
  reviewItemWrapper: {
    padding: 15,
    backgroundColor: 'orange',
  },
  separator: {
    height: 10,
  },
  actionsContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  actionButton: {
    flexGrow: 1,
    marginRight: 15,
  },
  lastActionButton: {
    marginRight: 0,
  },
});

const DeleteReviewButton = ({ onPress, ...props }) => {
    const alertButtons = [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => onPress(),
      },
    ];
  
    const deleteWithConfirmation = () => {
      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        alertButtons,
        { cancelable: false },
      );
    };
  
    return (
      <Button onPress={deleteWithConfirmation} mode='outlined'>
        Delete review
      </Button>
    );
  };



const ReviewItemWithActions = ({ review, onDelete }) => {

  return (
    <View style={styles.reviewItemWrapper}>
        <ReviewItem review={review}/> 
        <Link
          component={Button}
          to={`/whiskies/${review.whiskyID}`}
          style={styles.actionButton}
        >
          View whisky
        </Link>
        <DeleteReviewButton
          onPress={onDelete}
          style={[styles.actionButton, styles.lastActionButton]}
        /> 
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
        {firebase.auth().currentUser&&firebase.firestore()
            .collection('reviews').doc(firebase.auth().currentUser.uid).collection('userReviews')
            .get()
            .then((querySnapshot) => {
                let posts = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                setReviews(posts);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
}}, []);

  const onDelete = async (id) => {
    // use transaction
    firebase.firestore().collection('reviews').doc(firebase.auth().currentUser.uid).collection('userReviews')
    .doc(id).delete().then(() => {setVisible(true);}).catch((error) => {console.log(error);});
    
  };

  console.log('reviews: ', reviews);

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
                      onDelete={() => onDelete(item.id)}
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