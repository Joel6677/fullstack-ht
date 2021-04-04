import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-native';
import { useHistory } from 'react-router-native';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import WhiskyItemInfo from './WhiskyItemInfo';
import ReviewItem from './ReviewItem';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingVertical: 80,
    position: 'absolute',
    zIndex: 1,
  },  
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const WhiskyInfo = ({ whisky, id }) => {
  return (
    <>
      <WhiskyItemInfo whisky={whisky} id={id}/>
      <ItemSeparator />
    </>
  );
};

const SingleWhisky = () => {

  const history = useHistory();
  const [reviews, setReviews] = useState('');
  const [whisky, setWhisky] = useState('');

  const { id } = useParams();

  useEffect(() => {

    firebase.firestore()
      .collection('whiskies')
      .doc(id)
      .collection('reviews')
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

    firebase.firestore()
      .collection('whiskies')
      .doc(id)
      .get()
      .then((doc) => {
        setWhisky(doc.data());
      })
      .catch((error) => {
        console.log("Error getting document: ", error);
      });
}, [history]);



  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
            <ReviewItem review={item} />    
        )}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() =>
          <WhiskyInfo whisky={whisky} id={id} />
        }
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default SingleWhisky;
