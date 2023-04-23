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
              <Tab>വാഴ</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p="4">
                <h2 style={{ fontWeight: "bold" }}><u>വളപ്രയോഗം</u></h2>
                  <p>
                  കമ്പോസ്റ്റ്, കാലിവളം, പച്ചിലവളം എന്നിവയിലൊന്ന്‍ ഒരു കുഴിയില്‍ പത്തുകിലോഗ്രാം എന്ന കണക്കില്‍ ചേര്‍ക്കുക
                  </p>
                  <Link href="http://www.krishi.info/help_video/view_sub_details/270/24">
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
