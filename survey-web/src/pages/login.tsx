import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Cookies from 'js-cookie';
import { Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { login } from '../utils/api/login';

const styles = (theme: Theme) => ({
  wrapper: {
    margin: '0 auto',
    width: '30%'
  },
  paper: {
    padding: theme.spacing(3)
  }
});

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      showSnackBar: false
    };
  }

  public componentDidMount() {
    // If user is already logged in
    // redirect to home page
    if (Cookies.get('employee')) {
      window.location.href = '/';
    }
  }

  public render() {
    const { classes } = this.props;
    const { showSnackBar } = this.state;

    return (
      <>
        <div className={classes.wrapper}>
          <Toolbar>
            <Typography variant="h6" id="tableTitle" component="div">
              Login
            </Typography>
          </Toolbar>

          <Paper className={classes.paper}>
            <FormControl fullWidth margin="normal">
              <FormLabel component="legend">Username</FormLabel>
              <OutlinedInput fullWidth required onChange={this.handleChangeTextField('username')} />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel component="legend">Password</FormLabel>
              <OutlinedInput type="password" fullWidth required onChange={this.handleChangeTextField('password')} />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Button onClick={this.handleSubmit} size="large" color="primary" variant="contained">
                Login
              </Button>
            </FormControl>
          </Paper>
        </div>

        <Snackbar
          open={showSnackBar}
          onClose={this.handleCloseNotification}
          autoHideDuration={2000}
          message="Something wrong with your account"
        />
      </>
    );
  }

  protected handleSubmit = async () => {
    const { status, data } = await login(this.state.username, this.state.password);

    if (status === 'success') {
      Cookies.set('employee', data);
      window.location.href = '/index';
    } else {
      this.setState({ showSnackBar: true });
    }
  };

  protected handleChangeTextField = (type: TextField) => {
    return (e) => {
      this.setState({
        ...this.state,
        [type]: e.target.value
      });
    };
  };

  protected handleCloseNotification = () => {
    this.setState({ showSnackBar: false });
  };
}

export default withStyles(styles)(LoginPage);

interface Props {
  classes: {
    wrapper: string;
    paper: string;
  };
}

interface State {
  username: string;
  password: string;
  showSnackBar: boolean;
}

type TextField = 'username' | 'password';
