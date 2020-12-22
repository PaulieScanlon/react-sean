import React, { FunctionComponent, useRef, useState, useEffect, useContext } from 'react'
import { Grid, Text, Box, Button } from 'theme-ui'

import { useUserMedia } from '../../hooks'

import theme from '../../gatsby-plugin-theme-ui'
const { sizes } = theme

import { AppContext, IActionTypes } from '../../context'
import { ImageAnimator } from '../image-animator'

// https://blog.logrocket.com/responsive-camera-component-react-hooks/
// https://gist.github.com/zorin-e/496246bdca93d4eec679a6c1915ad6bd
// https://github.com/amw/jpeg_camera/blob/master/demo/demo.js

export const CamSnapper: FunctionComponent = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const mediaStream = useUserMedia()

  const [isVideoReady, setIsVideoReady] = useState(false)
  const [images, setImages] = useState([])
  const [isCapturing, setIsCapturing] = useState(false)

  const {
    state: { captureAmount },
    dispatch,
  } = useContext(AppContext)

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  useEffect(() => {
    videoRef.current.srcObject = mediaStream
  }, [])

  const handleCanPlay = () => {
    videoRef.current.play()
    setIsVideoReady(true)
  }

  const clearCanvas = () => {
    canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setImages([])
  }

  const handleClear = () => {
    clearCanvas()
    dispatch({
      type: IActionTypes.images,
      payload: [],
    })
  }

  const handleCapture = () => {
    clearCanvas()
    const doCount = (count: number) => {
      if (count <= captureAmount) {
        count++
        setTimeout(() => {
          canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0, sizes.image.width, sizes.image.height)
          setImages((images) => [...images, canvasRef.current.toDataURL()])
          doCount(count)
        }, 500)
      } else {
        setIsCapturing(false)
      }
    }
    doCount(1)

    setIsCapturing(true)
  }

  const handleLocalPost = () => {
    clearCanvas()
    console.log(JSON.stringify(images))
    dispatch({
      type: IActionTypes.images,
      payload: images,
    })
  }

  return (
    <Grid>
      <Text>Capture Count: {images.length > 0 ? images.length : ''}</Text>
      <Box
        sx={{
          position: 'relative',
          borderRadius: '100%',
          overflow: 'hidden',
          width: 'canvas',
          height: 'canvas',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            border: '1px solid blue',
            position: 'absolute',
            width: 'video.width',
            height: 'video.height',
            left: '-50px',
          }}
        >
          <Box
            className="video-animator-wrapper"
            sx={{
              position: 'absolute',
              width: 'video.width',
              height: 'video.height',
            }}
          >
            <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted width="100%" height="100%" />
          </Box>
          <Box
            ref={imageRef}
            className="image-ref-wrapper"
            sx={{
              position: 'absolute',
              width: 'video.width',
              height: 'video.height',
            }}
          >
            {!isCapturing ? (
              <ImageAnimator images={images} width={sizes.video.width} height={sizes.video.height} />
            ) : null}
          </Box>
          <Box
            className="canvas-wrapper"
            sx={{
              position: 'absolute',
              canvas: {
                display: 'none',
              },
            }}
          >
            <canvas ref={canvasRef} width={sizes.image.width} height={sizes.image.height} />
          </Box>
        </Box>
      </Box>
      {isVideoReady ? (
        <Grid
          sx={{
            gridTemplateColumns: ['1fr', '1fr 1fr 1fr'],
          }}
        >
          <Button disabled={isCapturing} onClick={handleCapture}>
            Take Snaps
          </Button>
          <Button disabled={isCapturing} onClick={handleClear}>
            Clear
          </Button>
          <Button disabled={isCapturing || images.length === 0} onClick={handleLocalPost}>
            Post
          </Button>
        </Grid>
      ) : null}
    </Grid>
  )
}
