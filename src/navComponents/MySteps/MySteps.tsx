import { Component } from 'react';
import { Steps } from '@consta/uikit/Steps';
import { items } from './fixtures';
import { Button } from '@consta/uikit/Button';

type TMyStepsProps = {
  [someProp: string]: any;
};
type TMyStepsState = { indexOfActiveStep: number };

const getContent = (index: number) => `Контент на шаге №${index + 1}`;

const nStepsLength = items.length;

class MySteps extends Component<TMyStepsProps, TMyStepsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      indexOfActiveStep: 0,
    };
  }

  uncheckActive = () =>
    items.forEach((item, index) => {
      if (this.state.indexOfActiveStep >= index) {
        items[index].completed = false;
      }
    });

  render() {
    return (
      <div>
        <Steps
          items={items}
          value={items[this.state.indexOfActiveStep]}
          getLabel={(item) => item.label}
          getDisabled={(item) => item.disabled || false}
          getCompleted={(item) => item.completed || false}
          getSkipped={(item) => item.skipped || false}
          onChange={(item) => {
            const testValue = item.value as never;
            if (items.indexOf(testValue) > this.state.indexOfActiveStep + 1) {
              return;
            }

            this.setState({ indexOfActiveStep: items.indexOf(testValue) });
          }}
        />
        <div>{getContent(this.state.indexOfActiveStep)}</div>

        <Button
          label="Назад"
          onClick={() =>
            this.state.indexOfActiveStep > 0 &&
            this.setState({
              indexOfActiveStep: this.state.indexOfActiveStep - 1,
            })
          }
        />
        <Button
          label="Пропустить шаг"
          onClick={() => {
            items[this.state.indexOfActiveStep].skipped = true;
            this.state.indexOfActiveStep < nStepsLength - 1 &&
              this.setState({
                indexOfActiveStep: this.state.indexOfActiveStep + 1,
              });
          }}
        />
        <Button
          label="Вперед"
          onClick={() =>
            this.state.indexOfActiveStep < nStepsLength - 1 &&
            this.setState({
              indexOfActiveStep: this.state.indexOfActiveStep + 1,
            })
          }
        />
      </div>
    );
  }
}

export default MySteps;
