import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    height: '100%',
    width: '100%',
    position: 'absolute',
    paddingVertical: 80,
    backgroundColor: 'red'
  }
});


const ReviewItem = ({ review }) => {
//   const {
    // brand,
    // nameAddition,
    // age,
    // distillationDate,
    // bottlingDate,
    // abv,
    // bottlesize,
    // downloadURL,
    // reviewCount,
    // ratingAverage
//   } = whisky;

//brand-age-ddate/bdate-nameadd-abv-size

  return (
    <View style={styles.container}>
        <Text>ASDASDASDASD</Text>
    </View>
  );
};

export default ReviewItem;
