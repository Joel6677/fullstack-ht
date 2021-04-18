import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Searchbar, Divider } from 'react-native-paper';
import UserItem from './UserItem';
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
        paddingTop: 80,
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

        {/* <Divider/> */}

    </View>);

};


const UserListContainer = ({users, onUserPress}) => {

        return (
            <FlatList
                data={users}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    // <TouchableOpacity
                        // key={item.id}
                        // onPress={() => onUserPress(item.id)}
                    // >
                        <UserItem user={item} />
                    // </TouchableOpacity>
                )}
                ItemSeparatorComponent={ItemSeparator}
            />
        );
    };

const UserList = () => {
    const history = useHistory();
    const [users, setUsers] = useState('');


    useEffect(() => {

        firebase.firestore()
            .collection('users')
            .get()
            .then((querySnapshot) => {
                let posts = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                setUsers(posts);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <UserListContainer
                users={users}
                // onUserPress={(id) => {
                //     history.push(`/users/${id}`);
                // }}
            />
        </View>
    );
};

export default UserList;