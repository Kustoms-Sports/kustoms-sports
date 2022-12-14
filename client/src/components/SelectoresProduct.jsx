import { useState } from 'react'
import { MdIron, MdNotInterested } from 'react-icons/md'
import { HiBan } from 'react-icons/hi'
import { VscChevronUp, VscChevronDown } from 'react-icons/vsc'
import { GiWashingMachine } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllowed, getComments, postComment } from '../redux/actions'
import Modal from '../views/ModalComments'
import { useAuth0 } from '@auth0/auth0-react'
import { FaTemperatureHigh } from 'react-icons/fa'
import swal from 'sweetalert2'

const SelectoresProduct = () => {
  const { isAuthenticated, user } = useAuth0()
  const { loginWithRedirect } = useAuth0()
  const email = user?.email
  const dispatch = useDispatch()
  const [desplegable, setDesplegable] = useState(false)
  const [cuidados, setCuidados] = useState(false)
  const [descripcion, setDescripcion] = useState(false)
  const [comentarios, setComentarios] = useState(false)
  const comments = useSelector((state) => state.comments)
  const User = useSelector((state) => state.userCom)
  const allowed = useSelector((state) => state.allowed)
  // const nameCom = useSelector((state) => state.nameComments);
  const details = useSelector((state) => state.details)
  const imagenes = useSelector((state) => state.images)
  const color = useSelector((state) => state.color)
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState({
    email: '',
    name: '',
    text: '',
    rank: 5,
    gender: '',
  })

  useEffect(() => {
    dispatch(getAllowed(email, details.name, details.gender))
    dispatch(getComments(details.name, details.gender))
    setInput({
      email: email,
      name: details.name,
      text: '',
      rank: 5,
      gender: details.gender,
    })
  }, [details, user, email])
  function handleClick(e) {
    setDesplegable(!desplegable)
  }
  function handleClickC(e) {
    setCuidados(!cuidados)
  }
  function handleClickD(e) {
    setDescripcion(!descripcion)
  }

  function handleClickComent(e) {
    setComentarios(!comentarios)
  }
  function closer() {
    get()
    setIsOpen(false)
  }
  function get() {
    dispatch(getComments(details.name, details.gender))
  }

  function handleComment() {
    get()
    //me fijo si ya tiene un comentario en el mismo producto
    let commented = false
    for (let i = 0; i < User.length; i++) {
      if (User[i].email === user.email) {
        commented = true
        break
      }
    }

    if (commented) {
      //si el usuario ya hizo un comentario
      swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'S??lo se admite un comentario por usuario en un producto',
        showConfirmButton: false,
        timer: 2000,
      })
      setIsOpen(false)
    } else {
      //si el usuario no hizo comentario
      if (input.text !== '') {
        dispatch(postComment(input))
        setInput({
          ...input,
          text: '',
          rank: '',
        })
      }
    }
  }

  function handleChangue(e) {
    let malasPalabras = ['culo', 'puto', 'puta', 'mierd', 'pene', 'teta']
    var comm = e.target.value
    for (let i = 0; i < malasPalabras.length; i++) {
      if (comm.includes(malasPalabras[i])) {
        let str = new Array(malasPalabras[i].length + 1).join('*')
        comm = comm.replace(malasPalabras[i], str)
      }
    }
    setInput({
      ...input,
      text: comm,
    })
    setInput({
      ...input,
      [e.target.name]: comm,
    })
  }

  return (
    <div className=" flex flex-col mt-[100px] ml-16 dark:bg-main-dark">
      <ul className="flex flex-col text-justify dark:bg-main-dark">
        <li className="text-main-dark dark:text-main-light text-base py-8 pl-6  border-gris-light border-b flex flex-col w-full dark:bg-main-dark">
          <div className="flex flex-row p-4 font-bold  dark:text-main-light dark:bg-main-dark">
            Comentarios{' '}
            <button onClick={(e) => handleClickComent(e)}>
              {comentarios === false ? <VscChevronDown /> : <VscChevronUp />}
            </button>{' '}
          </div>
          {comentarios !== false && (
            <div className="flex flex-col w-[800px]">
              <div className="flex flex-row">
                <div className=" flex flex-col gap-[50px] ">
                  {User.map((e) => {
                    return (
                      <div>
                        <img
                          src={e.picture}
                          alt="imagen del product"
                          width="80px"
                          height="80px"
                          className="dark:bg-main-dark rounded-full border-[3px] border-verde-dark"
                        />
                        <p>{e.name}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col gap-[100px] ml-[30px] mt-[15px]">
                  {comments.map((e) => {
                    return (
                      <div>
                        <p>{e[0]}</p>
                        <p className="rating">
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-success "
                            defaultChecked
                          />
                          {e[1]}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-row">
                <div className=" flex ">
                  {isAuthenticated ? (
                    <div>
                      {allowed === 'usuario baneado' ? (
                        <p className=" flex flex-row font-bold text-red-dark mt-[20px]">
                          ESTAS BANEADO <HiBan className="text-[20px]" />
                        </p>
                      ) : allowed === 'User allowed' ? (
                        <button
                          onClick={() => setIsOpen(true)}
                          className="flex bottom-0 right-0 ml-[1000px] border rounded  text-[20px] p-1 mr-[10px]font-bold h-[30px]"
                        >
                          Comentar
                        </button>
                      ) : (
                        <p className="mt-[20px]">
                          Debe comprar el producto para poder comentar
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex ">
                      <p>
                        Para poder realizar un comentario,debe{' '}
                        <button
                          onClick={() => loginWithRedirect()}
                          className="text-verde-dark font-bold "
                        >
                          {' '}
                          registrarse / ingresar{' '}
                        </button>{' '}
                        en la p??gina.
                      </p>
                    </div>
                  )}

                  <Modal open={isOpen} onClose={closer}>
                    {' '}
                    {/*este es children de Modal.jsx */}
                    <div className="flex flex-flex row dark:text-main-dark">
                      <label>Comentario:</label>
                      <input
                        className="border-[2px]  mr-[20px]"
                        type="text"
                        value={input.text}
                        name="text"
                        onChange={(e) => handleChangue(e)}
                      ></input>
                      <div className="rating" onClick={(e) => handleChangue(e)}>
                        <input
                          type="radio"
                          value={1}
                          name="rank"
                          className="mask mask-star-2 bg-verde-light "
                        />
                        <input
                          type="radio"
                          value={2}
                          name="rank"
                          className="mask mask-star-2 bg-verde-light "
                        />
                        <input
                          type="radio"
                          value={3}
                          name="rank"
                          className="mask mask-star-2 bg-verde-light "
                        />
                        <input
                          type="radio"
                          value={4}
                          name="rank"
                          className="mask mask-star-2 bg-verde-light "
                        />
                        <input
                          type="radio"
                          value={5}
                          name="rank"
                          className="mask mask-star-2 bg-verde-light "
                        />
                      </div>
                      <button
                        className="absolute bottom-[20px] right-0 border-[2px] m-2 p-1"
                        //onClick={handleComment} onclick={setIsOpen(false)}
                        onClick={() => {
                          handleComment()
                        }}
                      >
                        Comentar
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          )}
        </li>
        <li className="text-main-dark dark:text-main-light text-base py-8 pl-6  border-gris-light border-b flex flex-col w-full dark:bg-main-dark">
          <div className="flex flex-row p-4 font-bold  dark:text-main-light dark:bg-main-dark">
            Descripci??n{' '}
            <button onClick={(e) => handleClickD(e)}>
              {descripcion === false ? <VscChevronDown /> : <VscChevronUp />}
            </button>{' '}
          </div>
          {descripcion !== false && (
            <div className="flex flex-row gap-[25px] dark:bg-main-dark">
              <div className="flex flex-col dark:text-main-light dark:bg-main-dark">
                {details.clotheType === 'Camiseta' && (
                  <div className=" flex flex-col text-[30px] w-[600px] text-border font-bold gap-[15px] ">
                    <p>La nueva {details.name}</p>
                    <p>muy vers??til y c??moda</p>
                  </div>
                )}
                {details.clotheType === 'Musculosa' && (
                  <div className=" flex flex-col text-[30px] w-[600px] text-border font-bold gap-[15px] ">
                    <p> Una {details.name}</p>
                    <p> muy vers??til y c??moda</p>
                  </div>
                )}
                {details.clotheType === 'Zapatillas' && (
                  <div className=" flex flex-col text-[30px] w-[600px] text-border font-bold gap-[15px]  mt-[30px]">
                    <p> {details.name}</p>
                    <p>hechas con la mejor calidad</p>
                  </div>
                )}
                {details.clotheType === 'Pantal??n' && (
                  <div className=" flex flex-col text-[30px] w-[600px] text-border font-bold gap-[15px] ">
                    <p>El nuevo {details.name}</p>
                    <p>con una comodidad ??nica</p>
                  </div>
                )}
                {details.clotheType === 'Short' && (
                  <div className=" flex flex-col text-[30px] w-[600px] text-border font-bold gap-[15px] ">
                    <p>Los Cl??sicos {details.name}</p>
                    <p>hechos con materiales reciclados</p>
                  </div>
                )}
                {details.clotheType === 'Pelota' && (
                  <div className=" flex flex-col text-[30px] w-[600px] text-border font-bold gap-[15px] ">
                    <p>Escribe tu propia historia futbol??stica</p>

                    <p>con la nueva {details.name}</p>
                  </div>
                )}
                {details.clotheType === 'Buzo' && (
                  <div className=" flex flex-col text-[30px] w-[600px] text-border font-bold gap-[15px] mt-[100px] ">
                    <p>Luc?? un estilo ??nico y c??modo con</p>

                    <p>el nuevo {details.name}</p>
                  </div>
                )}
                {details.clotheType === 'Campera' && (
                  <div className=" flex flex-col text-[30px] w-[600px] text-border font-bold gap-[15px] mt-[50px] ">
                    <p>Luc?? un estilo ??nico y c??modo con</p>

                    <p>la nueva {details.name}</p>
                  </div>
                )}

                <div>
                  {details.clotheType === 'Camiseta' && (
                    <div>
                      <p className="w-[600px] mt-[10px]">
                        La nueva {details.name} ofrece comodidad en todo momento
                        gracias a su tejido suave con tecnolog??a de absorci??n
                        AEROREADY.
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Los detalles en la parte interior trasera del cuello
                        est??n inspirados en la bandera nacional que los
                        jugadores representan con tanto orgullo. Un producto
                        hecho parcialmente con contenido reciclado generado a
                        partir de desechos de producci??n, tales como recortes de
                        tela, y desechos dom??sticos postconsumo, para evitar un
                        mayor impacto ambiental al producir contenido virgen.
                      </p>
                    </div>
                  )}
                  {details.clotheType === 'Zapatillas' && (
                    <div>
                      <p className="w-[600px] mt-[10px]">
                        Kustoms Sports ha dise??ado sus zapatillas pensando en la
                        comodidad de los clientes. Estas zapatillas{' '}
                        {details.name} son perfectas para todo momento y lugar,
                        pero eso no quiere decir que no incorporen tecnolog??a
                        innovadora. La plantilla suave brinda soporte, sin
                        importar la frecuencia con que las us??s.
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Hecho con una serie de materiales reciclados, el
                        exterior incorpora al menos un 50 % de contenido
                        reciclado. Este producto representa solo una de nuestras
                        soluciones para acabar con los residuos pl??sticos.
                      </p>
                    </div>
                  )}
                  {details.clotheType === 'Musculosa' && (
                    <div>
                      <p className="w-[600px] mt-[10px]">
                        Sin importar si estas jugando un partido en el parque,
                        entrenando en el gimnasio o levantando pesas, esta{' '}
                        {details.name}ofrece comodidad. Su corte holgado te
                        permite moverte libremente y el tejido con tecnolog??a de
                        absorci??n AEROREADY te mantiene seco y fresco en los
                        momentos m??s intensos.
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Este producto est?? hecho con Primegreen, una serie de
                        materiales reciclados de alto desempe??o
                      </p>
                    </div>
                  )}
                  {details.clotheType === 'Pantal??n' && (
                    <div>
                      <p className="w-[600px] mt-[10px]">
                        Presentamos el nuevo {details.name}, un cl??sico
                        atemporal llevado a nuevas alturas.
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Este pantal??n ha sido redise??ado con nuestro toque m??s
                        pr??mium. La silueta estilizada y la entrepierna ca??da
                        ofrecen un ajuste m??s moderno, mientras que los cierres
                        en los tobillos te permiten personalizar la forma en que
                        muestras tus rayas.
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Los estribos integrados te mantienen listo para la
                        acci??n intensa, pero seamos realistas, lo m??s probable
                        es que lo us??s para verte muy cool mientras descans??s.
                      </p>
                    </div>
                  )}
                  {details.clotheType === 'Campera' && (
                    <div>
                      <p className="w-[600px] mt-[10px]">
                        Presentamos la nueva {details.name}
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Las cosas parecen estar en constante movimiento. Segu??
                        tu propio ritmo con este rompevientos adidas. El
                        material estilizado y el corte holgado te permiten
                        usarlo c??modamente sobre tu ropa para ayudar a bloquear
                        la brisa. La capucha con cord??n de ajuste tambi??n juega
                        un rol importante en mantenerte protegido de los
                        elementos.
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Cuando el viento por fin cesa, lo pod??s doblar y guardar
                        en su propio bolsillo para llevarlo a donde vay??s con
                        comodidad. Su dise??o liviano ocupa muy poco espacio, y
                        el clima puede cambiar en un abrir y cerrar de ojos.
                      </p>
                    </div>
                  )}
                  {details.clotheType === 'Short' && (
                    <div>
                      <p className="w-[600px] mt-[10px]">
                        Los nuevos {details.name} siguen el ejemplo de la
                        camiseta a la que acompa??an. Creados para mantener
                        c??modo al hincha, est??n hechos de tejido suave y cuentan
                        con tecnolog??a de absorci??n AEROREADY. EL logo de la
                        selecci??n bordado le pone el toque final al dise??o.
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Hecho con materiales 100% reciclados, este producto
                        representa solo una de nuestras soluciones para acabar
                        con los residuos pl??sticos.
                      </p>
                    </div>
                  )}
                  {details.clotheType === 'Pelota' && (
                    <div>
                      <p className="w-[600px] mt-[10px]">
                        La nueva {details.name} ofrece un toque suave y una gran
                        resistencia al desgaste.La {details.name}
                        est?? cosida a m??quina para una mayor fiabilidad.
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Su c??mara de butilo a mantiene inflada por m??s tiempo,
                        sin importar si est??s en el campo de entrenamiento o en
                        el parque.
                      </p>
                    </div>
                  )}
                  {details.clotheType === 'Buzo' && (
                    <div className=" flex  flex-col justify-center items-center ">
                      <p className="w-[600px] mt-[10px]">
                        No subestimes el poder de un buen buzo. Este de{' '}
                        {details.name}
                        se puede combinar con varios atuendos, adem??s de
                        proporcionar una gran comodidad y reflejar tu confianza
                        en vos mismo.Ponetelo y disfrut??.
                      </p>
                      <p className="w-[600px] mt-[10px]">
                        Nuestros productos de algod??n apoyan el cultivo de
                        algod??n sostenible.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                {details.clotheType === 'Pelota' ? (
                  <img
                    src={imagenes[2]}
                    alt="imagen del product"
                    width="350px"
                    height="350px"
                    className="ml-[30px]"
                  />
                ) : (
                  <img
                    src={imagenes[1]}
                    alt="imagen del product"
                    width="450px"
                    height="450px"
                  />
                )}
              </div>
            </div>
          )}
        </li>
        {details.clotheType !== 'Pelota' ||
          (details.clotheType !== 'Zapatillas' && (
            <li className="text-main-dark dark:text-main-light text-base py-8 pl-6  border-gris-light border-b flex flex-col gap[5px] w-full dark:bg-main-dark">
              <div className="flex flex-row p-4 font-bold dark:text-main-light dark:bg-main-dark">
                Cuidados{' '}
                <button onClick={(e) => handleClickC(e)}>
                  {cuidados === false ? <VscChevronDown /> : <VscChevronUp />}
                </button>{' '}
              </div>
              {cuidados !== false && (
                <div className="flex flex-row gap-[50px] dark:text-main-light dark:bg-main-dark">
                  {details.clotheType === 'Buzo' && (
                    <div className="flex flex-row gap-[50px] dark:text-main-light dark:bg-main-dark">
                      <div className="flex flex-row gap-[50px] dark:text-main-light dark:bg-main-dark">
                        <div>
                          <div className="text-[25px] mt-[10px] p-8 font-bold">
                            INSTRUCCIONES DE LAVADO
                          </div>
                          <ul className="grid-cols-2 mt-[25px]">
                            <li className="flex flex-row mt-[10px]">
                              <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                              No usar blanqueador
                            </li>
                            <li className="flex flex-row mt-[10px]">
                              <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                              No lavar en seco
                            </li>
                            <li className="flex flex-row mt-[10px]">
                              <GiWashingMachine className="w-[30px] h-[30px] mr-[10px]" />
                              Lavar m??quina en temperatura fr??a
                            </li>
                            <li className="flex flex-row mt-[10px]">
                              <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                              No utilizar secadora{' '}
                            </li>
                            <li className="flex flex-row mt-[10px]">
                              <MdIron className="w-[30px] h-[30px] mr-[10px]" />
                              Planchar a temperatura baja{' '}
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-[25px] mt-[10px] w-[550px] p-8 font-bold">
                            INFORMACI??N ADICIONAL SOBRE EL CUIDADO
                          </div>
                          <ul className="flex flex-col ml-[20px] gap-[20px]">
                            <li className="list-disc">
                              Usar ??nicamente detergente suave
                            </li>
                            <li className="list-disc">
                              Lavar al rev??s con colores similares
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {details.clotheType === 'Musculosa' && (
                    <div className="flex flex-row gap-[50px] dark:text-main-light dark:bg-main-dark">
                      <div className="flex flex-row gap-[50px] dark:text-main-light dark:bg-main-dark">
                        <div>
                          <div className="text-[25px] mt-[10px] p-8 font-bold">
                            INSTRUCCIONES DE LAVADO
                          </div>
                          <ul className="grid-cols-2 mt-[25px]">
                            <li className="flex flex-row mt-[10px]">
                              <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                              No usar blanqueador
                            </li>
                            <li className="flex flex-row mt-[10px]">
                              <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                              No lavar en seco
                            </li>
                            <li className="flex flex-row mt-[10px]">
                              <GiWashingMachine className="w-[30px] h-[30px] mr-[10px]" />
                              Lavar m??quina en temperatura fr??a
                            </li>

                            <li className="flex flex-row mt-[10px]">
                              <MdIron className="w-[30px] h-[30px] mr-[10px]" />
                              Planchar a temperatura baja{' '}
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-[25px] mt-[10px] w-[550px] p-8 font-bold">
                            INFORMACI??N ADICIONAL SOBRE EL CUIDADO
                          </div>
                          <ul className="flex flex-col ml-[20px] gap-[20px]">
                            <li className="list-disc">No usar suavizante</li>
                            <li className="list-disc">
                              Usar ??nicamente detergente suave
                            </li>
                            <li className="list-disc">
                              Lavar con colores similares
                            </li>
                            <li className="list-disc">
                              Retirar r??pidamente despu??s de lavar
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {details.clotheType === 'Camiseta' && (
                    <div className="flex flex-row gap-[50px] dark:text-main-light dark:bg-main-dark">
                      <div>
                        <div className="text-[25px] mt-[10px] p-8 font-bold">
                          INSTRUCCIONES DE LAVADO
                        </div>
                        <ul className="grid-cols-2 mt-[25px]">
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No usar blanqueador
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No lavar en seco
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <GiWashingMachine className="w-[30px] h-[30px] mr-[10px]" />
                            Lavar m??quina en temperatura fr??a
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No utilizar secadora{' '}
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <MdIron className="w-[30px] h-[30px] mr-[10px]" />
                            Planchar a temperatura baja{' '}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-[25px] mt-[10px] w-[550px] p-8 font-bold">
                          INFORMACI??N ADICIONAL SOBRE EL CUIDADO
                        </div>
                        <ul className="flex flex-col ml-[20px] gap-[20px]">
                          <li className="list-disc">No usar suavizante</li>
                          <li className="list-disc">
                            Lavar y planchar al rev??s
                          </li>
                          <li className="list-disc">Retirar inmediatamente</li>
                          <li className="list-disc">Secar en tendedero</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {details.clotheType === 'Campera' && (
                    <div className="flex flex-row gap-[50px] dark:text-main-light dark:bg-main-dark">
                      <div>
                        <div className="text-[25px] mt-[10px] p-8 font-bold">
                          INSTRUCCIONES DE LAVADO
                        </div>
                        <ul className="grid-cols-2 mt-[25px]">
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No usar blanqueador
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No lavar en seco
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <GiWashingMachine className="w-[30px] h-[30px] mr-[10px]" />
                            Lavar m??quina en temperatura fr??a
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-[25px] mt-[10px] w-[550px] p-8 font-bold">
                          INFORMACI??N ADICIONAL SOBRE EL CUIDADO
                        </div>
                        <ul className="flex flex-col ml-[20px] gap-[20px]">
                          <li className="list-disc">
                            Lavar colores claros por separados de colores
                            oscuros
                          </li>
                          <li className="list-disc">Lavar al rev??s</li>
                          <li className="list-disc">
                            Lavar a maquina con agua fr??a y en ciclo delicado
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {details.clotheType === 'Short' && (
                    <div className="flex flex-row gap-[50px] dark:text-main-light dark:bg-main-dark">
                      <div>
                        <div className="text-[25px] mt-[10px] p-8 font-bold">
                          INSTRUCCIONES DE LAVADO
                        </div>
                        <ul className="grid-cols-2 mt-[25px]">
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No usar blanqueador
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No lavar en seco
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <GiWashingMachine className="w-[30px] h-[30px] mr-[10px]" />
                            Lavar m??quina en temperatura fr??a
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No utilizar secadora{' '}
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <MdIron className="w-[30px] h-[30px] mr-[10px]" />
                            Planchar a temperatura baja{' '}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-[25px] mt-[10px] w-[550px] p-8 font-bold">
                          INFORMACI??N ADICIONAL SOBRE EL CUIDADO
                        </div>
                        <ul className="flex flex-col ml-[20px] gap-[20px]">
                          <li className="list-disc">No usar suavizante</li>
                          <li className="list-disc">
                            Lavar y planchar al rev??s
                          </li>
                          <li className="list-disc">Retirar inmediatamente</li>
                          <li className="list-disc">Secar en tendedero</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {details.clotheType === 'Pantal??n' && (
                    <div className="flex flex-row gap-[50px] dark:text-main-light dark:bg-main-dark">
                      <div>
                        <div className="text-[25px] mt-[10px] p-8 font-bold">
                          INSTRUCCIONES DE LAVADO
                        </div>
                        <ul className="grid-cols-2 mt-[25px]">
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No usar blanqueador
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <MdNotInterested className="w-[30px] h-[30px] mr-[10px]" />
                            No lavar en seco
                          </li>
                          <li className="flex flex-row mt-[10px]">
                            <FaTemperatureHigh className="w-[30px] h-[30px] mr-[10px]" />
                            Lavar a m??quina a temperatura alta
                          </li>

                          <li className="flex flex-row mt-[10px]">
                            <MdIron className="w-[30px] h-[30px] mr-[10px]" />
                            Planchar a temperatura baja{' '}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-[25px] mt-[10px] w-[550px] p-8 font-bold">
                          INFORMACI??N ADICIONAL SOBRE EL CUIDADO
                        </div>
                        <ul className="flex flex-col ml-[20px] gap-[30px]">
                          <li className="list-disc">No usar suavizante</li>
                          <li className="list-disc">
                            Usar ??nicamente detergente suave
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        <li className="text-main-dark dark:text-main-light text-base py-8 pl-6  border-gris-light border-b flex flex-col gap-[5px] w-full  dark:bg-main-dark">
          <div className="flex flex-row p-4 font-bold dark:text-main-light dark:bg-main-dark">
            Detalles{' '}
            <button onClick={(e) => handleClick(e)}>
              {desplegable === false ? <VscChevronDown /> : <VscChevronUp />}
            </button>{' '}
          </div>
          {desplegable !== false && (
            <div className="dark:text-main-light dark:bg-main-dark">
              {details.clotheType === 'Camiseta' && (
                <div className="flex flex-row gap-[30px]">
                  <div className="gap-[5px]">
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Corte ajustado</li>
                      <li className="list-disc">Cuello redondo acanalado</li>
                      <li className="list-disc">
                        Tejido de punto doble 100 % poli??ster reciclado
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">
                        Tecnolog??a de absorci??n AEROREADY
                      </li>
                      <li className="list-disc">
                        Paneles de malla en los costados
                      </li>
                      <li className="list-disc">Pu??os acanalados</li>
                    </ul>
                  </div>
                </div>
              )}
              {details.clotheType === 'Musculosa' && (
                <div className="flex flex-row gap-[30px]">
                  <div className="gap-[5px]">
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Corte holgado</li>
                      <li className="list-disc">Cuello redondo</li>
                      <li className="list-disc">
                        Tejido de punto doble 100 % poli??ster reciclado
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">
                        Tecnolog??a de absorci??n AEROREADY
                      </li>
                      <li className="list-disc">Tejido absorbente</li>
                      <li className="list-disc">Primegreen</li>
                    </ul>
                  </div>
                </div>
              )}
              {details.clotheType === 'Zapatillas' && (
                <div className="flex flex-row gap-[30px]">
                  <div className="gap-[5px]">
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Ajuste cl??sico</li>
                      <li className="list-disc">
                        Sistema de atado de cordones
                      </li>
                      <li className="list-disc">Forro interno textil</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Plantilla OrthoLite??</li>
                      <li className="list-disc">Suela de caucho</li>
                      <li className="list-disc">Primegreen</li>
                    </ul>
                  </div>
                </div>
              )}
              {details.clotheType === 'Campera' && (
                <div className="flex flex-row gap-[30px]">
                  <div className="gap-[5px]">
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Corte holgado</li>
                      <li className="list-disc">
                        Cierre frontal y gorro con cord??n de ajuste
                      </li>
                      <li className="list-disc">
                        Tejido de punto doble 100 % poli??ster reciclado
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">
                        Bolsillos frontales con cierre
                      </li>
                      <li className="list-disc">
                        Pu??os y dobladillo el??sticos
                      </li>
                      <li className="list-disc">Primegreen</li>
                      <li className="list-disc">
                        Color del art??culo: {color.color}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {details.clotheType === 'Buzo' && (
                <div className="flex flex-row gap-[30px]">
                  <div className="gap-[5px]">
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Ajuste cl??sico</li>
                      <li className="list-disc">
                        Capucha con cord??n de ajuste
                      </li>
                      <li className="list-disc">
                        Felpa francesa 70 % algod??n, 30 % poli??ster reciclado
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Bolsillo canguro</li>
                      <li className="list-disc">
                        Pu??os de las mangas y dobladillo ajustados
                      </li>
                      <li className="list-disc">Pu??os acanalados</li>
                    </ul>
                  </div>
                </div>
              )}
              {details.clotheType === 'Short' && (
                <div className="flex flex-row gap-[30px]">
                  <div className="gap-[5px]">
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">
                        Ajuste cl??sico con tiro medio
                      </li>
                      <li className="list-disc">
                        Cintura el??stica con cord??n regulable
                      </li>
                      <li className="list-disc">
                        Tejido de punto doble 100 % poli??ster reciclado
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">
                        Tecnolog??a de absorci??n AEROREADY
                      </li>
                      <li className="list-disc">
                        Escudo de la Selecci??n bordado
                      </li>
                      <li className="list-disc">
                        Color del art??culo:{color.color}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {details.clotheType === 'Pantal??n' && (
                <div className="flex flex-row gap-[30px]">
                  <div className="gap-[5px]">
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Corte c??nico ajustado</li>
                      <li className="list-disc">
                        Cintura el??stica con cord??n regulable
                      </li>
                      <li className="list-disc">
                        Tejido de punto doble 100 % poli??ster reciclado
                      </li>
                      <li className="list-disc">Absorbentes</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Cierres en los tobillos</li>
                      <li className="list-disc">Primegreen</li>
                      <li className="list-disc">
                        Color del art??culo:{color.color}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {details.clotheType === 'Pelota' && (
                <div className="flex flex-row gap-[30px]">
                  <div className="gap-[5px]">
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Exterior 100 % TPU</li>
                      <li className="list-disc">C??mara de butilo</li>
                      <li className="list-disc">Exterior cosido a m??quina</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-[15px]">
                      <li className="list-disc">Requiere ser inflada</li>
                      <li className="list-disc">
                        Color del art??culo:{color.color}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
    </div>
  )
}

export default SelectoresProduct
