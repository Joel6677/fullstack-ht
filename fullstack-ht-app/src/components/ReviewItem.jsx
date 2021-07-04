import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    backgroundColor: '#f2eecb',
    flexDirection: 'column',
    padding: 10,
  },
  topContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  middleContainer: {
    marginBottom: 10,
  },
  bottom: {

  },
  avatar: {
    width: 60,
    height: 60,
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    marginVertical: 10,
    flexGrow: 1,
  },
});

const ReviewItem = ({ review }) => {
  const {
    name,
    imgURL,
    nosing,
    taste,
    finish,
    rating,
    comment,
    time,
  } = review;

  return (

    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={{ uri: imgURL }} style={styles.avatar} />
        <Text
          style={styles.nameText}
          fontSize="subheading"
          testID="whiskyItemRating"
        >
          User:
          {' '}
          {name}
        </Text>
        <Text
          style={styles.nameText}
          fontSize="subheading"
          testID="whiskyItemRating"
        >
          {time}
        </Text>

      </View>

      <View style={styles.middleContainer}>
        <Text
          style={styles.nameText}
          fontSize="subheading"
          testID="whiskyItemNosing"
        >
          Nosing:
          {' '}
          {nosing}
        </Text>
        <Text
          style={styles.nameText}
          fontSize="subheading"
          testID="whiskyItemTaste"
        >
          Taste:
          {' '}
          {taste}
        </Text>
        <Text
          style={styles.nameText}
          fontSize="subheading"
          testID="whiskyItemFinish"
        >
          Finish:
          {' '}
          {finish}
        </Text>
      </View>

      <View>
        <Text
          style={styles.nameText}
          fontSize="subheading"
          testID="whiskyItemComment"
        >
          Comment:
          {' '}
          {comment}
        </Text>

        <Text
          style={styles.nameText}
          fontSize="subheading"
          testID="whiskyItemComment"
        >
          Rating:
          {' '}
          {rating}
          /100
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;
