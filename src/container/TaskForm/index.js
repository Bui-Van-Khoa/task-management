import { Box, Grid, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../components/FormHelper/Select/index';
import * as modalActions from './../../actions/modal';
import * as taskActions from './../../actions/task';
import renderTextField from './../../components/FormHelper/TextFiled/index';
import styles from './styles';
import validate from './validate';

class TaskForm extends Component {
  handleSubmitForm = (data) => {
    const { taskActionsCreator, taskEditing } = this.props;
    const { addTask, updateTask } = taskActionsCreator;
    const { title, description, status } = data;
    if (taskEditing && taskEditing.id) {
      updateTask(title, description, status);
    } else {
      addTask(title, description);
    }
  };

  renderStatusSelection() {
    let xhtml = null;
    const { taskEditing, classes } = this.props;
    if (taskEditing && taskEditing.id) {
      xhtml = (
        <Field
          id="status"
          label="Status"
          className={classes.select}
          name="status"
          component={renderSelectField}
        >
          <MenuItem value={0}>Ready</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Completed</MenuItem>
        </Field>
      );
    }
    return xhtml;
  }

  render() {
    const { classes, modalActionsCreator, handleSubmit } = this.props;
    const { hideModal } = modalActionsCreator;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              id="title"
              label="Title"
              className={classes.textField}
              margin="normal"
              name="title"
              component={renderTextField}
            ></Field>
          </Grid>
          <Grid item md={12}>
            <Field
              id="description"
              label="Description"
              multiple
              rowsMax="4"
              className={classes.textField}
              margin="normal"
              name="description"
              component={renderTextField}
            ></Field>
          </Grid>
          {this.renderStatusSelection()}
          <Grid item md={12}>
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Box ml={1}>
                <Button variant="contained" onClick={hideModal}>
                  Cancel
                </Button>
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    taskEditing: state.task.taskEditing,
    initialValues: {
      title: state.task.taskEditing ? state.task.taskEditing.title : null,
      description: state.task.taskEditing
        ? state.task.taskEditing.description
        : null,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    taskActionsCreator: bindActionCreators(taskActions, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_MANAGEMENT';

const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm,
)(TaskForm);
