import * as React from 'react';

import {CarouselProvider, ImageWithZoom, Slide} from 'pure-react-carousel';

import {Gallery} from './Gallery';
import {isNullOrUndefined} from '@bipboys/ts-utils';

export function GalleryWrapper(props: {
  images: string[] | null;
  // Helper outside fn for resolve path to cdn
  imageRoot?: (str: string) => string;
}) {
  const {images, imageRoot} = props;

  const imagesArray = images?.map((val, idx) => {
    return (
      <Slide
        className={idx % 2 ? 'bg-white' : 'bg-gray-50'}
        key={idx}
        index={idx}
      >
        <ImageWithZoom
          imageClassName={'bg-center'}
          src={imageRoot ? imageRoot(val) : val}
        />
      </Slide>
    );
  });

  if (isNullOrUndefined(images) || isNullOrUndefined(imagesArray)) {
    return null;
  }

  return (
    <CarouselProvider
      className="w-full box-border"
      visibleSlides={2}
      totalSlides={imagesArray?.length}
      step={1}
      naturalSlideWidth={400}
      naturalSlideHeight={500}
      touchEnabled
    >
      <div className="flex flex-col box-border">
        <Gallery
          imageRoot={imageRoot}
          imagesSrc={images}
          images={imagesArray}
        />
      </div>
    </CarouselProvider>
  );
}
