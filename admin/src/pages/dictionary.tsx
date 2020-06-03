import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Layout } from '../components/Layout';
import { Router } from '../routes';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

class DictionaryPage extends React.Component<Props> {
  public render() {
    return (
      <Layout onSearchIconClick={this.handleBackButtonClick} enableSearchIcon>
        <h1>hello</h1>
      </Layout>
    );
  }

  protected handleBackButtonClick = () => {
    Router.pushRoute('search');
  };
}

const Dictionary = withStyles(styles)(DictionaryPage);

export default Dictionary;

interface Props {
  classes: {
    wrapper: string;
  };
}
