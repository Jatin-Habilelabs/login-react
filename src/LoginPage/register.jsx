import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
export const Register = () => {
    const NewUser = (e) => {
        e.preventDefault();
        const ellength = document.getElementById('form').elements;

        let valid = ValidFun(ellength)
        let arr;
        if (!localStorage.getItem('StoreData')) {
            arr = [];
        }
        else {
            arr = JSON.parse(localStorage.getItem('StoreData'))
        }

        let allData = {}
        if (valid) {
            for (let i = 0; i < ellength.length; i++) {
                if (ellength[i].tagName !== 'BUTTON') {
                    let element = ellength[i].value;

                    allData = {
                        ...allData,
                        [ellength[i].name]: element
                    };
                }
            }

            arr.push(allData);
            const data = JSON.stringify(arr)
            localStorage.setItem('StoreData', data);

            alert("submitted sucessfully");
            document.getElementById('form').reset();
        }
    }


    // =====================CHECK CONDITIONS FOR VALIDATION================
    function ValidFun(ellength) {
        let checkMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        let checkName = /[0-9]/

        for (let i in ellength.length) {

            if (ellength[i].tagName !== 'BUTTON') {

                if (ellength[i].value === '') {
                    alert('Please fill the blank')
                    return false;
                }
            }

        }

        if (ellength.name.value.match(checkName)) {
            alert('Name is not proper');
            return false;
        }
        if (isNaN(ellength.phoneNo.value) || ellength.phoneNo.value.length !== 10) {
            alert('Phone Number is not proper')
            return false;
        }
        if (!(checkMail.test(ellength.email.value))) {
            alert('Email is not proper in name@gmail.com format')
            return false;
        }
        if (!ellength.password.value.match(/[$&+,:;=?@#|'<>.-^*()%!]/) || !ellength.password.value.match(/[0-9]/) || !ellength.password.value.match(/[a-z]/) ||
            ellength.password.value.length < 8 || !ellength.password.value.match(/[A-Z]/)) {
            alert('Make a Strong Password');
            return false;
        }
        return true;
    }


    // =========CODE FOR SECURITY PIN =================

    function Captcha(size, isSpecialCharacter, isNumber) {
        const special = '!@#$%^&*()';
        const number = '0123456789';
        let string = "";

        if (isSpecialCharacter) {
            string += special;
        }
        if (isNumber) {
            string += number;
        }

        let result = "";
        for (let i = 0; i < size; i++) {
            let index = parseInt(Math.random() * string.length);
            result += string[index];

        }
        return (result);

    }

    function CaptchaShow(e) {
        e.preventDefault();
        alert('Don not forget to store Security Pin')
        document.getElementById('securitypin').value = Captcha(5, true, true);
        return;

    }

    const [passwordShown, setPasswordShown] = useState(false);
    const showPassword = () => {
        setPasswordShown(!passwordShown);
    }

    const [securityShown, setSecurityShown] = useState(false);
    const showSecurity = () => {
        setSecurityShown(!securityShown);
    }

    return (
        <>
            <div className="registerInnerContainer">

                <form method="post" onSubmit={NewUser} id="form">
                    <h1>Register</h1>
                    <br />
                    <div className="box">
                        <label htmlFor="name">Name :</label>
                        <div className="innerBox">
                            <input type="text" name="name" placeholder="Enter your name" id="name" />
                        </div>
                    </div>

                    <div className="box">
                        <label htmlFor="phoneNo">Phone No :</label>
                        <div className="innerBox">
                            <input type="tel" name="phoneNo" placeholder=" Enter your Phone No" id="phoneNo" />
                        </div>
                    </div>
                    <div className="box">
                        <label htmlFor="email">Email :</label>
                        <div className="innerBox">
                            <input type="email" name="email" placeholder=" Enter your Email" id="email" />
                        </div>
                    </div>

                    <div className="box">
                        <label htmlFor="password">Password :</label>
                        <div className="innerBox">
                            <input type={passwordShown ? "text" : "password"} name="password" id="password" placeholder="Enter your Password" />
                            <i className='bx bx-show' id="eye" onClick={showPassword}></i>
                        </div>
                    </div>

                    <div className="box">
                        <label htmlFor="securityPin">Security Pin :</label>
                        <div className="innerBox">
                            <input type={securityShown ? 'text' : 'password'} name="security" id="securitypin" readOnly />
                            <i className='bx bx-show' id="eye" onClick={showSecurity}></i>
                            <button type="button" id="refresh" onClick={CaptchaShow}>Press for security</button>
                        </div>
                    </div>

                    <br />
                    <div className="box">

                        <Link to={"/"}>
                            <button className="submit btn" type="button" id="registerLogin"
                            >
                                Login
                            </button>
                        </Link>

                        <button className="reset btn" type="submit" id="registerSign">Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    )
}
