import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
// import * as firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { sendChatMessage } from '../firebase/chat';
import { useParams } from 'react-router-native';
import Text from './Text';
import Moment from 'moment';


const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        padding: 5,
        paddingTop: 100,
        paddingBottom: 60,
        height: '100%',
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
        // backgroundColor: 'white'
    },
    sendIcon: {
        backgroundColor: '#ffd700',
        borderRadius: 50,
        right: 5
    },
    messageText: {
        margin: 5
    },
    dateText: {
        margin: 5
    },
    separator: {
        height: 10,
    },
    messageContainerSent: {
        width: 200,
        marginRight: 5,
        alignSelf: 'flex-end',
        backgroundColor: 'orange',
        borderRadius: 5
    },
    textInput: {
        margin: 10,
        backgroundColor: 'white',
        width: '80%'
    },
    messageContainerReceived: {
        width: 200,
        marginLeft: 5,
        alignSelf: 'flex-start',
        backgroundColor: '#3449BC',
        borderRadius: 5
    },
    sendMessageContainer: {
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'gray'
        
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MessageItem = ({message}) => {
    const messageSent = message.user._id===firebase.auth().currentUser.uid;
    const messageStyle = messageSent ? styles.messageContainerSent : styles.messageContainerReceived; 

    return (
        <View style={messageStyle}>
            <View>
                <Text numberOfLines={10} style={styles.messageText}>
                    {message.text}
                </Text>
                <Text style={styles.dateText}>
               {Moment(message.createdAt).format('DD-MM-YYYYTHH:mm')}
                </Text>
            </View>
      
        </View>
    );
};

const Messenger = () => {

    const [messages, setMessages] = useState([]);

    const [text, setText] = useState('');
    const currentUser = firebase.auth().currentUser;
    const { id } = useParams();


    const chatID = () => {
        const chatterID = currentUser.uid;
        const chateeID = id;
        const chatIDpre = [];
        chatIDpre.push(chatterID);
        chatIDpre.push(chateeID);
        chatIDpre.sort();
        return chatIDpre.join('_');
      };

    useEffect(() => {
        const messagesListener = firebase.firestore()
            .collection('messages')
            .doc(chatID())
            .collection('chats')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();
                    console.log('firebaseData: ', firebaseData);

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    };

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.email
                        };
                    }

                    return data;
                });

                setMessages(messages);
            });

        return () => messagesListener();
    }, []);

    const sendMessage = () => {

        sendChatMessage(chatID(),text,id);
        setText('');

    };

    return(
        <View style={styles.container}>
            <FlatList
                data={messages}
                inverted
                renderItem={({ item }) => (
                    <MessageItem
                        message={item}
                    />
                )}
                keyExtractor={({ id }) => id}
                ItemSeparatorComponent={ItemSeparator}
            />

            <View style={styles.sendMessageContainer}>
                <TextInput
                    label=""
                    value={text}
                    onChangeText={text => setText(text)}
                    style={styles.textInput}
                />
                <IconButton style={styles.sendIcon} icon="send" size={25} onPress={()=>{sendMessage();}} />
            </View>
                    
        </View>
    );
};

export default Messenger;