const AppActions = Object.freeze({
  CHANGE_TESTS_STATE: 'CHANGE_TEST_STATE',
  RESET_TESTS: 'RESET_TESTS',
  RUN_TEST: 'RUN_TEST',
  RUN_TESTS: 'RUN_TESTS',
  UPDATE_TEST_EXECUTION_TIME: 'UPDATE_TEST_EXECUTION_TIME',
  UPDATE_TEST_RESULT: 'UPDATE_TEST_RESULT',
});

export const changeTestsState = newState => ({
  type: AppActions.CHANGE_TESTS_STATE,
  newState
});

export const runTest = (testIndex) => ({
  type: AppActions.RUN_TEST,
  testIndex,
});

export const resetTests = () => ({
  type: AppActions.RESET_TESTS,
});

export const runTests = () => ({
  type: AppActions.RUN_TESTS,
});

export const updateTestExecutionTime = (testIndex, time) => ({
  type: AppActions.UPDATE_TEST_EXECUTION_TIME,
  testIndex,
  time,
});

export const updateTestResult = (testIndex, result) => ({
  type: AppActions.UPDATE_TEST_RESULT,
  testIndex,
  result,
});

export default AppActions;
