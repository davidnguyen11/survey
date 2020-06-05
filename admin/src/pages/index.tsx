import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Layout } from '../components/Layout';
import { ROUTES } from '../routes';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

class IndexPage extends React.Component<Props> {
  public render() {
    return (
      <Layout>
        <ul>
          <li>
            <a href={ROUTES.employee.list}>Employee</a>
          </li>
          <li>
            <a href={ROUTES.performance.list}>Performance</a>
          </li>
        </ul>
      </Layout>
    );
  }
}

const Index = withStyles(styles)(IndexPage);

export default Index;

interface Props {
  classes: {
    wrapper: string;
  };
}
