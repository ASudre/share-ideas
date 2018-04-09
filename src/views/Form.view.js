import React from 'react';
import t from 'tcomb-form-native';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Platform } from 'react-native';

import { getIdeaById } from '../firebase/firestore';
import { Button } from '../components/Button';

const Email = t.refinement(t.String, function (email) {
  var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegExp.test(email.toLowerCase());
});

Email.getValidationErrorMessage = function (value, path, context) {
  return 'This email is invalid';
};

Form = t.form.Form;
Idea = t.struct({
  id: t.String,
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
    }
  },
};

export default class FormView extends React.Component {
  static navigationOptions = {
    title: 'Idea',
  };

  constructor(props) {
    super(props);
    const {navigation: {state: {params}}} = this.props
    this.state = {
      idea: {
        id: params.id,
      },
    }
  }

  save() {
    const ideaFormValues = this.refs.form.getValue();
    if (ideaFormValues) {
      this.setState({ idea: ideaFormValues });
      this.props.updateIdea({ ...ideaFormValues });
    }
  }

  componentDidMount() {
    const ideaId = this.state.idea.id;
    if(ideaId) {
      getIdeaById(ideaId).then((idea) => {
        this.setState({ idea });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref='form'
          type={Idea}
          options={options}
          value={this.state.idea}
        />
        <Button saving={this.props.saving} onPress={() => this.save()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
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
        elevation: 2
      }
    })
  },
});
