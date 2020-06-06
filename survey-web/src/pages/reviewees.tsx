import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Layout } from '../components/Layout';
import { Router } from '../routes';

import { Employee } from '../models/employee';
import { getReviewees } from '../utils/api/get-reviewees';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

class RevieweesPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      reviewees: []
    };
  }

  public async componentDidMount() {
    const { data: reviewees } = await getReviewees('1');
    if (reviewees) {
      this.setState({ reviewees });
    }
  }

  public render() {
    return (
      <Layout>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Full name</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Position</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.reviewees.map((employee) => {
                return (
                  <TableRow key={employee.id}>
                    <TableCell component="th" scope="row">
                      {employee.id}
                    </TableCell>
                    <TableCell align="left">{employee.fullName}</TableCell>
                    <TableCell align="left">{employee.gender ? 'Male' : 'Female'}</TableCell>
                    <TableCell align="left">{employee.position}</TableCell>
                    <TableCell align="center">
                      <Button href={`/reviewees/${employee.id}`} variant="contained" color="primary">
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    );
  }

  protected handleBackButtonClick = () => {
    Router.pushRoute('search');
  };
}

export default withStyles(styles)(RevieweesPage);

interface Props {
  classes: {
    wrapper: string;
  };
}

interface State {
  reviewees: Employee[];
}
