import React from 'react';
import t from 'tcomb-form-native';

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

export class IdeaForm extends React.Component {
  render() {
    return (
      <Form
        ref='form'
        type={Idea}
        options={options}
        value={this.props.idea}
      />
    );
  }
}
