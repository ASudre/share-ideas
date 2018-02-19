import React from 'react';
import { TouchableHighlight, StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import t from 'tcomb-form-native';

import { getIdeaById, updateIdea } from '../firebase/firestore';

const Email = t.refinement(t.String, function (email) {
  var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegExp.test(email.toLowerCase());
});

Email.getValidationErrorMessage = function (value, path, context) {
  return 'This email is invalid';
};

Form = t.form.Form;
Idea = t.struct({
  email: Email,
  title: t.String,
  description: t.String,
  link: t.maybe(t.String),
});

const options = {
  fields: {
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

export class FormView extends React.Component {
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

  onPress() {
    const updatedIdea = this.refs.form.getValue();
    if (updatedIdea) {
      updateIdea(this.state.idea.id, { ...updatedIdea });
    }
  }

  componentDidMount() {
    getIdeaById(this.state.idea.id).then((idea) => {
      this.setState({
        idea: {
          id: this.state.idea.id,
          ...idea,
        },
      });
    });
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
        <TouchableHighlight style={styles.button} onPress={() => this.onPress()} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
