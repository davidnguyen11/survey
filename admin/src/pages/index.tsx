import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Layout } from '../components/Layout';
import { Logo } from '../components/Logo';
import Box from '@material-ui/core/Box';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

class IndexPage extends React.Component<Props> {
  public render() {
    return (
      <Layout>
        <Box pt={5}>
          <Logo />
        </Box>
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
