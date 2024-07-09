import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Contactos "poner nombre del usuario"</span>
				</Link>
				<div className="ml-auto">
					<Link to="/Form">
						<button className="btn btn-primary">Crear nuevo usuario</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
