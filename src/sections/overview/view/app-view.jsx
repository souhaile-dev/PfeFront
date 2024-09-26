import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import StockForm from 'src/sections/blog/view/Stock/StockForm'; // Import the StockForm component
import { db } from 'src/routes/components/Lo/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function AppView() {
  const [stockData, setStockData] = useState({
    labels: [],
    selled: [],
    buyed: [],
    currentStock: [],
  });

  const fetchStockData = async () => {
    const querySnapshot = await getDocs(collection(db, 'stocks'));
    const data = {
      labels: [],
      selled: [],
      buyed: [],
      currentStock: [],
    };

    querySnapshot.forEach((doc) => {
      const stock = doc.data();
      data.labels.push(stock.date);
      data.selled.push(parseInt(stock.selled));
      data.buyed.push(parseInt(stock.buyed));
      data.currentStock.push(parseInt(stock.currentStock));
    });

    setStockData(data);
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const addStockData = (newData) => {
    setStockData((prev) => ({
      labels: [...prev.labels, newData.date],
      selled: [...prev.selled, parseInt(newData.selled)],
      buyed: [...prev.buyed, parseInt(newData.buyed)],
      currentStock: [...prev.currentStock, parseInt(newData.currentStock)],
    }));
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Mr Souhaile 👋
      </Typography>
      <Grid container spacing={3}>
        {/* <Grid xs={12} md={6} lg={8}>
          <StockForm onAddStock={addStockData} />
        </Grid> */}
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Productivity"
            subheader="(+43%) than last year"
            chart={{
              labels: stockData.labels,
              series: [
                {
                  name: 'selled',
                  type: 'column',
                  fill: 'solid',
                  data: stockData.selled,
                },
                {
                  name: 'buyed',
                  type: 'area',
                  fill: 'gradient',
                  data: stockData.buyed,
                },
                {
                  name: 'current stock',
                  type: 'line',
                  fill: 'solid',
                  data: stockData.currentStock,
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current employés"
            chart={{
              series: [
                { label: 'Women', value: 4344 },
                { label: 'Men', value: 5435 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Payroll"
            total={138154236.000} // Removed commas from the total value
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} >
          <AppWidgetSummary
            title="Average salary"
            total={9000}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Average age"
            subtitle="Mad"
            total={35}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'distribués', value: 400 },
                { label: 'congés', value: 430 },
                { label: 'employés', value: 448 },
                { label: 'achivement', value: 470 },
                { label: 'Non distribuer', value: 540 },
                { label: 'declined', value: 580 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Object"
            chart={{
              categories: ['lait', 'yaghourt', 'object3', 'Object4', 'Object5', 'Object6'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '2000, orders, $4220',
                '12 cities have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by departement"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'livrer dans cette ville ' },
              { id: '2', name: 'liberer les attestations de congés' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'contabilités' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
