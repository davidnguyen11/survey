import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { Logo } from '../components/Logo';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { Router } from '../routes';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

class IndexPage extends React.Component<Props> {
  public async componentDidMount() {
    const res = await fetch('http://localhost:4000/api/v1/employee');
    const result = await res.json();
    console.log(result);
  }

  public render() {
    const { classes } = this.props;

    return (
      <Layout>
        <Box pt={5}>
          <Logo />
          <Grid className={classes.wrapper} item xs={12} lg={6}>
            <Box display="flex" justifyContent="center" m={2}>
              <SearchBar variant="outlined" onFocus={this.onSearchInputFocus} />
            </Box>
          </Grid>
        </Box>
      </Layout>
    );
  }

  protected onSearchInputFocus = () => {
    Router.pushRoute('search');
  };
}

const Index = withStyles(styles)(IndexPage);

export default Index;

interface Props {
  classes: {
    wrapper: string;
  };
}
