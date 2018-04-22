// @flow

import React from 'react';
import t from 'tcomb-form-native';
import { ActivityIndicator, StyleSheet, View, Platform } from 'react-native';
import { Toast } from 'native-base';

import Button from '../../components/Button';

import { type Idea } from '../../types';

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
  savingIdea: boolean,
  navigation: Navigation,
};

type State = {
  ideaId: string | null,
  idea: Idea | null,
};

export default class FormView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { navigation: { state: { params } } } = this.props;
    const ideaId = params.id;
    this.state = {
      ideaId: ideaId || null,
      idea: null,
    };
  }

  componentDidMount() {
    if (this.state.ideaId) {
      this.props.getIdea(this.state.ideaId);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.loadingIdea && !nextProps.loadingIdea) {
      if (nextProps.idea) {
        this.setState({ idea: nextProps.idea, ideaId: nextProps.idea.id });
      }
    }
    if (this.props.savingIdea && !nextProps.savingIdea) {
      Toast.show({
        text: 'Idea saved',
        duration: 3000,
      });
      if (nextProps.idea) {
        this.setState({ idea: nextProps.idea, ideaId: nextProps.idea.id });
      }
    }
  }

  form: Form = null;
  save(): void {
    const ideaFormValues = this.form.getValue();
    if (ideaFormValues) {
      // spread because ideaFormValues is a Struct
      const idea = { ...ideaFormValues };
      if (idea.id) {
        this.props.updateIdea(idea);
      } else {
        this.props.createIdea(idea);
      }
      this.setState({ idea: ideaFormValues });
    }
  }

  render() {
    const { loadingIdea } = this.props;
    return (
      <View>
        {!loadingIdea ? (
          <View style={styles.container}>
            <Form
              ref={(form) => {
                this.form = form;
              }}
              type={IdeaStruct}
              options={options}
              value={this.state.idea}
            />
            <Button
              savingIdea={this.props.savingIdea}
              text={this.state.ideaId ? 'Update' : 'Save'}
              onPress={() => {
                this.save();
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
