import * as React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import { Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { ROUTES } from '../../routes';

const DRAWER_WIDTH = 240;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
});

class HeaderComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false
    };
  }

  public render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton onClick={this.handleOpenMenu} edge="start" className={classes.menuButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} anchor="left" open={open}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleCloseMenu}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem onClick={this.redirectToHome} button>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem onClick={this.redirectToEmployee} button>
              <ListItemText primary="Employee" />
            </ListItem>
            <ListItem onClick={this.redirectToPerformance} button>
              <ListItemText primary="Performance" />
            </ListItem>
          </List>
        </Drawer>
      </>
    );
  }

  protected redirectToHome() {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  protected redirectToEmployee() {
    if (typeof window !== 'undefined') {
      window.location.href = ROUTES.employee.list;
    }
  }

  protected redirectToPerformance() {
    if (typeof window !== 'undefined') {
      window.location.href = ROUTES.performance.list;
    }
  }

  protected handleOpenMenu = () => {
    this.setState({ open: true });
  };

  protected handleCloseMenu = () => {
    this.setState({ open: false });
  };
}

const Header = withStyles(styles)(withTheme(HeaderComponent));

export { Header };

export type Props = DataProps;

interface DataProps {
  classes: {
    root: string;
    menuButton: string;
    title: string;
    drawer: string;
    drawerPaper: string;
    drawerHeader: string;
  };
  theme: any;
}

interface State {
  open: boolean;
}
