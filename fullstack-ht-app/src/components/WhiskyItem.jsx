import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Linking } from 'expo';

import theme from '../theme';
import Text from './Text';
import CustomButton from './CustomButton';
import formatInThousands from '../utils/formatInThousands';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
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
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  githubButton: {
    marginTop: 15,
  },
});

// const CountItem = ({ label, count, ...props }) => {
//   return (
//     <View style={styles.countItem}>
//       <Text style={styles.countItemCount} fontWeight="bold" {...props}>
//         {formatInThousands(count)}
//       </Text>
//       <Text color="textSecondary">{label}</Text>
//     </View>
//   );
// };

const WhiskyItem = ({ whisky, ...props }) => {
  const {
    brand,
    age,
    distillationDate,
    bottlingDate,
    abv,
    bottlesize,
    downloadURL,
    // reviewCount,
    // ratingAverage
  } = whisky;


//brand-ddate/bdate-nameadd-abv-size

  return (
    <View style={styles.container} {...props}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: downloadURL}} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
            testID="whiskyItemBrand"
          >
            {brand}
          </Text>
          <Text
            style={styles.descriptionText}
            color="textSecondary"
            testID="whiksyItemAge"
          >
            {age} YO
          </Text>
          <Text
            style={styles.descriptionText}
            color="textSecondary"
            testID="whiksyItemDistillationDate"
          >
            {distillationDate}
          </Text>
          <Text
            style={styles.descriptionText}
            color="textSecondary"
            testID="whiksyItemBottlingDate"
          >
            {bottlingDate}
          </Text>
          <Text
            style={styles.descriptionText}
            color="textSecondary"
            testID="whiskyItemAbv"
          >
            {abv}%
          </Text>
          <Text
            style={styles.descriptionText}
            color="textSecondary"
            testID="whiskyItemBottlesize"
          >
            {bottlesize}L
          </Text>
        </View>
      </View>
      {/* <View style={styles.bottomContainer}>
        <CountItem
          count={reviewCount}
          label="Reviews"
          testID="repositoryItemReviews"
        />
        <CountItem
          count={ratingAverage}
          label="Rating"
          testID="repositoryItemRating"
        />
      </View> */}
    </View>
  );
};

export default WhiskyItem;
