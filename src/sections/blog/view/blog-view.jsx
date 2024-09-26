// src/sections/blog/view/BlogView.jsx
import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';
import { useBlogPosts } from '../../../_mock/blog';
import { useAuth } from '../../../routes/components/Lo/AuthContext';

const BlogView = () => {
  const { blogPosts } = useBlogPosts();
  const { role } = useAuth();

  let filteredPosts = [];
  if (role === 'ADMIN') {
    filteredPosts = blogPosts; // Admin sees all posts
  } else if (role === 'DRIVER') {
    filteredPosts = blogPosts.filter(post => post.title === 'Tracking' || post.title === 'View the stock');
  } else if (role === 'EMPLOYEE') {
    filteredPosts = blogPosts.filter(post => post.title === 'Ressource humain' || post.title === 'Depences');
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Blog</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={filteredPosts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'test', label: 'test' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {filteredPosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
};

export default BlogView;