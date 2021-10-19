import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    Animated,
    AsyncStorage,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Category from '../component/Explore/category'
import Card from '../component/Explore/card'
import Tag from '../component/Explore/tags'
const { height, width } = Dimensions.get('window')

import Axios from "../../axios";
import jwt_decode from "jwt-decode";
class Explore extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
          fname: "",
         }     
        this.getApiData();
      }


    UNSAFE_componentWillMount() {

        this.scrollY = new Animated.Value(0)

        this.startHeaderHeight = 80
        this.endHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
            this.endHeaderHeight = 70 + StatusBar.currentHeight
        }

        this.animatedHeaderHeight = this.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [this.startHeaderHeight, this.endHeaderHeight],
            extrapolate: 'clamp'
        })

        this.animatedOpacity = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        this.animatedTagTop = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [-30, 10],
            extrapolate: 'clamp'
        })
        this.animatedMarginTop = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [50, 30],
            extrapolate: 'clamp'
        })


    }

    goToBaking = () => {
        this.scroll.scrollTo({x: 0, y: height/2, animated: true});
     }
     goToTailoring = () => {
        this.scroll.scrollTo({x: 0, y: height+40, animated: true});
     }
     goToDevelopment = () => {
        this.scroll.scrollTo({x: 0, y: height*1.5+70, animated: true});
     }
     goToArt = () => {
        this.scroll.scrollTo({x: 0, y: height*2.5, animated: true});
     }

     async getApiData() {
        console.log("In EXPLORE!!!");
    
        // Explore
        const asyncToken = await AsyncStorage.getItem("jwtToken");
        console.log("Token: ", asyncToken);
        const decodedToken = jwt_decode(asyncToken);
        const fname = decodedToken.fname;
        this.setState({ ["fname"]: fname });
    
        
      }

    render() {
        const {fname} = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Animated.View style={{ height: this.animatedHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: 'white', marginHorizontal: 20,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            marginTop: Platform.OS == 'android' ? 30 : null
                        }}>
                            <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Try Tailoring"
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                            />
                        </View>
                        <Animated.View
                            style={{ flexDirection: 'row', marginHorizontal: 20, position: 'relative', top: this.animatedTagTop, opacity: this.animatedOpacity }}
                        >
                            <Tag name="Chocolate Cake" />
                            <Tag name="Shirwani" />

                        </Animated.View>
                    </Animated.View>
                    <ScrollView
                    
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                { nativeEvent: { contentOffset: { y: this.scrollY } }
                                }
                            ],
                            {useNativeDriver: false}
                        )}
                        ref={(c) => {this.scroll = c}}
                    >
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                        What can we help you find, {fname}?
                            </Text>

                            <View style={{ height: 130, marginTop: 20 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <TouchableOpacity onPress={this.goToBaking}>
                                        <Category imageUri={require('./../../assets/baking.jpg')}
                                            name="Baking"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.goToTailoring}>
                                    <Category imageUri={require('./../../assets/stitching.jpg')}
                                        name="Stitching"
                                    />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.goToDevelopment}>
                                    <Category imageUri={require('./../../assets/dev.jpg')}
                                        name="Development"
                                    />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.goToArt}>
                                    <Category imageUri={require('./../../assets/crafts.jpg')}
                                        name="Arts and Craft"
                                    />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    Introducing KHUDI
                                </Text>
                                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                                    A new selection of delicious homemade goods, tailoring, arts & crafts and development services

                                </Text>
                                <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('./../../assets/bg.jpg')}
                                    />

                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                Available Baked goods
                            </Text>
                            <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <Card 
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Cookie Dow Cake"
                                    type="CUSTOMIZED - Flavoured frostings - 2 layer"
                                    price={500}
                                    rating={4}
                                    img={require('./../../assets/baking.jpg')}
                                    category="baking"
                                    details="Will bild you delicious bakery cookie dow cake for you and your family, just let us know your details and the cake is served right at your door steps, so order now and join the fun"
                                />
                                <Card 
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Cheesy Garlic Bread"
                                    type="CUSTOMIZED - Cheese layers - Extra Fillings"
                                    price={500}
                                    rating={5}
                                    img={require('./../../assets/bread.jpg')}
                                    category="baking"
                                    details="Will bild you delicious cheesy garlic bun or balls for you and your family, just let us know your details and the cake is served right at your door steps, so order now and join the fun"
                                
                                />
                                <Card
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Red Velvet Cake"
                                    type="CUSTOMIZED - Vanella frostings - 3 layer"
                                    price={500}
                                    rating={4}
                                    img={require('./../../assets/red.jpg')}
                                    category="baking"
                                    details="Bake you red velvet cake, typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
                                <Card
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Veggie Pizza"
                                    type="CUSTOMIZED - Cheese layers - 4 Toppings - Crisp or Calm"
                                    price={500}
                                    rating={5}
                                    img={require('./../../assets/pizza.jpg')}
                                    category="baking"
                                    details="Delicious vegie pizza customized to your liking typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />

                            </View>

                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, marginTop:20 }}>
                                Tailoring Services
                            </Text>
                            <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <Card 
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Full Lehenga"
                                    type="CUSTOMIZED - long short"
                                    price={1000}
                                    rating={4}
                                    img={require('./../../assets/stitching.jpg')}
                                    category="stitching"
                                    details="Will stitch you customized embroidory lehenga for you and your family, just let us know your details and the cake is served right at your door steps, so order now and join the fun"
                                />
                                <Card 
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Embroidry"
                                    type="CUSTOMIZED - crochet"
                                    price={500}
                                    rating={5}
                                    img={require('./../../assets/stitching2.jpg')}
                                    category="stitching"
                                    details="i will crochet you a unique embroidory and your family, just let us know your details and the cake is served right at your door steps, so order now and join the fun"
                                
                                />
                                <Card
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Kurti Stitching"
                                    type="CUSTOMIZED - handmade"
                                    price={600}
                                    rating={4}
                                    img={require('./../../assets/stitching3.jpg')}
                                    category="stitchig"
                                    details="Stich your kirtis for woth latet digital printing aswell typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
                                <Card
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Men Shilwar Qameez"
                                    type="CUSTOMIZED -"
                                    price={500}
                                    rating={5}
                                    img={require('./../../assets/stitching4.jpg')}
                                    category="stitching"
                                    details="We will Stitch man clothing for you and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
                                


                            </View>


                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, marginTop:20 }}>
                                Design and Development
                            </Text>
                            <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <Card 
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="UI UX Design"
                                    type="CUSTOMIZED - Photoshop - canva"
                                    price={40}
                                    rating={4}
                                    img={require('./../../assets/dev.jpg')}
                                    category="development"
                                    details="UI UX designign the printing and industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                />
                                <Card 
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Wordpress Web Development"
                                    type="CUSTOMIZED - wordpress"
                                    price={500}
                                    rating={5}
                                    img={require('./../../assets/web.jpg')}
                                    category="development"
                                    details="Develpment of mern stack website typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
                                <Card
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Poster Design"
                                    type="CUSTOMIZED - photoshop"
                                    price={1000}
                                    rating={4}
                                    img={require('./../../assets/web2.jpg')}
                                    category="development"
                                    details="Desing you an interesting wordpress website and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
                                <Card
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="React Native Full Mobile"
                                    type="CUSTOMIZED - Cheese layers - 4 Toppings - Crisp or Calm"
                                    price={600}
                                    rating={5}
                                    img={require('./../../assets/web3.jpg')}
                                    category="baking"
                                    details="React native the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
                            </View>

                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, marginTop:20 }}>
                                Arts And Crafts
                            </Text>
                            <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <Card 
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Rock Painting"
                                    type="CUSTOMIZED - Flavoured frostings - 2 layer"
                                    price={500}
                                    rating={4}
                                    img={require('./../../assets/art.jpg')}
                                    category="baking"
                                    details="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                />
                                <Card 
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Abstrack Room Art"
                                    type="CUSTOMIZED - Cheese layers - Extra Fillings"
                                    price={500}
                                    rating={5}
                                    img={require('./../../assets/art2.jpg')}
                                    category="baking"
                                    details="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
                                <Card
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Glass Painting"
                                    type="CUSTOMIZED - Vanella frostings - 3 layer"
                                    price={500}
                                    rating={4}
                                    img={require('./../../assets/art3.jpg')}
                                    category="baking"
                                    details="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
                                <Card
                                    width={width}
                                    navigation={this.props.navigation}
                                    name="Caligraphy"
                                    type="CUSTOMIZED - Cheese layers - 4 Toppings - Crisp or Calm"
                                    price={500}
                                    rating={5}
                                    img={require('./../../assets/art4.jpg')}
                                    category="baking"
                                    details="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                                
                                />
                            </View>

                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});