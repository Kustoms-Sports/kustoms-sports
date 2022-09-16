import React from "react";


import ImageXDataProduct from "../components/Image&DataProduct";
import SelectoresProduct from "../components/SelectoresProduct";
import { Carrousel } from "../components";

const Details = () => {
  
  return (
    <div className="flex flex-col  bg-main-light ">
      <ImageXDataProduct />
      <SelectoresProduct/>
      <div className="flex flex-col ml-16 mt-[20px]">
        
        
      </div>
    </div>
  );
};

export default Details;
