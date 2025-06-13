const StepNavigation = ({ step, setStep, handleSubmit }) => (
    <div className="d-flex justify-content-between mt-3">
      {step > 1 && (
        <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
          Back
        </button>
      )}
      {step < 3 ? (
        <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
          Next
        </button>
      ) : (
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
  
  export default StepNavigation;