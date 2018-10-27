import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {runTests} from '../actions/appActions';
import {
  getFailedTestCount,
  getPassedTestCount,
  getPassedTestPercentage,
  getTestCount,
  getTests,
  getTestsState,
} from '../selectors/appSelectors';

const wrapperStyle = {
  margin: 10,
};

class SummaryHeader extends Component {
  render() {
    return (
      <div style={wrapperStyle}>
        <Typography variant="h6">
          Tests status: {this.props.testsState}
        </Typography>
        <Typography variant="h6">
          Passed tests: {this.props.passedCount}/{this.props.testCount} ({this.props.passedPercentage}%)
        </Typography>
        <Typography variant="h6">
          Failed tests: {this.props.failedCount}/{this.props.testCount}
        </Typography>
        <Button variant="contained" color="primary" onClick={this.props.runTests}>
          Run all tests
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  failedCount: getFailedTestCount(state),
  passedCount: getPassedTestCount(state),
  passedPercentage: getPassedTestPercentage(state),
  testCount: getTestCount(state),
  tests: getTests(state),
  testsState: getTestsState(state),
});

const mapDispatchToProps = dispatch => ({
  runTests: () => dispatch(runTests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryHeader);
