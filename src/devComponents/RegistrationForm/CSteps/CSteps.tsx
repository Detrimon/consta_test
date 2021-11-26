import { useMemo } from 'react';
import { connector, TPropsFromRedux } from './connector';
import { Redirect, useHistory, Route, Switch } from 'react-router-dom';

import { Steps } from '@consta/uikit/Steps';
import { Button } from '@consta/uikit/Button';
import { Form } from 'antd';
import Separator from '../../../components/Separator';

import { useChangeStep } from '../CustomHooks';

import { aSteps as fixtures_steps } from './fixtures';
import Step1Form from '../Step1Form';
import Step2Form from '../Step2Form';
import Step3Form from '../Step3Form';

import styles from './CSteps.module.css';

import {
  TCStepsOwnProps,
  TStep,
  TFormStep1,
  TFormStep2,
  TFormStep3,
} from '../types';

import { REG_FORM_BASE_PATH, STEP_PATH, LABELS } from '../constants';

let initialLoad = true;

const CSteps = ({
  aSteps = fixtures_steps,
  saveFormData,
}: TCStepsOwnProps & TPropsFromRedux) => {
  const history = useHistory();

  const [formStep1] = Form.useForm<TFormStep1>();
  const [formStep2] = Form.useForm<TFormStep2>();
  const [formStep3] = Form.useForm<TFormStep3>();

  const aForms = useMemo(() => {
    return [formStep1, formStep2, formStep3];
  }, [formStep1, formStep2, formStep3]);

  const [activeStep, setChangeStep] = useChangeStep<TStep>(
    aSteps[0],
    aSteps,
    aForms,
    saveFormData
  );

  const activeStepIndex = useMemo(() => {
    return aSteps.findIndex((item) => item === activeStep);
  }, [activeStep, aSteps]);

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
        getLabel={(item: TStep) => item.label}
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
          <Route exact path={`${REG_FORM_BASE_PATH}/${STEP_PATH}1`}>
            <Step1Form form={formStep1} />
          </Route>
          <Route exact path={`${REG_FORM_BASE_PATH}/${STEP_PATH}2`}>
            <Step2Form form={formStep2} />
          </Route>
          <Route exact path={`${REG_FORM_BASE_PATH}/${STEP_PATH}3`}>
            <Step3Form form={formStep3} />
          </Route>

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
          disabled={activeStepIndex === 0}
          onClick={() => {
            const newStepIndex = aSteps.indexOf(activeStep) - 1;
            if (newStepIndex >= 0 && newStepIndex < aSteps.length) {
              setChangeStep(newStepIndex);
            }
          }}
        />
        <Separator />
        {activeStepIndex < aSteps.length - 1 ? (
          <Button
            label={LABELS.FORWARD}
            size="s"
            disabled={activeStepIndex === aSteps.length - 1}
            onClick={() => {
              const newStepIndex = aSteps.indexOf(activeStep) + 1;
              if (newStepIndex >= 0 && newStepIndex < aSteps.length) {
                setChangeStep(newStepIndex);
              }
            }}
          />
        ) : (
          <Button
            label={LABELS.SUBMIT}
            size="s"
            onClick={() => {
              const newStepIndex = aSteps.indexOf(activeStep) + 1;
              if (newStepIndex >= 0 && newStepIndex < aSteps.length) {
                setChangeStep(newStepIndex);
              }
            }}
          />
        )}
      </div>
    </>
  );
};

export default connector(CSteps);
