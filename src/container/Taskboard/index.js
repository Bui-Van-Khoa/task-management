import { Box, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBox from '../../components/SearchBox';
import { STATUSES } from '../../constants';
import TaskForm from '../TaskForm/index';
import * as modalActions from './../../actions/modal';
import * as taskActions from './../../actions/task';
import TaskList from './../../components/TaskList/index';
import styles from './styles';

const listTask = [];

class Taskboard extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  }

  handleEditTask = (task) => {
    const { modalActionsCreator, taskActionCreators } = this.props;
    const { setTaskEditing } = taskActionCreators;
    setTaskEditing(task);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionsCreator;
    showModal();
    changeModalTitle('Updade task ');
    changeModalContent(<TaskForm></TaskForm>);
  };

  showModalDeleteTask = (task) => {
    const { modalActionsCreator, classes } = this.props;
    const {
      showModal,
      hideModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionsCreator;
    showModal();
    changeModalTitle('Delete task ');
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          You definitely want to delete{' '}
          <span className={classes.modalConfirmTextBold}>{task.title}</span>?
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal}>
              Cancel
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleDeleteTask(task)}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </div>,
    );
  };

  handleDeleteTask(task) {
    const { id } = task;
    const { taskActionCreators } = this.props;
    const { deleteTask } = taskActionCreators;
    deleteTask(id);
  }
  renderBoard() {
    const { listTask } = this.props;
    let xhml = null;
    xhml = (
      <Grid container spacing={2}>
        {STATUSES.map((status) => {
          const taskFiltered = listTask.filter(
            (task) => task.status === status.value,
          );
          return (
            <TaskList
              tasks={taskFiltered}
              status={status}
              key={status.value}
              onClickEdit={this.handleEditTask}
              onClickDelete={this.showModalDeleteTask}
            ></TaskList>
          );
        })}
      </Grid>
    );
    return xhml;
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  renderForm() {
    const { open } = this.state;
    let xhml = null;
    xhml = <TaskForm open={open} onClose={this.handleClose}></TaskForm>;
    return xhml;
  }

  openForm = () => {
    const { modalActionsCreator, taskActionCreators } = this.props;
    const { setTaskEditing } = taskActionCreators;
    setTaskEditing(null);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionsCreator;
    showModal();
    changeModalTitle('Add new task ');
    changeModalContent(<TaskForm></TaskForm>);
  };

  handleFilter = (e) => {
    const { value } = e.target;
    const { taskActionCreators } = this.props;
    const { filterTask } = taskActionCreators;
    filterTask(value);
  };

  renderSearchField() {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFilter}></SearchBox>;
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <AddIcon />
          Add new task
        </Button>

        {this.renderSearchField()}
        {this.renderBoard()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch),
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Taskboard),
);
