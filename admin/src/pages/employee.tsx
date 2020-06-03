import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Layout } from '../components/Layout';
import { Router } from '../routes';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

class EmployeePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      employees: []
    };
  }

  public async componentDidMount() {
    const res = await fetch('http://localhost:4000/api/v1/employee');
    const result = await res.json();
    const { data } = result;
    this.setState({
      employees: data
    });
    console.log(result);
  }

  public render() {
    return (
      <Layout onSearchIconClick={this.handleBackButtonClick} enableSearchIcon>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Full name</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Position</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell component="th" scope="row">
                    {employee.id}
                  </TableCell>
                  <TableCell align="right">{employee.fullName}</TableCell>
                  <TableCell align="right">{employee.gender ? 'Male' : 'Female'}</TableCell>
                  <TableCell align="right">{employee.position}</TableCell>
                </TableRow>
              ))}
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

const Dictionary = withStyles(styles)(EmployeePage);

export default Dictionary;

interface Props {
  classes: {
    wrapper: string;
  };
}

interface State {
  employees: Employee[];
}

interface Employee {
  id: number;
  fullName: string;
  gender: boolean;
  position: string;
}
