import React from "react"
import CartIcon from "./Icons/Cart/index"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const NavBar = () => {
  const MySwal = withReactContent(Swal)

  const showCart = () => {
    MySwal.fire({
      position: 'top-end',
      html: <p>My Cart</p>,
      showConfirmButton: false,
    })
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="w-100 d-flex justify-content-between">
        <a className="navbar-brand" href="#">My Store</a>
          <CartIcon 
            style={{ width: "32px", cursor: "pointer"}} 
            onClick={() => {
              showCart()
            }}
          />
      </div>
    </nav>
  )
}

export default NavBar

