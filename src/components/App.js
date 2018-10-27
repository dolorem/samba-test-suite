import React, { Component } from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';
import TestsTable from './TestsTable';
import SummaryHeader from './SummaryHeader';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <SummaryHeader />
        <TestsTable /> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
