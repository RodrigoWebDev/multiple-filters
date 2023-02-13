import { useState, useEffect } from "react"
import { useMediaQuery } from 'react-responsive'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import productList from "../../products"
import { IProduct } from "../../interfaces/interfaces"

const useApp = () => {
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

  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const showAlert = (title: string) => {
    MySwal.fire({
      title,
      icon: 'warning',
      showConfirmButton: false,
    })
  }

  const showToast = (title: string) => {
    Toast.fire({
      icon: 'success',
      title
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
      setProductsInCart([
        ...productsInCart, 
        {
          ...product,
          quantity: 1
        }
      ])
      showToast("Product added to cart")
    } else {
      showAlert("Product already added to cart")
    }
  }

  const calculateTotal = () => {
    const prices = productsInCart.map(item => item.price)
    if(prices.length){
      return prices.reduce((total, num) => total + num)
    }
  }

  const incrementCartProduct = (productTitle: string) => {
    const newProducts = productsInCart.map(item => {
      return {
        ...item,
        quantity: item.title === productTitle ? item.quantity + 1 : item.quantity
      }
    })

    debugger

    setProductsInCart(newProducts)
  }

  useEffect(() => {
    setFirstRender(false)
  }, [])

  useEffect(() => {
    if(firstRender === false){
      updateProductsWithFilters()
    }
  }, [filters])

  return {
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
   /*  incrementCartProduct */
  }
}

export default useApp