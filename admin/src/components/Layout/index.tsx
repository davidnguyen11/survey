import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { Header } from '../Header';

const styles = (theme: Theme) => ({
  main: {
    padding: theme.spacing(4)
  },
});

export class LayoutComponent extends React.PureComponent<Props> {
  public static defaultProps = {
    enableHeader: true
  };

  public render() {
    const { classes } = this.props;
    return (
      <>
        <Header />
        <div className={classes.main}>
          {this.props.children}
        </div>
      </>
    );
  }
}

const Layout = withStyles(styles)(LayoutComponent);

export { Layout };

type Props = DataProps;

interface DataProps {
  enableHeader?: boolean;
  children: React.ReactNode;
  classes: {
    main: string;
  };
}

