import * as React from 'react';

import {GalleryWrapper} from './GalleryWrapper';
import {isBrowser} from '@bipboys/ts-utils';

interface PureGalleryI {
  images: string[] | null;
  // Helper outside fn for resolve path to cdn
  imageRoot?: (str: string) => string;
}

export const PureGallery: React.FC<PureGalleryI> = (props) => {
  const {images = [], imageRoot} = props;

  return (
    <div className={'relative box-border w-full'}>
      {isBrowser() && <GalleryWrapper imageRoot={imageRoot} images={images} />}
    </div>
  );
};
