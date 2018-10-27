import {
  all,
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import AppActions, {
  changeTestsState,
  resetTests,
  updateTestExecutionTime,
  updateTestResult
} from '../actions/appActions';
import {
  State,
  TestStatus,
} from '../reducers/appReducer';
import {getTests} from '../selectors/appSelectors';

// Run a single test case.
// UpdateState argument indicates whether or not to update the
// run status of the whole suite before and after execution of
// this test case.
function* runTest(action, updateState = true) {
  if (updateState) {
    yield put(changeTestsState(State.RUNNING));
  }
  const {testIndex} = action;
  const tests = yield select(getTests);
  const test = tests.get(testIndex);
  yield put(updateTestResult(testIndex, TestStatus.RUNNING));
  const startMillis = new Date().getTime();
  const result = yield call(test.get('run'));
  const endMillis = new Date().getTime();
  const executionTime = endMillis - startMillis;
  yield put(updateTestResult(
      testIndex, result ? TestStatus.PASSED : TestStatus.FAILED));
  yield put(updateTestExecutionTime(testIndex, executionTime));
  if (updateState) {
    yield put(changeTestsState(State.RUN));
  }
}

// Run all test cases.
function* runTests() {
  yield put(changeTestsState(State.RUNNING));
  yield put(resetTests());
  const tests = yield select(getTests);
  for (var i = 0; i < tests.size; i++) {
    yield call(runTest, {testIndex: i}, false);
  }
  yield put(changeTestsState(State.RUN));
}

export default function* rootSaga() {
  yield all([
    takeEvery(AppActions.RUN_TEST, runTest),
    takeEvery(AppActions.RUN_TESTS, runTests),
  ]);
}
