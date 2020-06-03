import * as React from 'react';
import { Header, Props as HeaderDataProps } from '../Header';

export class Layout extends React.PureComponent<Props> {
  public static defaultProps = {
    enableHeader: true
  };

  public render() {
    return (
      <>
        {this.props.enableHeader && this.renderHeader()}
        {this.props.children}
      </>
    );
  }

  protected renderHeader() {
    const { enableSearchIcon, onSearchIconClick } = this.props;
    return <Header onSearchIconClick={onSearchIconClick} enableSearchIcon={enableSearchIcon} />;
  }
}

type Props = DataProps & Pick<HeaderDataProps, 'enableSearchIcon' | 'onSearchIconClick'>;

interface DataProps {
  enableHeader?: boolean;
  children: React.ReactNode;
}
