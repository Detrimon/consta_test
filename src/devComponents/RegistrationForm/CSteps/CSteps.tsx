import { Steps } from '@consta/uikit/Steps';
import { aSteps as fixtures_steps } from './fixtures';
import { useState, useMemo } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Form } from 'antd';
import styles from './CSteps.module.css';
import Step1Form from '../Step1Form';
import Step2Form from '../Step2Form';
import Step3Form from '../Step3Form';
import { Route, Switch } from 'react-router-dom';

type TCSteps = {
  aSteps?: TStep[];
  // children?: JSX.Element | null;
};

type TStep = {
  label: string;
  disabled?: boolean;
  completed?: boolean;
};

const validateForm = (form: any) => {
  return form.validateFields();
};

const aStepForms = [Step1Form, Step2Form, Step3Form];

const CSteps = ({ aSteps = fixtures_steps }: TCSteps) => {
  const history = useHistory();
  const [activeStep, setCurrentStep] = useState<TStep>(aSteps[0]);

  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();
  const [formStep3] = Form.useForm();

  const aForms = useMemo(() => {
    return [formStep1, formStep2, formStep3];
  }, [formStep1, formStep2, formStep3]);

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
        onChange={({ value }) => {
          const prevStepIndex = activeStepIndex;
          const newStepIndex = aSteps.indexOf(value);
          const offsetToDisable = 1;

          if (newStepIndex > prevStepIndex + offsetToDisable) {
            return;
          }

          // Первым делом здесь должна выполняться проверка корректности заполнения формы!!
          if (newStepIndex > prevStepIndex) {
            validateForm(aForms[prevStepIndex])
              .then((formData: any) => {
                history.push(
                  `/components/RegistrationForm/Step${newStepIndex + 1}`
                );

                setCurrentStep(value);
              })
              .catch((error: any) => {
                console.log('Возможно, не все поля заполнены');
                console.log(error);
              });
          } else {
            history.push(
              `/components/RegistrationForm/Step${newStepIndex + 1}`
            );

            setCurrentStep(value);
          }
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
    </>
  );
};

export default CSteps;
