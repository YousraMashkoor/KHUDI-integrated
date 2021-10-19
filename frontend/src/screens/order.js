import React,{Component} from 'react';
import { View, Text, Image, Dimensions, TextInput, Alert, Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated'
import {TapGestureHandler, State} from 'react-native-gesture-handler'
// import Svg,{Image} from 'react-native-svg'
const { width, height } = Dimensions.get('window');

class successfulSignin extends Component{
    render(){
        return(
            
            <View style={{backgroundColor:"#1F2833",height:"100%", justifyContent:"center", flex:1}}>
                <KeyboardAvoidingView behavior="padding">
                    <Text style={{color:'#38DFEB',textAlign:'center', fontSize:35, marginHorizontal:10, fontWeight:'bold'}}>Thank You for your Order:)</Text>
                    <Text style={{color:'white', marginHorizontal: 30, fontSize: 17, marginTop:12}}>The seller is in the process of reviewing your Request, to provide you best of their services. Untill then feel free to explore more:)</Text>
                    <Text style={{color:'white', marginHorizontal: 30, fontSize: 15, marginTop:10}}>With Love,</Text>
                    <Image
                        style={{width: width, justifyContent:'center',resizeMode: 'contain', marginTop:0}}
                        source={require('./../../assets/gifs/KHUDI.gif')} />
                    <Text onPress={()=>{this.props.navigation.navigate("Explore")}} style={{color:'#38DFEB', marginHorizontal: 30, fontSize: 20, textAlign:'center', marginTop:10}}>CONTINUE</Text>
                    
                    
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