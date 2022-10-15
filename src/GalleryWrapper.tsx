import * as React from 'react';

import {CarouselProvider, ImageWithZoom, Slide} from 'pure-react-carousel';
import {imageRoot, isNullOrUndefined} from '@bipboys/ts-utils';

import Gallery from './Gallery';
import {useStyletron} from 'baseui';

function GalleryWrapper(props: {images: string[] | null}) {
  const [css, theme] = useStyletron();
  const {images} = props;

  const imagesArray = images?.map((val, idx) => {
    return (
      <Slide
        className={css({
          backgroundColor:
            idx % 2 ? theme.colors.primary50 : theme.colors.primary100
        })}
        key={idx}
        index={idx}
      >
        <ImageWithZoom
          imageClassName={css({
            backgroundPosition: 'center'
          })}
          src={imageRoot(val)}
        />
      </Slide>
    );
  });

  if (isNullOrUndefined(images) || isNullOrUndefined(imagesArray)) {
    return null;
  }

  return (
    <CarouselProvider
      className={css({
        width: '100%',
        boxSizing: 'border-box'
      })}
      visibleSlides={2}
      totalSlides={imagesArray?.length}
      step={1}
      naturalSlideWidth={400}
      naturalSlideHeight={500}
      touchEnabled
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        })}
      >
        <Gallery imagesSrc={images} images={imagesArray} />
      </div>
    </CarouselProvider>
  );
}

export default GalleryWrapper;
