import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link ,useParams} from "react-router-dom";
import { getDetailId, getStock } from "../redux/actions";
import { useState } from "react";




const ImageXDataProduct = () =>{
    const details = useSelector((state) => state.details);
    const imagenes= useSelector((state) => state.images);
    const stock= useSelector((state) => state.stock);
    console.log(details)
    console.log(stock)
    const [ordenimg, setOrdenimg] = useState("")
    const params = useParams()
    const id = params.id
    // const name = details.name[0].toUpperCase() + details.name.substring(1)
    
    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(getDetailId(id))
       dispatch(getStock(id))
    },[dispatch,id])
    
    const data = {
        clotheType: "shirt",
        brand:"adidas",
        name:"Camiseta selección Argentina",
        gender:"x",
        sport:"futbol",
        collection:"primavera",
        color:"darkred",
        size:"xxl",
        image:"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/611f58bb7b4444bbb62eaeca012c57dd_9366/Camiseta_Titular_Argentina_22_Blanco_HF1495_01_laydown.jpg",
        stock:"10",
        price:"13000",
        promotion:"0.15"
       }


    function handleImage(e){
       setOrdenimg(e.target.src)
    }
     console.log(ordenimg,"orden")
  return(
    <div className="flex flex-row mt-[100px] ml-36 space-x-10">
        <div className="flex flex-col items-center">
          <div><img src={ordenimg === ""?imagenes[0]:ordenimg} alt="imagen del product" width="550px" height="550px"
            /></div>
          <div className="flex flex-row items-center gap-[20px]">
          {imagenes.map(d=>
            {
              return(
                <button onClick={(e) => handleImage(e)} value= {d}><img src={d} alt="imagen del product" width="120px" height="120px"
                /></button>
              )
            })}
        </div>
        </div>
        
        <div className="flex flex-col gap-10 ">
          <div className=" flex text-[30px] ">{details.name}</div>
          <div className=" flex ml-0 pl-0 "> {details.price}$</div>
          <div className="flex flex-col ">
            <div className="flex">Gender: {details.gender}</div>
            <div className=" flex">Sport: {details.sport}</div>   
            <div className=" flex"> Collection: {details.collection}</div>
            </div>
          <div className="flex flex-col">
             <div className="flex">Size</div>
             <div className="flex flex-row  ">
             {stock?.map(el=>{
              return(
                <div className=" border-[1px] text-[20px] w-[65px] h-[50px] pt-[9px] place-items-center border-indigo-500/50">{el.size}</div>
              )
             })}
              </div>
            </div>
          <button
            type="button "
            className="flex break-inside bg-[#2ea44f] text-main-light border-2 border-transparent  px-6 py-3 mb-4 w-fit h-fit pt-1 pb-1 mt-[200px]"
          >
            <div className="m-auto">
              <div className="flex items-center justify-start flex-1 space-x-4 #f8fafc">
                <span className="font-medium ">Add Carrito</span>
              </div>
            </div>
          </button>
        </div>
      </div>
  )
}

export default ImageXDataProduct