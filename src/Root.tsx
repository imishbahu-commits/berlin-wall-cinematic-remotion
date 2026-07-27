import React from 'react';
import { Composition } from 'remotion';
import { BerlinWall } from './BerlinWall';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BerlinWall"
      component={BerlinWall}
      durationInFrames={2160}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{}}
    />
  );
};
