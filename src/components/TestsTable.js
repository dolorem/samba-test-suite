import React, {Component} from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {getTests} from '../selectors/appSelectors';
import TestRow from './TestRow';

class TestsTable extends Component {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Execution time</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.tests.map((test, i) => {
            return (
              <TestRow key={i} test={test} testIndex={i} />
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  tests: getTests(state),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TestsTable);
