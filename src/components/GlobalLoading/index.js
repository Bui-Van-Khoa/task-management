import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import styles from './styles';
import LoadingIcon from './../../assets/images/loading.gif';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as uiAction from './../../actions/ui';

class GlobalLoading extends Component {
  render() {
    const { classes, showLoading } = this.props;
    let xhml = null;
    if (showLoading) {
      xhml = (
        <div className={classes.globalLoading}>
          <img src={LoadingIcon} alt="loading" className={classes.icon}></img>
        </div>
      );
    }
    return xhml;
  }
}

const mapStateToProps = (state) => {
  return {
    showLoading: state.ui.showLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uiAction: bindActionCreators(uiAction, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(GlobalLoading);
