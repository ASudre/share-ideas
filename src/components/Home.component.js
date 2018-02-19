import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList, Platform, Button } from 'react-native';

import { getIdeas } from '../firebase/firestore';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
    }
  }

  componentDidMount() {
    getIdeas().then((ideas) => {this.setState({ideas})});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.ideas}
          keyExtractor={(idea) => idea.id}
          renderItem={({item}) => (
            <View style={styles.ideaContainer}>
              <TouchableHighlight onPress={() => navigate('Form', { id: item.id })}>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.idea}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </View>
              </TouchableHighlight>
            </View>
            )}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 8,
      justifyContent: 'center',
      backgroundColor: '#e8e8e8',
    },
    idea: {
      fontWeight: 'bold',
    },
    ideaContainer: {
      marginBottom: 8,
      marginRight: 8,
      marginLeft: 8,
      backgroundColor: '#FFF',
      ...Platform.select({
        ios: {
          shadowOpacity: 0.1,
          shadowOffset: {
            height: 1,
          },
          shadowColor: 'black',
          shadowRadius: 1,
        },
        android: {
          elevation: 2
        }
      })
    },
    descriptionContainer: {
      padding: 8,
    },
  });
