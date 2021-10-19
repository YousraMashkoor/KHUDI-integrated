import React,{Component} from 'react';
import { View, Text, Image, Dimensions, TextInput, Alert, Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated'
import {TapGestureHandler, State} from 'react-native-gesture-handler'
// import Svg,{Image} from 'react-native-svg'
const { width, height } = Dimensions.get('window');

class dummyDisplay extends Component{
    render(){
        return(
            <View>

                    <Text onPress={() => this.props.navigation.navigate('loading')} style={{textAlign:'center', color:'#1F2833',fontSize:20,marginVertical:5}}>
                        successfull login
                    </Text>
               </View> 
        )

    }
}


export default dummyDisplay;