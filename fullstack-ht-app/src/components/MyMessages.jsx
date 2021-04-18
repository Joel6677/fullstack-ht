import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import MessageItem from './MessageItem';
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

    </View>);

};


const MyMessages = () => {
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const currentUser = firebase.auth().currentUser;

    useEffect(() => {
        firebase.firestore().
        collection('messages')
            .where('users', 'array-contains', currentUser.uid)
            .get()
            .then((querySnapshot) => {
                let posts = querySnapshot.docs.map(doc => {

                    let id;

                    for (let i = 0; i < 2; i++) {
                        if (doc.data().users[i] !== currentUser.uid) {
                            id = doc.data().users[i];
                        }
                    }
                    const data = doc.data();
                    
                    return { id, ...data };
                });
                 console.log('posts: ', posts);
                setMessages(posts);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item}
                        onPress={() => history.push(`/messenger/${item.id}`)}
                    >
                        <MessageItem message={item} />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    );
};

export default MyMessages;