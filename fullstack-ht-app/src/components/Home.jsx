import React, { useContext, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Image, ScrollView, SafeAreaView, Platform, Button } from 'react-native';
import { useQuery } from '@apollo/client'; 
import { StateContext } from '../state';
import Text from './Text';

// import fileService from '../services/files';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'green',
    height: 100,
    width: 50
  },
  scrollViewStyle: {

  },
  textContainer: {
    position: 'absolute',
    backgroundColor: 'purple',
    alignSelf: 'flex-end'


  }


  // photo: {
  //   width: 50,
  //   height: 50,
  // },
});



const Home = () => {


  // const scrollY = useRef(new Animated.Value(0)).current; 

 

  // create dates

  // const { state } = useContext(StateContext);
  // const [files, setFiles] = useState([]);

  // const moveMenu = () => {

  //   Animated.spring(
  //     homeAnim,
  //     {
  //       toValue: state.open ? 600 : 0
  //     }
  //   ).start();
  
  // };

  // useEffect(() => {
  //   moveMenu();
  //   fileService.getAll().then(files =>
  //     setFiles(files));
  // },[]);

  // const getImage = async (filename) => {
  //   return await fileService.getImage(filename);
  // };

  // get images here

  return (
     <>
      <View style={styles.container}>
      
      </View>
     


      {/* <Animated.View style={[styles.home, {
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
      </Animated.View>  */}
      
     </>

  );
};

export default Home;