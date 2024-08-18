import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state ? location.state.val : null;

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  useEffect(() => {
    if (existingData) {
      setInputs(existingData);
    }
  }, [existingData]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission

    const url = existingData
      ? `http://localhost:3001/update/${existingData._id}`
      : "http://localhost:3001/add";

    const method = existingData ? 'put' : 'post';

    axios[method](url, inputs)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('There was an error processing your request.');
      });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            placeholder="Title"
            onChange={inputHandler}
            name="title"
            value={inputs.title}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Content"
            onChange={inputHandler}
            name="content"
            value={inputs.content}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
            fullWidth
          />
          <Button type="submit" variant="contained" color="secondary">
            {existingData ? "Update" : "Submit"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;



