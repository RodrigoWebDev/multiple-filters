import React from "react"

const NavBar = ({ cartComponent }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="w-100 d-flex justify-content-between">
        <a className="navbar-brand" href="#">My Store</a>
        {cartComponent}
      </div>
    </nav>
  )
}

export default NavBar

