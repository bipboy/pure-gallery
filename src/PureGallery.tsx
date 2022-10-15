import * as React from 'react';

import {FC} from 'react';
import GalleryWrapper from './GalleryWrapper';
import {isBrowser} from '@bipboys/ts-utils';
import {useStyletron} from 'baseui';

interface PureGalleryI {
  images: string[] | null;
  // Helper outside fn for resolve path to cdn
  imageRoot?: (str: string) => string;
}

const Index: FC<PureGalleryI> = (props) => {
  const {images = [], imageRoot} = props;
  const [css] = useStyletron();

  return (
    <div
      className={css({
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%'
      })}
    >
      {isBrowser() && <GalleryWrapper imageRoot={imageRoot} images={images} />}
    </div>
  );
};

export default Index;
