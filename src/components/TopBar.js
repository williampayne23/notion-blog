import { Link } from "react-router-dom"

export default function TopBar({toggleNav}){
    return       <div id="outer" className="fixed-top" style={{"height":"70px"}}>
    <div id="main" className="" style={{"letterSpacing":"4px", "padding":"4px", "height" : "60px"}}>
        <a href="/" className="float-left" style={{"padding":"4px"}}>
          <img alt="" src="/Banner.png" height="45"/>
        </a>
        <div id="togglebutton" className="button bar-item align-right d-md-none" onClick={toggleNav}>
            <span>&#9776;</span>
        </div>
        <div className="d-none d-md-block">
          <Link to="/sequences"><span className="bar-item button align-right">Sequences</span></Link>
          <Link to="/"><span className="bar-item button align-right">Articles</span></Link>
        </div>
    </div>
  </div>
}