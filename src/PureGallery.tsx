import * as React from 'react';

import {FC} from 'react';
import GalleryWrapper from './GalleryWrapper';
import {isBrowser} from '@bipboys/ts-utils';
import {useStyletron} from 'baseui';

interface PureGalleryI {
  images: string[] | null;
}

const Index: FC<PureGalleryI> = (props) => {
  const {images = []} = props;
  const [css] = useStyletron();

  return (
    <div
      className={css({
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%'
      })}
    >
      {isBrowser() && <GalleryWrapper images={images} />}
    </div>
  );
};

export default Index;
