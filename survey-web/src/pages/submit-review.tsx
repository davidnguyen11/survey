import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NextPageContext } from 'next';

import { Layout } from '../components/Layout';
import { getDetailEmployee } from '../utils/api/get-detail-employee';
import { Employee } from '../models/employee';
import { Performance } from '../models/performance';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { addReview } from '../utils/api/add-review';

const styles = (theme: Theme) => ({
  wrapper: {
    margin: '0 auto',
    width: '30%'
  },
  paper: {
    padding: theme.spacing(3)
  }
});

class DetailRevieweePage extends React.Component<Props, State> {
  static getInitialProps(ctx: NextPageContext) {
    // Get params from URL and return to client
    return {
      employeeId: ctx.query.revieweeId
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
      review: {
        content: '',
        rating: 0
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

    return (
      <Layout>
        <div className={classes.wrapper}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="back to list of employee" href="/reviewees">
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" id="tableTitle" component="div">
              What do you think about <b>{employee.fullName}</b>?
            </Typography>
          </Toolbar>

          <Paper className={classes.paper}>
            <FormControl fullWidth margin="normal">
              <FormLabel component="legend">Content</FormLabel>
              <OutlinedInput rows={5} multiline fullWidth required onChange={this.handleChangeTextField('content')} />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel component="legend">Rating</FormLabel>
              <OutlinedInput type="number" fullWidth required onChange={this.handleChangeTextField('rating')} />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Button onClick={this.handleSubmit} size="large" color="primary" variant="contained">
                Submit
              </Button>
            </FormControl>
          </Paper>
        </div>

        <Snackbar
          open={showSnackBar}
          onClose={this.handleCloseNotification}
          autoHideDuration={2000}
          message="Add reviews successfully"
        />
      </Layout>
    );
  }

  protected handleSubmit = async () => {
    const { employee: reviewee, review } = this.state;
    const reviewerId = '1';
    const result = await addReview(reviewee.id, reviewerId, review);
    if (result.status === 'success') {
      this.setState({ showSnackBar: true });
    }
  };

  protected handleChangeTextField = (fieldName: TextField) => {
    return (e) => {
      this.setState({
        review: {
          ...this.state.review,
          [fieldName]: e.target.value
        }
      });
    };
  };

  protected handleCloseNotification = () => {
    this.setState({ showSnackBar: false });
  };
}

export default withStyles(styles)(DetailRevieweePage);

interface Props {
  employeeId: string;
  classes: {
    wrapper: string;
    paper: string;
  };
}

interface State {
  employee: Employee;
  review: Performance;
  showSnackBar: boolean;
}

type TextField = 'content' | 'rating';
