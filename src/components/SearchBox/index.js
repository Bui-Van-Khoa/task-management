import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import styles from './styles';
import TextField from '@material-ui/core/TextField';

class SearchBox extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          autoComplete="off"
          className={classes.textField}
          onChange={handleChange}
          margin="normal"
          placeholder="Enter keywords"
        ></TextField>
      </form>
    );
  }
}

export default withStyles(styles)(SearchBox);
