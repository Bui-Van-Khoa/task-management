import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import TaskItem from './../TaskItem/index';

class TaskList extends Component {
  render() {
    const { classes, tasks, status, onClickEdit, onClickDelete } = this.props;
    return (
      <Grid item md={4} xs={12} key={status.value}>
        <Box mt={2} mb={2} className={classes.text}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wrapperListTask}>
          {tasks.map((task) => {
            return (
              <TaskItem
                task={task}
                status={status}
                key={task.id}
                onClickEdit={() => onClickEdit(task)}
                onClickDelete={() => onClickDelete(task)}
              ></TaskItem>
            );
          })}
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(TaskList);
