import { Step } from "@/app/...types/enum";

interface StepProps {
  step: Step;
}

export default function HeaderSignup(props: StepProps) {
  const headerBarre = () => {
    if (props.step === "Step1") {
      return (
        <div className="w-full flex flex-col items-center">
          <h1>Create your account</h1>
          <p>Step 1 of 2 - Basic Information</p>
          <div className="w-2/3 mt-5 flex flex-col">
            <div className="flex justify-between">
              <span>Step 1</span>
              <span>Step 2</span>
            </div>
            <div className="flex flex-row w-full border rounded-2xl border-gray-600">
              <div className="h-2 w-1/2 rounded-2xl bg-linear-to-r from-primary to-accent"></div>
              <div className="h-2 w-1/2 rounded-2xl"></div>
            </div>
          </div>
        </div>
      );
    } else if (props.step === "Step2") {
      return (
        <div className="w-full flex flex-col items-center">
          <h1>Complete your account</h1>
          <p>Step 2 of 2 - Professional Information</p>
          <div className="w-2/3 mt-5 flex flex-col">
            <div className="flex justify-between">
              <span>Step 1</span>
              <span>Step 2</span>
            </div>
            <div className="flex flex-row w-full rounded-2xl border border-gray-600">
              <div className="h-2 w-full rounded-2xl bg-linear-to-r from-primary to-accent"></div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{headerBarre()}</>;
}
