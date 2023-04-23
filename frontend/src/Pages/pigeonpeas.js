import React from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, Link } from '@chakra-ui/react';
import PigeonPeaImage from '../Images/PigeonPea.jpeg';

const PigeonPeaPage = () => {
    return (
        <Box bg={`url(${PigeonPeaImage})`} bgSize="cover" height="100vh">
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
                <Tab>തുവരപരിപ്പ്</Tab>
                </TabList>
                <TabPanels>
                <TabPanel>
                    <Box p="4">
                    <h2 style={{ fontWeight: "bold" }}><u>വളപ്രയോഗം</u></h2>
                        <p>
                        ഹെക്ടറൊന്നിന് 3 ടണ്‍ കാലിവളം, 500 കിലോഗ്രാം കുമ്മായം, 40 കിലോഗ്രാം പാക്യജനകം, 80 കിലോഗ്രാം ഭാവഹം ഇവ വേണ്ടിവരും.
                        </p>
                    <Link href="http://www.krishi.info/help_video/view_sub_details/2433/27">
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

export default PigeonPeaPage;
