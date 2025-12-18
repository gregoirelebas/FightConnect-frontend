import { Step } from "@/app/...types/enum";

interface StepProps {
  step: Step;
}

export default function HeaderSignup(props: StepProps) {
  const headerBarre = () => {
    if (props.step === "Step1") {
      return (
        <div className="flex flex-row w-full border border-gray-600">
          <div className="h-2 w-1/2 bg-accent"></div>
          <div className="h-2 w-1/2"></div>
        </div>
      );
    } else if (props.step === "Step2") {
      return (
        <div className="flex flex-row w-full border border-gray-600">
          <div className="h-2 w-1/2 bg-accent"></div>
          <div className="h-2 w-1/2 bg-accent"></div>
        </div>
      );
    }
  };

  return (
    <>
      <h1>Create your account</h1>
      <div className="w-2/3 flex flex-col">
        <div className="flex justify-between">
          <span>Step 1</span>
          <span>Step 2</span>
        </div>
        {headerBarre()}
      </div>
    </>
  );
}
