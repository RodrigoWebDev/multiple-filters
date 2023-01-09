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
      <div className="accordion" >
        {filters.map(({
          name
        }) => (
            <div className="accordion-item" key={name}>
              <h4 className="accordion-header">
                <button className="accordion-button text-capitalize" type="button" aria-expanded="true" aria-controls="collapseOne">
                  {name}
                </button>
              </h4>
              <ul className="list-group list-group-flush">
                {getFilter(name).map(item => (
                  <li 
                    key={item} 
                    className="list-group-item"
                    title={item}
                  >
                    <label 
                      className="text-truncate"
                      style={{ maxWidth: "300px"}}
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
      </div>
    </>
  )
}

export default Filters