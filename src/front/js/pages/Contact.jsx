import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";


export const Contact = () => {
  const deleteContacts = async (id) => {
    if(confirm('Do you want to delete this contact?')){

      await actions.deleteContact(id);
      actions.getUserContactList();
    }
  }

  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  const [editContact, setEditContact] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [currentUser, setCurrentUser] = useState("");


  const handleEnviarDatos = async (event, idUser) => {
    event.preventDefault();
    const objeto =  {
      "name": fullName,
      "phone": phone,
      "email": email,
      "address": address
    }
    if(confirm('Do you want to edit this contact?')){
      console.log(idUser);
      await actions.updateContact(idUser,objeto);
      navigate("/Contact");
    }
    setEditContact(null);
    actions.getUserContactList();
  }

  const crearUser = async () => {
    await actions.createUser();
    navigate("/Form");
  }

  const edit = (id) => {
    editContact === id ? setEditContact(null) :setEditContact(id);
    //const currentContact = contact.contacts.find((c) => c.id === parseInt(params.id)) || {}
    const contact = store.contacts.find((c) => c.id === parseInt(id))
    setFullName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setAddress(contact.address);
  }

  const userData = async ()=>{
    setCurrentUser(await actions.currentUser());
    console.log(currentUser);
    
  }
  useEffect(()=>{
    userData();
    actions.getUserContactList()
  },[])

  const saveChange = (event,id) =>{
    handleEnviarDatos(event, id);
    console.log('Guardando datos');
  }
  return (
    /*{
  "contacts": [
    {
      "name": "string",
      "phone": "string",
      "email": "string",
      "address": "string",
      "id": 0
    }
  ]
} */
    <div className="container">
      <h1 className="text-center text-success">Contactos del usuario {store.user}</h1>
      <>
      {store.contacts.length == 0 ?<h1>Crear un usuario de javi:  <button type="button" onClick={() => crearUser()} className="btn btn-primary"><i class="fas fa-plus-square"></i></button></h1>:
      
      store.contacts.map((item) =>
        <div className="card mb-2" key={item.id}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={rigoImageUrl} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-6">
              <div className="card-body">
              <span className="text-prima mt-1 d-block"><i className="fas fa-user"></i>
                {editContact===item.id ?
                  <input type="text" className="form-control" value={fullName} onChange={(event) => setFullName(event.target.value)} id="inputName" /> :
                  <h5 className="card-title d-flex flex-row mb-3">{item.name}</h5>
                }
                </span>
                <span className="text-prima mt-1 d-block"><i className="fas fa-envelope"></i>
                  {editContact===item.id ?
                    <input type="text" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} id="inputName" />
                    : <span className="text-prima mt-1 d-block">{item.email}</span>}
              
                </span>
                <span className="text-prima mt-1 d-block"><i className="fas fa-phone"></i>
                  {editContact===item.id ?
                    <input type="text" className="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} id="inputName" />
                    :
                    <p>{item.phone}</p>
                  }
                  </span>
                <span className="text-prima mt-1 d-block">
                <i className="fas fa-envelope"></i>
                  {editContact===item.id ?

                    <input type="text" className="form-control" value={address} onChange={(event) => setAddress(event.target.value)} id="inputName" />
                    :
                    <span className="text-prima mt-1 d-block">{item.address}</span>
                  }
                
                </span>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card-body d-flex justify-content-evenly">
                <button type="button" onClick={() =>edit(item.id)} className="btn btn-primary"><i className="fas fa-edit"></i></button>
                {editContact===item.id ?
                <button type="submit" onClick={(event) => saveChange(event,item.id)} className="btn btn-primary"><i className="far fa-save"></i></button>
                :<button type="button" onClick={() => deleteContacts(item.id)} className="btn btn-primary"><i className="fas fa-trash"></i></button>}
              </div>
            </div>
          </div>
        </div>
      )}
      
      
      </>
    </div>
  )
}