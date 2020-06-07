import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Layout } from '../components/Layout';
import Cookies from 'js-cookie';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

class IndexPage extends React.Component<Props> {
  public componentDidMount() {
    // If user is not logged in
    // redirect to login page
    if (!Cookies.get('employee')) {
      window.location.href = '/login';
    }
  }

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
