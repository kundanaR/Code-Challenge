import empty from '../../assets/empty.png';
function Empty() {
    return (
        <div className="centerImage">
            <img src={empty} alt="Empty Page" width="100%" height="100%"/>
            <h4>No Page</h4>
        </div>
    );
}

export default Empty;
