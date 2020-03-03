import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';

export default class Movie extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  async componentDidMount(){
    return await fetch('https://yts.mx/api/v2/list_movies.json?limit=50')
        .then ( (response) => response.json() )
        .then ( (responseJson) => {
          
          this.setState({
            isLoading: false,
            dataSource: responseJson.data.movies,
          })

        })

    .catch((error) => {
      console.log(error)
    });

  }

  render(){

    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }else{
      let movies = this.state.dataSource.map((val, key)=> {
        return <View key={key} style={styles.item}>
          <Text>{val.title}</Text>
        </View>
      });
      return (
        <ScrollView>
          <View style={styles.container}>
            {movies}
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});
