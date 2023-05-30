import React from 'react'

const NewsItem =(props)=> {

    let {title,description,imageUrl, newsUrl, publishedAt, source } = props;
    return (
      <div className='my-3'>
        <div className="card" >
        <div style={{position: 'absolute',
              right: '0',
              justfyContent:'flex-end',
              display:'flex'}}>
            <span className=" badge rounded-pill bg-danger" >{source}
            </span>
          </div>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} className="btn btn-dark">Read More</a>
          <p className="card-text"><small className="text-muted">Last updated time : {new Date(publishedAt).toGMTString()}
          </small>


          </p>

        </div>
      </div>
      </div>
    )
  
}

export default NewsItem