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

const getMessages = async () => {

    const currentUser = firebase.auth().currentUser;

    const chatIDs = await firebase.firestore().
    collection('users')
        .where('email', '!=', currentUser.email )
        .get()
        .then((querySnapshot) => {
            let ids = querySnapshot.docs.map(doc => {
                const id = doc.id;
                const chatIDpre = [];
                chatIDpre.push(currentUser.uid);
                chatIDpre.push(id);
                chatIDpre.sort();
                return chatIDpre.join('_');
            });
            return ids;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    const messages = await firebase.firestore().
    collection('messages').where('chatID', 'in', chatIDs)
        .get()
        .then((querySnapshot) => {
            let posts = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const userIDs = doc.id.split('_');
                console.log('userIDs: ', userIDs);
                let id;
                for (let i = 0; i < 2; i++) {
                    if (userIDs[i] !== currentUser.uid) {
                       id = userIDs[i];
                    }
                }
                return { id, ...data };
            });
            return posts;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        console.log('chatIDs: ', chatIDs);
        console.log('messages: ', messages);

        return messages;

};


const MyMessages = () => {
    const history = useHistory();
    const [messages, setMessages] = useState([]);


    useEffect( () => {   
        
        getMessages().then((messages) => {setMessages(messages);});
       
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