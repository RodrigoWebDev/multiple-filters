import React, { Fragment } from "react"
import Card from "../Card/index"
import { formatNumberToCurrency } from "../../utils/index"
import { IProduct } from "../../interfaces/interfaces"

interface ICartProduct extends IProduct {
  quantity: number
}
interface ICartInner {
  products: ICartProduct[]
  total: number
  increment: (title: string) => void
}

const CartInner = ({ products, total, increment }: ICartInner) => {
  return (
    <div>
      {!products.length && "You don't have products here. Try to click 'Add to cart' in some products"}
      {products.length && (
        <div>
          <h5 className="text-start mb-4">My cart</h5>
          {
            products.map(({ title, thumbnail, quantity }) => (
              <Fragment key={title}>
                <Card
                  image={thumbnail}
                  className="d-flex flex-row mb-2"
                  imageStyles={{
                    width: "120px"
                  }}
                  body={(
                    <div>
                      <div>{title}</div>
                      <div>
                          <button>-</button>
                          <div>{quantity}</div>
                          <button onClick={() => {
                            console.log("Clique")
                            increment(title)
                          }}>+</button>
                      </div>
                    </div>
                  )}
                  bodyClassNme="text-start"
                />
              </Fragment>
            ))
          }
          <hr />
          <div>
            {formatNumberToCurrency(total)}
          </div>
        </div>
      )}
    </div>
  )
}

export default CartInner