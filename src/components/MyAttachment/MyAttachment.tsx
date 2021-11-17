import { Component } from 'react';
import { Attachment } from '@consta/uikit/Attachment';
import { IconTrash } from '@consta/uikit/IconTrash';
import { Switch } from '@consta/uikit/Switch';

type IMyAttachmentProps = {};

type IMyAttachmentState = {
  fileName: string;
  fileExtension: string;
  fileDescription: string;
  loading: boolean;
  errorText: string;
  loadingText: string;
  buttonIcon: boolean;
  buttonTitle: string;
  loadingProgress: number;
};

const aExtensions: string[] = [
  '',
  'docx',
  'doc',
  'pdf',
  'pdf',
  'exe',
  'unknown',
];

class MyAttachment extends Component<IMyAttachmentProps, IMyAttachmentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      fileName: '',
      fileExtension: '',
      fileDescription: '',
      loading: true,
      errorText: '',
      loadingText: 'Загрузка...',
      buttonIcon: true,
      buttonTitle: '',
      loadingProgress: 54,
    };
  }

  render() {
    return (
      <div>
        <Attachment
          fileName={this.state.fileName}
          fileExtension={this.state.fileExtension}
          fileDescription={this.state.fileDescription}
          loading={this.state.loading}
          errorText={this.state.errorText}
          loadingText={this.state.loadingText}
          loadingProgress={this.state.loadingProgress}
          buttonIcon={this.state.buttonIcon ? IconTrash : undefined}
          buttonTitle={this.state.buttonTitle}
          onClick={(e: any) => {
            e.stopPropagation();
            console.log('onButtonClicked');
          }}
          onButtonClick={(e: any) => {
            e.stopPropagation();
            console.log('onButtonClick');
          }}
        />

        <h5>
          {`<Attachment
            ${
              this.state.fileName
                ? 'fileName="' + this.state.fileName + '"'
                : ''
            }
            ${
              this.state.fileExtension
                ? 'fileExtension="' + this.state.fileExtension + '"'
                : ''
            }
            ${
              this.state.fileDescription
                ? 'fileDescription="' + this.state.fileDescription + '"'
                : ''
            }
            ${this.state.loading ? 'loading' : ''}
            ${
              this.state.errorText
                ? 'errorText="' + this.state.errorText + '"'
                : ''
            }
            ${
              this.state.loadingText
                ? 'loadingText="' + this.state.loadingText + '"'
                : ''
            }
            ${this.state.buttonIcon ? 'buttonIcon={IconTrash}' : ''}
            ${
              this.state.buttonTitle
                ? 'buttonTitle="' + this.state.buttonTitle + '"'
                : ''
            }
            ${
              this.state.loadingProgress
                ? 'loadingProgress=' + this.state.loadingProgress + ''
                : ''
            } />`}
        </h5>
        <div>
          <h4>Атрибут fileName: {this.state.fileName}</h4>
          <input
            placeholder="Введите имя файла"
            type="text"
            value={this.state.fileName}
            onChange={(e: any) =>
              this.setState(() => ({ fileName: e.target.value }))
            }
          />
        </div>
        <div>
          <h4>Атрибут fileExtension: {this.state.fileExtension}</h4>
          <select
            onChange={(e) => {
              this.setState(() => ({ fileExtension: e.target.value }));
            }}
          >
            {aExtensions.map((item) => {
              return <option>{item}</option>;
            })}
          </select>
        </div>
        <div>
          <h4>Атрибут fileDescription: {this.state.fileName}</h4>
          <input
            placeholder="Введите описание файла"
            type="text"
            value={this.state.fileDescription}
            onChange={(e: any) =>
              this.setState(() => ({ fileDescription: e.target.value }))
            }
          />
        </div>
        <div>
          <h4>Атрибут loading: {this.state.loading}</h4>
          <Switch
            label="loading?"
            checked={this.state.loading}
            onChange={(e) => {
              this.setState((state) => ({ loading: !state.loading }));
            }}
          />
        </div>
        <div>
          <h4>Атрибут errorText: {this.state.errorText}</h4>
          <input
            placeholder="Введите текст ошибки"
            type="text"
            value={this.state.errorText}
            onChange={(e: any) =>
              this.setState(() => ({ errorText: e.target.value }))
            }
          />
        </div>
        <div>
          <h4>Атрибут loadingText: {this.state.loadingText}</h4>
          <input
            placeholder="Например, Загрузка..."
            type="text"
            value={this.state.loadingText}
            onChange={(e: any) =>
              this.setState(() => ({ loadingText: e.target.value }))
            }
          />
        </div>
        <div>
          <h4>Атрибут buttonIcon: {this.state.buttonIcon}</h4>
          <IconTrash />
          <Switch
            label="Добавить иконку?"
            checked={!!this.state.buttonIcon}
            onChange={(e) => {
              this.setState((state) => ({ buttonIcon: !state.buttonIcon }));
            }}
          />
        </div>
        <div>
          <h4>Атрибут buttonTitle: {this.state.buttonTitle}</h4>
          <input
            placeholder="Например, удалить"
            type="text"
            value={this.state.buttonTitle}
            onChange={(e: any) =>
              this.setState(() => ({ buttonTitle: e.target.value }))
            }
          />
        </div>
        <div>
          <h4>Атрибут loadingProgress: {this.state.loadingProgress}</h4>
          <input
            placeholder="Цифру от 1 до 100"
            min={0}
            max={100}
            type="number"
            value={this.state.loadingProgress}
            onChange={(e: any) =>
              this.setState(() => ({ loadingProgress: e.target.value }))
            }
          />
        </div>
      </div>
    );
  }
}

export default MyAttachment;
