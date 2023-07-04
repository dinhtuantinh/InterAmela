import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import './../css/Home.css';

const Home = () => {
    return (
        <Container maxWidth="lg">
            <Box my={5}>
            <Typography variant="h3" component="h2" align="center" className='tiltle'>Demo Crud Amela</Typography>
            <Typography component="h2" align="center" className='note'>Data Json Server</Typography>
            </Box>
        </Container>
    )
}

export default Home;