import { Field, reduxForm, } from 'redux-form'
import React from 'react';
import { Provider, connect } from 'react-redux';
import get from 'lodash.get';

const mapDispatchToProps = (dispatch) => ({});
const mapStateToProps = (state) => ({
  state: state,
  nameValue: get(state, ['form', 'simple', 'values', 'name'], 'Empty'),
  nameTouched: get(state, ['form', 'simple', 'fields', 'name', 'touched'], false),
  nameError: get(state, ['form', 'simple', 'syncErrors', 'name'], undefined),
  emailTouched: get(state, ['form', 'simple', 'fields', 'email', 'touched'], false),
  emailError: get(state, ['form', 'simple', 'syncErrors', 'email'], undefined)
});

const maxLength15 = value => (value && value.length > 15) ? 'TOOLONG' : undefined;
const isEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'INVALID-EMAIL' : undefined;
const required = value => value ? undefined : 'REQUIRED'

class QuotePresentation extends React.Component {
  render() {
    const { nameError, nameTouched, emailError, emailTouched } = this.props;
    return (
      <div>
        <div>
          { ( nameTouched && nameError === 'REQUIRED') ? <p>Name is required</p> : undefined }
          { ( nameTouched && nameError === 'TOOLONG') ? <p>Name is too long!</p> : undefined }
          { ( emailTouched && emailError === 'INVALID-EMAIL') ? <p>Email address is invalid</p> : undefined }
          { ( emailTouched && emailError === 'REQUIRED') ? <p>Email is required</p> : undefined }
        </div>
        <span>name</span>
        <Field name="name" component="input" type="text" placeholder="Name" validate={[maxLength15, required]}/>
        <span>email</span>
      <Field name="email" component="input" type="text" placeholder="Email" validate={[isEmail, required]}/>
    </div>
  )
  }
}

const QuoteContainer = connect(mapStateToProps, mapDispatchToProps)(QuotePresentation)
export default QuoteContainer;
