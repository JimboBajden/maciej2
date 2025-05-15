import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <div className="navbar">
        <p> <Link to={"/"}><img className="icon" src="house-fill.svg"></img></Link> </p>
        <p> <Link to={'/ulubione'}><img className="icon" src="star-fill.svg"></img></Link></p>
        <p> <Link to={'/Search'}><img className="icon" src="search.svg"></img></Link></p>
     
    </div> 
    <Outlet />
    </>
  )
};

export default Layout;
