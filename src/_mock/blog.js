// src/_mock/blog.js
import React, { useState } from 'react';

// Import the local images
import firstPostImage from '../../public/assets/background/traking.jpeg';
import secondPostImage from '../../public/assets/background/rh.jpeg';
import thirdPostImage from '../../public/assets/background/stock.jpeg';
import foordPostImage from '../../public/assets/background/vehicule.jpeg';

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
      title: 'Add Vehicule',
      content: 'This is the third blog post content.',
      img: foordPostImage,
      route: '/vehicle-management', // Route for VehicleManagement
    },
    {
      id: 4,
      title: 'Depences',
      content: 'This is the fourth blog post content.',
      img: thirdPostImage,
      route: '/depences', // Example route for another component
    },{
      id: 5,
      title: 'stock',
      content: 'This is the fourth blog post content.',
      img: thirdPostImage,
      route: '/stock', // Example route for another component
    },{
      id: 6,
      title: 'Maintenance vehicule',
      content: 'This is the commandes for the logisticien',
      img: thirdPostImage,
      route: '/Maintenance', // Example route for another component
    },
    
  ]);

  return { blogPosts, setBlogPosts };
};