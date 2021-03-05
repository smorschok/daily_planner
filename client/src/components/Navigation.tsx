import React, { useContext, useState } from 'react'
import { Button, Dropdown, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hook/http.hook'
import {useMediaQuery} from 'react-responsive'
export const Navigation:React.FC = ()=>{
  const CustomToggle = React.forwardRef<HTMLButtonElement,{onClick:(e:React.MouseEvent<HTMLElement, MouseEvent>)=>{}}>(({ children, onClick }, ref) => (
    <Button
      
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <i className="bi bi-list" style={{fontSize:"2rem"}}></i>
    </Button>
  ));
  const auth = useContext(AuthContext)
  const { request} = useHttp();
  const[showDropdown,setShowDropdown] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })
  const logoutHandler = async () =>{
  try {
   await request('/api/user/status','POST',null,{
      Authorization: `Bearer ${auth.token}`
    })
    setShowDropdown(!showDropdown)
    auth.logout()
  } catch (e) {
    
  }
    
   
    
  }; 

  
  if(isTabletOrMobile && auth.isAuthenticated){
    return(
    <Navbar expand='sm' className="navbar  bg-primary justify-content-between">
      <h1 style={{color:'#fff'}}>Daily planner</h1>
      <Dropdown show = {showDropdown} onToggle={()=>setShowDropdown(!showDropdown)} drop="down" className='d-flex justify-content-end'>
      <Dropdown.Toggle  as ={CustomToggle} variant="success" id="dropdown-basic">
      </Dropdown.Toggle>
      <Dropdown.Menu align='right' className='bg-white text-right'>
        <Dropdown.Header> {!!auth.email && <h6 className='text-right'>{auth.email}</h6>}
</Dropdown.Header>
<Dropdown.Divider />

        {auth.admin && <NavLink onClick={()=>setShowDropdown(!showDropdown)} activeClassName='navlink-active-dropdown' className="navbar-brand"  to="/admin" hidden={!auth.admin}>Admin</NavLink>}
        <Dropdown.Divider/>
        {auth.isAuthenticated && <NavLink onClick={()=>setShowDropdown(!showDropdown)} activeClassName='navlink-active-dropdown' className="navbar-brand" to="/calendar" hidden={!auth.isAuthenticated}>Calendar</NavLink>}
        <Dropdown.Divider/>
        {auth.isAuthenticated && <NavLink onClick={()=>setShowDropdown(!showDropdown)} activeClassName='navlink-active-dropdown' className="navbar-brand" to="/notes" hidden={!auth.isAuthenticated}>Your notes</NavLink>}
        <Dropdown.Divider/>
        {auth.isAuthenticated && <NavLink  exact activeClassName='navlink-active-dropdown' className="navbar-brand"  to="/" onClick={logoutHandler} hidden={!auth.isAuthenticated}>Logout</NavLink>}
      </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  )
  }
  return(
    <Navbar expand='sm' className="navbar navbar-dark bg-primary justify-content-between">
      <h1 style={{color:'#fff'}}>Daily planner</h1>
      <div>
     {!!auth.email && <div className='text-right' style={{color:'#fff'}}>{auth.email}</div>}
      <div  className='d-flex justify-content-end'>
      
      {auth.admin && <NavLink activeClassName='navlink-active' className="navbar-brand"  to="/admin" hidden={!auth.admin}>Admin</NavLink>}
      {auth.isAuthenticated && <NavLink activeClassName='navlink-active' className="navbar-brand" to="/calendar" hidden={!auth.isAuthenticated}>Calendar</NavLink>}
      {auth.isAuthenticated && <NavLink activeClassName='navlink-active' className="navbar-brand" to="/notes" hidden={!auth.isAuthenticated}>Your notes</NavLink>}
      {auth.isAuthenticated && <Button   className="navbar-brand"  onClick={logoutHandler} hidden={!auth.isAuthenticated}>Logout</Button>}
      </div>
      </div>
    </Navbar>
  )
  
}
