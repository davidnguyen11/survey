import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'

import { Layout } from '../components/Layout';
import { Router } from '../routes';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';
import { Employee } from '../models/employee';
import { getListEmployees } from '../utils/api/get-list-employees';

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
    const res = await getListEmployees();
    const { data: employees, status } = res;
    if (status === 'success' && employees) {
      this.setState({ employees });
    }
  }

  public render() {
    return (
      <Layout>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            Employees
          </Typography>
        </Toolbar>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Full name</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Position</TableCell>
                <TableCell align="right">Actions</TableCell>
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
                  <TableCell align="right">
                    <IconButton href={`/employee/${employee.id}`} aria-label="edit">
                      <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
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

