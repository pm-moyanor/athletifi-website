interface TeamRoasterFormProps {
    formData: any; // Replace 'any' with the appropriate type if known
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const teamroasterForm = ({ formData, handleChange }: TeamRoasterFormProps) => {
    return (
        <div>
        <h1>Team Roaster Form</h1>
        </div>
    );
    };

export default teamroasterForm;