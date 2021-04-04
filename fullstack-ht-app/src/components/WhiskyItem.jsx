import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import formatInThousands from '../utils/formatInThousands';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: 'green'
  },
  middleContainer: {
    // alignItems: 'center',
    flexGrow: 0,
    backgroundColor: 'brown'

  },
  bottomContainer: {
    flexGrow: 0,
    backgroundColor: 'blue',
    // justifyContent: 'space-around',
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: 5,
  },
  topContainer: {
    flexGrow: 1,
    padding: 5,
    // alignItems: 'center'
  },
  nameText: {
    marginBottom: 5,
  },
  avatar: {
    width: 80,
    height: 160,
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
});

const CountItem = ({ label, count, ...props }) => {
  return (
    <View style={styles.countItem}>
      <Text style={styles.countItemCount} fontWeight="bold" {...props}>
        {formatInThousands(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const WhiskyItem = ({ whisky, ...props }) => {
  const {
    brand,
    nameAddition,
    age,
    distillationDate,
    bottlingDate,
    abv,
    bottleSize,
    downloadURL,
    reviewCount,
    ratingAverage,
    bottler,
  } = whisky;



  return (
    <View style={styles.container} {...props}>
      
        <View style={styles.avatarContainer}>
          <Image source={{ uri: downloadURL}} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Text
            style={styles.nameText}
            testID="whiskyItemName"
            fontSize='subheading'
            // fontWeight='bold'
          >
            {brand+' '}{age+' '}{distillationDate+'/'}{bottlingDate+' '}
            {nameAddition+' '}{abv+'% '}{bottleSize+'L'}
          </Text>
        </View>
        <View style={styles.middleContainer}>
        <Text
            style={styles.nameText}
            fontSize='subheading'
            testID="whiskyItemBottlesize"
          >
            {bottler}
            </Text>
        </View>
        <View style={styles.bottomContainer}>
        <CountItem
          count={ratingAverage}
          label="Rating"
          testID="repositoryItemRating"
        />
        <CountItem
          count={reviewCount}
          label="Reviews"
          testID="repositoryItemReviews"
        />
      </View>
      </View>

    </View>
  );
};

export default WhiskyItem;
