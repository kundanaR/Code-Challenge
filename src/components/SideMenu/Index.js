import logo from '../../assets/logo.png';
import logoSmall from '../../assets/logo_small.jpeg';
function SideMenu(props) {
    const {sideMenuToggled, Link, useLocation} = props;
    const location = useLocation();
    const {pathname} = location;

    return (
        <nav id="sidebar" className={sideMenuToggled ? 'active' : ''}>
            <div className="sidebar-header">
                <img id="logo" alt="LiveBarn" src={logo} height={65} width={200} />
                <img id="logo_small" alt="LiveBarn" src={logoSmall} height={40} width={40} />
            </div>
            <ul className="list-unstyled components">
                <li className={pathname === '/empty' ? 'active' : ''}>
                    <Link to="/empty"><i className="fa fa-file-o"></i> Empty</Link>
                </li>
                <li className={pathname === '/dashboard' ? 'active' : ''}>
                    <Link to="/dashboard"><i className="fa fa-dashboard"></i> Data</Link>
                </li>
            </ul>
        </nav>
    );
}

export default SideMenu;
