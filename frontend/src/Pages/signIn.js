import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn() {
        // logic for handling sign in form submission goes here
    }

    return (
        <Box p={4}>
        <form onSubmit={handleSignIn}>
            <Stack spacing={4}>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue">Sign In</Button>
            <Box textAlign="center">
                <Link to="/signup">Don't have an account? Sign Up</Link>
            </Box>
            </Stack>
        </form>
        </Box>
    );
}

export default SignIn;
