import React, { FunctionComponent, useState } from 'react'
import { Container, Grid, Box, Button } from 'theme-ui'

import { CamSnapper } from '../components/cam-snapper'
import { Wall } from '../components/wall'

const IndexPage: FunctionComponent = () => {
  const [isCamOpen, setIsCamOpen] = useState(false)

  return (
    <Container>
      <Grid
        sx={{
          gridGap: 4,
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
          py: 5,
          px: 2,
        }}
      >
        <Grid sx={{}}>
          {isCamOpen ? <CamSnapper /> : <Box sx={{ width: 'canvas', height: 'canvas' }} />}
          <Button variant="secondary" onClick={() => setIsCamOpen(!isCamOpen)}>{`${
            isCamOpen ? 'Close' : 'Open'
          } Camera`}</Button>
        </Grid>
        <Box>
          <Wall />
        </Box>
      </Grid>
    </Container>
  )
}

export default IndexPage
