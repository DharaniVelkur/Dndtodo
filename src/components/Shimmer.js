
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Shimmer = () => {
  return (
    <SkeletonTheme baseColor="lightGrey" highlightColor="grey">
    <div>
        <p style={{ margin: '20px 0' } } >
          <Skeleton height={50} />
        </p>
        <p style={{ margin: '20px 0' }}>
          <Skeleton height={50} />
        </p>
      </div>
  </SkeletonTheme>
  )
}

export default Shimmer;