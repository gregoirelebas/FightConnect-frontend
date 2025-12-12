

export default function PopUpEvent(props: {

  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

) {

  return (
   <div className="absolute top-0 left-0 w-screen h-screen bg-background/80 flex justify-center items-center"> 
    <div className="w-100 h-100 bg-white flex justify-center items-center rounded-xl">
      <p className="text-2xl text-black" onClick={() => props.setIsPopUp(false)}>X</p>
      <h1 className="text-black border-2 ">EVENT</h1>
      {/* <p className="text-black ">The "Date" at the "Club" join for the "sport" fight.</p> */}
    </div>
    </div> 
  );
}
