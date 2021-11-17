import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Button } from '@consta/uikit/Button';
import styles from './modalBody.module.css';
import { useMemo } from 'react';
import { TAData, TData } from '../MyModal';

type TModalBody = {
  aData: TAData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TCustomChoiceGroup = {
  value: TData['value'];
  callback: TData['action'];
  items: TData['items'];
};

export const ModalBody = ({ aData, setIsOpen }: TModalBody) => {
  const renderModalTag = useMemo(() => {
    return (
      <p>
        {`<Modal ${aData
          .reduce(
            (result: string[], item) => [
              ...result,
              `${item.title}="${item.value}"`,
            ],
            []
          )
          .join(' ')}/>`}
      </p>
    );
  }, [aData]);

  const renderBodyActions = useMemo(() => {
    return aData.map((item) => (
      <div>
        <p>
          {`${item.title}: `}
          <CustomChoiceGroup
            value={item.value}
            callback={item.action}
            items={item.items}
          />
        </p>
      </div>
    ));
  }, [aData]);

  return (
    <div className={styles.modalBody_container}>
      {renderModalTag}
      {renderBodyActions}
      <div>
        <Button
          label="OK"
          view="primary"
          size="s"
          onClick={() => setIsOpen(false)}
        />
        <Button
          label="Cancel"
          view="primary"
          size="s"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

export const CustomChoiceGroup = ({
  value,
  callback,
  items,
}: TCustomChoiceGroup) => {
  return (
    <ChoiceGroup
      value={value}
      // @ts-ignore
      onChange={({ value }) => callback(value)}
      items={items}
      getLabel={(item) => '' + item}
      multiple={false}
      size="xs"
      name="ChoiceModalPosition"
    />
  );
};
