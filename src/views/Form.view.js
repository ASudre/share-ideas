// @flow

import React from 'react';
import { Alert } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Form from '../components/Form';

import { type Idea } from '../types';

type NavigationParams = {
  id?: string | null,
  deleteIdea: () => any | null,
  title: string | null,
};

type Navigation = {
  goBack: () => void,
  setParams: NavigationParams => void,
  state: {
    params: NavigationParams,
  },
};

type Props = {
  idea: Idea | null,
  loadingIdea: boolean,
  getIdea: (ideaId: string) => void,
  createIdea: (idea: Idea) => void,
  updateIdea: (idea: Idea) => void,
  deleteIdea: (idea: {
    id: string,
  }) => void,
  deletingIdea: boolean,
  savingIdea: boolean,
  navigation: Navigation,
};

export default class FormView extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: Navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: params.title ? params.title : 'Idea',
      headerRight: params.deleteIdea ? (
        <HeaderButtons IconComponent={Ionicons} iconSize={23} >
          <HeaderButtons.Item title="delete" iconName="md-trash" onPress={() => params.deleteIdea()} />
        </HeaderButtons>
      ) : null,
    };
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.deletingIdea && !nextProps.deletingIdea) {
      this.props.navigation.goBack();
    }
    if (
      (!this.props.idea && nextProps.idea) ||
      (this.props.idea &&
        nextProps.idea &&
        (this.props.idea.id !== nextProps.idea.id ||
          this.props.idea.title !== nextProps.idea.title))
    ) {
      this.props.navigation.setParams({
        deleteIdea: () => {
          Alert.alert(
            'Delete idea',
            'Do you really want to delete ?',
            [
              { text: 'Cancel', onPress: null, style: 'cancel' },
              {
                text: 'OK',
                onPress: () => {
                  if (nextProps.idea) {
                    this.props.deleteIdea(nextProps.idea);
                  }
                },
              },
            ],
          );
        },
        title: nextProps.idea && nextProps.idea.title ? nextProps.idea.title : 'Idea',
      });
    }
  }

  render() {
    return (
      <Form
        idea={this.props.idea}
        loadingIdea={this.props.loadingIdea}
        getIdea={this.props.getIdea}
        createIdea={this.props.createIdea}
        updateIdea={this.props.updateIdea}
        savingIdea={this.props.savingIdea}
        navigation={this.props.navigation}
      />
    );
  }
}
