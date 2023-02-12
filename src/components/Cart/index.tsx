import React from "react"
import CartIcon from "../Icons/Cart/index"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Cart = ({ products }) => {
  const MySwal = withReactContent(Swal)

  const showCart = () => {
    MySwal.fire({
      position: 'top-end',
      html: (
        <div>
          {!products.length && "You don't have products here. Try to click 'Add to cart' in some products"}
        </div>
      ),
      showConfirmButton: false,
    })
  }

  return (
    <div>
      <CartIcon 
        style={{ width: "32px", cursor: "pointer"}} 
        onClick={() => {
          showCart()
        }}
      />
    </div>
  )
}

export default Cart