import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const adminLogin = async (data) => {
        const res = await fetch(`http://localhost:5000/api/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return res;
    }

    const formSubmit = async (data, e) => {
        const res = await adminLogin(data);
        if (res.ok) {
            setIsLoggedIn(!isLoggedIn);
            e.target.reset();
            sessionStorage.setItem('isLoggedIn', true);
            navigate('/home', { replace: true });
        }
        else {
            const result = await res.json();
            alert(result.message);
        }
    }
    return (
        <div className='w-full h-screen' >

            <div className='max-w-[900px] mx-auto px-4 flex flex-col justify-center  h-full items-center' >

                <form action="" onSubmit={ handleSubmit(formSubmit) } className='flex flex-col justify-center px-6 py-4 gap-10  border w-[70%]  md:w-[50%] shadow-xl'>
                    <div >
                        <p className='px-2 text-2xl font-thin text-[#F86F03]'>Admin Login</p>
                    </div>
                    <input className='outline-none bg-[#f1f1f1] px-4 py-2 rounded-md text-[#525FE1]' type="text" placeholder='username' { ...register('username', { required: true }) } />
                    <input className='outline-none bg-[#f1f1f1] px-4 py-2 rounded-md text-[#525FE1]' type="password" placeholder='password'{ ...register('password', { required: true }) } />

                    <div className='w-full flex justify-center items-center'>
                        <button className='bg-[#F86F03] py-2  px-4  rounded-md border-none  outline-none text-[#525FE1]' type='submit' >Submit</button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default Login
