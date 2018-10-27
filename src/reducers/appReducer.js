import {fromJS} from 'immutable';

import {testsDescription} from '../config';
import ActionTypes from '../actions/appActions';

// State of the whole test suite.
export const State = Object.freeze({
  NOT_RUN: 1,
  RUNNING: 2,
  RUN: 3,
});

export const TestStatus = Object.freeze({
  NOT_RUN: 1,
  RUNNING: 2,
  PASSED: 3,
  FAILED: 4,
});

const defaultState = fromJS({
  testsState: State.NOT_RUN, 
  tests: testsDescription,
});

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_TESTS_STATE:
      return state.set('testsState', action.newState);
    case ActionTypes.RESET_TESTS:
      const newTests = [];
      // Alternatively use Immutable.List.merge.
      for (const test of state.get('tests', [])) {
        newTests.push(test.toJS());
        newTests[newTests.length - 1].status = TestStatus.NOT_RUN;
        delete newTests[newTests.length - 1].executionTime;
      }
      return state.set('tests', fromJS(newTests));
    case ActionTypes.UPDATE_TEST_EXECUTION_TIME:
      return state.setIn(['tests', action.testIndex, 'executionTime'], action.time);
    case ActionTypes.UPDATE_TEST_RESULT:
      return state.setIn(['tests', action.testIndex, 'status'], action.result);
    default:
      return state;
  }
};

export default appReducer;
