'use client';

import React, { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';
import TeamMatchForm from './TeamMatchForm';
import MatchDetailsForm from './MatchDetailsForm';
import TeamRoasterForm from './TeamRoasterForm';
import ReviewForm from './ReviewForm';

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [formData, setFormData] = useState({});
console.log('formData', formData)
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
  };

  interface FormData {
    [key: string]: any;
  }

  interface Event {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (event: Event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <TeamMatchForm formData={formData} handleChange={handleChange} />
        );
      case 2:
        return (
          <MatchDetailsForm formData={formData} handleChange={handleChange} />
        );
      case 3:
        return (
          <TeamRoasterForm formData={formData} handleChange={handleChange} />
        );
      case 4:
        return <ReviewForm formData={formData} handleSubmit={handleSubmit} />;
      default:
        return null;
    }
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

      {renderStepContent()}

      <div className="flex items-end justify-end gap-10 bg-cardsDark rounded-b-10 p-10">
        {activeStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="border border-gray-300 hover:border-gray-500 text-gray-300 font-bold py-2 px-4 rounded-full w-24 text-center"
          >
            Back
          </button>
        )}
        {activeStep < 3 && (
          <button
            type="button"
            onClick={handleNext}
            className="bg-skyblue hover:bg-extraDarkBlue text-primary font-bold py-2 px-4 rounded-full w-24 text-center"
          >
            Continue
          </button>
        )}
        {activeStep === 3 && ( // "Review" button for the second-to-last step
          <button
            type="button"
            onClick={handleNext}
            className="bg-skyblue hover:bg-extraDarkBlue text-primary font-bold py-2 px-4 rounded-full w-24 text-center"
          >
            Review
          </button>
        )}
        {activeStep === 4 && ( // "Submit" button only on the last step
          <button
            type="submit"
            className="bg-skyblue hover:bg-extraDarkBlue text-primary font-bold py-2 px-4 rounded-full w-24 text-center"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
