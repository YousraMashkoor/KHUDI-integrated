import React, { Component } from "react";
import {View, SafeAreaView, StyleSheet, AsyncStorage} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {TapGestureHandler, State} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-paper';

// import Share from 'react-native-share';

// import files from '../assets/filesBase64';

import Axios from "../../axios";
import jwt_decode from "jwt-decode";

class profile extends Component {

  constructor(props) { 
    super(props); 
    this.state = {
      sellerMode: false,
      fname: "",
      lname: "",
      email: "",
      status: false,
     }     
    this.getApiData();
  }
  switch = (value) => {
    this.setState({ sellerMode: value });
    this.state.sellerMode ? this.props.navigation.navigate('Explore'): this.state.status ? this.props.navigation.navigate('becomeSeller'):  this.props.navigation.navigate('Profile2');
    this.setState({ sellerMode: false });

  }

  async getApiData() {
    console.log("In BUYER PROFILE!!!");

    // BUYER DATA
    const asyncToken = await AsyncStorage.getItem("jwtToken");
    console.log("Token: ", asyncToken);
    const decodedToken = jwt_decode(asyncToken);
    const fname = decodedToken.fname;
    const lname = decodedToken.lname;
    const email = decodedToken.email;
    this.setState({ ["fname"]: fname });
    this.setState({ ["lname"]: lname });
    this.setState({ ["email"]: email });

    
    console.log("User: ", decodedToken.id);
    const id = decodedToken.id;
    try{
      let buyerData = await Axios.get(`/api/seller/user/${id}`);
      console.log("Buyer Data: ", buyerData);
    }
    catch(err){
      if (err.response) {
        /* The request was made and the server responded with a status code that falls out of the range of 2xx*/
        console.log(err.response.status);
        this.setState({ status: true })
      } else {
        console.log("Error", err.message);
        
      }
    }
    console.log(this.sellerMode);
  }

render(){
  // let isSwitchOn=false; 
  // const onToggleSwitch = () => {(isSwitchOn=!isSwitchOn)};
  const {fname, lname, email} = this.state;

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{fname + " " + lname}</Title>
            {/* <Caption style={styles.caption}>@j_doe</Caption> */}
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        {/* <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Kolkata, India</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+91-900000009</Text>
        </View> */}
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>0 Rs</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>1</Title>
            <Caption>Orders</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        {/* <TouchableRipple onPress={myCustomShare}> */}
        <TouchableRipple onPress={() => this.props.navigation.navigate('Chat')}>
          <View style={styles.menuItem}>
            <Icon name="chat-outline" color="#38DFEB" size={25}/>
            <Text style={styles.menuItemText}>Join Conversation</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {this.props.navigation.navigate('viewOrder')}}>
          <View style={styles.menuItem}>
            <Icon name="package-variant" color="#38DFEB" size={25}/>
            <Text style={styles.menuItemText}>Orders</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => this.props.navigation.navigate('editProfile')}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#38DFEB" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <Text style={[styles.menuItemText, {textAlign:'center', color:'#1F2833'}]}>
          {this.state.sellerMode ? 'Switch to Buyer Mode' : 'Switch to Seller Mode'}
        </Text>
        <Switch
          style={{alignSelf:'center', }}
          onValueChange={this.switch}
          value={this.state.sellerMode}
        />
        <TapGestureHandler 
          onHandlerStateChange={() => this.props.navigation.navigate('Login')}
          >
          <View style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Logout</Text>
          </View>
        </TapGestureHandler>
      </View>
    </SafeAreaView>
  );
        }
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  button: {
    backgroundColor: '#1F2833',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width:2,height:2},
    shadowColor:'black',
    shadowOpacity:0.2,
    elevation:3
  },
});