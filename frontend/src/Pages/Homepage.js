import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'

const Homepage = () => {
    return(
        <Container maxW = 'xl' centerContent>
            <Box className='TitleBox'>
                <Text className='heading'>Intelligent Crop Analyser</Text>
            </Box>
        </Container>
        )   
}

export default Homepage
