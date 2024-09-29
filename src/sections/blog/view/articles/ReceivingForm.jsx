import React, { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider
} from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';


// Styled components for better design
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '80%',
  maxWidth: '800px',
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
}));

const ReceivingForm = () => {
  const [formValues, setFormValues] = useState({
    clientId: '',
    receivingDate: '',
    withTransportation: false,
    transportationCoast: '',
    articles: []
  });

  const [newArticle, setNewArticle] = useState({
    receivingId: '',
    name: '',
    codeBar: '',
    unitLength: '',
    unitLarge: '',
    unitHeight: '',
    coast: '',
    needFreezer: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleArticleChange = (event) => {
    const { name, value } = event.target;
    setNewArticle({
      ...newArticle,
      [name]: value,
    });
  };

  const handleArticleCheckboxChange = (event) => {
    setNewArticle({
      ...newArticle,
      [event.target.name]: event.target.checked,
    });
  };

  const addArticle = () => {
    setFormValues({
      ...formValues,
      articles: [...formValues.articles, newArticle]
    });
    setNewArticle({
      receivingId: '',
      name: '',
      codeBar: '',
      unitLength: '',
      unitLarge: '',
      unitHeight: '',
      coast: '',
      needFreezer: false,
    });
  };

  const removeArticle = (index) => {
    const updatedArticles = [...formValues.articles];
    updatedArticles.splice(index, 1);
    setFormValues({
      ...formValues,
      articles: updatedArticles
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log('Receiving Form Submitted:', formValues);
  };

  return (
    <Container>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Receiving Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client ID"
                  name="clientId"
                  value={formValues.clientId}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Receiving Date"
                  name="receivingDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formValues.receivingDate}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Transportation Coast"
                  name="transportationCoast"
                  type="number"
                  value={formValues.transportationCoast}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formValues.withTransportation}
                      onChange={handleCheckboxChange}
                      name="withTransportation"
                      color="primary"
                    />
                  }
                  label="With Transportation"
                />
              </Grid>

              {/* Articles Section */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Articles
                </Typography>
                {formValues.articles.map((article, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Typography variant="body1" component="span" sx={{ marginRight: 2 }}>
                      {`${article.name} (${article.codeBar})`}
                    </Typography>
                    <IconButton color="secondary" onClick={() => removeArticle(index)}>
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <Divider sx={{ margin: '20px 0' }} />
                <Typography variant="body1" component="div">
                  Add New Article
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={newArticle.name}
                      onChange={handleArticleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Code Bar"
                      name="codeBar"
                      value={newArticle.codeBar}
                      onChange={handleArticleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Unit Length"
                      name="unitLength"
                      type="number"
                      value={newArticle.unitLength}
                      onChange={handleArticleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Unit Large"
                      name="unitLarge"
                      type="number"
                      value={newArticle.unitLarge}
                      onChange={handleArticleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Unit Height"
                      name="unitHeight"
                      type="number"
                      value={newArticle.unitHeight}
                      onChange={handleArticleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Coast"
                      name="coast"
                      type="number"
                      value={newArticle.coast}
                      onChange={handleArticleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newArticle.needFreezer}
                          onChange={handleArticleCheckboxChange}
                          name="needFreezer"
                          color="primary"
                        />
                      }
                      label="Needs Freezer?"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      type="button"
                      variant="outlined"
                      color="primary"
                      startIcon={<AddCircle />}
                      onClick={addArticle}
                      size="large"
                    >
                      Add Article
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ borderRadius: '8px' }}
                >
                  Save Receiving
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default ReceivingForm;
