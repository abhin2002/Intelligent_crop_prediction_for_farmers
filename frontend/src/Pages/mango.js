import React from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, Link } from '@chakra-ui/react';
import MangoImage from '../Images/Mango.png';
import fertilizer from '../Images/MangoFertilize.png'
const MangoPage = () => {
  return (
    <Box bg={`url(${MangoImage})`} bgSize="cover" height="100vh">
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
              <Tab>മാവ്</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p="4">
                <h2 style={{ fontWeight: "bold" }}><u>വളപ്രയോഗം</u></h2>
                <img src={fertilizer} alt="Fertilizer" />
                  <Link href="http://www.krishi.info/help_video/view_sub_details/1441/24">
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

export default MangoPage;
