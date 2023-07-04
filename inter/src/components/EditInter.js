import React, { useEffect, useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button, Select, MenuItem } from '@material-ui/core';
import { editInter, getAllInter } from '../services/Api';
import { useParams, useHistory } from 'react-router-dom';
import './../css/EditInter.css';
import validator from 'validator';

const initialValue = {
    name: "",
    gender : "",
    email: "",
    phone: "",
    address: ""
}

const EditInter = () => {

    const [inter, setInter] = useState(initialValue);
    const {name, gender, email, phone, address} = inter;
    const [emailError, setEmailError] = useState('');

    const { id } = useParams();

    useEffect(() => {
        loadInterData();
    },[]);

    const loadInterData = async () =>{
        const response = await getAllInter(id);
        setInter(response.data);
    }

    const history = useHistory();

    const onValueChange = (e) =>
    {
      setInter({...inter, [e.target.name]: e.target.value});
    }

    const editInterDetails = async () =>{
        var email = inter.email
    
        if (validator.isEmail(email)) {
            setEmailError('')
            await editInter(id,inter);
            history.push('/all');
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    return (
        <Container maxWidth="sm">
            <Box my={5}>
            <Typography variant="h5" align="center">Update Inter Details</Typography>
            <FormGroup>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="name" value={name} />
                </FormControl>
                <FormControl>
                    <InputLabel>Gender</InputLabel>
                    <Select onChange={(e) => onValueChange(e)} name="gender" value={gender}>
                        <MenuItem value={0}>Nam</MenuItem>
                        <MenuItem value={1}>Nữ</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Email address</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="email" value={email} type='email' />
                    <span className='err-email'>{emailError}</span>
                </FormControl>
                <FormControl>
                    <InputLabel>Phone Number</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="phone" value={phone} type='Number'/>
                </FormControl>
                <FormControl>
                    <InputLabel>Address</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="address" value={address} />
                </FormControl>
                <Box my={3}>
                    <Button variant="contained" onClick={() => editInterDetails() } color="primary" align="center">Update Inter</Button>
                    <Button onClick={()=> history.push("/all")} variant="contained" color="secondary" align="center" className='btn-cancel'>Cancel</Button>
                </Box>
            </FormGroup>
            </Box>
        </Container>
    )
}


export default EditInter;