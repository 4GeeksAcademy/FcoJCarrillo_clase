import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
//import custom Component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { NavbarPage } from "./component/NavbarPage.jsx";
import { Footer } from "./component/Footer.jsx";
//import custom Pages
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { Form } from "./pages/Form.jsx";
import { Contact } from "./pages/Contact.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { StarShips } from "./pages/StarShips.jsx";
import { Category } from "./pages/Category.jsx";
import { CategoryDetails } from "./pages/CategoryDetails.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";



//create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavbarPage/>
                    <Routes>
                        <Route element={<HomePage/>} path="/"/>
                        <Route element={<Contact/>} path='/Contact' />
                        <Route element={<Form />} path='/Form' />
                        <Route element={<Error404/>} path="*" />
                        {/* <Route element={<StarShips/>} path="/StarShips" /> */}
                        <Route element={<Category/>} path="/:category"/>
                        <Route element={<CategoryDetails/>} path="/:category/:uid"/>
                        <Route element={<Login/>} path="/Login"/>
                        <Route element={<Signup/>} path="/signup"/>
                        <Route element={<Profile/>} path="/profile"/>
                        <Route element={<Dashboard/>} path="/dashboard"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
