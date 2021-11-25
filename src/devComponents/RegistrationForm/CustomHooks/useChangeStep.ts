import { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { FormInstance } from 'antd';

import { ERROR_MESSAGES, REG_FORM_BASE_PATH, STEP_PATH } from '../constants';

export const useChangeStep = <T>(
  initialStep: T,
  steps: T[],
  forms: FormInstance[],
  fnSaveFormData: any
): [T, (newStepIndex: number) => Promise<void>] => {
  const aSteps = steps;
  const aForms = forms;
  const saveFormData = fnSaveFormData;

  const [activeStep, setCurrentStep] = useState(initialStep);
  const history = useHistory();

  const navToStep = useMemo(() => {
    return (stepIndex: number) => {
      return history.push(`${REG_FORM_BASE_PATH}/${STEP_PATH}${stepIndex + 1}`);
    };
  }, [history]);

  const setChangeStep = async (newStepIndex: number) => {
    const activeStepIndex = aSteps.findIndex((item) => item === activeStep);
    const stepValue = aSteps[newStepIndex];
    const formValues = aForms[activeStepIndex].getFieldsValue();

    const offsetToDisable = 1;
    if (newStepIndex > activeStepIndex + offsetToDisable) {
      return;
    }

    if (newStepIndex < activeStepIndex) {
      saveFormData(formValues);
      navToStep(newStepIndex);
      setCurrentStep(stepValue);
      return;
    }

    try {
      const formData = await aForms[activeStepIndex].validateFields();
      saveFormData(formData);
      navToStep(newStepIndex);
      setCurrentStep(stepValue);
    } catch (error) {
      console.log(ERROR_MESSAGES.NOT_ALL_FIELDS_FIELDS);
      console.log(error);
    }
  };

  return [activeStep, setChangeStep];
};
