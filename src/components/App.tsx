import React, { useState, useEffect, Fragment } from "react"
import { useMediaQuery } from 'react-responsive'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Card from "./Card"
import Filters from "./Filters"
import productList from "../products"
import NavBar from "./Navbar"
import Cart from "./Cart"

interface IProduct {
  title: string
  thumbnail: string
  description: string
}

const App = () => {
  const [firstRender, setFirstRender] = useState(true)
  const [products, setProducts] = useState<IProduct[]>([...productList])
  const [productsInCart, setProductsInCart] = useState([])
  const [filters, setFilters] = useState([
    {
      name: "category",
      values: []
    },
    {
      name: "brand",
      values: []
    },
  ])
  const isDesktop = useMediaQuery({
    query: '(min-width: 1000px)'
  })

  const MySwal = withReactContent(Swal)

  const showAlert = (title: string) => {
    MySwal.fire({
      title,
      icon: 'warning',
      showConfirmButton: false,
    })
  }

  const css = {
    container: `d-flex ${isDesktop ? "flex-row" : "flex-column"}`,
    productList: `list-unstyled card-deck ${isDesktop ? "d-flex flex-wrap" : ""}`,
    productItem: `mb-4`,
    aside: `mb-4 ${isDesktop ? "pe-4" : ""}`
  }

  const getFilter = (name): string[] => {
    const values = productList.map(item => item[name])
    const noDuplicatedValues = [...new Set(values)];
    return noDuplicatedValues
  }

  const updateFilterValues = (name: string, checked: boolean, value: string) => {
    if(checked){
      const newFilters = filters.map(filter => ({
        ...filter,
        values: filter.name === name ? [...filter.values, value] : filter.values
      }))
      setFilters(newFilters)
    }else{
      const newFilters = filters.map(filter => ({
        ...filter,
        values: filter.values.filter(item => item !== value)
      }))
      setFilters(newFilters)
    }
  }

  const updateProductsWithFilters = () => {
    const filteredProducts = productList.filter(product => {
      const categoryFilter = () => {
        if(filters[0].values.length){
          return filters[0].values.some(value => value === product.category)
        }else{
          return true
        }
      }

      const brandFilter = () => {
        if(filters[1].values.length){
          return filters[1].values.some(value => value === product.brand)
        }else{
          return true
        }
      }

      return [
        brandFilter(),
        categoryFilter()
      ].every(item => item === true)
    })

    setProducts(filteredProducts)
  }

  const isAlreadyAddedProduct = (productTitle: string) => {
    return productsInCart.some(item => item.title === productTitle)
  }

  const addToCart = (product: IProduct) => {
    if(!isAlreadyAddedProduct(product.title)){
      setProductsInCart([...productsInCart, product])
    } else {
      showAlert("Product already added to cart")
    }
  }

  useEffect(() => {
    setFirstRender(false)
  }, [])

  useEffect(() => {
    if(firstRender === false){
      updateProductsWithFilters()
    }
  }, [filters])

  return (
    <div>
      <header>
        <NavBar 
          cartComponent={<Cart products={productsInCart}/>}
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
              const { title, thumbnail, description } = product
              
              return (
                <Fragment key={title}>
                  <Card 
                    title={title}
                    image={thumbnail}
                    description={description}
                    className={css.productItem}
                    style={{
                      width: isDesktop ? "31%" : "100%",
                      margin: isDesktop ? "0 1%" : ""
                    }}
                    isDesktop={isDesktop}
                    addToCart={() => {
                      addToCart({ ...product })
                    }}
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