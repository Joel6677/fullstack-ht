import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Searchbar, Divider } from 'react-native-paper';
import WhiskyItem from './WhiskyItem';
import Picker from './Picker';
// import * as firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const styles = StyleSheet.create({
    container: {
        padding: 5,
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        paddingTop: 90,
        paddingBottom: 60
    },
    separator: {
        marginVertical: 5
    },
    headerContainer: {
        padding: 10,
    },
    searchContainer: {
        marginBottom: 15,
    },
});

const ItemSeparator = () => {


    return(<View style={styles.separator}>

        <Divider/>

    </View>);

};

const orderByOptions = [
    { label: 'Latest whiskies', value: 'latest' },
    {
        label: 'Highest rated whiskies',
        value: 'highestRating',
    },
    {
        label: 'Lowest rated whiskies',
        value: 'lowestRating',
    },
];

const variablesByOrderBy = {
    latest: {
      orderBy: 'created_at',
      orderDirection: 'desc',
    },
    highestRating: {
      orderBy: 'rating',
      orderDirection: 'desc',
    },
    lowestRating: {
      orderBy: 'rating',
      orderDirection: 'asc',
    },
  };
  

const WhiskyListHeader = (
    {
      onOrderByChange,
      orderBy,

    }
) => {
    return (
        <View style={styles.headerContainer}>
            <Picker
            placeholder={{}}
            onValueChange={onOrderByChange}
            value={orderBy}
            items={orderByOptions}
            />
        </View>
    );
};

export class WhiskyListContainer extends React.Component {
    renderHeader = () => {
        const {
            onOrderByChange,
            orderBy,
        } = this.props;

        return (
            <WhiskyListHeader
                onOrderByChange={onOrderByChange}
                orderBy={orderBy}
            />
        );
    };

    render() {
        const { whiskies, onWhiskyPress } = this.props;

        return (
            <FlatList
                data={whiskies}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => onWhiskyPress(item.id)}
                    >
                        <WhiskyItem whisky={item} />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={ItemSeparator}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}

const WhiskyList = () => {
    const history = useHistory();
    const [orderBy, setOrderBy] = useState('latest');
    const [whiskies, setWhiskies] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    
    useEffect(() => {
        if (searchQuery !== '') {
            const whiskiesListener = firebase.firestore()
                .collection('whiskies')
                .where('brand', '==', searchQuery)
                .orderBy(`${variablesByOrderBy[orderBy].orderBy}`, `${variablesByOrderBy[orderBy].orderDirection}`)
                .onSnapshot(querySnapshot => {
                    const whiskies = querySnapshot.docs.map(doc => {
                        const firebaseData = doc.data();
                        console.log('firebaseData: ', firebaseData);

                        const data = {
                            id: doc.id,
                            ...firebaseData
                        };

                        return data;
                    });

                    setWhiskies(whiskies);
                });


            return () => whiskiesListener();

        } else {

            const whiskiesListener =
                firebase.firestore()
                    .collection('whiskies')
                    .orderBy(`${variablesByOrderBy[orderBy].orderBy}`, `${variablesByOrderBy[orderBy].orderDirection}`)
                    .onSnapshot(querySnapshot => {
                        const whiskies = querySnapshot.docs.map(doc => {
                            const firebaseData = doc.data();
                            console.log('firebaseData: ', firebaseData);

                            const data = {
                                id: doc.id,
                                ...firebaseData
                            };

                            return data;
                        });

                        setWhiskies(whiskies);
                    });


            return () => whiskiesListener();


        }

        // if (searchQuery !== '') {
        //     firebase.firestore()
        //     .collection('whiskies')
        //     .where('brand', '==', searchQuery)
        //     .orderBy(`${variablesByOrderBy[orderBy].orderBy}`, `${variablesByOrderBy[orderBy].orderDirection}`)
        //     .get()
        //     .then((querySnapshot) => {
        //         let posts = querySnapshot.docs.map(doc => {
        //             const data = doc.data();
        //             const id = doc.id;
        //             return { id, ...data };
        //         });
        //         setWhiskies(posts);
        //     })
        //     .catch((error) => {
        //         console.log("Error getting documents: ", error);
        //     });
        // } else {
        //     firebase.firestore()
        //     .collection('whiskies')
        //     .orderBy(`${variablesByOrderBy[orderBy].orderBy}`, `${variablesByOrderBy[orderBy].orderDirection}`)
        //     .get()
        //     .then((querySnapshot) => {
        //         let posts = querySnapshot.docs.map(doc => {
        //             const data = doc.data();
        //             const id = doc.id;
        //             return { id, ...data };
        //         });
        //         setWhiskies(posts);
        //     })
        //     .catch((error) => {
        //         console.log("Error getting documents: ", error);
        //     });
        // }

    }, [searchQuery, orderBy]);
    

    
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>

            
            <WhiskyListContainer
                whiskies={whiskies}
                orderBy={orderBy}
                onOrderByChange={(newOrderBy) => {
                    setOrderBy(newOrderBy);
                }}
                onWhiskyPress={(id) => {
                    history.push(`/whiskies/${id}`);
                }}
            />
        </View>
    );
};

export default WhiskyList;