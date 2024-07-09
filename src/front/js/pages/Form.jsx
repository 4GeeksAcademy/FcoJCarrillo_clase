import React, { useState,useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Form = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState('');

    const handleEnviarDatos =(event) =>{
        event.preventDefault();
        console.log(fullName,phone,email,address);
        if(confirm('Do you want create this one user?')){
            actions.createContact(fullName,phone,email,address);
            navigate("/")
        }
    }

    return (
        <div className="container">
            <h1 className="text-center font-weight-bold">Add a new contact</h1>
        <form className="row g-3 text-start ml-2" onSubmit={handleEnviarDatos}>
            <div className="col-md-12 col-xs-12">
                <label for="inputEmail4" className="form-label font-weight-bold">Full Name</label>
                <input type="text" className="form-control" value={fullName} onChange={(event) =>setFullName(event.target.value)} id="inputName"/>
            </div>
            <div className="col-md-12 col-xs-12">
                <label for="inputPhone4" className="form-label font-weight-bold">Phone</label>
                <input type="tel" className="form-control" value={phone} onChange={(event) =>setPhone(event.target.value)} id="inputPhone"/>
            </div>
            <div className="col-md-12 col-xs-12">
                <label for="inputEmail4" className="form-label font-weight-bold">Email</label>
                <input type="email" className="form-control" value={email} onChange={(event) =>setEmail(event.target.value)} id="inputemail"/>
            </div>
            <div className="col-12">
                <label for="inputAddress" className="form-label font-weight-bold">Address</label>
                <input type="text" className="form-control" id="inputAddress" value={address} onChange={(event) =>setAddress(event.target.value)} placeholder="1234 Main St"/>
            </div>
            
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
            <Link to="/">Menu principal</Link>
        </form>

        </div>
            )

}