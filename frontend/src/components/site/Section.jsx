/* eslint-disable react/prop-types */

// import { useNavigate } from 'react-router-dom'

const Section = ({ele , i}) => {

    // const navigate = useNavigate();

    const handleEdit = () => {
        // navigate('/update',{state:{item: ele}}) 
    }
    return (
        <div key={ i } className='flex flex-col gap-2 w-full p-2 border shadow-xl hover:scale-105 duration-300 cursor-pointer'>
            <img src={ ele.imageURL } alt="" className='w-full h-[150px] md:h-[200px] ' />
            <div className='flex w-full justify-between'>
                <p className='text-[#525FE1] font-light'>{ ele.name }</p>
                <p className='text-[#525FE1] font-light'>₹{ ele.price }</p>
            </div>
            <button onClick={ handleEdit } className='bg-[#FFA41B] text-white font-medium py-1 rounded-md text-center'>Edit</button>
        </div>
    )
}

export default Section
