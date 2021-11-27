import React, { useContext } from 'react'

import ProductContext from './ProductContext'

export default function ProductListing() {
    let context = useContext(ProductContext)
    return (<React.Fragment>
        <div className="container">
            <div className="row">
                {context.products().map(listings =>
                    <div className="col-12 col-sm-6 col-lg-4 mt-2 mb-2" key={listings.id}>
                        <div className="card card-listing"
                            role="button"
                            key={listings.id}>
                            <img className="card-img-top card-image"
                                src={listings.image} />
                            <div className="card-body">
                                <h6 className="card-title">{listings.title}</h6>
                                <span>${listings.cost / 100}</span>
                            </div>
                            <button>Quick Add to Cart</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </React.Fragment>)
}