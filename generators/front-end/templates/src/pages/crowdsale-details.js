import React from 'react'
import Link from 'gatsby-link'
import Pie from 'react-chartjs-2';
 
const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

const CrowdsaleDetails = () => (
  <div>
    <h1>Crowdsale Details</h1>
    <p>Learn more about this ICO crowdsale</p>

    <h2>Token Distribution</h2>
    <Pie data = {data}/>

    <h2> Team </h2>

    <Link to="/">Go back to the homepage</Link>
  </div>
)

export default CrowdsaleDetails
