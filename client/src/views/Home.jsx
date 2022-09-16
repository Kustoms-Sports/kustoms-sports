import { MainPromo, KustomPromo, Carrousel } from "../components"
import { Link } from "react-router-dom"
import hombre from '../assets/hombre.jpg'
import mujer from '../assets/mujer.jpg'
import ninos from '../assets/ninos.jpg'
import { useDispatch, useSelector } from "react-redux"
import { getByDate } from "../redux/actions"

import { useEffect } from 'react'

const Home = () => {
    const dispatch = useDispatch()

    const newest = useSelector(state => state.productByDate)
    useEffect(() => {
        //dispatch(clearCategory())
        dispatch(getByDate())
    }, [])
    return (

        <div className="mb-10 mt-16 min-h-screen">
            <MainPromo />
            <KustomPromo />
            <section className="my-10">
                <h2 className="my-5 text-3xl text-main-dark dark:text-main-light ">Accesorios e indumentarias por categoria</h2>
                <section className=" flex gap-5 flex-row mx-auto overflow-x-scroll justify-evenly w-10/12 flex-wrap">
                    <Link className=" w-96 h-[27.5rem] relative group">
                        <img className=" w-96 h-[27.5rem] object-cover group-hover:blur-sm group-hover:brightness-50 transition-all duration-500" src={hombre} alt="mens category access" />
                        <p className={`absolute hidden text-6xl text-main-light font-bold top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 group-hover:block`}>Hombres</p>
                    </Link>
                    <Link className=" w-96 h-[27.5rem] relative group">
                        <img className=" w-96 h-[27.5rem] object-cover group-hover:blur-sm group-hover:brightness-50 transition-all duration-500" src={mujer} alt="womens category access" />
                        <p className="absolute hidden text-6xl text-main-light  font-bold top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 group-hover:block">Mujeres</p>
                    </Link>
                    <Link className=" w-96 h-[27.5rem] relative group">
                        <img className=" w-96 h-[27.5rem] object-cover group-hover:blur-sm group-hover:brightness-50 transition-all duration-500" src={ninos} alt="kids category access" />
                        <p className="absolute hidden text-6xl text-main-light  font-bold top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 group-hover:block">Niños</p>
                    </Link>
                </section>
            </section>
            <section className="my-36">
                <h2 className="my-5 text-3xl text-main-dark dark:text-main-light ">Ultimas novedades</h2>
                <Carrousel collection={newest} />
            </section>
        </div>

    )
}

export default Home