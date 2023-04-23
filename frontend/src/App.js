import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import SignUp from './Pages/signUp';
import SignIn from './Pages/signIn';
import HomePrediction from './Pages/Homepage';
import CropPage from './Pages/rice';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/');
            const jsonData = await response.json();
            setData(jsonData);
        }
        fetchData();
    }, []);

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
                    <Route path="/crops">
                        <CropPage></CropPage>
                    </Route>
                    <Route path="/">
                        <HomePrediction data={data}></HomePrediction>
                    </Route>
                    
                </Switch>
            </Router>
        </ChakraProvider>
    );
}

export default App;
