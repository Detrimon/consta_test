import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ERROR_MESSAGES, REG_FORM_BASE_PATH, STEP_PATH } from '../constants';

const navToStep = (stepIndex: number, history: any) => {
  return history.push(`${REG_FORM_BASE_PATH}/${STEP_PATH}${stepIndex + 1}`);
};

export const useChangeStep = (
  initialStep: any,
  steps: any,
  forms: any,
  fnSaveFormData: any
) => {
  const aSteps = steps;
  const aForms = forms;
  const saveFormData = fnSaveFormData;

  const [activeStep, setCurrentStep] = useState(initialStep);
  const history = useHistory();

  const setChangeStep = async (newStepIndex: any) => {
    const activeStepIndex = aSteps.findIndex(
      (item: any) => item === activeStep
    );
    const stepValue = aSteps[newStepIndex];
    const formValues = aForms[activeStepIndex].getFieldsValue();

    const offsetToDisable = 1;
    if (newStepIndex > activeStepIndex + offsetToDisable) {
      return;
    }

    if (newStepIndex < activeStepIndex) {
      saveFormData(formValues);
      navToStep(newStepIndex, history);
      setCurrentStep(stepValue);
      return;
    }

    try {
      const formData = await aForms[activeStepIndex].validateFields();
      saveFormData(formData);
      navToStep(newStepIndex, history);
      setCurrentStep(stepValue);
    } catch (error) {
      console.log(ERROR_MESSAGES.NOT_ALL_FIELDS_FIELDS);
      console.log(error);
    }
  };

  return [activeStep, setChangeStep];
};
