import React from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, Link } from '@chakra-ui/react';
import MaizeImage from '../Images/Maize.jpg';

const MaizePage = () => {
  return (
    <Box bg={`url(${MaizeImage})`} bgSize="cover" height="100vh">
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
              <Tab>ചോളം</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p="4">
                <h2 style={{ fontWeight: "bold" }}><u>വളപ്രയോഗം</u></h2>
                  <p>
                  നിലമൊരുക്കുന്ന സമയത്തു ഒരു ഹെക്ടറിലേക്ക് 25 ടൺ  കാലിവളമോ കമ്പോസ്റ്റോ  ഇട്ടു കൊടുക്കാം.
                  </p>
                  <Link href="http://www.krishi.info/help_video/view_sub_details/1810/33">
                    {/* link corrected */}
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

export default MaizePage;
