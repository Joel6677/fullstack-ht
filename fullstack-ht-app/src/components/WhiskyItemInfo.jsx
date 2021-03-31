import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Divider, Avatar, Button } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import Text from './Text';
import formatInThousands from '../utils/formatInThousands';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    headingContainer: {
        flexDirection: 'row',  
        alignSelf: 'center',
        marginBottom: 15
    },
    topContainer: {
        flexDirection: 'column',
        padding: 10,
        marginBottom: 15,
    },
    middleContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    descriptionContainer: {
        
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
        
    },
    avatarContainer: {
        flexGrow: 0,
        marginRight: 20
    },
    avatarIconContainer: {
        flexGrow: 0,
        marginLeft: 15
    },
    contentContainer: {
        flexGrow: 1,
        flexShrink: 1,
    },
    headingText: {
        marginBottom: 5
    },  
    nameText: {
        marginBottom: 5,
    },
    descriptionText: {
        flexGrow: 1,
    },
    buttonContainer: {

    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 200
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
    infoContainer: {
        marginTop: 10
    },
    postTreatmentContainer: {
        flexDirection: 'row'
    }
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

const WhiskyItemInfo = ({ whisky }) => {

    console.log('whisky: ', whisky);

    const {
        distillery, //
        brand, // 
        nameAddition,
        country, //
        region,
        category, //
        age, //
        abv, // 
        bottlesize, // 
        bottler,
        series,
        description, //
        caskType,
        caskNumber,
        numberOfBottles,
        distillationDate,
        bottlingDate,
        artificialColoring,
        chillFiltration,
        downloadURL,
        reviewCount,
        ratingAverage
    } = whisky;


    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>

                <View style={styles.headingContainer}>
                    <Text
                        style={styles.headingText}
                        fontWeight="bold"
                        fontSize="heading"
                        numberOfLines={1}
                        testID="whiskyItemBrand"
                    >
                        {brand}{' '}
                    </Text>
                    {age && <Text
                        style={styles.headingText}
                        color="textSecondary"
                        fontWeight="bold"
                        fontSize="heading"
                        testID="whiksyItemAge"
                    >
                        {age} YO{' '}
                    </Text>}
                    {distillationDate && <Text
                        style={styles.headingText}
                        fontWeight="bold"
                        fontSize="heading"
                        color="textSecondary"
                        testID="whiksyItemDistillationDate"
                    >
                        {distillationDate}{'/'}
                    </Text>}
                    {bottlingDate && <Text
                        style={styles.headingText}
                        fontWeight="bold"
                        fontSize="heading"
                        color="textSecondary"
                        testID="whiksyItemBottlingDate"
                    >
                        {bottlingDate}{' '}
                    </Text>}
                    {nameAddition && <Text
                        style={styles.headingText}
                        fontWeight="bold"
                        fontSize="heading"
                        color="textSecondary"
                        testID="whiksyItemBottlingDate"
                    >
                        {nameAddition}{' '}
                    </Text>}
                    <Text
                        style={styles.headingText}
                        fontWeight="bold"
                        fontSize="heading"
                        color="textSecondary"
                        testID="whiskyItemAbv"
                    >
                        {abv}%{' '}
                    </Text>
                    <Text
                        style={styles.headingText}
                        fontWeight="bold"
                        fontSize="heading"
                        color="textSecondary"
                        testID="whiskyItemBottlesize"
                    >
                        {bottlesize}L
                    </Text>
                </View>
                <View style={styles.middleContainer}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: downloadURL }} style={styles.avatar} />
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text
                            style={styles.headingText}
                            fontSize="subheading"
                            testID="whiskyItemDistillery"
                        >
                            {description}
                        </Text>
                    </View>
                </View>
                <Divider />
                <View style={styles.infoContainer}>
                    <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemDistillery"
                    >
                        Distillery: {distillery}
                    </Text>
                    <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemCountry"
                    >
                        Country: {country}
                    </Text>
                    {region&&<Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemRegion"
                    >
                        Region: {region}
                    </Text>}
                    <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemCategory"
                    >
                        Category: {category}
                    </Text>
                    <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemAge"
                    >
                        Age: {age}
                    </Text>
                    <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemAbv"
                    >
                        Abv: {abv}%
                </Text>
                    <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemBottlesize"
                    >
                        Bottle size: {bottlesize}L
                </Text>
                    {bottler&&<Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemBottler"
                    >
                        Bottler: {bottler}
                    </Text>}
                    {caskType&&<Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemCaskType"
                    >
                        Cask type: {caskType}
                    </Text>}
                    {series&&<Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemSeries"
                    >
                        Series: {series}
                    </Text>}
                    {caskNumber&&<Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemCaskNumber"
                    >
                        Cask number: {caskNumber}
                    </Text>}
                    {numberOfBottles&&<Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemNumberOfBottles"
                    >
                        Number of bottles: {numberOfBottles}
                    </Text>}
                    <View style={styles.postTreatmentContainer}>
                        <Text
                            style={styles.headingText}
                            fontSize="subheading"
                            testID="whiskyItemPostTreatment"
                        >
                            Post treatment:
                        </Text>

                        {chillFiltration&&<Avatar.Icon style={styles.avatarIconContainer} size={30} icon='water' />}
                        {artificialColoring&&<Avatar.Icon style={styles.avatarIconContainer} size={30} icon='snowflake' />}

                    </View>

                </View>

            </View>
            <Divider/>
            <View style={styles.bottomContainer}>
                <CountItem
                    count={reviewCount}
                    label="Reviews"
                    testID="whiskyItemReviews"
                />
                <CountItem
                    count={ratingAverage}
                    label="Rating"
                    testID="whiskyItemRating"
                />
            </View>
            <Divider/>
            <Button icon="camera" mode="outlined" onPress={() => history.push('/create-review')}>Create review</Button>
        </View>
    );
};

export default WhiskyItemInfo;
