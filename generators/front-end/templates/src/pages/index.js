import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      <li><Link to="/whitepaper/">ICO Whitepaper</Link></li>
      <li><Link to="/crowdsale-details/">Crowdsale Details</Link></li>
      <li><Link to="/kyc/">KYC registration</Link></li>
    </ul>
  </div>
)

export default IndexPage
