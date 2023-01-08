import { useState, useEffect, Fragment } from "react"
import { useMediaQuery } from 'react-responsive'
import Card from "./Card.js"
import Filters from "./Filters.js"
import productList from "../products"

const App = () => {
  const [firstRender, setFirstRender] = useState(true)
  const isDesktop = useMediaQuery({
    query: '(min-width: 1000px)'
  })
  const [products, setProducts] = useState([...productList])
  const [filters, setFilters] = useState([
    {
      name: "brand",
      values: []
    },
    {
      name: "category",
      values: []
    },
  ])

  const css = {
    container: `d-flex ${isDesktop ? "flex-row" : "flex-column"}`,
    productList: `list-unstyled ${isDesktop ? "d-flex flex-wrap" : ""}`,
    productItem: `mb-4`,
    aside: `mb-4 ${isDesktop ? "pe-4" : ""}`
  }

  const getFilter = (name) => {
    const values = productList.map(item => item[name])
    const noDuplicatedValues = [...new Set(values)];
    return noDuplicatedValues
  }

  const updateFilterValues = (name, checked, value) => {
    if(checked){
      const newFilters = filters.map(filter => ({
        ...filter,
        values: filter.name === name ? [...filter.values, value] : filter.values
      }))
      setFilters(newFilters)
    }else{
      debugger
      const newFilters = filters.map(filter => ({
        ...filter,
        values: filter.values.filter(item => item !== value)
      }))
      setFilters(newFilters)
    }
  }

  const updateProductsWithFilters = () => {
    const filteredProducts = productList.filter(product => {
      const brandFilter = () => {
        if(filters[0].values.length){
          return filters[0].values.some(value => value === product.brand)
        }else{
          return true
        }
      }

      const categoryFilter = () => {
        if(filters[1].values.length){
          return filters[1].values.some(value => value === product.category)
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

  useEffect(() => {
    setFirstRender(false)
  }, [])

  useEffect(() => {
    if(firstRender === false){
      updateProductsWithFilters()
    }
  }, [filters])

  return (
    <div className={css.container}>
      <aside className={css.aside}>
        <section>
          <h2 className="mb-4">Filters</h2>

          <Filters 
            filters={filters} 
            getFilter={getFilter}
            updateFilterValues={updateFilterValues}
          /> 
        </section>
      </aside>

      <main>
        <ul className={css.productList}>
          {products.length ? products.map(({
            title,
            thumbnail,
            description
          }) => 
            <li 
              key={title}
              className={css.productItem}
              style={{
                width: isDesktop ? "31%" : "100%",
                margin: isDesktop ? "0 1%" : ""
              }}
            >
              <Card 
                title={title}
                image={thumbnail}
                description={description}
              />
            </li>
          ): <h2>No products for the giving filters</h2>}
        </ul>
      </main>
    </div>
  )
}

export default App