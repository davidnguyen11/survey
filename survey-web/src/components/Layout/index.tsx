import * as React from 'react';
import { Header } from '../Header';

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
    return <Header />;
  }
}

type Props = DataProps;

interface DataProps {
  enableHeader?: boolean;
  children: React.ReactNode;
}
