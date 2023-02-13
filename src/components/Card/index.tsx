import React, { ReactNode, CSSProperties } from "react"

interface ICard {
  image: string
  className?: string
  style?: CSSProperties
  headerStyles?: CSSProperties
  footer?: ReactNode
  body?: ReactNode
  altImage?: string
  imageStyles?: CSSProperties
  bodyClassNme?: string
}

const Card = ({ 
  image, 
  body,
  bodyClassNme,
  footer,
  className,
  style,
  headerStyles,
  imageStyles,
  altImage
}: ICard) => {
  return (
    <div className={`card ${className}`} style={style}>
      <div className="card-header" style={headerStyles}>
        <img 
          src={image} 
          className="card-img-top" 
          alt={altImage} 
          style={imageStyles}
        />
      </div>
      {body && (
        <div className={`card-body ${bodyClassNme}`}>
          {body}
        </div>
      )}
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card