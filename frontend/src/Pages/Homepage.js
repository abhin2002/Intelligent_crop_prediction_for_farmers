import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

// nitrogen 
// pottassium
// phosphorous
// ph
// rainfall
// humidity

function HomePrediction() {
    const [nitrogen, setNitrogen] = useState('');
    const [pottassium, setPottassium] = useState('');
    const [phosphorous, setPhosphorous] = useState('');
    const [ph, setPh] = useState('');
    const [rain, setRain] = useState('');
    const [humidity, setHumid] = useState('');


    function handleSubmit(e) {
        // logic for handling sign in form submission goes here
        e.preventDefault();
        console.log(nitrogen,pottassium,phosphorous,ph,rain,humidity);
    }

    return (
        <Box p={4}>
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
            <FormControl>
                <FormLabel>Nitrogen</FormLabel>
                <Input type="number" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Pottassium</FormLabel>
                <Input type="number" value={pottassium} onChange={(e) => setPottassium(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Phosphorous</FormLabel>
                <Input type="number" value={phosphorous} onChange={(e) => setPhosphorous(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>ph</FormLabel>
                <Input type="number" value={ph} onChange={(e) => setPh(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Rainfall</FormLabel>
                <Input type="number" value={rain} onChange={(e) => setRain(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Humidity</FormLabel>
                <Input type="number" value={humidity} onChange={(e) => setHumid(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue">Show results</Button>
            </Stack>
        </form>
        </Box>
    );
}

export default HomePrediction;
