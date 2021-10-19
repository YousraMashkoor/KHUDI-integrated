import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';

class requirements extends Component {

  constructor(props) {
    
    super(props);
     this.array=[]

    // this.array = [{
    //   query: 'Enter your name?'
    // },
    // {
    //   query: 'Your hobby?'
    // },
    // ],

      this.state = {
        arrayHolder: [],
        textInput_Holder: ''
      }
  }
  componentDidMount() {
    this.setState({ arrayHolder: [...this.array] })
  }
  joinData = () => {
    this.array.push({query : this.state.textInput_Holder});
    this.setState({ arrayHolder: [...this.array] })
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetItem(item) {
    Alert.alert(item);
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text
              style={{
                color: "#1F2833",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 22,
                marginVertical: 10,
              }}
            >
              Ask Something from Customer?
            </Text>
        <FlatList
          data={this.state.arrayHolder}
          width='100%'
          extraData={this.state.arrayHolder}
          keyExtractor={(index) => {index.query.toString(); }}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => 
          <View>
            <Text>{item.query}</Text>
            <TextInput
                  style={styles.textInput}
                  placeholder="Your answer here"
                />
          </View>}
        />
        <TextInput
          placeholder="Your Question?"
          onChangeText={data => this.setState({ textInput_Holder: data })}
          style={styles.textInput}
          
        />
        <TouchableOpacity onPress={this.joinData} activeOpacity={0.7} style={styles.fab} >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity> 
      </View>

    );
  }
}
export default requirements;
const styles = StyleSheet.create({

  MainContainer: {
    marginVertical:20,
    marginHorizontal:20,
    justifyContent: 'center',
    flex: 1,
    margin: 2

  },

  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    paddingLeft: 10,
    marginVertical: 10,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: '90%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 0,
    backgroundColor: '#38DFEB',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 40,
    color: 'white'
  }

});