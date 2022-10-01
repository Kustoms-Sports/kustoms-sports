import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { deleteProduct, getProductInfo } from "../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Carrito = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const email = user?.email;

  useEffect(() => {
    dispatch(getProductInfo(email));
  }, [dispatch, isAuthenticated, user]);
  // deletear();
  const dataBuy = useSelector((state) => state.dataBuy);
  const data = useSelector((state) => state.data);
  //const name = dataBuy.products.name
  // console.log(dataBuy);
  //console.log(data);
  function deletear() {
    dispatch(getProductInfo(email));
  }
  function handleDelete(e) {
    dispatch(deleteProduct(email, e.target.id));
    //  window.location.reload()
     deletear()
  }

  if(data.length === 0) data.totalamount = 0
  let descuento = 0
  let final = 0
  if (dataBuy.length > 0){
    descuento = dataBuy.map(e => Math.round(e.price * (1 - e.promotion))) 
    final = descuento.reduce((acc, elemento) => { return acc + elemento; })
  }
 

  console.log('DATABUY: ', dataBuy) 
  console.log('PRECIOS C/DESC: ', descuento)
  console.log('FINAL: ', final)
  return (
    <div>
      <div className="flex flex-col mt[100px]">
        {dataBuy.length > 0 ?<div className=" flex ml-[200px] dark:text-main-light text-[30px] font-bold mt-[100px]">
          TU CARRITO : {dataBuy.length} items 
        </div>:
        <div className=" flex ml-[200px] dark:text-main-light text-[30px] font-bold mt-[100px]">
        TU CARRITO ESTÁ VACÍO
      </div>}
        <div className=" flex flex-row gap-[300px] mb-[100px]">
          <div>
            <div className="flex flex-col ">
              {data.totalamount === undefined || data.totalamount === 0 ?<div className="flex flex-col ml-[200px] dark:text-main-light items-start justify-items-start mt-[10px]"><p>Una vez que realices un pedido,aparecerá acá.</p><p>Podrías comenzar viendo nuestra nueva colección de <Link to="/categories/collection/Qatar" className="text-verde-dark font-bold">Qatar</Link></p></div>:dataBuy?.map((e) => {
                return (
                  <div className="flex flex-col gap-[50px] mt-[50px]">
                  <div className="flex flex- row border-[2px] ml-[200px] w-[700px] h-[250px]">
                    <div>
                      <img
                        src={e.image[0]}
                        alt="imagen del product"
                        width="200px"
                        height="200px"
                      />
                    </div>
                    <div className="flex dark:text-main-light flex-col ml-[10px] items-start gap-[15px]">
                      <h1 className="text-[20px] font-bold">{e.name}</h1>
                      <div>{e.collection}</div>
                      <div>{e.color}</div>
                      <div> Talle : {e.size}</div>
                      {/* <div className="mt-[30px]"> Cantidad :</div> */}
                      
                      {e.promotion > 0? 
                      <>
                        <div> 
                          <div className="flex flex-row">Precio por unidad: <p className="ml-10 line-through text-red-dark">${e.price}</p></div>
                          <p className="flex flex-row">Precio con descuento:<p className="text-verde-dark font-bold ml-2">${Math.round(e.price * (1 - e.promotion))}</p></p>
                        </div>
                      </>: <div> Precio por unidad : ${e.price}</div>
                        }
                     
                      
                    </div>
                    <div>
                      <div className="">
                        <button
                          className="bg-neutral px-3 py-1 border-neutral  text-neutral-600 hover:text-[white] hover:shadow-[inset_13rem_0_0_0] hover:shadow-[red] duration-[400ms,700ms] transition-[color,box-shadow]  ml-[150px]  "
                          id={e.id}
                          onClick={handleDelete}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-[400px] h-[400px] bg-gris-light border-2" >
            <div className=" text-[30px]">Resumen de compra</div>
            <hr className="m-2"></hr>
            
            <div className="flex flex-row mt-[20px]">
              <div className="flex font-bold text-[25px] ml-[15px]">Subtotal:
                <div className=" flex ml-[154px] mr-[200px]">${data.totalamount}
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-[20px]">
              <div className="flex font-bold text-[25px] ml-[15px]">Descuento:
                <div className=" flex ml-[124px] mr-[200px]">${data.totalamount - final}
                </div>
              </div>
            </div> 
            <div className="flex flex-row mt-[80px]">
              <div className="flex font-bold text-[25px] ml-[15px]">Total:
                <div className=" flex ml-[200px] mr-[200px]">${final}
                </div>
              </div>
            </div>

          
             
            {/* {console.log("data",data)} */}
            {data.totalamount === undefined || data.totalamount === 0 ? 
            <p className="border text-main-light bg-main-dark w-[350px] ml-[25px] text-[20px]  justify-center items-center mt-[20px] p-2">Tu carrito está vacío</p>
            :<a href="/payment" className="border text-[white] bg-verde-light w-[350px] ml-[25px] text-[20px]  justify-center items-center mt-[20px] p-2">COMPRAR</a>
          } 


          </div>
         
        </div>
        
        
      </div>
    </div>
  );
};

export default Carrito;
