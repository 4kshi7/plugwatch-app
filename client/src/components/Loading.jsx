import React from "react";
import loader from "../../public/loader.gif";

const Loading = () => {
  return (
    <div className="bg-black h-full w-full flex justify-center items-center">
      <img className="w-[50vh]" src={loader} alt="" />
    </div>
  );
};

export default Loading;
