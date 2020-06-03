import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

class HeaderComponent extends React.Component<Props> {
  public render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dictionary
          </Typography>
          {this.renderSearchIcon()}
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }

  protected renderSearchIcon() {
    return (
      this.props.enableSearchIcon && (
        <IconButton onClick={this.props.onSearchIconClick} type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      )
    );
  }
}

const Header = withStyles(styles)(HeaderComponent);

export { Header };

export type Props = DataProps & EventProps;

interface DataProps {
  classes: {
    root: string;
    menuButton: string;
    title: string;
  };
  enableSearchIcon?: boolean;
}

interface EventProps {
  onSearchIconClick?: (e: React.MouseEvent) => void;
}
