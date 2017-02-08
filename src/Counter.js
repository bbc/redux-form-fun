import { Field, reduxForm, } from 'redux-form'
import React from 'react';
import { Provider, connect } from 'react-redux';
import get from 'lodash.get';

const initialState = {count: 0};

function counter(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE':
      return Object.assign({}, state, {
        count: state.count+1
      })
    case 'DECREASE':
      return Object.assign({}, state, {
        count: state.count-1
      })
    default:
      return state
  }
}


const increase = { type: 'INCREASE' };
const decrease = { type: 'DECREASE' };

const mapDispatchToProps = (dispatch) => ({
  increment: () => {
    dispatch(increase);
  },
  decrement: () => {
    dispatch(decrease);
  }
});
const mapStateToProps = (state) => ({
  state: state,
  count: get(state, ['counter', 'count'], undefined),
  counterError: get(state, ['form', 'simple', 'syncErrors', 'counter'], undefined)
});

const isLessThan0 = (value) => value < 0 ? 'BELOW0' : undefined ;

class Counter extends React.Component {
  render() {
    return (
      <div>
        <hr/>
        { (this.props.counterError === 'BELOW0') ? <p>Value can't be less than 0'</p> : undefined }
        <br/>
        <span>counter</span>
        <button type='button' onClick={this.props.increment}>+</button>
        <button type='button' onClick={this.props.decrement}>-</button>
        <br/>
        <span>The current value is {this.props.count}.</span>
        <hr/>
        <span>{JSON.stringify(this.props.state)}</span>
      </div>
  )
  }
}
class CounterWithValidation  extends React.Component {
  render() {
    return (
      <Field name="counter" props={this.props} component={Counter} validate={[isLessThan0]} value={this.props.count}/>
  )
  }
}

const CounterWithValidationAndRedux = connect(mapStateToProps, mapDispatchToProps)(CounterWithValidation)
export default CounterWithValidationAndRedux;
export {counter as reducer, CounterWithValidationAndRedux as Counter};
