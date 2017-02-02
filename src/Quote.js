import { Field, reduxForm, } from 'redux-form'
import React from 'react';
import { Provider, connect } from 'react-redux';
import get from 'lodash.get';

const mapDispatchToProps = (dispatch) => ({});
const mapStateToProps = (state) => ({
  state: state,
  xvalue: get(state, ['form', 'simple', 'values', 'X'], 'Empty'),
  xTouched: get(state, ['form', 'simple', 'fields', 'X', 'touched'], false),
  xerror: get(state, ['form', 'simple', 'syncErrors', 'X'], undefined),
  yemailTouched: get(state, ['form', 'simple', 'fields', 'Y', 'touched'], false),
  yemailError: get(state, ['form', 'simple', 'syncErrors', 'Y'], undefined)
});

const maxLength15 = value => (value && value.length > 15) ? 'TOOLONG' : undefined;
const isEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'INVALID-EMAIL' : undefined;
const required = value => value ? undefined : 'REQUIRED'

class QuotePresentation extends React.Component {
  render() {
    const { xerror, xTouched, yemailError, yemailTouched } = this.props;
    return (
      <div>
        <div>
          { ( xTouched && xerror === 'REQUIRED') ? <p>X is required</p> : undefined }
          { ( xTouched && xerror === 'TOOLONG') ? <p>X is Tooo long!</p> : undefined }
          { ( yemailTouched && yemailError === 'INVALID-EMAIL') ? <p>Email address is invalid</p> : undefined }
          { ( yemailTouched && yemailError === 'REQUIRED') ? <p>Email is required</p> : undefined }
        </div>
        <Field name="X" component="input" type="text" placeholder="X" validate={[maxLength15, required]}/>
      <Field name="Y" component="input" type="text" placeholder="Y" validate={[isEmail, required]}/>
    </div>
  )
  }
}

const QuoteContainer = connect(mapStateToProps, mapDispatchToProps)(QuotePresentation)
export default QuoteContainer;
