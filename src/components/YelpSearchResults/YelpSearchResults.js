import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import './YelpSearchResults.scss';
import yelpData from '../../helpers/data/yelpData';

const YelpSearchResults = (props) => {
  const [rest, setRest] = useState({
    yelpId: '',
    name: '',
    photo: '',
    address: [],
    phone: '',
    categories: [],
  });
  const [currentRest, setCurrentRest] = useState(0);

  const showResults = () => {
    if (currentRest + 1 >= props.result.length) {
      console.warn('WE COULDNT FIND YOUR RESTAURANT - GO TO FORM');
    } else {
      setRest(props.result[currentRest]);
    }
  };

  const acceptResultHandler = () => {
    yelpData.insertYelpData(rest.yelpId)
      .then((res) => console.warn(res))
      .catch((err) => console.error(err));
  };

  const denyResultHandler = () => {
    if (currentRest + 1 >= props.result.length) {
      console.warn('WE COULDNT FIND YOUR RESTAURANT - GO TO FORM');
    } else {
      setCurrentRest((prevCount) => prevCount + 1);
    }
  };

  useEffect(showResults, [currentRest]);

  // 2. If user clicks yes, perform Yelp search by Id and send result back to SubmitRestaurant with props function
  // 5. If there are no results, take user to form (with a message that we could not find your restaurant)

  return (
    <div className="YelpSearchResults">
      <div className="restaurant-chooser">
        <h1>IS THIS YOUR RESTAURANT?</h1>
        <div className="RestaurantCard">
          <div className="rest-img"><img className="card-img-top" src={rest.photo} alt="" /></div>
          <div className="">
            <h6 className="mb0">{rest.name}</h6>
            <div className="rest-body">
              <div className="location">
                <span>{rest.address.join(' ')}</span>
                <span>∙</span>
                <span>{rest.phone}</span>
              </div>
              <div className="categories">
                {rest.categories.join(', ')}
              </div>
            </div>
          </div>
        </div>
        <button className={'btn btn-sm m-1 btn-info'} onClick={acceptResultHandler}>Yes</button>
        <button className={'btn btn-sm m-1 btn-info'} onClick={denyResultHandler}>No</button>
      </div>
    </div>
  );
};

// YelpSearchResults.propTypes = {}

export default YelpSearchResults;