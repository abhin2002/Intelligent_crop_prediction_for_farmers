import React, { useState } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import riceImage from '../Images/rice.jpg';
import maizeImage from '../Images/maize.jpg';

const CropPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Box
      bg={`url(${activeTabIndex === 0 ? riceImage : maizeImage})`}
      bgSize="cover"
      height="100vh"
    >
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="rgba(255, 255, 255, 0.6)"
        flexDirection="column"
      >
        <Box maxW="sm" bg="white" borderRadius="md" p="4">
          <Tabs
            isFitted
            variant="enclosed"
            onChange={(index) => setActiveTabIndex(index)}
          >
            <TabList mb="1em">
              <Tab>Rice</Tab>
              <Tab>Maize</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p="4">
                  <p>
                    Rice is a staple food in many parts of the world, especially in
                    Asia. It is a cereal grain that is the most important staple food
                    for a large part of the world's human population. It provides
                    carbohydrates, which are the body's main source of energy, and
                    also contains small amounts of protein, fat, and vitamins.
                  </p>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p="4">
                  <p>
                    Maize is a cereal grain that is commonly grown in many parts of
                    the world. It is used as a staple food in many countries, and is
                    also used to make a variety of products such as cornmeal, corn
                    flour, and corn syrup. Maize provides carbohydrates, which are
                    the body's main source of energy, and also contains small amounts
                    of protein, fat, and vitamins.
                  </p>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default CropPage;
