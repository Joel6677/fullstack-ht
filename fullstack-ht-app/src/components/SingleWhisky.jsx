import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';

import { FlatList, StyleSheet, View } from 'react-native';

import firebase from 'firebase/app';
import WhiskyItemInfo from './WhiskyItemInfo';
import ReviewItem from './ReviewItem';
import 'firebase/auth';
import 'firebase/firestore';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingTop: 80,
    paddingBottom: 60,
    position: 'absolute',
    zIndex: 1,
  },
  separator: {
    height: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const WhiskyInfo = ({ whisky, id }) => (
  <>
    <WhiskyItemInfo whisky={whisky} id={id} />
    <ItemSeparator />
  </>
);

const SingleWhisky = () => {
  const [reviews, setReviews] = useState('');
  const [whisky, setWhisky] = useState('');

  const { id } = useParams();

  useEffect(() => {

    const fetchData = async () => {
      const reviews = await firebase.firestore()
      .collection('whiskies')
      .doc(id)
      .collection('reviews')
      .get()

      const posts = reviews.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id
        return { id, ...data };
      })

      setReviews(posts)

      const whiskies = await firebase.firestore()
      .collection('whiskies')
      .doc(id)
      .get()

      setWhisky(whiskies.data())

    }

    fetchData()
    
  }, [id]);

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} />
        )}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <WhiskyInfo whisky={whisky} id={id} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default SingleWhisky;
