import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Linking, ScrollView } from 'react-native';
import { Header, Button, ThemeProvider } from "react-native-elements";
import axios from "axios";

class PicShow extends React.Component{
  render(){
    let pic = {
      uri: this.props.url
    };
    
    return(
      <View style={styles.image}>
        <Text style={{fontSize: 30, textAlign: 'center', margin: 20}} onPress={() => Linking.openURL(this.props.url)}>{this.props.name}</Text>
        <Image source={pic} style={{width: 200, height: 200, resizeMode: 'contain'}} onPress={() => Linking.openURL(this.props.url)} />
      </View>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: 'フシギダネ', url: 'https://www.pokemon.jp/zukan/images/l/ff08ec6198db300abc91e69605469427.png', number: 0, animating: false};
  }


  render() {

    randomGetMonster = () =>{
      this.setState({animating: true});
      axios.get("https://poke-scrape-api.herokuapp.com/scrape").then(response => {
        this.setState({ name: response.data.data.name, url: response.data.data.url, animating: false});
      });
    }

    return (
      <View style={styles.container}>

        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          森島はるかせんぱい❤
        </Text>
        
        <ActivityIndicator
           animating = {this.state.animating}
           color = '#0000aa'
           size = "large"
           style = {styles.activityIndicator}/>
        
        <PicShow style={styles.image} name={this.state.name} url={this.state.url}/>
        <View style={{margin:20}}>
          <Button
          style={styles.button}
          title='じゃーん！！'
          onPress={randomGetMonster}
        />
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
    margin: 24,
  },

  image: {
    flex: 2,
    margin: 24,
    alignItems: 'center'
  }
});







export default App;