import { Field, reduxForm, } from 'redux-form'
import React from 'react';
import { Provider, connect } from 'react-redux';
import get from 'lodash.get';

const mapDispatchToProps = (dispatch) => ({});
const mapStateToProps = (state) => ({
  state: state,
  pid: get(state, ['form', 'simple', 'values', 'pid'], 'Empty'),
  pidTouched: get(state, ['form', 'simple', 'fields', 'pid', 'touched'], false),
  pidError: get(state, ['form', 'simple', 'syncErrors', 'pid'], undefined),
});

const isPid = pid => (pid && !/^[A-Z]{2,4}$/i.test(pid)) ? 'NOTPID' : undefined;
const required = value => value ? undefined : 'REQUIRED'

class MediaPresentation extends React.Component {
  render() {
    const { pidTouched, pidError } = this.props;
    return (
      <div>
        <div>
          { (pidTouched && pidError === 'REQUIRED') ? <p>Pid is required</p> : undefined }
          { (pidTouched && pidError === 'NOTPID') ? <p>Invalid Pid</p> : undefined }
        </div>
        <span>PID</span>
      <Field name="pid" component="input" type="text" placeholder="e.g. p345d88g" validate={[isPid, required]}/>
    </div>
  )
  }
}

const MediaContainer = connect(mapStateToProps, mapDispatchToProps)(MediaPresentation)
export default MediaContainer;
