import React, { useState } from 'react';
import { Container, Grid, Pagination, Box } from '@mui/material';
import Card from '@mui/material/Card'; // Example MUI card
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const itemsPerPage = 6; // Number of cards per page

const PaginatedCards = ({ items }) => {
  const [page, setPage] = useState(1);

  // Calculate the total number of pages
  const count = Math.ceil(items.length / itemsPerPage);

  // Get current page items
  const handlePagination = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      <Grid container spacing={2}>
        {currentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination component */}
      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Pagination 
          count={count} 
          page={page} 
          onChange={handlePagination} 
          color="primary"
        />
      </Box>
    </Container>
  );
};

// Example usage
const items = [
  { title: 'Item 1', description: 'Description 1' },
  { title: 'Item 2', description: 'Description 2' },
  { title: 'Item 3', description: 'Description 3' },
  { title: 'Item 4', description: 'Description 4' },
  { title: 'Item 5', description: 'Description 5' },
  { title: 'Item 6', description: 'Description 6' },
  { title: 'Item 7', description: 'Description 7' },
  { title: 'Item 8', description: 'Description 8' },
  { title: 'Item 9', description: 'Description 9' },
  { title: 'Item 10', description: 'Description 10' },
];

export default function App() {
  return (
    <PaginatedCards items={items} />
  );
}
