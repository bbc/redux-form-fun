import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reduxForm, reducer as formReducer } from 'redux-form'
import Quote from './Quote';
import Media from './Media';
import {reducer as counterReducer, Counter} from './Counter';

const reducers = { form: formReducer, counter: counterReducer };
const reducer = combineReducers(reducers);
const store = createStore(reducer);



class Optimo extends React.Component {
  render () {
    return (
        <form>
          <Quote/>
          <hr/>
          <Media/>
          <button type="submit" disabled={this.props.invalid}>Submit</button>
          <Counter/>
        </form>
    );
  }
}

const OptimoForm = reduxForm({ form: 'simple' })(Optimo)

ReactDOM.render(
  <Provider store={store}>
    <OptimoForm />
  </Provider>,
document.querySelector('#app'));

