import React, { Fragment } from "react"
import CartIcon from "../Icons/Cart/index"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Card from "../Card/index"

const CartInner = ({ products, total }) => {
  return (
    <div>
      {!products.length && "You don't have products here. Try to click 'Add to cart' in some products"}
      {products.length && (
        <div>
          <h5 className="text-start mb-4">My cart</h5>
          {
            products.map(({ title, thumbnail}) => (
              <Fragment key={title}>
                <Card
                  image={thumbnail}
                  className="d-flex flex-row mb-2"
                  imageStyles={{
                    width: "120px"
                  }}
                  body={(
                    <div>
                      {title}
                    </div>
                  )}
                />
              </Fragment>
            ))
          }
          <hr />
          <div>
            $ {total}
          </div>
        </div>
      )}
    </div>
  )
}

const Cart = ({ products }) => {
  const MySwal = withReactContent(Swal)

  const calculateTotal = () => {
    const prices = products.map(item => item.price)
    if(prices.length){
      return prices.reduce((total, num) => total + num)
    }
  }

  console.log("calculateTotal", calculateTotal())

  const showCart = () => {
    MySwal.fire({
      position: 'top-end',
      html: <CartInner products={products}/>,
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