import React,{Component} from 'react';
import { View, Text, Image, Dimensions, TextInput, Alert, Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated'
import {TapGestureHandler, State} from 'react-native-gesture-handler'
// import Svg,{Image} from 'react-native-svg'
const { width, height } = Dimensions.get('window');

class successfulSignin extends Component{
    render(){
        return(
            
            <View style={{backgroundColor:"white",height:"100%", justifyContent:"center", flex:1}}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.container}>
                    <Image
                        style={{width: width, height: height, justifyContent:'center',resizeMode: 'contain'}}
                        source={require('./../../assets/gifs/xx.gif')} />
                    </View>
                    
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput:{
        color:'white',
        height:50,
        borderRadius:25,
        borderWidth:0.5,
        marginHorizontal:20,
        paddingLeft:10,
        marginVertical:5,
        borderColor:'white',
        opacity:0.5,
        alignItems:'center',
        justifyContent:'center',
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
        shadowOpacity:1,
        elevation:3
    },
    icon:{
        opacity: 0.8,
        marginVertical:-80,
        resizeMode: 'contain',
    }

});
  

export default successfulSignin;