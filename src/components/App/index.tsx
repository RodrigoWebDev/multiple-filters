import React, { Fragment } from "react"
import Card from "../Card"
import Filters from "../Filters"
import NavBar from "../Navbar"
import Cart from "../Cart"
import CartInner from "../CartInner/index"
import useApp from "./hook"
import { formatNumberToCurrency } from "../../utils/index"

const App = () => {
  const {
    productsInCart,
    css,
    isDesktop,
    filters,
    getFilter,
    updateFilterValues,
    products,
    addToCart,
    calculateTotal,
    incrementCartProduct
  } = useApp()
  
  return (
    <div>
      <header>
        <NavBar 
          cartComponent={
            <Cart 
              cartInner={
                <CartInner 
                  products={productsInCart} 
                  increment={incrementCartProduct}
                  total={calculateTotal()}
                />
              }
              /* handleQuantityComponent={(quantity: number) => {
                return <div>
                  <button>-</button>
                  <div>{quantity}</div>
                  <button>+</button>
              </div>
              }} */
            />
          }
        />
      </header>
      <div className={css.container}>
        <aside 
          className={css.aside}
          style={{
            width: isDesktop ? "30%" : "100%"
          }}
        >
          <section>
            <form className="d-flex mb-4" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            <Filters 
              filters={filters} 
              getFilter={getFilter}
              updateFilterValues={updateFilterValues}
            /> 
          </section>
        </aside>

        <main
          style={{
            width: isDesktop ? "70%" : "100%"
          }}
        >
          <ul className={css.productList}>
            {products.length ? products.map((product) => {
              const { title, thumbnail, description, price } = product
              
              return (
                <Fragment key={title}>
                  <Card 
                    image={thumbnail}
                    altImage={title}
                    className={css.productItem}
                    style={{
                      width: isDesktop ? "31%" : "100%",
                      margin: isDesktop ? "0 1%" : ""
                    }}
                    headerStyles={{
                      maxHeight: isDesktop ? '200px' : "",
                      overflow: isDesktop ? 'hidden' : "",
                    }}
                    body={(
                      <>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <div className="fs-5"><strong>{formatNumberToCurrency(price)}</strong></div>
                      </>
                    )}
                    footer={(
                      <>
                        <a href="#" className="btn btn-primary me-2">Buy now</a>
                        <button 
                          onClick={() => {
                            addToCart({ ...product })
                          }} 
                          className="btn btn-success"
                        >
                          Add to cart
                        </button>
                      </>
                    )}
                  />
                </Fragment>
              )
            }
            ): <h2>No products for the giving filters</h2>}
          </ul>
        </main>
      </div>

      <hr />
      <footer className="text-center">
        Made by <a className="link-primary" href="https://github.com/RodrigoWebDev" target="_blank">Rodrigo Queiroz</a>, source code at <a className="link-primary" href="https://github.com/RodrigoWebDev/multiple-filters" target="_blank">GitHub</a>
      </footer>
    </div>
  )
}

export default App