const steps = [
  { id: 1, label: 'Team and Match' },
  { id: 2, label: 'Match Details' },
  { id: 3, label: 'Team Roaster' },
  { id: 4, label: 'Review' },
];

interface ProgressIndicatorProps {
  activeStep: number;
}

const ProgressIndicator = ({ activeStep }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-40">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center justify-center gap-2">
          <div
            className={`rounded-full transition-colors duration-500 ease-in-out h-12 w-12 flex items-center justify-center text-primary font-bold border-2 ${
              index + 1 <= activeStep ? 'bg-skyblue' : ''
            }`}
          >
            {index + 1}
          </div>
          <div className="text-primary">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
