import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [rows, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/details')
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const deleteData = (id) => {
    axios.delete(`http://localhost:3001/removedetails/${id}`)
      .then((res) => {
        alert('Data deleted');
        setCards(rows.filter(row => row._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const updateData = (val) => {
    navigate('/Add', { state: { val } });
  };

  return (
    <Box sx={{ flexGrow: 1 ,marginTop:2}}>
      <Grid container spacing={3}>
        {rows.length > 0 ? (
          rows.map((row) => (
            <Grid item xs={10} sm={6} md={4} key={row._id}>
              <Card style={{ backgroundColor: "#f3e5f5", borderRadius: "10px" }} sx={{ minWidth: 275, marginBottom: 2 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={row.img_url}
                  alt={row.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {row.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {row.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant='contained' style={{backgroundColor:"#ab47bc"}} onClick={() => updateData(row)}>Update</Button>
                  <Button variant='contained' style={{backgroundColor:"#ab47bc"}} onClick={() => deleteData(row._id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Not available
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Home;



