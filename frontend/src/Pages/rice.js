import React from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, Link } from '@chakra-ui/react';
import RiceImage from '../Images/Rice.jpg';

const RicePage = () => {
  return (
    <Box bg={`url(${RiceImage})`} bgSize="cover" height="100vh">
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
              <Tab>അരി</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p="4">
                  <p>
                    <h2 style={{ fontWeight: "bold" }}><u>വളപ്രയോഗം</u></h2>
                    മണ്ണിലെ pH 6.5 ല്‍ കുറവാണെങ്കില്‍ കുമ്മായം ചേര്‍ക്കണം.

                    ഒന്നാം വിളക്കാലം - 600 കിലോ കുമ്മായം / ഹെക്റ്റര്‍ ( രണ്ട് തവണകളായി ‍)

                    നിലം ഒരുക്കുന്ന സമയത്ത് - 350 കിലോ

                    വിതച്ച് / നട്ട് ഒരുമാസത്തിന് ശേഷം - 250 കിലോ
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

export default RicePage;
