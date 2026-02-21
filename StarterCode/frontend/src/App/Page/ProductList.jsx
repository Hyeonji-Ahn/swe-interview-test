import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setSnackbarOpen(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" component="h1" fontWeight={700} textAlign="center" mb={4}>
          Simple Card List
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Typography textAlign="center">Loading products...</Typography>
        ) : products.length === 0 ? (
          <Typography textAlign="center">No products available.</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  width: 300,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h6" component="h2" fontWeight={700} gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 1.5, pb: 1.5, justifyContent: 'flex-end' }}>
                  <IconButton
                    aria-label={`delete ${product.name}`}
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Product deleted
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductList;