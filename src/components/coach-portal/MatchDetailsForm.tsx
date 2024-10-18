interface MatchDetailsFormProps {
    formData: any; // Replace 'any' with the appropriate type if known
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MatchDetailsForm: React.FC<MatchDetailsFormProps> = ({ formData, handleChange }) => {
    return (
        <div>
        <h1>Match Details Form</h1>
        </div>
    );
};

export default MatchDetailsForm;