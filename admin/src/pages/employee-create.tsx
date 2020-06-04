import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Layout } from '../components/Layout';
import { Employee } from '../models/employee';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from '@material-ui/core';
import { ROUTES } from '../routes';
import { createEmployee } from '../utils/api/create-employee';

const styles = (theme: Theme) => ({
  wrapper: {
    margin: '0 auto',
    width: '30%'
  },
  paper: {
    padding: theme.spacing(3)
  }
});

class EmployeeNewPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      employee: {
        fullName: '',
        position: '',
        id: undefined,
        gender: true
      },
      showSnackBar: false
    };
  }

  public render() {
    const { classes } = this.props;
    const { employee, showSnackBar } = this.state;

    const gender = employee.gender ? 'male' : 'female';

    return (
      <Layout>
        <div className={classes.wrapper}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="back to list of employee" href={ROUTES.employee.list}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" id="tableTitle" component="div">
              Employee Information
            </Typography>
          </Toolbar>

          <Paper className={classes.paper}>
            <FormControl fullWidth margin="normal">
              <FormLabel component="legend">Name</FormLabel>
              <OutlinedInput
                fullWidth
                required
                id="employee-name"
                value={employee.fullName}
                onChange={this.handleChangeTextField('fullName')}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel component="legend">Position</FormLabel>
              <OutlinedInput
                fullWidth
                required
                id="employee-position"
                value={employee.position}
                onChange={this.handleChangeTextField('position')}
              />
            </FormControl>

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup value={gender} onChange={this.handleChangeRadio} aria-label="gender" name="gender">
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Button onClick={this.handleSubmit} size="large" color="primary" variant="contained">
                Create
              </Button>
            </FormControl>
          </Paper>
        </div>

        <Snackbar
          open={showSnackBar}
          onClose={this.handleCloseNotification}
          autoHideDuration={2000}
          message="Add successfully"
        />
      </Layout>
    );
  }

  protected handleSubmit = async () => {
    const result = await createEmployee(this.state.employee);
    if (result.status === 'success') {
      this.setState({
        showSnackBar: true,
        employee: {
          fullName: '',
          position: '',
          id: undefined,
          gender: undefined
        }
      });
    }
  };

  protected handleChangeTextField = (fieldName: TextField) => {
    return (e) => {
      this.setState({
        employee: {
          ...this.state.employee,
          [fieldName]: e.target.value
        }
      });
    };
  };

  protected handleChangeRadio = (e) => {
    const gender = e.target.value === 'male' ? true : false;
    this.setState({
      employee: {
        ...this.state.employee,
        gender
      }
    });
  };

  protected handleCloseNotification = () => {
    this.setState({
      showSnackBar: false
    });
  };
}

export default withStyles(styles)(EmployeeNewPage);

interface Props {
  employeeId: string;
  classes: {
    wrapper: string;
    paper: string;
  };
}

interface State {
  employee: Employee;
  showSnackBar: boolean;
}

type TextField = 'fullName' | 'position';
