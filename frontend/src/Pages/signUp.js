import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

const SignUp = function() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    function handleSignUp() {
        console.log(email,name)
    }
    return (
        <Box p={4}>
        <form onSubmit={handleSignUp}>
            <Stack spacing={4}>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" value={name} 
                onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormControl>
            
            <Button type="submit" colorScheme="blue">Sign Up</Button>
            <Box textAlign="center">
                <Link to="/signin">Already have an account? Sign In</Link>
            </Box>
            </Stack>
        </form>
        </Box>
    );
}

export default SignUp;
