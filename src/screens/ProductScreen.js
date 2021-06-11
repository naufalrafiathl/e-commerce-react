import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

export default function ProductScreen(props) {


    const [qty, setQty] = useState(1);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
      };

      const dispatch = useDispatch();
      const productId = props.match.params.id;
      const productDetails = useSelector((state) => state.productDetails);
      const { loading, error, product } = productDetails;
    
      useEffect(() => {
        dispatch(detailsProduct(productId));
      }, [dispatch, productId]);
    
    return (
        <div className="center-details">
        {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="medium"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>Pirce : Rp.{product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                        Rent for : <select alue={qty}
                              onChange={(e) => setQty(e.target.value)}>
                          <option value='1' onChange={setQty}>1</option>
                          <option value='2' onChange={setQty}>2</option>
                          <option value='3' onChange={setQty}>3</option>
                      </select>
                    </div>
                  </li>
                  <li>
                  </li>
                  <li>
                    <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    )
}
