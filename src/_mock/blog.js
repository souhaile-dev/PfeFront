// src/_mock/blog.js
import React, { useState } from 'react';

// Import the local images
import firstPostImage from '../../public/assets/background/overlay_2.jpg';
import secondPostImage from '../../public/assets/background/overlay_3.jpg';
import thirdPostImage from '../../public/assets/background/overlay_4.jpg';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'Tracking',
      content: 'This is the first blog post content.',
      img: firstPostImage,
      route: '/Mp', // Route for RealTimeLocation
    },
    {
      id: 2,
      title: 'Ressource humain',
      content: 'This is the second blog post content.',
      img: secondPostImage,
      route: '/employee-management', // Route for EmployeeManagement
    },
    {
      id: 3,
      title: 'View the stock',
      content: 'This is the third blog post content.',
      img: thirdPostImage,
      route: '/vehicle-management', // Route for VehicleManagement
    },
    {
      id: 4,
      title: 'Depences',
      content: 'This is the fourth blog post content.',
      img: firstPostImage,
      route: '/expenses-management', // Example route for another component
    },
  ]);

  return { blogPosts, setBlogPosts };
};
