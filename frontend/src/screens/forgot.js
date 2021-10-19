import React,{Component} from 'react';
import { View, Text, Dimensions, TextInput, Alert, Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated'
import Svg,{Image} from 'react-native-svg'
const { width, height } = Dimensions.get('window');

const VALID_EMAIL = "yousra@yousra.com";


class Forgot extends Component{

    handleForgot() {
        const { navigation } = this.props;
        const { email } = this.state;
        const errors = [];
    
        Keyboard.dismiss();
        this.setState({ loading: true });
    
        // check with backend API or with some static data
        if (email !== VALID_EMAIL) {
          errors.push('email');
        }
    
        this.setState({ errors, loading: false });
    
        if (!errors.length) {
          Alert.alert(
            'Password sent!',
            'Please check you email.',
            [
              {
                text: 'OK', onPress: () => {
                  navigation.navigate('Login')
                }
              }
            ],
            { cancelable: false }
          )
        } else {
          Alert.alert(
            'Error',
            'Please check you Email address.',
            [
              { text: 'Try again', }
            ],
            { cancelable: false }
          )
        }
      }

    constructor(){
        super()
        this.state = {
            email: VALID_EMAIL,
            errors: [],
            loading: false,
          }   
    }
    render(){
        return(
            
            <View style={{backgroundColor:"#1F2833",height:"100%", justifyContent:"center", flex:1}}>
                <KeyboardAvoidingView behavior="padding">
                    <Animated.View style={{ ...StyleSheet.absoluteFill}}>
                        <Svg height={height} width={width} style={styles.icon}>
                            <Image 
                                href={require('./../../assets/icons/lock.png')}
                                height={height/10} width={width}
                            />
                        </Svg>
                    </Animated.View>
                    <Text style={{color:'white', fontWeight:'bold', textAlign:'center',fontSize:20}}>
                        Forgot Password?
                    </Text>
                    <Text style={{opacity:0.5,fontWeight:'100',color:'white', textAlign:'center',marginHorizontal: 50,marginVertical:20}}>
                        We just need your registered email to send you password reset</Text>
                    <TextInput
                        placeholder="EMAIL"
                        style={styles.textInput}
                        defaultValue={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                        placeholderTextColor='black'
                    />
                    <Animated.View style={styles.button}>
                        <Text onPress={() => this.handleForgot()} style={{fontSize:20,fontWeight:'bold'}}>Change Password</Text>
                    </Animated.View>
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
        backgroundColor: 'white',
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
  

export default Forgot;

// https://kriss.io/react-native-plant-app-ui-7-forgot-password-screen/