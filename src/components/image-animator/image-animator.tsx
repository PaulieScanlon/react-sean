import React, { FunctionComponent, useContext } from 'react'
import { Grid, Box } from 'theme-ui'

import { keyframes } from '@emotion/react'

import { AppContext } from '../../context'

interface IImageAnimatorProps {
  /** Array of images from the cam-snapper */
  images: string[]
  /** The width of the image */
  width: number
  /** The height of the image */
  height: number
}

export const ImageAnimator: FunctionComponent<IImageAnimatorProps> = ({ images, width, height }) => {
  const {
    state: { captureAmount },
  } = useContext(AppContext)

  const move = keyframes({
    '0%': {
      left: '0px',
    },
    '100%': {
      left: `-${width * captureAmount + 1}px`,
    },
  })

  return (
    <Box
      className="image-animator"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          animationTimingFunction: `steps(${captureAmount}, end)`,
          animationIterationCount: 'infinite',
          animationDuration: '.5s',
          animationName: move.toString(),
          animationPlayState: images.length > 0 ? 'running' : 'paused',
          position: 'absolute',
          width: `${width * captureAmount}px`,
        }}
      >
        <Grid
          sx={{
            gridGap: 0,
            gridTemplateColumns: `repeat(${captureAmount}, ${width}px)`,
          }}
        >
          {images.map((dataURL: string, index: number) => (
            <img data-index={index} key={index} src={dataURL} width={width} height={height} />
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
