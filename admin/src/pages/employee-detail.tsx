import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { NextPageContext } from 'next'

import { Layout } from '../components/Layout';
import { getDetailEmployee } from '../utils/api/get-detail-employee';
import { Employee } from '../models/employee';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

class EmployeeDetailPage extends React.Component<Props, State> {
  static getInitialProps(ctx: NextPageContext) {
    // Get params from URL and return to client
    return {
      employeeId: ctx.query.id,
    };
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      employee: undefined,
    };
  }

  public async componentDidMount() {
    const { employeeId } = this.props;
    const result = await getDetailEmployee(employeeId);
    if (result.status === 'success') {
      this.setState({
        employee: result.data,
      })
    }
  }

  public render() {
    return (
      <Layout>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            Employee Information
          </Typography>
        </Toolbar>

        <Paper>
          <TextField required id='standard-required' label='Required' />
        </Paper>
      </Layout>
    );
  }
}

const Dictionary = withStyles(styles)(EmployeeDetailPage);

export default Dictionary;

interface Props {
  employeeId: string;
  classes: {
    wrapper: string;
  };
}

interface State {
  employee?: Employee;
}
