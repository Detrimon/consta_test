import { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

const navToStep = (stepIndex: any, history: any) => {
  return history.push(`/components/RegistrationForm/Step${stepIndex + 1}`);
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

    // prevStepIndex (current)  :: newStepIndex  ::  aSteps :: aForms[prevStepIndex] - form hook :: saveFormData  :: history :: setCurrentStep

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
      console.log('Возможно, не все поля заполнены');
      console.log(error);
    }
  };

  return [activeStep, setChangeStep];
};
