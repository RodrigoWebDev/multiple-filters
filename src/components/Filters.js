import { Fragment } from "react"

const Filters = ({ 
  filters, 
  updateFilterValues,
  getFilter
}) => {
  return (
    <>
      {filters.map(({
        name
      }) => (
        <Fragment key={name}>
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
    </>
  )
}

export default Filters