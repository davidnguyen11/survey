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
import { ROUTES } from '../routes';
import Typography from '@material-ui/core/Typography';
import {
  Toolbar,
  Link,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Performance } from '../models/performance';
import { getListPerformances } from '../utils/api/get-list-performances';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

const TOTAL_RATING = 5;

class PerformancePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      performances: [],
      showDialog: false,
      selectedPerf: undefined
    };
  }

  public async componentDidMount() {
    const res = await getListPerformances();
    const { data: performances, status } = res;
    if (status === 'success') {
      this.setState({ performances });
    }
  }

  public render() {
    return (
      <Layout>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            Performances
          </Typography>
        </Toolbar>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Employee Name</TableCell>
                <TableCell align="left">Content</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.performances.map((perf) => {
                const { id, content, rating, employee } = perf;
                // Build dynamic employee detail URL by replacing ":id" with employee ID
                const editUrl = ROUTES.employee.detail.replace(':id', employee.id);

                return (
                  <TableRow key={employee.id}>
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>
                    <TableCell align="left">
                      <Link href={editUrl}>{employee.fullName}</Link>
                    </TableCell>
                    <TableCell align="left">{content}</TableCell>
                    <TableCell align="right">
                      {rating} / {TOTAL_RATING}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={this.handleOpenDialog(perf)} variant="contained" color="primary">
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {this.renderDetailPerformance()}
      </Layout>
    );
  }

  protected renderDetailPerformance() {
    const { showDialog, selectedPerf, performances } = this.state;

    const perf =
      selectedPerf &&
      performances.filter((item) => {
        return item.id === selectedPerf.id;
      });

    return (
      perf &&
      perf.length && (
        <Dialog open={showDialog} onClose={this.handleCloseDialog}>
          <DialogTitle id="responsive-dialog-title">Detail Review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <b>Employee name:</b> {perf[0].employee.fullName}
            </DialogContentText>
            <DialogContentText>
              <b>Content:</b> {perf[0].content}
            </DialogContentText>
            <DialogContentText>
              <b>Rating:</b> {perf[0].rating}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )
    );
  }

  protected handleOpenDialog = (perf: Performance) => {
    return () => {
      this.setState({
        showDialog: true,
        selectedPerf: perf
      });
    };
  };

  protected handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };
}

export default withStyles(styles)(PerformancePage);

interface Props {
  classes: {
    wrapper: string;
  };
}

interface State {
  performances: Performance[];
  showDialog: boolean;
  selectedPerf: Performance;
}
