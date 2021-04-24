import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, TextInput, IconButton } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    appbar: {
        width: '100%',
        top:0,
        zIndex: 6,
        // position: 'absolute'
    },
    container: {
        zIndex: 5,
        // paddingTop: 100,
        position: 'absolute',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
    },
    postContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    topContainer: {
        padding: 5
    },
    middleContainer: {
        padding: 5,
        flexDirection: 'row'
    },
    bottomContainer: {
        padding: 5
    },
    button: {

    },
    textInput: {
        padding: 5,
        width: '100%'
    }
});

const CustomAppbar = () => {

    const history = useHistory();

    const _goBack = () => history.push('/');

    const _handleMore = () => console.log('Shown more');

    return(
        <Appbar.Header style={styles.appbar} statusBarHeight={Constants.statusBarHeight}>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title="Upload post" />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    );
};

const UploadPosts = () => {

    const [text, setText] = React.useState('');

    return (
   
    <View style={styles.container}>
         <CustomAppbar/>
        <View style={styles.postContainer}>
            <View style={styles.topContainer}>
                <TextInput numberOfLines={10} multiline={true} style={styles.textInput} 
                    value={text}    onChangeText={text => setText(text)}/>
            </View>
            <View style={styles.middleContainer}>
                <IconButton icon='file-image' onPress={() => {console.log('pressed');}}/>
            </View>
            <View style={styles.bottomContainer}>
                <Button style={styles.button} onPress={() => {console.log('pressed');}} mode="contained">Upload post</Button>
            </View>
        </View>

    </View>
    );
};

export default UploadPosts;