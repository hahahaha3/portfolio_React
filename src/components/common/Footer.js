import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return (
        <footer>
            <div className="inner">
                <div className="logo">
                    <h1>PORTFOLIO</h1>
                    <p> 2022 PORTFOLIO_REACT &copy; ALL RIGHT RESERVED. </p>
                </div>
                <div className="sitemap">
                    <h4>About us</h4>
                    <p>About us</p>
                    <p>Site Map</p>
                    <p>Our Story</p>
                    <p>Contact us</p>
                </div>
                <div className="sitemap">
                    <h4>Products</h4>
                    <p>Products</p>
                    <p>Join</p>
                </div>
                <div className="sitemap">
                    <h4>Services</h4>
                    <p>youtube</p>
                    <p>gallery</p>
                </div>
                <div className="sitemap">
                    <h4>Get in touch</h4>
                    <p>FAQ</p>
                    <FontAwesomeIcon icon={faFacebookF} className="icons"/>
                    <FontAwesomeIcon icon={faTwitter} className="icons" />
                    <FontAwesomeIcon icon={faLinkedinIn} className="icons" />
                </div>
            </div>
        </footer>
    )
}