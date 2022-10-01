import { useState } from 'react'
import { Link } from 'react-router-dom'


const PreviewCard = ({ data }) => {
    const [loadedImage, setLoadedImage] = useState(false)
    if (data) {
        return (
            <>
                <Link to={`/producto/${data.id}`} className={`min-w-[16.3rem] shadow-md h-72 ${loadedImage ? 'block' : 'hidden'}`}>
                    < div className='relative' >
                        <div className="">
                        <img src={data.image[0]} onLoad={() => setLoadedImage(true)} alt="Imagen producto" className='w-full h-52 object-scale-down bg-main-light  ' />
                        


                        </div>
                        {data.promotion > 0 ?
                        <div className='absolute bottom-1 left-1 flex flex-row items-center bg-main-light dark:bg-main-dark px-1'>
                            <span className='text-lg text-main-dark dark:text-main-light line-through'>$</span>
                            <p className=' text-main-dark dark:text-main-light   text-xsm line-through'>{data.price}</p>
                            <span className='text-lg text-verde-dark font-bold ml-2'>$</span>
                            <p className=' text-verde-dark font-bold  text-xsm'>{Math.round(data.price * (1 - data.promotion))}</p>
                        </div>: 
                        <div className='absolute bottom-1 left-1 flex flex-row items-center bg-main-light dark:bg-main-dark px-1'>
                            <span className='text-lg text-main-dark dark:text-main-light'>$</span>
                            <p className=' text-main-dark dark:text-main-light   text-xsm'>{data.price}</p>
                        </div>
                        }
                    </div >
                    <div className='bg-main-light dark:bg-main-dark text-center flex flex-col gap-1 mt-1'>
                        <h2 className=' text-main-dark dark:text-main-light text-base font-bold'>{`${data.name} ${data?.gender}`}</h2>
                        <h2 className=' text-main-dark dark:text-main-light text-base'>{data.brand}</h2>
                        <h4 className=' text-main-dark dark:text-main-light text-xsm'>{`${data.clotheType} ${data.sport}`}</h4>
                    </div>
                </Link >
                <div className={`min-w-[16.3rem] shadow-md h-72 animate-pulse ${loadedImage ? 'hidden' : 'block'}`}>
                    < div className='relative w-full h-52 bg-gris-light dark:bg-gris-dark' >
                        <span className='w-full h-52 ' />
                    </div >
                    <div className='bg-main-light dark:bg-main-dark text-center flex flex-col gap-1 mt-1 h-24'>
                        <span className=' bg-gris-light dark:bg-gris-dark text-base font-bold w-3/4 h-4 mx-auto' />
                        <span className=' bg-gris-light dark:bg-gris-dark text-base font-bold w-8/12 h-4 mx-auto' />
                        <span className=' bg-gris-light dark:bg-gris-dark text-base font-bold w-3/12 h-2 mx-auto' />
                    </div>
                </div >
            </>
        )
    }
}

export default PreviewCard