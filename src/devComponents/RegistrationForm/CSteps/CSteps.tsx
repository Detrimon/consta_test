import { useMemo } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory, Route, Switch } from 'react-router-dom';

import { saveFormData } from '../../../actions/actionCreators/myTable';

import { Steps } from '@consta/uikit/Steps';
import { Button } from '@consta/uikit/Button';
import { Form } from 'antd';

import { useChangeStep } from '../CustomHooks';

import { aSteps as fixtures_steps } from './fixtures';
import Step1Form from '../Step1Form';
import Step2Form from '../Step2Form';
import Step3Form from '../Step3Form';

import styles from './CSteps.module.css';

import { TCSteps } from '../types';

import { REG_FORM_BASE_PATH, STEP_PATH, LABELS } from '../constants';

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
        <Route exact path={`${REG_FORM_BASE_PATH}/${STEP_PATH}${index + 1}`}>
          <StepForm form={aForms[index]} />
        </Route>
      );
    });
  }, [aForms]);

  if (initialLoad) {
    initialLoad = false;
    history.replace(
      `${REG_FORM_BASE_PATH}/${STEP_PATH}${aSteps.indexOf(activeStep) + 1}`
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
        onChange={({ value }) => {
          const newStepIndex = aSteps.indexOf(value);
          setChangeStep(newStepIndex);
        }}
      />
      <div className={styles.data_container}>
        <Switch>
          {renderRoutes}
          <Redirect
            from={REG_FORM_BASE_PATH}
            to={`${REG_FORM_BASE_PATH}/${STEP_PATH}1`}
          />
        </Switch>
      </div>
      <div className={styles.action_container}>
        <Button
          label={LABELS.BACK}
          size="s"
          onClick={() => {
            const newStepIndex = aSteps.indexOf(activeStep) - 1;
            if (newStepIndex >= 0 && newStepIndex < aSteps.length) {
              setChangeStep(newStepIndex);
            }
          }}
        />
        <span className={styles.separator} />
        <Button
          label={LABELS.FORWARD}
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
