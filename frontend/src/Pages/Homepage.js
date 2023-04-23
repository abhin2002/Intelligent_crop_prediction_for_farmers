import React, { useState } from 'react';
import './Modal.css'; // import the CSS file
import { Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Stack ,useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Text,} from '@chakra-ui/react';

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
    const [temperature, settemp] = useState('');
    const [humidity, setHumid] = useState('');
    const [ph, setPh] = useState('');
    const [rain, setRain] = useState('');
    
    const [prediction, setPrediction] = useState(null);
    const [showModal, setShowModal] = useState(false);

    console.log("hi")
    async function handleSubmit(e) {
        // logic for handling sign in form submission goes here
        e.preventDefault();
        const inputValues = [parseInt(nitrogen), parseInt(pottassium),  parseInt(phosphorous), parseInt(temperature), parseInt(humidity), parseInt(ph), parseInt(rain) ];
        console.log(inputValues);


        
        const res = await fetch("/api/v1/evaluate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            input_list: inputValues
          })
          
        });
        const data = await res.json();
        console.log(data)
        if (!data) {
            window.alert("Prediction failed: " + data.message);
            console.log("Prediction failed: " + data.message);
        } else {
            setPrediction("\n"+data.score+" : "+data.crop*100+" %");
            setShowModal(true);
            console.log("Prediction complete: " + data.score);
        }

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
                <FormLabel>Temperature</FormLabel>
                <Input type="number" value={temperature} onChange={(e) => settemp(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Humidity</FormLabel>
                <Input type="number" value={humidity} onChange={(e) => setHumid(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>ph</FormLabel>
                <Input type="number" value={ph} onChange={(e) => setPh(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Rainfall</FormLabel>
                <Input type="number" value={rain} onChange={(e) => setRain(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue">Show results</Button>
            </Stack>
        </form>
        {showModal && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setShowModal(false)}>
        &times;
      </span>
      <div className="prediction-container">
        <div className="prediction-label">
          <p>Prediction complete:</p>
        </div>
        <div className="prediction-value">
          <p>{prediction}</p>
        </div>
      </div>
    </div>
  </div>
)}



        
        
        </Box>
    );
}

export default HomePrediction;
