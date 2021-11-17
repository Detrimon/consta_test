import { FileField } from '@consta/uikit/FileField';
import { Button } from '@consta/uikit/Button';
import ImageBlock from './ImageBlock';
import React, { useState } from 'react';

export type TAImages = File[] | [];

const MyFileField = ({ accept = '', multiple = false }) => {
  const [selectedImages, setSelectedImages] = useState<TAImages>([]);

  const processFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e && e.currentTarget) {
      const oFiles = e.currentTarget.files || [];

      const resultFiles = Array.from(oFiles).reduce(
        (result: TAImages, file) => {
          return [...result, file];
        },
        []
      );
      setSelectedImages(resultFiles);
    }
  };
  return (
    <div>
      <FileField
        id="myFileField"
        multiple={multiple}
        accept={accept}
        onChange={(e) => processFile(e as React.ChangeEvent<HTMLInputElement>)}
        children={(props) => <Button label="Выбери картинку" {...props} />}
      />
      <ImageBlock images={selectedImages} />
    </div>
  );
};

export default MyFileField;
