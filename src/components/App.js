import { useState, useEffect, Fragment } from "react"
import Card from "./Card.js"
import productList from "../products"

const App = () => {
  const [firstRender, setFirstRender] = useState(true)
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
  ]
)

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
    <div className="d-flex">
      <aside>
        <section>
          <h2 className="mb-4">Filters</h2>

          {filters.map(({
            name
          }) => (
            <Fragment key={name}>
              <h4>{name}</h4>
              <ul className="list-group list-group-flush">
                {getFilter(name).map(item => (
                  <li 
                    key={item} 
                    className="list-group-item"
                    title={item}
                  >
                    <label 
                      className="text-truncate"
                      style={{ width: "180px"}}
                    >
                      <input 
                        type="checkbox" 
                        value={item} 
                        class="me-2"
                        onChange={(e) => {
                          updateFilterValues(
                            name,
                            e.target.checked,
                            e.target.value
                          )
                        }}/>
                      <span>{ item }</span>
                    </label>
                  </li>
                ))}
              </ul>
            </Fragment>
          ))}
        </section>
      </aside>

      <main>
        <ul>
          {products.length ? products.map(({
            title,
            thumbnail,
            description
          }) => 
            <li key={title}>
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