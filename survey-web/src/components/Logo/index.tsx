import * as React from 'react';
import Box from '@material-ui/core/Box';

export class Logo extends React.PureComponent {
  public render() {
    return (
      <Box display="flex" justifyContent="center" mt={7} mb={4}>
        <img
          width={160}
          height={56}
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
        />
      </Box>
    );
  }
}
