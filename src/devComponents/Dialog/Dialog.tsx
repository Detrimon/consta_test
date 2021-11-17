import styles from './Dialog.module.css';

type TDialogParams = {
  title?: string;
  children: React.ReactNode;
  isCancelEnabled?: boolean;
  onOkClicked: (event: any) => void;
  onCancelClicked?: () => void;
};

// @ts-ignore
const Dialog = ({
  title,
  children,
  isCancelEnabled = true,
  onOkClicked,
  onCancelClicked,
}: TDialogParams) => {
  const Title = title ? <h4 className={styles.dialog_title}>{title}</h4> : null;
  const isOKEnabled = true;
  const OKButton = isOKEnabled && (
    <input
      type="submit"
      value="Сохранить"
      onClick={(event) => {
        onOkClicked(event);
      }}
    />
  );
  const CancelButton = isCancelEnabled && (
    <button onClick={onCancelClicked}>Cancel</button>
  );

  return (
    <div className={styles.container}>
      <div className={styles.container_background}></div>
      <div className={styles.dialog_outer_container}>
        <form className={styles.dialog_inner_container}>
          {Title}
          <div className={styles.dialog_content}>{children}</div>
          <div className={styles.dialog_actions}>
            {OKButton}
            {CancelButton}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
