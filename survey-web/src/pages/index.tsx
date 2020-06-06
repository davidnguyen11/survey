import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Layout } from '../components/Layout';

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
            <a href="/reviews">Performance reviews</a>
          </li>
          <li>
            <a href="/reviewees">Reviewees</a>
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
