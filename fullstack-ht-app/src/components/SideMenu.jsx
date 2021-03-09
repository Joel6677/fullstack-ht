import React, { useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';
import { Button, Avatar, Divider } from 'react-native-paper';
import { useHistory } from 'react-router-native';

import { StateContext } from '../state';
import CustomButton from './CustomButton';
import theme from '../theme';

const styles = StyleSheet.create({ 
  sidebar: {
    width: Dimensions.get('window').width*0.85,
    height: '100%', 
    backgroundColor: theme.colors.primary,
    zIndex: 4,
    position: 'absolute'
  },
  closeMenu: {
    backgroundColor: 'grey',
    width: '100%',
    height: '100%',
  },
  sidemenuButtons: {
    top: 50,
    zIndex:5,
    alignItems: 'flex-start'
  },
  button: {
    padding: 10
  },
  avatar: {
    marginLeft: 30,
    marginBottom: 20
  },
  divider: {
    zIndex: 5,
    marginTop: 10,
    width: '100%'
  }
 });

const SideMenu = () => {

  const toggleAnim = useRef(new Animated.Value(Dimensions.get('window').width*-0.85)).current; 
  const fadeAnim = useRef(new Animated.Value(0)).current ;
  const { state, dispatch } = useContext(StateContext);
  const history = useHistory();

  const route = (route) => {
      history.push(route);
      dispatch({type: "SET_OPEN", payload: !state.open});
  };


  const moveMenu = () => {

    Animated.timing(
      toggleAnim,
      {
        toValue: state.open ? 0 : Dimensions.get('window').width*-0.85,
        useNativeDriver: true,
        duration: 300
      }
    ).start();
  
  };
  
  const fade = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: state.open ? 0.5: 0,
        duration: 300,
        useNativeDriver: true
      }
    ).start();
  };

  useEffect(() => {
    moveMenu();
    fade();
  },[state.open]);

  return (
    <>
      <Animated.View style={[styles.sidebar, {
        transform: [{
          translateX: toggleAnim
        }]
      }]}>
        <View style={styles.sidemenuButtons}>

          <Avatar.Image style={styles.avatar} size={70} />

          <Divider style={styles.divider}/>

          <Button color='white' icon='account' style={styles.button} onPress={() => {route('/sign-up');}}>
            Profile
          </Button>
          <Button color='white' icon='star-box' style={styles.button} onPress={() => {console.log('Reviews pressed');}}>
            Reviews
          </Button>
          <Button color='white' icon='map' style={styles.button} onPress={() => {console.log('Map pressed');}}>
            Map
          </Button>
          <Button color='white' icon='shopping' style={styles.button} onPress={() => {console.log('Market pressed');}}>
            Market
          </Button>
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.closeMenu, {opacity: fadeAnim, zIndex: state.open ? 3 : 0} ]}
      >
          {state.open &&
          <CustomButton style={{height: "100%", borderRadius: 0}} color='' onPress={() => dispatch({type: "SET_OPEN", payload: !state.open})} ></CustomButton> }
     
      </Animated.View>
    </>
  );
};

export default SideMenu;