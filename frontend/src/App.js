import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import SignUp from './Pages/signUp';
import SignIn from './Pages/signIn';

function App() {
    return (
        <ChakraProvider>
        <Router>
            <Switch>
            <Route path="/signup">
                <SignUp></SignUp>
            </Route>
            <Route path="/signin">
                <SignIn></SignIn>
            </Route>
            </Switch>
        </Router>
        </ChakraProvider>
    );
}

export default App;
