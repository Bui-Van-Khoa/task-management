import { Modal, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from './../../actions/modal';

class CommonModal extends Component {
  render() {
    const { classes, open, component, modalActionsCreator, title } = this.props;
    const { hideModal } = modalActionsCreator;
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>{title}</span>
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  open: state.modal.showModal,
  component: state.modal.component,
  title: state.modal.title,
});

const mapDispatchToProps = (dispatch) => ({
  modalActionsCreator: bindActionCreators(modalActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(CommonModal);
