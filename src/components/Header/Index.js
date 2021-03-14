function Header(props) {
    const {toggleSideMenu, sideMenuToggled} = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button type="button" id="sidebarCollapse" className="btn" onClick={() => { toggleSideMenu(!sideMenuToggled) }}>
                    <i className="fa fa-bars"></i>
                </button>
            </div>
        </nav>
    );
}

export default Header;
