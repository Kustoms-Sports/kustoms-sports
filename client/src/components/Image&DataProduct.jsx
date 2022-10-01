import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getDetailId,
  getProductInfo,
  getStock,
  postDataBuy,
} from "../redux/actions";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./Login";
import swal from "sweetalert2";
import { BsFillCartPlusFill } from "react-icons/bs";



const ImageXDataProduct = () => {
  const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const details = useSelector((state) => state.details);
  const imagenes = useSelector((state) => state.images);
  const stock = useSelector((state) => state.stock);
  const color = useSelector((state) => state.color);
  // console.log(details);
  // console.log(stock);
  const [ordenimg, setOrdenimg] = useState("");
  const [errors, setErrors] = useState(false);
  const params = useParams();
  const id = params.id;

  const email = user?.email;

  const [buyProduct, setbuyProduct] = useState({
    id: "",
    name: "",
    collection: "",
    color: "",
    size: "",
    email: "",
  });

  function postuserClick() {
    dispatch(getProductInfo(email));
    const dataid = dataBuy.filter((e) => {
      return e.id == buyProduct.id;
    });
    if (buyProduct.size === "") {
      setErrors(!false);
      dispatch(getProductInfo(email));
    }

    else if (dataid.length) {
      swal.fire({
        position: "top-end",
        icon: "error",
        title: "El producto ya existe!",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getProductInfo(email));
      window.location.reload();
      window.history.back();
    } else {
      swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto agregado al Carrito",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getProductInfo(email));
      dispatch(postDataBuy(buyProduct));

      window.location.reload();
      window.history.back();
    }
  }
  function handleSize(e) {
    setErrors(!true);

    setbuyProduct({
      ...buyProduct,
      size: e.target.value,
      email: user.email,
      id: e.target.id,
    });
  }

  //console.log(buyProduct, "buy");
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch, isAuthenticated, user, email]);
  useEffect(() => {
    setOrdenimg("");
    dispatch(getDetailId(id, email));
    dispatch(getStock(id, email));
  }, [dispatch, id, isAuthenticated, user]);
  useEffect(() => {
    dispatch(getProductInfo(email));
  }, [dispatch, email]);
  useEffect(() => {
    setbuyProduct({
      id: "",
      name: details.name,
      collection: details.collection,
      color: color.color,
      size: "",
      email: "",
    });
    window.scrollTo(0, 0);
  }, [details]);

  const dataBuy = useSelector((state) => state.dataBuy);
  //console.log(dataBuy, "data");
  const stockgender = stock.filter((e) => {
    return e.gender == details.gender;
  });
  //console.log(stockgender, "stock");
  function handleImage(e) {
    setOrdenimg(e.target.src);
  }
  //console.log(ordenimg, "orden");
  console.log('DETAIL:', details)
  return (
    <div className="flex flex-row mt-[100px] ml-36 space-x-10 dark:bg-main-dark  dark:text-main-light ">
      <div className="flex flex-col items-center  dark:bg-main-dark">
        <div className=" dark:bg-main-dark">
          <img
            src={ordenimg === "" ? imagenes[0] : ordenimg}
            alt="imagen del product"
            width="550px"
            height="550px"
            className="dark:bg-main-dark"
          />
        </div>
        <div className="flex flex-row items-center gap-[20px]">
          {imagenes.map((d) => {
            return (
              <button
                onClick={(e) => handleImage(e)}
                value={d}
                className="hover:shadow-xl transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100 mt-[10px]"
              >
                <img
                  src={d}
                  alt="imagen del product"
                  width="120px"
                  height="120px"
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-10 ">
        <div className=" flex text-[30px] ">{details.name}</div>
        {details.promotion > 0?
          <div className="flex flex-row"><p>Antes: </p><div className=" flex ml-1 pl-0 line-through ">${details.price}</div></div>:
          <div className=" flex ml-0 pl-0"> ${details.price}</div>}
        {details.promotion > 0 &&
        <div className=" flex ml-0 pl-0 text-verde-dark font-bold"> Ahora: ${Math.round(details.price * (1 - details.promotion))}</div>}
        <div className=" flex ml-0 pl-0 "> {color.color}</div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-[5px]">
            <div className="font-bold">Género:</div> {details.gender}
          </div>
          <div className=" flex flex-row gap-[5px]">
            <div className="font-bold">Deporte:</div> {details.sport}
          </div>
          <div className=" flex flex-row gap-[5px]">
            {" "}
            <div className="font-bold">Colección:</div> {details.collection}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex font-bold">Talles disponibles</div>
          <div className="flex flex-row ">
            {stockgender.map((el) => {
              return (
                <div className="flex flex-row">
                  <div>
                    <div class="flex items-center justify-center">
                      <ul class="flex gap-[10px] w-auto md:grid-cols-2">
                        <li>
                          <input
                             onClick={(e)=>handleSize(e)}
                            type="radio"
                            id={el.id}
                            name="hosting"
                            value={el.size}
                            className="hidden peer"
                            required=""
                          />
                          <label
                          
                      
                            for={el.id}
                            className="inline-flex justify-between items-center p-5 w-[auto] h-[40px] text-main-dark bg-main-light  border border-gris-light cursor-pointer dark:hover:text-main-dark dark:border-main-dark dark:peer-checked:text-main-light peer-checked:border-main-dark peer-checked:text-main-light  peer-checked:bg-main-dark hover:text-main-dark hover:bg-gris-light dark:text-main-dark dark:bg-gris-light dark:hover:bg-gris-light "
                          >
                            <div className="flex items-center">
                              <div className="w-full text-lg font-semibold ">
                                {el.size}
                              </div>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {errors !== false && <p className=" flex mt-0 text-[red]">Porfavor seleccione una talla</p>}
        {isAuthenticated ? (
          <div className=" absolute top-[750px]">
          <button
            onClick={postuserClick}
            type="button "
            className="break-inside bg-[#2ea44f] text-main-light border-2 border-transparent  px-6 py-3 mb-4 w-fit h-fit pt-1 pb-1 top-[900px]"
          >
            <div className="  m-auto top-[700px]">
              <div className="flex  flex-row items-center justify-start flex-1 space-x-4 #f8fafc">
                <span className="font-medium flex flex-row">Agregar al Carrito <BsFillCartPlusFill className="text-[20px] ml-[10px]"/></span>
              </div>
            </div>
          </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <p>
              Para poder realizar un pedido,debe{" "}
              <button
                onClick={() => loginWithRedirect()}
                className="text-verde-dark font-bold "
              >
                {" "}
                registrarse / ingresar{" "}
              </button>{" "}
              en la página.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageXDataProduct;
