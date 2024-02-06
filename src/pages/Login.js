import React, { useState } from 'react';
import { getLogin } from "../services/Api";
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [loginObj, setLoginObj] = useState({ emailId: '', password: '' });
  const [isFormSubmitted, setisFormSubmitted] = useState(false);
  const navigate = useNavigate(); // Get the navigate function from react-router

  const login = () => {
    try {
      setisFormSubmitted(true);
      if (loginObj.emailId !== '' && loginObj.password !== '') {
        getLogin(loginObj).then((data) => {
          if (data.data) {
            // Store the entire loginObj in localStorage
            localStorage.setItem('loginObj', JSON.stringify(data.data));
            alert("Login Successfully");
            navigate('/Dashboard'); // Redirect to /Dashboard on successful login
          } else {
            alert('Login failed');
          }
        });
      }
    } catch (error) {
      alert(error.code);
    }
  };
  //check validation
  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(loginObj.emailId);
  };


  const changeFormValues = (event, key) => {
    setLoginObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };


  return (
    <div>
      <div className='container-fluid mt-3'>
        <div className='row justify-content-center mt-3'>
          <div className='col-lg-4'>
            <div className='card shadow'>
              <div className='card-header bg-primary text-center'>
                <strong className='text-white'>Login</strong>
              </div>
              <div className='card-body'>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label className='form-label text-start'><strong>Email</strong></label>
                    <div className='col-12 input-group'>
                      <span className='input-group-text'><i className='fa fa-envelope'></i></span>
                      <input type='text' className='form-control' placeholder='Enter Email' onChange={(event) => changeFormValues(event, 'emailId')}/>
                    </div>
                    {
                      isFormSubmitted && loginObj.emailId == '' && <span className='text-danger'>Email is Required</span>
                    }


                  </div>
                  <div className='mb-3'>
                    <label className='form-label text-start'> <strong>Password</strong></label>
                    <div className='col-12 input-group mb-3'>
                      <span className='input-group-text'><i className='fa fa-lock'></i></span>
                      <input type='password' className='form-control' placeholder='Enter Password' onChange={(event) => changeFormValues(event, 'password')} />
                    </div>
                    {
                      isFormSubmitted && loginObj.password == '' && <span className='text-danger'>Password is Required</span>
                    }
                  </div>

                  <div className='row'>
                    <div className='col-12 text-center'>
                      <button className='btn btn-primary pt-2' type='submit' onClick={login}>Login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;