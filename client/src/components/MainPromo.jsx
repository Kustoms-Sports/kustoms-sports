import { Carrousel } from './index'
import { Link } from 'react-router-dom'
import { getByCategory, clearCategory } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'


const MainPromo = () => {
    const dispatch = useDispatch()
    const collection = useSelector(state => state.productByCategory)

    useEffect(() => {
        dispatch(clearCategory())
        dispatch(getByCategory('collection', 'Qatar'))
    }, [])

    return (
        <article className='w-full'>
            <Link to={'/'} className='relative'>
                <img src="https://thumbs.dreamstime.com/b/world-football-cup-realistic-d-soccer-ball-sport-poster-banner-flyer-modern-design-concept-font-231514598.jpg" alt="imagen promocional" className='w-full h-[30rem] object-cover' />
            </Link>
            <Carrousel collection={collection} />
        </article>
    )
}

export default MainPromo