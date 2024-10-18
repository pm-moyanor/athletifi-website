interface ReviewFormProps {
    formData: any; // Replace 'any' with the appropriate type if known
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, handleSubmit }) => {
    return (
        <div>
            <h1>Review Form</h1>
        </div>
    );
};

export default ReviewForm;