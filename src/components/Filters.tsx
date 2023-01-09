import React from "react"

interface IFilters {
  filters: {
    name: string
    values: string[]
  }[]
  updateFilterValues: (name: string, checked: boolean, value: string) => void
  getFilter: (name: string) => string[]
}

const Filters = ({ 
  filters, 
  updateFilterValues,
  getFilter
}: IFilters) => {
  return (
    <>
      {filters.map(({
        name
      }) => (
        <div key={name}>
          <h4 className="text-capitalize my-4">{name}</h4>
          <ul className="list-group list-group-flush">
            {getFilter(name).map(item => (
              <li 
                key={item} 
                className="list-group-item"
                title={item}
              >
                <label 
                  className="text-truncate"
                  style={{ maxWidth: "180px"}}
                >
                  <input 
                    type="checkbox" 
                    value={item} 
                    className="me-2"
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
        </div>
      ))}
    </>
  )
}

export default Filters