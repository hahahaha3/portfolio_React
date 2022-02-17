import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header(props) {
    const active = {color: '#c2b096'};
    return (
        <header className={props.type}>
            <div className="inner">
                <h1><NavLink exact to='/'>LOGO</NavLink></h1>
                <ul id="util">
                    <li><NavLink activeStyle={active} to='/index'>CONTACT</NavLink></li>
                    <li><NavLink activeStyle={active} to='/index'>LOGIN</NavLink></li>
                    <li><NavLink activeStyle={active} to='/join'>JOIN</NavLink></li>
                </ul>

                <ul id="gnb">
                    <li><NavLink activeStyle={active} to='/about'>ABOUT</NavLink></li>
                    <li><NavLink activeStyle={active} to='/community'>COMMUNITY</NavLink></li>
                    <li><NavLink activeStyle={active} to='/gallery'>GALLERY</NavLink></li>
                    <li><NavLink activeStyle={active} to='/youtube'>YOUTUBE</NavLink></li>
                    <li><NavLink activeStyle={active} to='/location'>LOCATION</NavLink></li>
                </ul>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </header>
    )
}