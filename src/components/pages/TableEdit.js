import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Button, Container, Spinner, Alert, Card } from 'react-bootstrap';
import { API_URL } from '../../config';

const TableEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [table, setTable] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/tables/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch table');
                return res.json();
            })
            .then(data => setTable(data))
            .catch(err => setError(err.message));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/tables/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(table),
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update table');
                navigate('/');
            })
            .catch(err => setError(err.message));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTable(prev => ({
            ...prev,
            [name]: name === 'bill' || name.includes('Amount') ? Number(value) : value,
        }));
    };

    if (error) return <Alert variant="danger">Error: {error}</Alert>;
    if (!table) return <Spinner animation="border" className="m-4" />;

    return (
        <Container className="my-5">
            <Card className="p-4 shadow rounded-4">
                <h2 className="mb-4">Edit Table {id}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select name="status" value={table.status} onChange={handleChange}>
                            <option>Free</option>
                            <option>Busy</option>
                            <option>Reserved</option>
                            <option>Cleaning</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>People</Form.Label>
                        <Form.Control
                            type="number"
                            name="peopleAmount"
                            value={table.peopleAmount}
                            onChange={handleChange}
                            min={0}
                            max={table.maxPeopleAmount}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bill</Form.Label>
                        <Form.Control
                            type="number"
                            name="bill"
                            value={table.bill}
                            onChange={handleChange}
                            min={0}
                            step={1}
                        />
                    </Form.Group>

                    <Button type="submit" variant="success">Update</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default TableEdit;
