import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authapislice";
import {toast} from "sonner";
import Loading from "../components/Loader";
import {setCredentials} from "../redux/slices/authSlice"

const Login = () => {
  const {user} = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const  navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();
  const submitHandler  = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
    }catch (error){
      console.log(error); 
      toast.error(error?.data?.message || error.message);
    }
  };
  
  

  useEffect(()=>{
    user && navigate ("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-black'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-white'>
              Manage all your task in one place!
            </span>
            <p className='flex gap-0 md:gap-0 text-6xl md:text-8xl 2xl:text-9xl font-black text-center '>
              <span style={{ color: 'white' }}>Plan</span><span style={{ color: '#f75fea' }}>Net</span>
            </p>

            {/* <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div> */}

<div className='cell'>
  <img 
    src='https://github.com/jspHarry/PlanNet-Image/blob/main/Picture1.png?raw=true' 
    alt='Your Image'
    style={{
      width: '350px',           // Set width
      height: '300px',          // Set height
      borderRadius: '50%',
      marginTop: '-100px',      // Make the image circular
      transform: 'rotate(0deg)', // Initial rotation
      transition: 'transform 0.5s ease-in-out' // Smooth rotation
      
    }}
    onLoad={(e) => {
      // Rotate the image when it loads
      e.target.style.transform = 'rotate(360deg)';
    }}
  />
</div>
          </div>
        </div>

        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-[white] px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-#f75fea text-3xl font-bold text-center'>
                Welcome back!
              </p>
              <p className='text-center text-base text-gray-700 '>
                Keep all your credential safe.
              </p>
            </div>
            

            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
                Forget Password?
              </span>

                {isLoading ? (
                  <Loading />
                ) : ( <Button
                type='submit'
                label='Submit'
                className='w-full h-10 bg-[#f550e8] text-black-700 rounded-full'
              />)}
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default Login