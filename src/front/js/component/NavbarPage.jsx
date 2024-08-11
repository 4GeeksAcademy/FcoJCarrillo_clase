import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, useParams, useNavigate } from "react-router-dom";
//React-bootstrap;
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export const NavbarPage = () => {
	const { actions, store } = useContext(Context);
	const [category, setCategory] = useState("");
	const navigate = useNavigate();
	const userLogin = store.isLoged
	const favoritos = store.favourites || [];
	const token = localStorage.getItem('token');
	const storedIsLoged = localStorage.getItem("isLoged");

	const remotefavorite = async (id) => {
		actions.removeFavorite(id);
	}
	const removeFavourites = async (item) => {
		const uri = process.env.BACKEND_URL + 'api/favourites';
		console.log(uri);
		const options = {
			method: 'DELETE',
			body: JSON.stringify({"item": item}),
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		};
		const response = await fetch(uri, options);
		if(!response.ok){
			console.log('Error', response.status, response.statusText);
		}
		if(response == 201){
			console.log("Correcto");
			
		}
		console.log('Favorito eliminado correctamente');
		favourite();
	}
	const handleClick = async (tipo) => {
		await actions.getCategory(tipo);
		setCategory(tipo);
		navigate(tipo);
	}
	const handleLogout = () => {
		try {
			console.log("Principio Logout");
			
			// Eliminar items específicos de localStorage
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			
			// Limpieza del estado global
			actions.setIsLoged(false);
			actions.setCurrentUser(null);
			actions.setFavourites([]);
			console.log("Final Logout");
			// Redirigir al usuario a la página de inicio
		} catch (error) {
			console.error('Error al intentar desloguear:', error);
		}
	}
	const favourite = async () => {
		const uri = process.env.BACKEND_URL + 'api/favourites';
		const options = {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		};
			try {
				const response = await fetch(uri, options);
				if (response.status == 422) {
					console.log("Error: ", response.status, response.statusText);
					return;
				}
				const data = await response.json();
				actions.setFavourites(data.result);
			} catch (error) {
				console.log('Eroor fecth', error);
				return;
			}
	}
	useEffect(() => {
		if(userLogin){
			favourite();
		}
	}, [userLogin]);
	return (
		<>
			{['md'].map((expand) => (
				<Navbar key={expand} expand={expand} className="mb-3" bg="primary" data-bs-theme="dark">
					<Container fluid>
						<Navbar.Brand href="/"><i className="fas fa-jedi">Star Wars</i></Navbar.Brand>
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
										title={
											<>
												Favorites <Badge bg="secondary">{store.favourites.length}</Badge>
											</>
										}
										id={`offcanvasNavbarDropdown-expand-${expand}`}

									>
										{store.favourites.length === 0 || store.favourites === undefined ? (
											<NavDropdown.Item>No hay favoritos</NavDropdown.Item>
										) : (
											store.favourites.map((fav, index) => (
												<NavDropdown.Item key={index}>
													{fav.item}
													<button onClick={() => removeFavourites(fav.item)}>
														<i className="fa fa-trash"></i>
													</button>
												</NavDropdown.Item>
											))
										)}
									</NavDropdown>
									<NavDropdown
										title="StarWars"
										id={`offcanvasNavbarDropdown-expand-${expand}`}
									>
										<NavDropdown.Item as="div">
											<Button onClick={() => handleClick("people")} variant="outline-success"><i className="fas fa-user-astronaut"></i>-People</Button>
										</NavDropdown.Item>
										<NavDropdown.Item as="div">
											<Button onClick={() => handleClick("planets")} variant="outline-success"><i className="fas fa-globe"></i>-Planets</Button>
										</NavDropdown.Item>
										<NavDropdown.Item as="div">
											<Button onClick={() => handleClick("species")} variant="outline-success"><i className="fas fa-table"></i>-Species</Button>
										</NavDropdown.Item>
									</NavDropdown>
									{store.isLoged ?
										<>
											<Nav.Link href="/" onClick={handleLogout}>Log out<i className="fas fa-sign-in-alt"></i></Nav.Link>
										</>
										:
										<>
											<Nav.Link href="/login">Login<i className="fas fa-sign-in-alt"></i></Nav.Link>
											<Nav.Link href="/signup">Sign up<i className="fas fa-sign-in-alt"></i></Nav.Link>
										</>
									}
								</Nav>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</>

	);
}
