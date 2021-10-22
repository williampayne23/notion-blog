import { useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function Menu(){
    const [nav, setNav] = useState(0);
    function toggleNav() {
      if (nav === 0) {
          openNav()
      } else {
          closeNav()
      }
    }
    function openNav() {
      document.getElementById("mySidenav").style.width = "40%";
      document.getElementById("outer").style.width = "60%";
      document.getElementById("togglebutton").style.opacity = "0";
      setNav(1)
    }   
  
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("outer").style.width = "100%";
      document.getElementById("togglebutton").style.opacity = "1";
      setNav(0)
    }

    return (<span>
                <TopBar toggleNav={toggleNav}/>
                <SideBar toggleNav={toggleNav}/>
            </span>)
}