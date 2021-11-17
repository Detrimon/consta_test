import { useState, useEffect } from 'react';
import styles from './ImageBlock.module.css';
import { TAImages } from '../../MyFileField';

type TImageBlockAttributes = {
  images: TAImages;
};

type TLoadedImage = string;
type TALoadedImages = TLoadedImage[];

const ImageBlock = ({ images }: TImageBlockAttributes) => {
  const [loadedImages, setLoadedImages] = useState<TALoadedImages>([]);

  useEffect(() => {
    const urlArray: string[] | [] = [];

    Array.from(images).forEach((image) => {
      urlArray.push(URL.createObjectURL(image) as never);
    });
    console.log(urlArray);
    setLoadedImages(urlArray);
  }, [images]);

  return (
    <div className={styles.container}>
      {loadedImages.map((loadedImage) => (
        <div className={styles.image__container}>
          <img className={styles.image} src={loadedImage} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ImageBlock;
