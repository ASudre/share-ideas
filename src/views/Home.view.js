import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Platform } from 'react-native';
import ActionButton from 'react-native-action-button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    marginBottom: 8,
  },
  ideaTitle: {
    fontWeight: 'bold',
  },
  noIdeaContainer: {
    marginTop: 8,
    marginRight: 8,
    marginLeft: 8,
    textAlign: 'center',
  },
  ideaContainer: {
    marginTop: 8,
    marginRight: 8,
    marginLeft: 8,
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
        elevation: 2,
      },
    }),
  },
  descriptionContainer: {
    padding: 8,
  },
});

export default class HomeView extends React.Component {
  static navigationOptions = {
    title: 'Home',
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
          refreshing={this.props.loadingIdeas}
          data={ideas}
          keyExtractor={idea => idea.id}
          renderItem={({ item }) => (
            <View style={styles.ideaContainer}>
              <TouchableOpacity onPress={() => navigate('Form', { id: item.id })}>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.ideaTitle}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.noIdeaContainer}>Start and create your ideas !!</Text>
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

HomeView.propTypes = {
  requestIdeas: PropTypes.func.isRequired,
  ideas: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
  loadingIdeas: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
