const Card = ({ 
  image, 
  title, 
  description
}) => {
  return (
    <div className="card">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary">Buy now</a>
      </div>
    </div>
  )
}

export default Card