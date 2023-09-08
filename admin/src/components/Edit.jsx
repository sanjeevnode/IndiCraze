import React from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';


const Edit = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const location = useLocation();

    const updateItem = async (data) => {
        const res = await fetch(`http://localhost:5000/api/fooditem/update/${location.state.item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return res;
    }


    const formSubmit = async (data, e) => {
        const res = await updateItem(data);
        if (res.ok) {
            e.target.reset();
            navigate('/home', { replace: true });
        }
        else {
            const result = await res.json();
            alert(result.message);
        }
    }
    return (
        <div className='w-full h-screen' >

            <div className='max-w-[900px] mx-auto md:px-4 flex flex-col justify-center  h-full items-center' >

                <form action="" onSubmit={ handleSubmit(formSubmit) } className='flex flex-col justify-center px-4 md:px-6 py-4 gap-6 border w-[90%]  md:w-[50%] shadow-xl'>
                    <div >
                        <p className='px-2 text-2xl font-thin text-[#F86F03]'>Edit Food Items</p>
                    </div>
                    <input className='outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-[#525FE1]' type="text" placeholder='name' { ...register('name', { required: true }) }  defaultValue={location.state.item.name}/>

                    <textarea className='outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-[#525FE1] resize-none' type="text" placeholder='description' { ...register('description', { required: true }) }   defaultValue={location.state.item.description} rows={4} />

                    <input className='outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-[#525FE1]' type="number" placeholder='price' { ...register('price', { required: true }) }  defaultValue={location.state.item.price}/>

                    <input className='outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-[#525FE1]' type="text" placeholder='quantity' { ...register('quantity', { required: true }) }  defaultValue={location.state.item.quantity} />

                    <select className='outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-[#525FE1] cursor-pointer'  { ...register("category", { required: true }) }  defaultValue={location.state.item.category}>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="non-vegetarian">Non Vegetarian</option>
                        <option value="beverages">Beverages</option>
                        <option value="breads">Breads</option>
                    </select>

                    <input className='outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-[#525FE1]' type="text" placeholder='imageURL' { ...register('imageURL', { required: true }) }   defaultValue={location.state.item.imageURL}/>

                    <div className='w-full flex justify-center items-center'>
                        <button className='bg-[#F86F03] py-2  px-4  rounded-md border-none  w-[50%] outline-none text-[#525FE1]' type='submit' >Add</button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default Edit
