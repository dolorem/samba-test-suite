import {fromJS} from 'immutable';

import {
  State,
  TestStatus,
} from '../reducers/appReducer';

// Alternatively use reselect or re-reselect for better performance.

export const getTestsState = state => {
  switch (state.get('testsState')) {
    case State.NOT_RUN:
      return 'tests not run';
    case State.RUNNING:
      return 'running';
    case State.RUN:
      return 'run';
    default:
      return 'unknown';
  }
};

export const getFailedTestCount = state => {
  return getTests(state).filter(test => test.get('status') === TestStatus.FAILED).size;
};

export const getPassedTestCount = state => {
  return getTests(state).filter(test => test.get('status') === TestStatus.PASSED).size;
};

export const getPassedTestPercentage = state => {
  return Math.round(getPassedTestCount(state) / getTestCount(state) * 100);
};

export const getTestDescription = test => {
  return test.get('description', '');
};

export const getTestExecutionTime = test => {
  const time = test.get('executionTime');
  if (time === undefined) {
    return 'unknown';
  }
  return time + 'ms';
};

export const getTestFailed = test => {
  return test.get('status') === TestStatus.FAILED;
};

export const getTestPassed =  test => {
  return test.get('status') === TestStatus.PASSED;
};

export const getTestStatusString = test => {
  switch (test.get('status')) {
    case TestStatus.RUNNING:
      return 'running';
    case TestStatus.PASSED:
      return 'passed';
    case TestStatus.FAILED:
      return 'failed';
    default:
      return 'not run';
  }
};

export const getTests = state => {
  return state.get('tests', fromJS([]));
};

export const getTestCount = state => {
  return getTests(state).size;
};
