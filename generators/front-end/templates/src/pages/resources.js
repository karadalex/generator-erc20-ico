import React from 'react'
import Link from 'gatsby-link'

const Resources = () => (
  <div>
    <h1>Resources</h1>
    <p>
        Learn more about Ethereum, Blockchain technology
        and ICOs.
    </p>

    <h2>Useful websites</h2>
    <ul>
        <li>
            <a href="https://ethereum.org/">
                Ethereum Blockchain - Official website
            </a>
        </li>
        <li>
            <a href="https://ethereum.org/">
                ERC20 Token Standard
            </a>
        </li>
    </ul>

    <h2>Explanatory videos</h2>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/cqZhNzZoMh8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <br/>
    <Link to="/">Go back to the homepage</Link>
  </div>
)

export default Resources
