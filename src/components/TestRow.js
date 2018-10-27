import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {runTest} from '../actions/appActions';
import {
  getTestDescription,
  getTestExecutionTime,
  getTestFailed,
  getTestPassed,
  getTestStatusString,
} from '../selectors/appSelectors';

class TestRow extends Component {
  render() {
    // The following styling should be done via themes instead.
    let background = '';
    if (this.props.passed) {
      background = 'rgba(162, 207, 110, 0.5)';
    }
    if (this.props.failed) {
      background = 'rgba(255, 23, 68, 0.5)';
    }
    const CustomTableRow = withStyles(theme => ({
      root: {
        background,
      },
    }))(TableRow);

    return (
      <CustomTableRow style={{
        root: {
          background: 'yellow'
        }
      }}>
        <TableCell>
          {this.props.description}
        </TableCell>
        <TableCell>
          {this.props.status} 
        </TableCell>
        <TableCell>
          {this.props.executionTime}
        </TableCell>
        <TableCell>
          <Button variant="contained" color="primary" onClick={this.props.runTest}>
            run
        </Button>
        </TableCell>
      </CustomTableRow>
    );
  }
}

const mapStateToProps = (state, props) => ({
  description: getTestDescription(props.test),
  executionTime: getTestExecutionTime(props.test),
  failed: getTestFailed(props.test),
  passed: getTestPassed(props.test),
  status: getTestStatusString(props.test),
});

const mapDispatchToProps = (dispatch, props) => ({
  runTest: () => dispatch(runTest(props.testIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestRow);
