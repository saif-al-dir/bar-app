import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import TableEdit from './TableEdit';
import { API_URL } from '../../config';

const Table = () => {
    const { id } = useParams();
    const [table, setTable] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/tables/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => setTable(data))
            .catch(err => setError(err.message));
    }, [id]);

    if (error) return <Alert variant="danger">Error: {error}</Alert>;

    if (!table) return <Spinner animation="border" className="m-4" />;

    return (
        <Container className="my-5">
            <Card className="p-4 shadow rounded-4">
                <Card.Body>
                    <Card.Title className="mb-4">Table ID: {table.id}</Card.Title>
                    <p><strong>Status:</strong> {table.status}</p>
                    <p><strong>People:</strong> {table.peopleAmount} / {table.maxPeopleAmount}</p>
                    <p><strong>Bill:</strong> ${table.bill}</p>
                    <TableEdit />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Table;
