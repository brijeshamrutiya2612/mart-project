import { Skeleton, Stack } from '@mui/material';
import React from 'react'
import { Spinner } from 'react-bootstrap';

const Loading = () => {    
  return (
    <div>
      <div className="container pt-5 text-center">
      {/* <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={250} height={418} />
    </Stack> */}
            {/* <Spinner animation="border" role="status"></Spinner> */}
          </div>
    </div>
  )
}

export default Loading
