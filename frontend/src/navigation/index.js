import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons'

//importing screens
import Login from '../screens/login';
import Forgot from '../screens/forgot';
import Signin from '../screens/signin';
import Profile from '../screens/profile';
import sellerProfile from '../screens/sellerProfile';
import Postview from '../screens/postView';
import Article from '../screens/dummy';
import getRequirements from '../screens/getRequirements';
import Chat from '../screens/chat';
import Explore from '../screens/explore';
import sellerForm from '../screens/sellerForm';
import editProfile from '../screens/editProfile';
import editSellerProfile from '../screens/editSellerProfile';
import profileSetting from '../screens/profileSetting';
import order from '../screens/order';
import createPost from '../screens/createPost';
import faceDetect from '../screens/faceDetect';
import profileView from '../screens/profileView';
import viewOrder from '../screens/viewOrder';

import successfulSignin from '../component/successfulSignin';
import becomeSeller from '../component/becomeSeller';
import loading from '../component/loading';
import addPost from '../component/addPost';




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


    function MyTabs() 
    {
        return (
          <Tab.Navigator>
            <Tab.Screen name="Explore" component={Explore} 
            options={{
                tabBarLabel: 'EXPLORE',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-search" color='#1F2833' size={24} />),
                }}
            />
            <Tab.Screen name="Profile" component={Profile} 
            options={{
                tabBarLabel: 'PROFILE',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-person" color='#1F2833' size={24} />),
                }}
            />
            <Tab.Screen name="Order" component={viewOrder} 
            options={{
                tabBarLabel: 'ORDER',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-cube" color='#1F2833' size={24} />),
                }}
            />
            <Tab.Screen name="Chat" component={Chat} 
            options={{
                tabBarLabel: 'CHAT',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-chatboxes" color='#1F2833' size={24} />),
                }}
            />
          </Tab.Navigator>
        );
      }
    function MyTabs2() 
    {
        return (
          <Tab.Navigator>
            <Tab.Screen name="Profile2" component={sellerProfile} 
            options={{
                tabBarLabel: 'PROFILE',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-person" color='#38DFEB' size={24} />),
                }}
            />
            <Tab.Screen name="createPost" component={createPost} 
            options={{
                tabBarLabel: 'POST',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-add-circle" color='#38DFEB' size={24} />),
                }}
            />
            <Tab.Screen name="Order" component={viewOrder} 
            options={{
                tabBarLabel: 'ORDER',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-cube" color='#38DFEB' size={24} />),
                }}
            />
            <Tab.Screen name="Chat2" component={Chat} 
            options={{
                tabBarLabel: 'CHAT',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-chatboxes" color='#38DFEB' size={24} />),
                }}
            />
          </Tab.Navigator>
        );
      }

class Navigation extends Component{

    render(){    
        return(
            //headreShown hides the header on individual screen on <Stack.Screen>
            // there's also a method to hide header on all screens on <Stack.Navigator>
            <NavigationContainer>
                <Stack.Navigator initialRooptions={{headerShown: false}}uteName="login">
                    <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
                    <Stack.Screen name="Forgot" component={Forgot} />
                    <Stack.Screen name="Signin" component={Signin} />
                    <Stack.Screen options={{headerShown: false}} name="successfulSignin" component={successfulSignin} />
                    <Stack.Screen options={{headerShown: false}} name="loading" component={loading} />
                    <Stack.Screen options={{headerShown: false}} name="becomeSeller" component={becomeSeller} />
                    <Stack.Screen options={{headerShown: false}} name="sellerProfile" component={sellerProfile} />
                    <Stack.Screen options={{headerShown: false}} name="Explore" component={MyTabs} />
                    <Stack.Screen options={{headerShown: false}} name="SellerMode" component={MyTabs2} />
                    <Stack.Screen options={{headerTitle:'KHUDI Seller'}} name="sellerForm" component={sellerForm} />
                    <Stack.Screen options={{headerShown: false}} name="postview" component={Postview} />
                    <Stack.Screen options={{headerTitle:'post'}} name="article" component={Article} />
                    <Stack.Screen options={{headerShown: false}} name="faceDetect" component={faceDetect} />
                    <Stack.Screen options={{headerShown: false}} name="chat" component={Chat} />
                    <Stack.Screen options={{headerShown: false}} name="profile" component={Profile} />
                    <Stack.Screen options={{headerShown: false}} name="editProfile" component={editProfile} />
                    <Stack.Screen options={{headerShown: false}} name="editSellerProfile" component={editSellerProfile} />
                    <Stack.Screen options={{headerShown: false}} name="profileSetting" component={profileSetting} />
                    <Stack.Screen options={{headerTitle:'Order Requirements'}} name="getRequirements" component={getRequirements} />
                    <Stack.Screen options={{headerShown: false}} name="order" component={order} />
                    <Stack.Screen options={{headerTitle:'New Post'}} name="addPost" component={addPost} />
                    <Stack.Screen options={{headerShown: false}} name="Profile2" component={MyTabs2} />
                    <Stack.Screen options={{headerShown: false}} name="profileView" component={profileView} />
                    <Stack.Screen options={{headerTitle:'New Post'}} name="viewOrder" component={viewOrder} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigation;
