// @flow

import React from 'react';
import t from 'tcomb-form-native';
import { ActivityIndicator, StyleSheet, View, Platform, Alert } from 'react-native';
import { Button as NativeButton, Icon, Toast } from 'native-base';

import { getIdeaById } from '../firebase/firestore';
import Button from '../components/Button';

import { type Idea } from '../types';

const Email = t.refinement(t.String, (email) => {
  // eslint-disable-next-line
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegExp.test(email.toLowerCase());
});

Email.getValidationErrorMessage = function () {
  return 'This email is invalid';
};

const { Form } = t.form;
const IdeaStruct = t.struct({
  id: t.maybe(t.String),
  email: Email,
  title: t.String,
  description: t.String,
  link: t.maybe(t.String),
});

const options = {
  fields: {
    id: {
      hidden: true,
    },
    email: {
      error: 'Please provide a valid email',
    },
    description: {
      multiline: true,
      numberOfLines: 5,
      autoGrow: true,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 8,
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
});

type NavigationParams = {
  id?: string | null,
  deleteIdea: () => any | null,
  title: string | null,
}

type Navigation = {
  goBack: () => void,
  setParams: NavigationParams => void,
  state: {
    params: NavigationParams,
  },
}

type Props = {
  createIdea: (idea: Idea) => void,
  updateIdea: (idea: Idea) => void,
  deleteIdea: (idea: {
    id: string,
  }) => void,
  deletingIdea: boolean,
  savingIdea: boolean,
  navigation: Navigation,
};

type State = {
  loaded: boolean,
  idea: {
    id: string | null,
  },
};

export default class FormView extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: Navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: params.title ? params.title : 'Idea',
      headerRight: params.deleteIdea ? (
        <NativeButton transparent onPress={() => params.deleteIdea()}>
          <Icon name="md-trash" />
        </NativeButton>
      ) : null,
    };
  };

  constructor(props: Props) {
    super(props);
    const { navigation: { state: { params } } } = this.props;
    this.state = {
      loaded: !params.id,
      idea: {
        id: params.id ? params.id : null,
      },
    };
  }

  componentDidMount() {
    const ideaId = this.state.idea.id;
    if (ideaId) {
      getIdeaById(ideaId).then((idea) => {
        this.setState({ idea, loaded: true }, () => {
          this.props.navigation.setParams({
            deleteIdea: () => {
              Alert.alert(
                'Delete idea',
                'Do you really want to delete ?',
                [
                  { text: 'Cancel', onPress: null, style: 'cancel' },
                  { text: 'OK', onPress: () => this.props.deleteIdea(idea) },
                ],
                { cancelable: true },
              );
            },
            title: idea.title,
          });
        });
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { goBack } = this.props.navigation;
    if (this.props.savingIdea && !nextProps.savingIdea) {
      Toast.show({
        text: 'Idea saved',
        duration: 3000,
      });
    }
    if (!this.state.idea.id || (this.props.deletingIdea && !nextProps.deletingIdea)) {
      goBack();
    }
  }

  form: Form = null;
  update(): void {
    const ideaFormValues = this.form.getValue();
    if (ideaFormValues) {
      this.setState({ idea: ideaFormValues });
      this.props.updateIdea({ ...ideaFormValues });
    }
  }

  create(): void {
    const ideaFormValues = this.form.getValue();
    if (ideaFormValues) {
      this.setState({ idea: ideaFormValues });
      this.props.createIdea({ ...ideaFormValues });
    }
  }

  render() {
    const { idea, loaded } = this.state;
    return (
      <View>
        {loaded ? (
          <View style={styles.container}>
            <Form
              ref={(form) => {
                this.form = form;
              }}
              type={IdeaStruct}
              options={options}
              value={idea}
            />
            <Button
              savingIdea={this.props.savingIdea}
              onPress={() => {
                if (idea.id) {
                  this.update();
                } else {
                  this.create();
                }
              }}
            />
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            style={{
              marginTop: 20,
            }}
          />
        )}
      </View>
    );
  }
}
