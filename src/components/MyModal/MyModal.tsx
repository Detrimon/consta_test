import { Modal } from '@consta/uikit/Modal';
import { useState, useMemo } from 'react';
import { ModalBody } from './modalBody';

const POSITIONS: ModalPropPosition[] = ['center', 'top'];
type ModalPropPosition = 'center' | 'top';

const BOOLEANS: ModalPropBooleans[] = [true, false];
type ModalPropBooleans = boolean;

export type TData = TDataPrototype<ModalPropPosition, ModalPropBooleans>;
export type TAData = TData[];

type TDataPrototype<T1, T2> = {
  title: string;
  value: T1 | T2;
  action:
    | React.Dispatch<React.SetStateAction<T1>>
    | React.Dispatch<React.SetStateAction<T2>>;
  items: T1[] | T2[];
};

const MyModal = () => {
  const [position, setPosition] = useState<ModalPropPosition>(POSITIONS[0]);
  const [hasOverlay, setHasOverlay] = useState<ModalPropBooleans>(BOOLEANS[0]);
  const [isOpen, setIsOpen] = useState<ModalPropBooleans>(BOOLEANS[1]);

  const aData: TAData = useMemo(() => {
    return [
      {
        title: 'position',
        value: position,
        action: setPosition,
        items: POSITIONS,
      },
      {
        title: 'hasOverlay',
        value: hasOverlay,
        action: setHasOverlay,
        items: BOOLEANS,
      },
      { title: 'isOpen', value: isOpen, action: setIsOpen, items: BOOLEANS },
    ];
  }, [position, setPosition, hasOverlay, setHasOverlay, isOpen, setIsOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Открыть модальное окно</button>
      <Modal
        position={position}
        hasOverlay={hasOverlay}
        isOpen={isOpen}
        onClickOutside={() => setIsOpen(false)}
        onEsc={() => setIsOpen(false)}
        onClose={() => console.log('сработал onClose на модалке')}
        onOpen={() => console.log('сработал onOpen на модалке')}
      >
        <ModalBody aData={aData} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default MyModal;
