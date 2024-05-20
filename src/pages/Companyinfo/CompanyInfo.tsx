import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Box, Button, Typography, IconButton } from '@mui/joy';
import LanguageIcon from '@mui/icons-material/Language';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Company from '../../components/Companyinfo/Company/Company';
import Sites from '../../components/Companyinfo/Sites/Sites';
import TableOptions from '../../components/Companyinfo/TableOptions/TableOptions';

const CompanyInfo = () => {
    const [companyFormData, setCompanyFormData] = React.useState({});
    const [siteFormData, setSiteFormData] = React.useState({});
    const [tableFormData, setTableFormData] = React.useState({});
    const [activeTab, setActiveTab] = React.useState(0);

    const handleNextTab = () => {
        setActiveTab((prevTab) => Math.min(prevTab + 1, 6));
    };

    const handlePrevTab = () => {
        setActiveTab((prevTab) => Math.max(prevTab - 1, 0));
    };

    const tabs = [
        { label: '1. Company', icon: <LanguageIcon fontSize='large' /> },
        { label: '2. Sites', icon: <LanguageIcon fontSize='large' /> },
        { label: '3. Locations', icon: <LanguageIcon fontSize='large' /> },
        { label: '4. Categories', icon: <LanguageIcon fontSize='large' /> },
        { label: '5. Database', icon: <LanguageIcon fontSize='large' /> },
        { label: '6. Table Options', icon: <LanguageIcon fontSize='large' /> },
        { label: '7. Event Options', icon: <LanguageIcon fontSize='large' /> },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Tabs
                    aria-label="Basic tabs"
                    value={activeTab}
                    sx={{ width: '100%' }}
                >
                    <TabList 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-around', 
                            width: '100%', 
                            flexDirection: { xs: 'column', sm: 'column', md: 'row' }
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                disabled={index > activeTab}
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'row', sm: 'row', md: 'column' },
                                    alignItems: 'center',
                                    minWidth: 'auto',
                                    padding: '8px',
                                    color: activeTab === index ? 'red' : 'inherit', 
                                    width: { xs: '100%', sm: '100%', md: 'auto' },
                                    marginBottom: { xs: '8px', sm: '8px', md: '0' }
                                }}
                            >
                                <IconButton>
                                    {React.cloneElement(tab.icon, {
                                        style: { color: index <= activeTab ? 'red' : 'inherit' },
                                    })}                                    
                                    {index < activeTab && <CheckCircleIcon style={{ color: 'green', marginLeft: '4px' }} />} 
                                </IconButton>
                                <Typography level="h4">{tab.label}</Typography>
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanel value={0}>
                        <Company companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeTab} setActiveTab={setActiveTab}/>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Sites siteFormData={siteFormData} setSiteFormData={setSiteFormData} activeTab={activeTab} setActiveTab={setActiveTab}/>
                    </TabPanel>
                    <TabPanel value={2}>
                        <h1>Locations</h1>
                    </TabPanel>
                    <TabPanel value={3}>
                        <h1>Categories</h1>
                    </TabPanel>
                    <TabPanel value={4}>
                        <h1>Database</h1>
                    </TabPanel>
                    <TabPanel value={5}>
                        <TableOptions tableFormData={tableFormData} setTableFormData={setTableFormData} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </TabPanel>
                    <TabPanel value={6}>
                        <h1>Event Options</h1>
                    </TabPanel>
                </Tabs>
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button disabled={activeTab === 0} onClick={handlePrevTab}>
                        Previous
                    </Button>
                    <Button disabled={activeTab === 6} onClick={handleNextTab}>
                        Continue
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CompanyInfo;
