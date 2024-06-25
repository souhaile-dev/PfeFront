import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title,subtitle, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
        boxShadow: '0px 4px 10px rgba(1, 0, 0, 0.5)',
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5}>
      <div className='flex flex-1'>
    <Typography variant="h4" sx={{ marginRight: 1, color: 'red.500' }}>
      {fShortenNumber(total)}
    </Typography>
    {/* <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
      {subtitle}
    </Typography> */}
  </div>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  subtitle:PropTypes.string,
  total: PropTypes.number,
};
