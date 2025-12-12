import Button, { ButtonVariant } from "../...components/Button";

export default function PopUpEvenDashboard(props: {
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>,
  name:string,
  date: string,
  level:string
}) {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-background/80 flex justify-center items-center">
      <div className="w-1/2 h-2/3 p-2 bg-white flex justify-center items-center flex-col">
        <div className="h-1/10 w-full flex items-center">
          <h3 className="text-black font-bold w-18/20 flex justify-center">Event Name</h3>
          <div className="w-2/20 h-full flex justify-center items-center">
            <p
              className="w-10 h-10 bg-black rounded-full flex justify-center items-center text-2xl font-bold text-white"
              onClick={() => props.setIsPopUp(false)}
            >
              X
            </p>
          </div>
        </div>
        <div className="h-9/10 w-full border-gray-500 border-2 rounded-3xl">
          <div className="h-1/3 w-full text-black flex justify-around items-center">
            <h1>Info</h1>
            <span>{props.name}</span>
            <span>{props.date}</span>
            <span>{props.level}</span>
          </div>
          <div className="h-2/3 w-full bg-gray-300 rounded-b-3xl flex flex-col items-center overflow-y-auto">
            {/* Fighter div for accept ou refuse  */}
            <div className="min-h-10 w-9/10 mt-3 bg-black text-white flex justify-around items-center ">
              <span>Fighter Name</span>
              <span>Date</span>
              <span>Catégorie</span>
              <Button
                variant={ButtonVariant.Accept}
                className="w-15 h-8 text-xs flex justify-center items-center"
              >
                Accept
              </Button>
              <Button
                variant={ButtonVariant.Refuse}
                className="w-15 h-8 text-xs flex justify-center items-center"
              >
                Refuse
              </Button>
            </div>
            <div className="min-h-10 w-9/10 mt-3 bg-black text-white flex justify-around items-center overflow-y-auto">
              <span>Fighter Name</span>
              <span>Date</span>
              <span>Catégorie</span>
              <Button
                variant={ButtonVariant.Accept}
                className="w-15 h-8 text-xs flex justify-center items-center"
              >
                Accept
              </Button>
              <Button
                variant={ButtonVariant.Refuse}
                className="w-15 h-8 text-xs flex justify-center items-center"
              >
                Refuse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
