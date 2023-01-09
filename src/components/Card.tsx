import React from "react"

interface ICard {
  image: string
  title: string
  description: string
  className?: string
  style?: any
}

const Card = ({ 
  image, 
  title, 
  description,
  className,
  style
}: ICard) => {
  return (
    <div className={`card ${className}`} style={style}>
      <div style={{
        maxHeight: '200px',
        overflow: 'hidden',
      }}>
        <img src={image} className="card-img-top" alt={title} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>

      <div className="card-footer">
        <a href="#" className="btn btn-primary me-2">Buy now</a>
        <a href="#" className="btn btn-success">Add to cart</a>
      </div>
    </div>
  )
}

export default Card