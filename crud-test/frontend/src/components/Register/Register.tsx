import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IResRegisterOrLogin } from "../../interfaces";
import { addUser } from "../../reducer/authStore";

const Register = (): JSX.Element => {

    const nav = useNavigate();
    const dispatch = useDispatch();


    const sendData = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        //@ts-ignore
        const { name, email, password } = e.target

        const data = {
            name: name.value,
            email: email.value,
            password: password.value
        }

        const req = await fetch('api/user/create', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(data)
        })

        if (!req.ok) {
            console.log('error')
        }

        const res: IResRegisterOrLogin = await req.json();
        localStorage.setItem('user', JSON.stringify(res));
        dispatch(addUser())

        nav('/')

    }


    return (
        <>

            <div className="container">

                <h2>Регистрация нового аккаунта</h2>
                <form onSubmit={sendData} className="form-register">
                    <input name="email" type="text" placeholder="введите email" />
                    <input name="name" type={'text'} placeholder="введите имя" />
                    <input name="password" type="text" placeholder="введите пароль" />
                    <button type="submit"> Создать</button>
                </form>
            </div>
        </>
    )
};


export default Register