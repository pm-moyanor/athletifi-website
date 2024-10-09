const UploadProgressBar = () => {
  // number here
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (80 / 100) * circumference; //need to replce for dinamic

  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="text-gray-700 stroke-current"
          strokeWidth="4"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-skyblue stroke-current transition-all duration-300 ease-in-out"
          strokeWidth="4"
          strokeLinecap="round"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-md text-primary">{`${60}%`}</span>
      </div>
    </div>
  );
};

export default UploadProgressBar;
