// src/sections/blog/view/post-card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';


const PostCard = ({ post }) => {
  const { title, content, img, route } = post;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        onClick={handleClick}
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          cursor: 'pointer',
        }}
      >
        <CardContent
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
          }}
        >
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string,
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;