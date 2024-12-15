import React, { useEffect, useState } from "react";
import { Box, Card, Typography, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import api from "../../api";

export default function OrderHistory() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("en/core/cart-order-items/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        setError(
          error.response?.data?.detail || "Error fetching order history. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      {orders && orders.length === 0 ? (
        <Card 
        severity="info"
        sx={{
          padding: 3,
          marginBottom: 3,
          borderRadius: "15px",
          boxShadow: 3,
        }}
        >
           <Typography variant="h5" gutterBottom>
            Order History
          </Typography>
          <Box fullWidth sx={{height:'5rem', mt:'3rem'}}>
            <Typography variant="body2">
              You have not made any orders yet
            </Typography>
          </Box>
        </Card>
      ) : (
        <Card
          sx={{
            padding: 3,
            marginBottom: 3,
            borderRadius: "15px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Order History
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><strong>Order ID</strong></TableCell>
                  <TableCell align="center"><strong>Order Item</strong></TableCell>
                  <TableCell align="center"><strong>Total Amount</strong></TableCell>
                  <TableCell align="center"><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell align="center">{order.id}</TableCell>
                    <TableCell align="center">
                      {order.item_title || "N/A"}
                    </TableCell>
                    <TableCell align="center">${order.price || "N/A"}</TableCell>
                    <TableCell align="center">{order.product_status|| "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  );
}
