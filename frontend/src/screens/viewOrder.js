import React,{Component} from 'react';
import { View, Text, Image, Dimensions, TextInput, Alert, Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated'
import {TapGestureHandler, State} from 'react-native-gesture-handler'
// import Svg,{Image} from 'react-native-svg'
const { width, height } = Dimensions.get('window');
import Card from '../component/Explore/longCard'

class successfulSignin extends Component{
    render(){
        return(
            
            <View style={{backgroundColor:"white",height:"100%", marginTop:50, flex:1, alignItems:'center'}}>
                <Text
              style={{
                color: "#1F2833",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 22,
                marginVertical: 10,
              }}
            >Your Orders</Text>
                <KeyboardAvoidingView behavior="padding">
                    <View>
                    <Card 
                                    width={width}
                                    name="Cheesy Garlic Bread"
                                    type="CUSTOMIZED - Cheese layers - Extra Fillings"
                                    price={500}
                                    rating={5}
                                    img={require('./../../assets/bread.jpg')}
                                    status2="Ongoing"
                                    status1="Ongoing"
                                    details="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
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