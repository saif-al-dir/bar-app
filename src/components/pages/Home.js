import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';

const Home = () => {
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/tables`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => setTables(data))
            .catch(err => setError(err.message));
    }, []);

    if (error) return <Alert variant="danger">Error: {error}</Alert>;

    if (tables.length === 0) return <Spinner animation="border" className="m-4" />;

    return (
        <Container className="my-5">
            <h1 className="mb-4">All Tables</h1>
            <Row>
                {tables.map(table => (
                    <Col key={table.id} md={6} lg={4} className="mb-4">
                        <Card className="p-3 shadow rounded-4">
                            <Card.Body>
                                <Card.Title>Table {table.id}</Card.Title>
                                <p><strong>Status:</strong> {table.status}</p>
                                <p><strong>People:</strong> {table.peopleAmount} / {table.maxPeopleAmount}</p>
                                <p><strong>Bill:</strong> ${table.bill}</p>
                                <Link to={`/table/${table.id}`}>
                                    <Button variant="primary">View Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;
