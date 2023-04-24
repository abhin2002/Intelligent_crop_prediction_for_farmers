import React from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, Link } from '@chakra-ui/react';
import WaterMelonImage from '../Images/WaterMelon.jpeg';

const WaterMelonPage = () => {
  return (
    <Box bg={`url(${WaterMelonImage})`} bgSize="cover" height="100vh">
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
              <Tab>തണ്ണിമത്തൻ</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p="4">
                <h2 style={{ fontWeight: "bold" }}><u>വളപ്രയോഗം</u></h2>
                  <p>
                  പച്ചച്ചാണകം, കടലപ്പിണ്ണാക്ക് മിശ്രിതം പുളിപ്പിച്ച ലായനി ഉള്‍പ്പെടെ ജൈവവങ്ങള്‍ ഇടയ്ക്ക് ചേര്‍ക്കുക. രാസവളം ചേര്‍ക്കുകയാണെങ്കില്‍ നടുമ്പോള്‍ കുഴിയില്‍ 50 ഗ്രാം ഫാക്ടംഫോസ് ചേര്‍ക്കുക.തുടര്‍ന്ന് മൂന്നാഴ്ചയില്‍ യൂറിയയും പൊട്ടാഷും 100 ഗ്രാം (50 ഗ്രാംവീതം) ചേര്‍ക്കുക.പിന്നീട് യൂറിയ ചേര്‍ത്തുകൊടുക്കുക.
                  </p>
                  <Link href="http://www.krishi.info/help_video/view_sub_details/1683/24">
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

export default WaterMelonPage;
