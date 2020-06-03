import * as React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';

import { SearchBar } from '../components/SearchBar';
import { Router } from '../routes';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    padding: 'auto 5px',
    borderTop: '2px solid #e5e5e5',
    backgroundColor: theme.palette.background.paper
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  }
});

class SearchPage extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <Box mt={1}>
        <SearchBar autoFocus enableBackButton onBackButtonClick={this.handleBackButtonClick} />

        <List className={classes.root} subheader={<li />}>
          {[0, 1, 2, 3, 4].map((sectionId) => (
            <li key={`section-${sectionId}`} className={classes.listSection}>
              <ul className={classes.ul}>
                {[0, 1, 2].map((item) => (
                  <ListItem key={`item-${sectionId}-${item}`}>
                    <ListItemText primary={`Item ${item}`} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </Box>
    );
  }

  protected handleBackButtonClick = () => {
    Router.pushRoute('index');
  };
}

const Search = withStyles(styles)(SearchPage);

export default Search;

interface Props {
  classes: {
    root: string;
    listSection: string;
    ul: string;
  };
}
