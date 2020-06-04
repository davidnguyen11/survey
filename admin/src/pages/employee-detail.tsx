import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NextPageContext } from 'next';

import { Layout } from '../components/Layout';
import { getDetailEmployee } from '../utils/api/get-detail-employee';
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
import { IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { ROUTES } from '../routes';
import { updateEmployee } from '../utils/api/update-employee';

const styles = (theme: Theme) => ({
  wrapper: {
    margin: '0 auto',
    width: '30%'
  },
  paper: {
    padding: theme.spacing(3)
  }
});

class EmployeeDetailPage extends React.Component<Props, State> {
  static getInitialProps(ctx: NextPageContext) {
    // Get params from URL and return to client
    return {
      employeeId: ctx.query.id
    };
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      employee: {
        fullName: '',
        position: '',
        id: null,
        gender: null
      },
      showSnackBar: false
    };
  }

  public async componentDidMount() {
    const { employeeId } = this.props;
    const result = await getDetailEmployee(employeeId);
    if (result.status === 'success') {
      this.setState({
        employee: result.data
      });
    }
  }

  public render() {
    const { classes } = this.props;
    const { employee, showSnackBar } = this.state;
    const gender = this.getGenderValue(employee.gender, 'forward') as string;

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
                Update
              </Button>
            </FormControl>
          </Paper>
        </div>

        <Snackbar
          open={showSnackBar}
          onClose={this.handleCloseNotification}
          autoHideDuration={2000}
          message="Edit successfully"
        />
      </Layout>
    );
  }

  protected handleSubmit = async () => {
    const result = await updateEmployee(this.state.employee);
    if (result.status === 'success') {
      this.setState({ showSnackBar: true });
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
    this.setState({
      employee: {
        ...this.state.employee,
        gender: this.getGenderValue(e.target.value, 'backward') as boolean
      }
    });
  };

  protected getGenderValue(value, type: 'forward' | 'backward') {
    switch (type) {
      case 'forward':
        return value ? 'male' : 'female';
      case 'backward':
        return value === 'male' ? true : false;
    }
  }

  protected handleCloseNotification = () => {
    this.setState({ showSnackBar: false });
  };
}

export default withStyles(styles)(EmployeeDetailPage);

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
