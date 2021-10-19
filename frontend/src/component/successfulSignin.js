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
                        style={{width: width, height: height/4, justifyContent:'center',resizeMode: 'contain'}}
                        source={require('./../../assets/gifs/congrats.gif')} />
                    </View>

                    <Text style={{color:'black', fontWeight:'bold', textAlign:'center',fontSize:35}}>
                        Login successful
                    </Text>
                    <Text style={{opacity:0.5,fontWeight:'100',color:'#1F2833', textAlign:'center',marginHorizontal: 50,marginVertical:20}}>
                        Start marketing your unique skills and began earning right now by becoming a seller</Text>

                    <TapGestureHandler onHandlerStateChange={() => this.props.navigation.navigate('becomeSeller')}>
                        <Animated.View style={styles.button}>
                        <Text  style={{fontSize:20,fontWeight:'bold', color:'white'}}>Take me there</Text>
                        </Animated.View>
                    </TapGestureHandler>

                    <Text onPress={() => this.props.navigation.navigate('Explore')} style={{textAlign:'center', color:'#1F2833',fontSize:20,marginVertical:5}}>
                        No Thanks
                    </Text>
                    
                </KeyboardAvoidingView>
            </View>
        )
        // return(
        //     <View style={{backgroundColor:"#1F2833",height:"100%", justifyContent:"center", flex:1,color:'white'}}>
                  
        //           <Animated.View style={{ ...StyleSheet.absoluteFill}}>
        //                 <Svg height={height} width={width} style={styles.icon}>
        //                     <Image 
        //                         href={require('./../../assets/icons/lock.png')}
        //                         height={height/10} width={width}
        //                     />
        //                 </Svg>
        //             </Animated.View>
        //             <Image source={require('./../../assets/icons/lock.png')} />
        //         <Text>
        //             Your accound has been created successfully
        //         </Text>

        //     </View>
        // );
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