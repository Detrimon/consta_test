import { Steps } from '@consta/uikit/Steps';
import { aSteps as fixtures_steps } from './fixtures';
import { useMemo } from 'react';
import { useChangeStep } from '../CustomHooks';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Form } from 'antd';
import styles from './CSteps.module.css';
import Step1Form from '../Step1Form';
import Step2Form from '../Step2Form';
import Step3Form from '../Step3Form';
import { Route, Switch } from 'react-router-dom';
import { saveFormData } from '../../../actions/actionCreators/myTable';
import { Button } from '@consta/uikit/Button';

type TCSteps = {
  aSteps?: TStep[];
  saveFormData: any;
};

type TStep = {
  label: string;
  disabled?: boolean;
  completed?: boolean;
};

let initialLoad = true;

const aStepForms = [Step1Form, Step2Form, Step3Form];

const CSteps = ({ aSteps = fixtures_steps, saveFormData }: TCSteps) => {
  const history = useHistory();

  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();
  const [formStep3] = Form.useForm();

  const aForms = useMemo(() => {
    return [formStep1, formStep2, formStep3];
  }, [formStep1, formStep2, formStep3]);

  const [activeStep, setChangeStep] = useChangeStep(
    aSteps[0],
    aSteps,
    aForms,
    saveFormData
  );

  const activeStepIndex = useMemo(() => {
    return aSteps.findIndex((item) => item === activeStep);
  }, [activeStep, aSteps]);

  const renderRoutes = useMemo(() => {
    return aStepForms.map((_, index) => {
      const StepForm = aStepForms[index];
      return (
        <Route exact path={`/components/RegistrationForm/Step${index + 1}`}>
          <StepForm form={aForms[index]} />
        </Route>
      );
    });
  }, [aForms]);

  if (initialLoad) {
    initialLoad = false;
    history.replace(
      `/components/RegistrationForm/Step${aSteps.indexOf(activeStep) + 1}`
    );
  }

  return (
    <>
      <Steps
        items={aSteps}
        value={activeStep}
        getLabel={(item: any) => item.label}
        getDisabled={(item) =>
          aSteps.indexOf(item) > activeStepIndex + 1 ? true : false
        }
        getCompleted={(item) => {
          return activeStepIndex > aSteps.indexOf(item);
        }}
        onChange={async ({ value }) => {
          const newStepIndex = aSteps.indexOf(value);
          setChangeStep(newStepIndex);
        }}
      />
      <div className={styles.data_container}>
        <Switch>
          {renderRoutes}
          <Redirect
            from="/components/RegistrationForm"
            to={'/components/RegistrationForm/Step1'}
          />
        </Switch>
      </div>
      <div className={styles.action_container}>
        <Button
          label={'Назад'}
          size="s"
          onClick={() => {
            const newStepIndex = aSteps.indexOf(activeStep) - 1;
            if (newStepIndex >= 0 && newStepIndex < aSteps.length) {
              setChangeStep(newStepIndex);
            }
          }}
        />
        <span style={{ display: 'inline-block', width: '5px' }} />
        <Button
          label={'Вперед'}
          size="s"
          onClick={() => {
            const newStepIndex = aSteps.indexOf(activeStep) + 1;
            if (newStepIndex >= 0 && newStepIndex < aSteps.length) {
              setChangeStep(newStepIndex);
            }
          }}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = {
  saveFormData,
};

export default connect(null, mapDispatchToProps)(CSteps);
