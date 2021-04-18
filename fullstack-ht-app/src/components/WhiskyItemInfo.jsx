import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Divider, Avatar, Button } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import Text from './Text';
import { addToWishList, addToCollection } from '../firebase/uploads';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange'
    },
    headingContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 5
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
        width: '60%'

    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    avatarContainer: {
        flexGrow: 0,
        marginRight: 10,
        borderRadius: 5
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
    allButtonsContainer: {
        padding: 3,
    },
    buttonContainer: {
        marginVertical: 3,
    },
    avatar: {
        width: 120,
        height: 200,
        borderRadius: 5,
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
                {count}
            </Text>
            <Text color="textSecondary">{label}</Text>
        </View>
    );
};

const WhiskyItemInfo = ({ whisky, id }) => {

    const {
        distillery,
        brand,
        nameAddition,
        country,
        region,
        category,
        age,
        abv,
        bottleSize,
        bottler,
        series,
        description,
        caskType,
        caskNumber,
        numberOfBottles,
        distillationDate,
        bottlingDate,
        artificialColoring,
        chillFiltration,
        downloadURL,
        reviewCount,
        rating
    } = whisky;

    const history = useHistory();


    const addWhiskyToMyCollection = () => {
        console.log('add whisky to my collection');
        addToCollection(whisky, id);
        Alert.alert(
            "Whisky added to my collection"
          );
    };

    const addWhiskyToMyWishList = () => {
        console.log('add whisky to my wish list')
        addToWishList(whisky, id);
        Alert.alert(
            "Whisky added to my wish list"
          );
    };
    

    

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>

                <View style={styles.headingContainer}>
                    <Text
                        style={styles.headingText}
                        fontWeight="bold"
                        fontSize="heading"
                        numberOfLines={4}
                        testID="whiskyItemInfoHeading"
                    >
                        {brand + ' '}{age + ' YO '}{distillationDate +'/'}
                        {bottlingDate+' '}{nameAddition +' '}{abv+'% '}{bottleSize+'L'}
                    </Text>
                </View>
                <View style={styles.middleContainer}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: downloadURL }} style={styles.avatar} />
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text
                            style={styles.descriptionTextText}
                            fontSize="subheading"
                            numberOfLines={10}
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
                    {!!region && <Text
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
                    {!!age&&<Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemAge"
                    >
                        Age: {age}
                    </Text>}
                    {!!distillationDate&&<Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemDistillationDate"
                    >
                        Distillation date: {distillationDate}
                    </Text>}
                    {!!bottlingDate&&<Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemBottlingDate"
                    >
                        Bottling date: {bottlingDate}
                    </Text>}
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
                        Bottle size: {bottleSize}L
                </Text>
                    {!!bottler && <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemBottler"
                    >
                        Bottler: {bottler}
                    </Text>}
                    {!!caskType && <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemCaskType"
                    >
                        Cask type: {caskType}
                    </Text>}
                    {!!series && <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemSeries"
                    >
                        Series: {series}
                    </Text>}
                    {!!caskNumber && <Text
                        style={styles.headingText}
                        fontSize="subheading"
                        testID="whiskyItemCaskNumber"
                    >
                        Cask number: {caskNumber}
                    </Text>}
                    {!!numberOfBottles && <Text
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

                        {!!chillFiltration && <Avatar.Icon style={styles.avatarIconContainer} size={30} icon='water' />}
                        {!!artificialColoring && <Avatar.Icon style={styles.avatarIconContainer} size={30} icon='snowflake' />}

                    </View>

                </View>

            </View>
            <Divider />
            <View style={styles.bottomContainer}>
                <CountItem
                    count={reviewCount}
                    label="Reviews"
                    testID="whiskyItemReviews"
                />
                <CountItem
                    count={rating}
                    label="Rating"
                    testID="whiskyItemRating"
                />
            </View>
            <Divider/>
            <View style={styles.allButtonsContainer}>
                <Button style={styles.buttonContainer} mode="outlined" onPress={() => { addWhiskyToMyCollection(); }}>Add to collection</Button>
                <Button style={styles.buttonContainer} mode="outlined" onPress={() => { addWhiskyToMyWishList(); }}>Add to wishlist</Button>
                <Button style={styles.buttonContainer} mode="outlined" onPress={() => { history.push(`/create-review/${id}`); }}>Create review</Button>
            </View>
            
        </View>
    );
};

export default WhiskyItemInfo;
