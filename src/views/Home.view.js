import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Button
} from 'react-native';
import ActionButton from 'react-native-action-button';

import { getIdeas } from '../firebase/firestore';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  constructor(props) {
    super(props);
    this.props.requestIdeas();
  }

  render() {
    const { navigate } = this.props.navigation;
    const ideas = Object.values(this.props.ideas);
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={() => this.props.requestIdeas()}
          refreshing={this.props.loading}
          data={ideas}
          keyExtractor={idea => idea.id}
          renderItem={({ item }) => (
            <View style={styles.ideaContainer}>
              <TouchableOpacity
                onPress={() => navigate('Form', { id: item.id })}
              >
                <View style={styles.descriptionContainer}>
                  <Text style={styles.ideaTitle}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => navigate('Form', { id: null })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#e8e8e8'
  },
  ideaTitle: {
    fontWeight: 'bold'
  },
  ideaContainer: {
    marginBottom: 8,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
        shadowOffset: {
          height: 1
        },
        shadowColor: 'black',
        shadowRadius: 1
      },
      android: {
        elevation: 2
      }
    })
  },
  descriptionContainer: {
    padding: 8
  }
});
