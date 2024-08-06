import React from "react";


export const Signup =()=>{
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs md lg={6}>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" value={userLogin} onChange={(event) => setUserLogin(event.target.value)} />
                            {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="summit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>

        </Container>

    )

}