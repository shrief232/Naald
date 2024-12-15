import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductList from '../ProductList/ProductsList'; 
import ProductListwomen from '../ProductList/ProductListwomen';
import ProductListKeds from '../ProductList/ProductListKids';
import ProductListAllCategories from '../ProductList/ProductListAllCategories';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>} 
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Introduction() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 6 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable" 
          scrollButtons="auto" 
        >
          <Tab label="All Categories" {...a11yProps(0)} />
          <Tab label="Men Section" {...a11yProps(1)} />
          <Tab label="Women Section" {...a11yProps(2)} />
          <Tab label="Kids Section" {...a11yProps(3)} />
        </Tabs>
      </Box>
      
      <CustomTabPanel value={value} index={0}>
         <ProductListAllCategories />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
         <ProductList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
         <ProductListwomen />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
          <ProductListKeds />
      </CustomTabPanel>
      
    </Box>
  );
}
