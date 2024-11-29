'use client';

import React, { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';
import TeamMatchForm from './TeamMatchForm';
import MatchDetailsForm from './MatchDetailsForm';
import TeamRosterForm from './TeamRosterForm';
import ReviewForm from './ReviewForm';
import { FormData } from '../../types/CoachesForm';
import { FormEvent } from '../../types/CoachesForm';
import AlertModal from '../common/AlertModal';
import {
  faTriangleExclamation,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    permanentRoster: [
      { id: 1, name: 'Anderson Rodriguez', jerseyNumber: '#08' },
      { id: 2, name: 'Andrew Gilmore', jerseyNumber: '#06' },
      { id: 3, name: 'Salvador Carrillo', jerseyNumber: '#10' },
      { id: 4, name: 'Joseph Valdez', jerseyNumber: '#10' },
      { id: 5, name: 'Andrew Guilmore', jerseyNumber: '#10' },
      // ... more dummy data
    ],
    matchRoster: [], // Initialize matchRoster here
  });
  const [alertModal, setAlertModal] = useState(false);
  const [modalType, setModalType] = useState<'error' | 'success'>('error');

  console.log('formData', formData);
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Process the form data (e.g., send it to an API)
    console.log('Form Data:', formData);
    const isMissingData = Object.values(formData).some((value) => {
      return (
        value === '' ||
        value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      );
    });
    if (isMissingData) {
      setAlertModal(true);
      setModalType('error');
      return;
    } else {
      setAlertModal(true);
      setModalType('success');
    }
  };

  // const handleChange = (event: FormEvent) => {
  //   console.log('event', event);
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (event: FormEvent) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
  };

  // const handleChange = (event: FormEvent) => {
  //   const { name, value } = event.target;
  //   console.log('Before update:', formData);
  //   setFormData((prevData) => {
  //     const newData = {
  //       ...prevData,
  //       [name]: value
  //     };
  //     console.log('After update:', newData);
  //     return newData;
  //   });
  // };

  const handleChangeTeamMatch = (name: keyof FormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      // Conditionally clear fields based on 'newOrExistingMatch'
      ...(name === 'newOrExistingMatch' &&
        value === 'existing' && {
          opponentTeam: '',
          matchDate: '',
          matchTime: '',
        }),
      ...(name === 'newOrExistingMatch' &&
        value === 'new' && {
          existingMatch: '',
        }),
    }));
  };

  const StepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <TeamMatchForm
            formData={formData}
            handleChangeTeamMatch={handleChangeTeamMatch}
          />
        );
      case 2:
        return (
          <MatchDetailsForm formData={formData} handleChange={handleChange} />
        );
      case 3:
        return (
          <TeamRosterForm formData={formData} handleChange={handleChange} />
        );
      case 4:
        return <ReviewForm formData={formData} setActiveStep={setActiveStep} />;
      default:
        return null;
    }
  };

  const StepButton = () => {
    return (
      <>
        {(() => {
          let buttonLabel, buttonType, buttonOnClick;

          switch (activeStep) {
            case 1:
            case 2:
              buttonLabel = 'Continue';
              buttonType = 'button';
              buttonOnClick = handleNext;
              break;
            case 3:
              buttonLabel = 'Review';
              buttonType = 'button';
              buttonOnClick = handleNext;
              break;
            case 4:
              buttonLabel = 'Submit';
              buttonType = 'submit';
              break;
            default:
              return null; // No button for other steps
          }

          return (
            <button
              type={buttonType as 'button' | 'reset' | 'submit' | undefined}
              onClick={buttonOnClick}
              className="bg-skyblue hover:bg-extraDarkBlue text-primary font-bold py-2 px-4 rounded-full w-28 text-center"
            >
              {buttonLabel}
            </button>
          );
        })()}
      </>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-primary py-2 md:py-6 lg:py-8 max-w-[1030px] mx-auto "
    >
      <p className="text-l text-white flex items-center bg-cardsDark rounded-10 p-2">
        Submit Information
      </p>
      <ProgressIndicator activeStep={activeStep} />

      <StepContent />

      <div className="flex items-end justify-end gap-2 bg-cardsDark rounded-b-10 p-10">
        {activeStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="border border-gray-300 hover:border-gray-500 text-gray-300 font-bold py-2 px-4 rounded-full w-28 text-center"
          >
            Back
          </button>
        )}
        <StepButton />
      </div>
      {alertModal && (
        <AlertModal
          title={modalType === 'error' ? 'Missing Data' : 'Thanks You'}
          textBody={
            modalType === 'error'
              ? 'Please fill out all fields before submitting.'
              : 'Your data has been submitted successfully.'
          }
          icon={modalType === 'error' ? faTriangleExclamation : faCircleCheck} // Dynamic icon
          onClose={() => setAlertModal(false)}
        />
      )}
    </form>
  );
};

export default MultiStepForm;
