import React from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, Link } from '@chakra-ui/react';
import BananaImage from '../Images/Banana.jpg';

const BananaPage = () => {
  return (
    <Box bg={`url(${BananaImage})`} bgSize="cover" height="100vh">
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="rgba(255, 255, 255, 0.6)"
        flexDirection="column"
      >
        <Box maxW="sm" bg="white" borderRadius="md" p="4">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Banana</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p="4">
                  <p>
                    Banana is a staple food in many parts of the world, especially in
                    Asia. It is a cereal grain that is the most important staple food
                    for a large part of the world's human population. It provides
                    carbohydrates, which are the body's main source of energy, and
                    also contains small amounts of protein, fat, and vitamins.
                  </p>
                  <Link href="http://www.krishi.info/help_video/view_sub_details/143/33">
                    <Button mt="4" colorScheme="blue">Read more</Button>
                  </Link>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default BananaPage;
