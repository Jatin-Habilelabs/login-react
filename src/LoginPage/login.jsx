import React,{useState} from 'react'
import { Link } from 'react-router-dom';
export const Login = () => {
 
  const Result = (e) => {
    e.preventDefault();

    const formLength = document.getElementById('loginForm').elements;

    if (formLength.name.value === '') {
      alert('Please fill the blank')
      return false;
    }

    if (!localStorage.getItem('StoreData')) {
      alert('Please Register first');
      return false;
    }

    // =============GET DATA FROM LOCAL STORAGE================

    let checkData = JSON.parse(localStorage.getItem('StoreData'));
    let ResultOutput = checkData.filter(function (inputValue) {
      return (inputValue.email === formLength.email_phone.value || inputValue.phoneNo === formLength.email_phone.value &&
        inputValue.password === formLength.password.value && inputValue.security === formLength.security.value)


    });

    if (ResultOutput.length === 0) {
      alert('Account not found , Register First')
    }
    else {
      alert('Login Successfully');
      document.getElementById('loginForm').reset();
    }

  }
  const [passwordShown, setPasswordShown] = useState(false);
  const showPassword = () => {
    setPasswordShown(!passwordShown);
  }

  return (
    <>
      <div className="loginContainer">
        <h1>
          Login
        </h1>
        <form method="post" id="loginForm" onSubmit={Result}>
          <div className='down'>
            <div className="box">
              <label htmlFor="name">Email & phone No : &nbsp;</label>
              <div className="innerBox">
                <input type="email" name="email_phone" placeholder="Email & Phone No" id="name" />
              </div>
            </div>


            <div className="box">
              <label htmlFor="password">Password :&nbsp;</label>
              <div className="innerBox">
                <input type={passwordShown?"text":"password"} name="password" id="password" placeholder="Password" />

                <i className='bx bx-show' id="eye" onClick={showPassword}></i>

              </div>
            </div>
            <div className="box">
              <label htmlFor="securityPin">Security Pin :</label>
              <div className="innerBox">
                <input type="password" name="security" id="securityPin" placeholder="Enter Security" />

                <i className='bx bx-show' id="eye_security-login"></i>

              </div>
            </div>

            <br />
            <div className="box">

              <button className="submit" type="submit" id="loginSign">Sign In</button>
              <Link to={"/Register"}>
              <button className="reset btn" type="button" value="reset" id="loginRegister">
               Register
                </button>
                </Link>
            </div>
          </div>
        </form>
      </div>

    </>
  )
}
