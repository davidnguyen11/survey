import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
});

class SearchBarComponent extends React.Component<Props> {
  static defaultProps = {
    enableBackButton: false
  };

  public render() {
    const { classes, variant, autoFocus } = this.props;

    return (
      <Paper elevation={0} variant={variant} component="form" className={classes.root}>
        {this.renderBackButton()}
        <InputBase
          fullWidth
          autoFocus={autoFocus}
          className={classes.input}
          placeholder="Search word"
          inputProps={{ 'aria-label': 'search word' }}
          onFocus={this.props.onFocus}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }

  protected renderBackButton() {
    const { classes, enableBackButton, onBackButtonClick } = this.props;
    return (
      enableBackButton && (
        <IconButton onClick={onBackButtonClick} className={classes.iconButton} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      )
    );
  }
}

export const SearchBar = withStyles(styles)(SearchBarComponent);

type Props = DataProps & EventProps & Pick<PaperProps, 'variant'> & InputBaseProps;

interface DataProps {
  classes: {
    root: string;
    input: string;
    iconButton: string;
    divider: string;
  };
  enableBackButton?: boolean;
}

interface EventProps {
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBackButtonClick?: (e: React.MouseEvent) => void;
}
