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
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';

import { Layout } from '../components/Layout';
import { ROUTES } from '../routes';
import Typography from '@material-ui/core/Typography';
import {
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Employee } from '../models/employee';
import { getListEmployees } from '../utils/api/get-list-employees';
import { deleteEmployee } from '../utils/api/delete-employee';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  },
  grow: {
    flexGrow: 1
  }
});

class EmployeePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      employees: [],
      selectedEmployee: undefined,
      showDeleteDialog: false,
      showSnackBar: false
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
    const { classes } = this.props;

    return (
      <Layout>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            Employees
          </Typography>
          <div className={classes.grow} />
          <Button variant="contained" startIcon={<AddIcon />} href={ROUTES.employee.new}>
            New
          </Button>
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
              {this.state.employees.map((employee) => {
                // Build dynamic employee detail URL by replacing ":id" with employee ID
                const editUrl = ROUTES.employee.detail.replace(':id', employee.id);

                return (
                  <TableRow key={employee.id}>
                    <TableCell component="th" scope="row">
                      {employee.id}
                    </TableCell>
                    <TableCell align="right">{employee.fullName}</TableCell>
                    <TableCell align="right">{employee.gender ? 'Male' : 'Female'}</TableCell>
                    <TableCell align="right">{employee.position}</TableCell>
                    <TableCell align="right">
                      <IconButton href={editUrl} aria-label="edit">
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={this.handleOpenDialog(employee)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {this.renderDeleteDialog()}
        {this.renderNotificationBox()}
      </Layout>
    );
  }

  protected renderDeleteDialog() {
    const { showDeleteDialog, selectedEmployee } = this.state;
    return (
      selectedEmployee && (
        <Dialog open={showDeleteDialog} onClose={this.handleCloseDeleteDialog}>
          <DialogTitle id="responsive-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete <b>{selectedEmployee.fullName}</b> ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOKDelete} color="secondary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )
    );
  }

  protected renderNotificationBox() {
    return (
      <Snackbar
        open={this.state.showSnackBar}
        onClose={this.handleCloseNotification}
        autoHideDuration={2000}
        message="Delete successfully"
      />
    );
  }

  protected handleOKDelete = async () => {
    const { data, status } = await deleteEmployee(this.state.selectedEmployee);

    if (status === 'success') {
      console.log(data);
      this.setState({
        employees: data,
        showSnackBar: true,
        selectedEmployee: undefined
      });
    }
  };

  protected handleOpenDialog = (employee: Employee) => {
    return () => {
      this.setState({
        showDeleteDialog: true,
        selectedEmployee: employee
      });
    };
  };

  protected handleCloseDeleteDialog = () => {
    this.setState({ showDeleteDialog: false });
  };

  protected handleCloseNotification = () => {
    this.setState({ showSnackBar: false });
  };
}

const Dictionary = withStyles(styles)(EmployeePage);

export default Dictionary;

interface Props {
  classes: {
    wrapper: string;
    grow: string;
  };
}

interface State {
  employees: Employee[];
  selectedEmployee?: Employee;
  showDeleteDialog: boolean;
  showSnackBar: boolean;
}
