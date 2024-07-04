// import React from 'react';
// import PropTypes from 'prop-types';

// const StockOverview = ({ stockData }) => {
//   if (!stockData) {
//     return <div>No stock data available.</div>;
//   }

//   const { labels = [], selled = [], buyed = [], currentStock = [] } = stockData;

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-xl font-semibold mb-2">Stock Overview</h2>
//       <p className="text-sm text-gray-500 mb-4">Details about current stock and sales.</p>
//       <div className="w-full h-64">
//         <p className="font-bold">Labels: {labels.join(', ')}</p>
//         <p className="font-bold">Selled: {selled.join(', ')}</p>
//         <p className="font-bold">Buyed: {buyed.join(', ')}</p>
//         <p className="font-bold">Current Stock: {currentStock.join(', ')}</p>
//       </div>
//     </div>
//   );
// };

// StockOverview.propTypes = {
//   stockData: PropTypes.shape({
//     labels: PropTypes.arrayOf(PropTypes.string).isRequired,
//     selled: PropTypes.arrayOf(PropTypes.number).isRequired,
//     buyed: PropTypes.arrayOf(PropTypes.number).isRequired,
//     currentStock: PropTypes.arrayOf(PropTypes.number).isRequired,
//   }).isRequired,
// };

// export default StockOverview;
