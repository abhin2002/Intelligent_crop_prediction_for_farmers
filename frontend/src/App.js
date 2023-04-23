import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import SignUp from './Pages/signUp';
import SignIn from './Pages/signIn';
import HomePrediction from './Pages/Homepage';
import RicePage from './Pages/rice';
import MaizePage from './Pages/maize';
import ChickpeaPage from './Pages/chickpea';
import KidneyBeansPage from './Pages/kidneybeans';
import PigeonPeasPage from './Pages/pigeonpeas';
import MothBeansPage from './Pages/mothbeans';
import MungBeanPage from './Pages/mungbean';
import BlackGramPage from './Pages/blackgram';
import LentilPage from './Pages/lentil';
import PomegranatePage from './Pages/pomegranate';
import BananaPage from './Pages/banana';
import MangoPage from './Pages/mango';
import GrapesPage from './Pages/grapes';
import WatermelonPage from './Pages/watermelon';
import MuskmelonPage from './Pages/muskmelon';
import ApplePage from './Pages/apple';
import OrangePage from './Pages/orange';
import PapayaPage from './Pages/papaya';
import CoconutPage from './Pages/coconut';
import CottonPage from './Pages/cotton';
import JutePage from './Pages/jute';
import CoffeePage from './Pages/coffee';

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
                    <Route path="/rice">
                    <RicePage />
                    </Route>
                    <Route path="/maize">
                    <MaizePage />
                    </Route>
                    <Route path="/chickpea">
                    <ChickPeaPage />
                    </Route>
                    <Route path="/kidneybeans">
                    <KidneyBeansPage />
                    </Route>
                    <Route path="/pigeonpeas">
                    <PigeonPeasPage />
                    </Route>
                    <Route path="/mothbeans">
                    <MothBeansPage />
                    </Route>
                    <Route path="/mungbean">
                    <MungBeanPage />
                    </Route>
                    <Route path="/blackgram">
                    <BlackGramPage />
                    </Route>
                    <Route path="/lentil">
                    <LentilPage />
                    </Route>
                    <Route path="/pomegranate">
                    <PomegranatePage />
                    </Route>
                    <Route path="/banana">
                    <BananaPage />
                    </Route>
                    <Route path="/mango">
                    <MangoPage />
                    </Route>
                    <Route path="/grapes">
                    <GrapesPage />
                    </Route>
                    <Route path="/watermelon">
                    <WatermelonPage />
                    </Route>
                    <Route path="/muskmelon">
                    <MuskmelonPage />
                    </Route>
                    <Route path="/apple">
                    <ApplePage />
                    </Route>
                    <Route path="/orange">
                    <OrangePage />
                    </Route>
                    <Route path="/papaya">
                    <PapayaPage />
                    </Route>
                    <Route path="/coconut">
                    <CoconutPage />
                    </Route>
                    <Route path="/cotton">
                    <CottonPage />
                    </Route>
                    <Route path="/jute">
                    <JutePage />
                    </Route>
                    <Route path="/coffee">
                    <CoffeePage />
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
