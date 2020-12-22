import React, { FunctionComponent, useContext } from 'react'
import { Grid, Box } from 'theme-ui'

import { AppContext } from '../../context'
import { ImageAnimator } from '../image-animator'

import theme from '../../gatsby-plugin-theme-ui'
const { sizes } = theme

export const Wall: FunctionComponent = () => {
  const {
    state: { localImages },
  } = useContext(AppContext)

  return (
    <Grid
      sx={{
        gridTemplateColumns: [`repeat(auto-fill, ${sizes.image.width / 2}px)`],
      }}
    >
      {localImages.length > 0 ? (
        <Box
          sx={{
            border: '5px solid',
            borderColor: 'primary',
            position: 'relative',
            borderRadius: '100%',
            overflow: 'hidden',
            width: `${sizes.image.width}px`,
            height: `${sizes.image.height}px`,
          }}
        >
          <ImageAnimator images={localImages} width={sizes.image.width} height={sizes.image.height} />
        </Box>
      ) : null}
    </Grid>
  )
}
