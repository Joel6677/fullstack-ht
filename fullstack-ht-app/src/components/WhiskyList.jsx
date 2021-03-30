import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import WhiskyItem from './WhiskyItem';
import { useCollection } from 'react-firebase-hooks/firestore';
// import useRepositories from '../hooks/useRepositories';
import Picker from './Picker';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 1
    },
    separator: {
        height: 10,
    },
    headerContainer: {
        padding: 15,
    },
    searchContainer: {
        marginBottom: 15,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderByOptions = [
    { label: 'Latest repositories', value: 'latest' },
    {
        label: 'Highest rated repositories',
        value: 'highestRating',
    },
    {
        label: 'Lowest rated repositories',
        value: 'lowestRating',
    },
];

// const WhiskyListHeader = (
//     {
//       onOrderByChange,
//       orderBy,
//       searchKeyword,
//       onSearchKeywordChange,
//     }
// ) => {
//     return (
//         <View style={styles.headerContainer}>
//             <View style={styles.searchContainer}>
//                 <Searchbar
//                   placeholder="Search whiskies"
//                   value={searchKeyword}
//                   onChangeText={onSearchKeywordChange}
//                 />
//             </View>
//             <Picker
//             placeholder={{}}
//             onValueChange={onOrderByChange}
//             value={orderBy}
//             items={orderByOptions}
//             />
//         </View>
//     );
// };

export class WhiskyListContainer extends React.Component {
    // renderHeader = () => {
    //     const {
    //         onOrderByChange,
    //         orderBy,
    //         searchKeyword,
    //         onSearchKeywordChange,
    //     } = this.props;

    //     return (
    //         <WhiskyListHeader
    //             onOrderByChange={onOrderByChange}
    //             orderBy={orderBy}
    //             searchKeyword={searchKeyword}
    //             onSearchKeywordChange={onSearchKeywordChange}
    //         />
    //     );
    // };

    render() {
        const { whiskies, onEndReach, onWhiskyPress } = this.props;

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
                // ListHeaderComponent={this.renderHeader}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
                initialNumToRender={8}
            />
        );
    }
}

const WhiskyList = () => {
    const history = useHistory();
    const [orderBy, setOrderBy] = useState('latest');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [whiskies, setWhiskies] = useState('');

    useEffect(() => {

        firebase.firestore()
            .collection('whiskies')
            .get()
            .then((querySnapshot) => {
                let posts = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                setWhiskies(posts);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [history]);
    // const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

    // iterate through whiskies (flatlist)

    //
    //   const { repositories, fetchMore } = useRepositories({
    // first: 8,
    // ...variablesByOrderBy[orderBy],
    //     searchKeyword: debouncedSearchKeyword,
    //   });

      const onEndReach = () => {
        //fetch more
      };
    //

      
    return (
        <View style={styles.container}>
            <WhiskyListContainer
                whiskies={whiskies}
                // orderBy={orderBy}
                // onOrderByChange={(newOrderBy) => {
                //     setOrderBy(newOrderBy);
                // }}
                onEndReach={onEndReach}
                // searchKeyword={searchKeyword}
                // onSearchKeywordChange={(keyword) => setSearchKeyword(keyword)}
                onWhiskyPress={(id) => {
                    history.push(`/whiskies/${id}`);
                }}
            />
        </View>
    );
};

export default WhiskyList;