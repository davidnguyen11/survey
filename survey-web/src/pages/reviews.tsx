import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { Layout } from '../components/Layout';
import { getReviews } from '../utils/api/get-reviews';

import { Performance } from '../models/performance';
import ListItemText from '@material-ui/core/ListItemText';

const styles = () => ({
  wrapper: {
    margin: '0 auto'
  }
});

class ReviewPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      performances: []
    };
  }

  public async componentDidMount() {
    const { data: performances } = await getReviews('1');
    if (performances) {
      this.setState({ performances });
    }
  }

  public render() {
    return (
      <Layout>
        <List>
          {this.state.performances.map((item) => {
            return (
              <ListItem key={item.id}>
                <ListItemText primary={item.content} secondary={`Rating: ${item.rating}`} />
              </ListItem>
            );
          })}
        </List>
      </Layout>
    );
  }
}

export default withStyles(styles)(ReviewPage);

interface Props {
  classes: {
    wrapper: string;
  };
}

interface State {
  performances: Performance[];
}
