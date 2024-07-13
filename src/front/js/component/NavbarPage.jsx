import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, useParams,useNavigate } from "react-router-dom";
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

	const remotefavorite = (id) => {
		actions.removeFavorite(id);
	}
	const handleClick = async (tipo) => {
		await actions.getCategory(tipo);
		setCategory(tipo);
	}

	return (
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
									title={
										<>
										  Favorites <Badge bg="secondary">{store.favorites.length}</Badge>
										</>
									  }
									id={`offcanvasNavbarDropdown-expand-${expand}`}
									
								>
									{store.favorites.length == 0 ? <NavDropdown.Item>No hay favoritos</NavDropdown.Item>
									:store.favorites.map((item,id) =>
										<NavDropdown.Item key={id}>
											{item}
											<button onClick={() => remotefavorite(id)}>
												<i className="fa fa-trash"></i>
											</button>
										</NavDropdown.Item>
									)}
								</NavDropdown>
								<NavDropdown
									title="StarWars"
									id={`offcanvasNavbarDropdown-expand-${expand}`}
								>
									<NavDropdown.Item as="div">
									<Link to={`/${category}`}>
									
										<Button onClick={()=>handleClick("people")} variant="outline-success"><i className="fas fa-user-astronaut"></i>-People</Button>
										</Link>
										</NavDropdown.Item>
									<NavDropdown.Item as="div">
									<Link to={`/${category}`}>
									
										<Button onClick={()=>handleClick("planets")} variant="outline-success"><i className="fas fa-globe"></i>-Planets</Button>
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item as="div">
									<Link to={`/${category}`}>
									
										<Button onClick={()=>handleClick("species")} variant="outline-success"><i className="fas fa-table"></i>-Species</Button>
										</Link>
									</NavDropdown.Item>
								</NavDropdown>
								
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
			))}
		</>

	);
}
