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
                inter.map((data) => (
                    <TableRow className="trow">
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.gender===0?"Nam":data.gender===1?"Nữ":"Khác"}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{data.phone}</TableCell>
                        <TableCell>{data.address}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" className="btn-edit" component={Link} to={`/edit/${data.id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={() => deleteData(data.id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
        </Table>
    )
}

export default AllInter;
