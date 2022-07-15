import { useHistory } from "react-router-dom";
import { Row } from 'react-bootstrap';

export default function SideBar({toggleNav}){
    const history = useHistory();
    return <div id="mySidenav" className="sidenav" style={{"letterSpacing":"4px"}}>
                <Row style={{"margin":"0px"}}>
                <div className="button bar-item" onClick={toggleNav} style={{"width":"40px"}}><span style={{"fontSize":"30px"}}>&times;</span></div>
                </Row>
                <Row style={{"margin":"0px"}}>
                <span className="button bar-item" onClick={() => {history.push('/sequences'); toggleNav()}}>Sequences</span>
                </Row>
                <Row style={{"margin":"0px"}}>
                <span className="button bar-item" onClick={() => {history.push('/'); toggleNav()}}>Articles</span>
                </Row>
            </div>
}