
import { SkeletonText } from '@consta/uikit/Skeleton';
import { Text } from '@consta/uikit/Text';
import { useState, useEffect } from 'react';
import './MySkeleton.css';

const MySkeleton = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    setTimeout(() => setData('Господин Иванов'), 2000)
  })
  return (
    data ? <Text className='skeleton_text' view="success" size='m'>{data}</Text> : <SkeletonText rows={1} fontSize='m'/>
  )
}

export default MySkeleton;