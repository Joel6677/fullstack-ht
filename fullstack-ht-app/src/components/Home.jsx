import React, { useContext, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';
import { useQuery } from '@apollo/client'; 

import { StateContext } from '../state';
import Text from './Text';
import fileService from '../services/files';

const styles = StyleSheet.create({
  home: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  photo: {
    width: 50,
    height: 50,
  },
});


const Home = () => {
  const homeAnim = useRef(new Animated.Value(0)).current; 
  const { state } = useContext(StateContext);
  const [files, setFiles] = useState([]);

  const moveMenu = () => {

    Animated.spring(
      homeAnim,
      {
        toValue: state.open ? 600 : 0
      }
    ).start();
  
  };

  useEffect(() => {
    moveMenu();
    fileService.getAll().then(files =>
      setFiles(files));
  },[]);

  const getImage = async (filename) => {
    return await fileService.getImage(filename);
  };

  // get images here

  return (
     <>
      <Animated.View style={[styles.home, {
        transform: [{
          translateX: homeAnim
        }]
      }]}>
        <View>
          {files.map((file) =>
            <React.Fragment key={file._id}>
              <Image
                style={styles.photo}
                source={{
                  uri: `http://localhost:3001/image/${file.filename}`
                }} />
            </React.Fragment>
          )}
          <Text>Pictures&videos</Text>
        </View>
      </Animated.View> 
      
     </>

  );
};

export default Home;