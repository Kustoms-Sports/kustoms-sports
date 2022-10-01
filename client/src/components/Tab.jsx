import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUserComments, getUserCarts } from "../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillStar } from 'react-icons/ai';

function Tab() {
  const [toggleState, setToggleState] = useState(1);
  const comments = useSelector ((state) => state.profileCom);
  const carts = useSelector ((state) => state.profileCarts);
  const dispatch = useDispatch()
  const { user } = useAuth0();
  const email = user?.email;
  const products = carts.map(e => e.products)
  const productsInfo = products.map(e =>{ return e } )


  useEffect (() =>{                                
      dispatch(getUserComments(email));
      dispatch(getUserCarts(email));                    
   }, [dispatch]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  console.log('COMMENTS: ', comments)
  return (
    <div className="flex flex-col ml-4 w-[800px]">
      {/* Tabs */}
      <div className="flex text-xl font-bold">
        <button className={toggleState === 1 ? "p-[15px] border text-center w-[50%] bg-verde-light" : "p-[15px] text-center w-[50%] cursor-pointer relative border bg-gris-light"}
          onClick={() => toggleTab(1)}>
          Comentarios
        </button>
        <button className={toggleState === 2 ? "p-[15px] border text-center w-[50%] bg-verde-light" : "p-[15px] text-center w-[50%] cursor-pointer relative border bg-gris-light"}
          onClick={() => toggleTab(2)}>
          Compras
        </button>
      </div>
        <div>
              <hr className="mt-4 w-full"></hr>
        </div>
      {/* Content */}
      <div className="grow">
        <div className={toggleState === 1 ? "bg-main-light dark:bg-main-dark dark:text-main-light p-[20px] w-[100%] h-[100%] block" : "bg-main-light dark:bg-main-dark dark:text-main-light p-[20px] w-[100%] h-[100%] hidden"}>
          {/* Comentarios */}
          {comments.map(e =>{
                      return (
                        <div className="border flex flex-row justify-between  bg-main-dark bg-opacity-[10%] rounded-lg m-[10px] p-[20px] text-xl">
                          <div className="ml-0 mr-[20px] justify-start">
                            <div>    
                              {e.producto}                           
                            </div>
                            <div className='flex flex-row'>
                              <AiFillStar className='mt-1'/>{e.rank+' '}
                            </div>   
                          </div>
                            <div className='font-bold italic'>
                                "{e.texto}"
                            </div>
                          <div className='ml-[20px]'>
                            Fecha: {e.fecha.split('T')[0]}
                          </div>
                        </div>
                        
                        )
                      })}
        </div>
        <div className={toggleState === 2 ? "bg-main-light dark:bg-main-dark dark:text-main-light p-[20px] w-[100%] h-[100%] block" : "bg-main-light dark:bg-main-dark dark:text-main-light p-[20px] w-[100%] h-[100%] hidden"}>
          {/* compras */}
          {productsInfo.map(n =>{return n.map(l =>{
                      return (
                        <div className="border flex flex-row justify-between bg-main-dark bg-opacity-[10%] rounded-lg m-[10px] p-[20px] text-xl">
                            <div className="mr-[20px]">
                              <Link to={`/producto/${l.id}`}>
                                <img src={l.image} className='w-[100px] h-[100px] rounded-full'/>
                              </Link>
                            </div>
                              <div className="m-4 font-bold">
                                <Link to={`/producto/${l.id}`}>
                                  {l.nombre}
                                </Link>
                              </div>
                              <div className="m-4">
                                ${Math.round((l.precio * (1 - l.promotion)))}
                              </div>
                        </div>
                        
                        )
                      })})}
        </div>
      </div>
    </div>
  );
}

export default Tab;