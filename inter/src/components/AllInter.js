import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableRow, TableHead, TableBody, Button } from '@material-ui/core';
import { getAllInter, deleteInter} from '../services/Api';
import { Link } from 'react-router-dom';
import './../css/AllInter.css';

const AllInter = () => {

    const [inter, setInter] = useState([]);
    useEffect(() => {
        getInter();
    }, [])

    const getInter = async () =>{
        const response = await getAllInter();
        setInter(response.data);
    }

    const deleteData = async (id) => {
        await deleteInter(id);
        getInter();
    }

    return (
        <Table className="table">
            <TableHead>
                <TableRow className="thead">
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                inter.map((item, index) => (
                    <TableRow className="trow" key={index}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.gender===0?"Nam":item.gender===1?"Nữ":"Khác"}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" className="btn-edit" component={Link} to={`/edit/${item.id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={() => deleteData(item.id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
        </Table>
    )
}

export default AllInter;
