import React, { useEffect, useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import Cloudinary from "./Cloudinary";
import { useDispatch } from "react-redux";
import { postAddProduct } from "../redux/actions";
import swal from "sweetalert2";
import ModificarProd from "./ModificarProd";
import AllComentarios from "./AllComentarios";
import BarChart from "./BarChart";
import DashUserTable from "./DashUserTable"
import logoLargoLight from '../assets/logoLargoLight.png'
import logoLargo from '../assets/logoLargo.png'

const Dashboard = () => {
  const [productos, setProductos] = useState(false);
  const [state, setState] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorImg, setErrorImg] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [show, setShow] = useState("x")
  const [logo, setLogo] = useState(false);

  const dispatch = useDispatch();
  const [addproduct, setAddProduct] = useState({
    id: "",
    clotheType: "",
    brand: "",
    name: "",
    gender: "Masculino",
    sport: "",
    collection: "",
    color: "",
    size: "S",
    image: [],
    stock: 0,
    price: 0,
    promotion: 0,
  });
  function validate(addproduct) {
    let errors = {};

    if (addproduct.name.length > 50) {
      errors.name = "Inserte un nombre menor a 50 caracteres";
    }
    if (addproduct.name === "") {
      errors.name = "Inserte un nombre para el producto";
    } else if (!/^[a-zA-Z\s]*$/.test(addproduct.name)) {
      errors.name = "El nombre no puede contener,carácteres o números";
    }
    if (addproduct.sport.length > 15) {
      errors.sport = "Inserte un nombre de deporte menor a 15 caracteres";
    }
    if (addproduct.sport === "") {
      errors.sport = "Inserte un tipo de  deporte para el producto";
    } else if (!/^[a-zA-Z\s]*$/.test(addproduct.name)) {
      errors.sport =
        "El nombre del deporte no puede contener,carácteres o números";
    }
    if (addproduct.clotheType.length > 15) {
      errors.clotheType = "Inserte un tipo de producto menor a 15 caracteres";
    }
    if (addproduct.clotheType === "") {
      errors.clotheType = "Inserte un tipo de producto ";
    } else if (!/^[a-zA-Z\s]*$/.test(addproduct.name)) {
      errors.clotheType =
        "El nombre del tipode producto no puede contener,carácteres o números";
    }
    if (addproduct.brand.length > 15) {
      errors.brand = "Inserte una marca menor a 15 caracteres";
    }
    if (addproduct.brand === "") {
      errors.brand = "Inserte un nombre para la marca del producto";
    }
    if (addproduct.collection.length > 15) {
      errors.collection =
        "Inserte una  tipo de colección menor a 15 caracteres";
    }
    if (addproduct.collection === "") {
      errors.collection =
        "Inserte un nombre para el tipo de colección del producto";
    }
    if (
      addproduct.price < 0 ||
      addproduct.price === 0 ||
      !addproduct.price ||
      !/^[0-9]+$/.test(addproduct.price)
    ) {
      errors.price = "Declarar un precio con valor mayor a 0 ";
    }
    if (addproduct.color.length > 20) {
      errors.color = "Inserte colores menores  a 20 caracteres en total";
    }
    if (addproduct.color === "") {
      errors.color = "Inserte colores para el producto";
    } else if (!/^[a-zA-Z\s]*$/.test(addproduct.name)) {
      errors.color =
        "El tipo de color del producto no puede contener,carácteres o números";
    }
    if (
      addproduct.stock < 0 ||
      addproduct.stock === 0 ||
      !addproduct.stock ||
      !/^[0-9]+$/.test(addproduct.stock)
    ) {
      errors.stock = "Declarar un precio con valor mayor a 0 ";
    }
    if (
      addproduct.promotion < 0 ||
      addproduct.promotion === 0 ||
      addproduct.promotion > 100
    ) {
      errors.promotion = "Declarar un precio con valor entre  0 y 100 ";
    }
    return errors;
  }
  function handleClickD(e) {
    setProductos(!productos);
  }
  function handleAgregar() {
    setState(!state);
    setShow("x")
    if(modificar === true){
      setModificar(!modificar)
    }
    if(logo === false){
      setLogo(!logo)
     }
  }
  function handleCom (){
    if (show.length){ 
      setShow("comentario")
      setModificar(false)
      setState(false)
      setProductos(false)
    }
    if(logo === false){
      setLogo(!logo)
     }
    
  }
  function handleGraf (){
    if (show.length){
      setShow("graph")
      setModificar(false)
      setState(false)
      setProductos(false)
    }
    if(logo === false){
      setLogo(!logo)
     }
    
  }
  function handleUser (){
    if (show.length){
      setShow("users")
      setModificar(false)
      setState(false)
      setProductos(false)
    }
    if(logo === false){
      setLogo(!logo)
     }
  }
  function handleChange(e) {
    setAddProduct({
      ...addproduct,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...addproduct,
        [e.target.name]: e.target.value,

      })
    );
  }
  
  function handleNumber(e) {
    setAddProduct({
      ...addproduct,
      [e.target.name]: parseInt(e.target.value),
    });
    setErrors(
      validate({
        ...addproduct,
        [e.target.name]: parseInt(e.target.value),
      })
    );
  }
  function postProduct() {
    if(addproduct.image.length === 0){
      setErrorImg(!errorImg)
    }
    if (
      errors.name ||
      errors.price ||
      errors.stock ||
      errors.clotheType ||
      errors.brand ||
      errors.sport ||
      errors.collection ||
      errors.color ||
      errors.promotion ||
      addproduct.name === "" ||
      addproduct.collection === "" ||
      addproduct.color === "" ||
      addproduct.sport === "" ||
      addproduct.price === 0 ||
      addproduct.image.length === 0 ||
      addproduct.stock === 0 ||
      addproduct.promotion === 0 ||
      addproduct.clotheType === "" ||
      addproduct.brand === ""
    ) {
      swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error,corriga los errores!",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      dispatch(postAddProduct(addproduct));
      swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto agregado !",
        showConfirmButton: false,
        timer: 1000,
      });
      setAddProduct({
        id: "",
        clotheType: "",
        brand: "",
        name: "",
        gender: "Masculino",
        sport: "",
        collection: "",
        color: "",
        size: "S",
        image: [],
        stock: 0,
        price: 0,
        promotion: 0,
      });
      window.location.reload()
    }
  }
  function handleModificar(e){
     setModificar(!modificar)
     setShow("x")
     if(state === true){
       setState(!state)
     }
     if(logo === false){
      setLogo(!logo)
     }
     
  }

  return (
    <div className="mt-[150px] ml-[250px] mb-[100px] flex flex-row">
      <div class="min-h-screen bg-gray-100">
        <div class="sidebar min-h-screen  overflow-hidden border-r border-l border-b border-t w-56 bg-white shadow-lg">
          <div class="flex h-screen flex-col justify-between pt-2 pb-6">
            <div>
              <div class="w-max p-2.5">
              <img src={logoLargoLight} className='h-10 w-auto ' alt="logo-kustoms" />
              </div>
              <ul class="mt-6 space-y-2 tracking-wide">
                <li class=" min-w-max">
                  <a
                    href="#"
                    aria-label="dashboard"
                    class="relative flex  items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white"
                  >
                    <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                        class="fill-current text-cyan-400 dark:fill-slate-600"
                      ></path>
                      <path
                        d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                        class="fill-current text-cyan-200 group-hover:text-cyan-300"
                      ></path>
                      <path
                        d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                        class="fill-current group-hover:text-sky-300"
                      >
                        {" "}
                        Hola{" "}
                      </path>
                    </svg>
                    <div className="flex flex-col ">
                      <div className="flex flex-row">
                        <span class="-mr-1 font-medium">Productos</span>
                        <button
                          onClick={(e) => handleClickD(e)}
                          className=" ml-[10px]"
                        >
                          {productos === false ? (
                            <VscChevronDown />
                          ) : (
                            <VscChevronUp />
                          )}
                        </button>{" "}
                      </div>
                      <div className=" flex flex-col">
                        {productos !== false && (
                          <div className=" flex flex-col">
                            <ul class="flex flex-col gap-[5px] w-auto md:grid-cols-2">
                              <li>
                                <input
                                  onClick={(e) => handleAgregar(e)}
                                  type="radio"
                                  id="agregar"
                                  name="hosting"
                                  value="agregar"
                                  className="hidden peer"
                                  required=""
                                />
                                <label
                                  for="agregar"
                                  className="inline-flex justify-between items-center p-3 w-[auto] h-[10px] text-main-dark bg-main-light  border border-gris-light cursor-pointer dark:hover:text-main-dark dark:border-main-dark dark:peer-checked:text-main-light peer-checked:border-main-dark peer-checked:text-main-light  peer-checked:bg-main-dark hover:text-main-dark hover:bg-gris-light dark:text-main-dark dark:bg-gris-light dark:hover:bg-gris-light "
                                >
                                  <div className="flex items-center">
                                    <div className="w-full text-[15px] font-semibold ">
                                      Agregar Producto
                                    </div>
                                  </div>
                                </label>
                              </li>
                              <li>
                                <input
                                  onClick={(e) =>handleModificar(e)}
                                  type="radio"
                                  id="modificar"
                                  name="hosting"
                                  value="modificar"
                                  className="hidden peer"
                                  required=""
                                />
                                <label
                                  for="modificar"
                                  className="inline-flex justify-between items-center p-3 w-[auto] h-[10px] text-main-dark bg-main-light  border border-gris-light cursor-pointer dark:hover:text-main-dark dark:border-main-dark dark:peer-checked:text-main-light peer-checked:border-main-dark peer-checked:text-main-light  peer-checked:bg-main-dark hover:text-main-dark hover:bg-gris-light dark:text-main-dark dark:bg-gris-light dark:hover:bg-gris-light "
                                >
                                  <div className="flex items-center">
                                    <div className="w-full text-[15px] font-semibold ">
                                      Modificar Producto
                                    </div>
                                  </div>
                                </label>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </li>
                <li class="min-w-max">
                  <a
                    href="#"
                    class="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        class="fill-current text-gray-300 group-hover:text-cyan-300"
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                        clip-rule="evenodd"
                      />
                      <path
                        class="fill-current text-gray-600 group-hover:text-cyan-600"
                        d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                      />
                    </svg>
                    <button onClick={handleCom}><span class="group-hover:text-gray-700">Comentarios</span></button>
                  </a>
                </li>
                <li class="min-w-max">
                  <a
                    href="#"
                    class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        class="fill-current text-gray-600 group-hover:text-cyan-600"
                        fill-rule="evenodd"
                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                        clip-rule="evenodd"
                      />
                      <path
                        class="fill-current text-gray-300 group-hover:text-cyan-300"
                        d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                      />
                    </svg>
                    <span onClick={handleUser} class="group-hover:text-gray-700">Usuarios</span>
                  </a>
                </li>
                <li class="min-w-max">
                  <a
                    href="#"
                    class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        class="fill-current text-gray-600 group-hover:text-cyan-600"
                        d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                      />
                      <path
                        class="fill-current text-gray-300 group-hover:text-cyan-300"
                        d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                      />
                    </svg>
                    <span onClick={handleGraf} class="group-hover:text-gray-700">Graficos</span>
                  </a>
                </li>
                <li class="min-w-max">
                  <a
                    href="#"
                    class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        class="fill-current text-gray-300 group-hover:text-cyan-300"
                        d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
                      />
                      <path
                        class="fill-current text-gray-600 group-hover:text-cyan-600"
                        fill-rule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="group-hover:text-gray-700">Finance</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="w-max -mb-3">
              <a
                href="#"
                class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 group-hover:fill-cyan-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="group-hover:text-gray-700">Settings</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1000px] h-[940px] border-[1px] bg-gris-light  ">
        {logo === false?<div  className="flex items-center justify-center"><img src={logoLargo} className="  w-[600px] h-[200px]"/></div>:<div>
        {state !== false && (
          <div class="max-w-2xl mx-auto bg-white p-16">
            <form>
              <div class="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    for="first_name"
                    className=" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Camiseta Selección Argentina"
                    onChange={(e) => handleChange(e)}
                    name="name"
                    value={addproduct.name}
                  />
                  {errors?.name && (
                    <p className="text-[15px] text-[red]">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    for="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Marca
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nike"
                    required
                    onChange={(e) => handleChange(e)}
                    name="brand"
                    value={addproduct.brand}
                  />
                  {errors?.brand && (
                    <p className="text-[15px] text-[red]">{errors.brand}</p>
                  )}
                </div>
                <div>
                  <label
                    for="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Colección
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Qatar"
                    required
                    onChange={(e) => handleChange(e)}
                    name="collection"
                    value={addproduct.collection}
                  />
                  {errors?.collection && (
                    <p className="text-[15px] text-[red]">
                      {errors.collection}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    for="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Precio
                  </label>
                  <input
                    type="number"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="$20000"
                    required
                    onChange={(e) => handleNumber(e)}
                    name="price"
                    value={addproduct.price}
                  />
                  {errors?.price && (
                    <p className="text-[15px] text-[red]">{errors.price}</p>
                  )}
                </div>
                <div>
                  <label
                    for="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Colores del Producto
                  </label>
                  <input
                    type="text"
                    id="website"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Celeste/Blanco"
                    required
                    onChange={(e) => handleChange(e)}
                    name="color"
                    value={addproduct.color}
                  />
                  {errors?.color && (
                    <p className="text-[15px] text-[red]">{errors.color}</p>
                  )}
                </div>
                <div>
                  <label
                    for="visitors"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Stock{" "}
                  </label>
                  <input
                    type="number"
                    id="visitors"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="5"
                    required
                    onChange={(e) => handleNumber(e)}
                    name="stock"
                    value={addproduct.stock}
                  />
                  {errors?.stock && (
                    <p className="text-[15px] text-[red]">{errors.stock}</p>
                  )}
                </div>
                <div>
                  <label
                    for="visitors"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Promoción{" "}
                  </label>
                  <input
                    type="number"
                    id="visitors"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    placeholder="0.5"
                    required
                    onChange={(e) => handleNumber(e)}
                    value={addproduct.promotion}
                    name="promotion"
                  />
                  {errors?.promotion && (
                    <p className="text-[15px] text-[red]">{errors.promotion}</p>
                  )}
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Deporte
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Fútbol"
                    required
                    onChange={(e) => handleChange(e)}
                    name="sport"
                    value={addproduct.sport}
                  />
                  {errors?.sport && (
                    <p className="text-[15px] text-[red]">{errors.sport}</p>
                  )}
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Tipo de Producto
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Camiseta"
                    required
                    onChange={(e) => handleChange(e)}
                    name="clotheType"
                    value={addproduct.clotheType}
                  />
                  {errors?.clotheType && (
                    <p className="text-[15px] text-[red]">
                      {errors.clotheType}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-row">
                <div className=" flex items-start mb-6 ">
                  Género:
                  <select
                    className="border-[1px] rounded-sm ml-[100px] "
                    onChange={(e) => handleChange(e)}
                    name="gender"
                    value={addproduct.gender}
                  >
                    <option>Masculino</option>
                    <option>Femenino</option>
                    <option>Unisex</option>
                  </select>
                </div>
                <div className=" flex ml-[20px] mb-6 ">
                  Talle:
                  <input type="text" value={addproduct.size} onChange={(e)=>handleChange(e)} name="size" className="border-[1px] w-[70px] pl-2 text-s pr-2 rounded-sm ml-[5px] "/>
                </div>
              </div>
            </form>
            <div className="flex flex-row">
              <div>
                <Cloudinary addproduct={addproduct} />
              </div>
              {errorImg !== false || addproduct.image.length === 0 &&<p className="text-[15px] text-[red]">Porfavor cargue una imágen</p>}
              <div>
                <button
                  type="submit"
                  className="text-white  text-[30px] ml-[80px] border-[1px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={postProduct}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
        {modificar !== false&& 
        <div>
          <ModificarProd/>
          </div>}
          {
           show === "comentario" &&
            <div>
              <AllComentarios/>
            </div>
          }
          {
            show === "users" &&
            <div>
              <DashUserTable/>
            </div>
          }

          {
            show === "graph" &&
            <div>
              <BarChart/>
            </div>
          }
        </div>}
      </div>
    </div>
  );
};

export default Dashboard;
