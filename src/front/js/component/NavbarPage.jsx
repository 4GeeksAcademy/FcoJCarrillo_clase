import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, useParams } from "react-router-dom";
//React-bootstrap;
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export const NavbarPage = () => {
	const { actions, store } = useContext(Context);
	const [category, setCategory] = useState("");


	const handleClick = async (tipo) => {
		await actions.getCategory(tipo);
		setCategory(tipo);
	}

	return (
		
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Contactos "poner nombre del usuario"</span>
				</Link>
				<div className="ml-auto">
					<Link to={`/${category}`}>
						<button onClick={()=>handleClick("people")} className="btn btn-primary">People</button>
					</Link>
					<Link to={`/${category}`}>
						<button onClick={()=>handleClick("planets")} className="btn btn-primary">PLanets</button>
					</Link>
					<Link to={`/${category}`}>
						<button onClick={()=>handleClick("species")} className="btn btn-primary">Species</button>
					</Link>
					<Link to="/Form">
						<button className="btn btn-primary">Crear nuevo usuario</button>
					</Link>
				</div>
			</div>
		</nav>
		/*
		<>
		{['sm'].map((expand) => (
			<Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
				<Container fluid>
					<Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-${expand}`}
						aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
						placement="end"
					>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
								Offcanvas
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 pe-3">
								<Nav.Link href="/">Home</Nav.Link>
								<Nav.Link href="/Contact">ContactList</Nav.Link>
								<NavDropdown
									title="StarWars"
									id={`offcanvasNavbarDropdown-expand-${expand}`}
								>
									<NavDropdown.Item>
									<Link to={`/${category}`}>
									
										<Button onClick={()=>handleClick("people")} variant="outline-success"><i class="fas fa-user-astronaut"></i>-People</Button>
										</Link>
										</NavDropdown.Item>
									<NavDropdown.Item href={`/${category}`}>
									<Link to={`/${category}`}>
									
										<Button onClick={()=>handleClick("planets")} variant="outline-success"><i class="fas fa-globe"></i>-Planets</Button>
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item>
									<Link to={`/${category}`}>
									
										<Button onClick={()=>handleClick("species")} variant="outline-success"><i class="fas fa-table"></i>-Species</Button>
										</Link>
									</NavDropdown.Item>
									{/* <NavDropdown.Divider />
									<NavDropdown.Item href="#action5">
										Something else here
									</NavDropdown.Item> *
								</NavDropdown>
							</Nav>
							{/* <Form className="d-flex">
								<Form.Control
									type="search"
									placeholder="Search"
									className="me-2"
									aria-label="Search"
								/>
								<Button variant="outline-success">Search</Button>
							</Form> 
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
			))}
		</>
		*/
	);
}
