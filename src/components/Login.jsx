import React from 'react';
import './Login.css';

const Login = () => {
    return(
        <div className="login-container">
            <h2>Acceso Administrador</h2>
            <form className="login-form">
                <input type="text" placeholder="Usuario" required />
                <input type="password" placeholder="Contraseña" required/>
                <button type="Submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;