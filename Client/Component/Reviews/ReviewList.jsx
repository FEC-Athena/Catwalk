import React, { useState, useContext } from 'react';
import moment from 'moment';
import Star from './Star.jsx';
import VoteHelpfulness from './VoteHelpfulness.jsx';
import Sort from './Sort.jsx';
import ReviewsContext from './reviews-context.js';

function ReviewList() {
  const {
    sortByRel, showReviews, handleShowReviews, showButton, handleButton, reviewShownCount, handleReviewShownCount, reviewList, handleReviewList, handleSortOption, renderList,
  } = useContext(ReviewsContext);

  // sort the review list then slice

  // componentDidMount() {
  //   axios.get()
  // }
  function changeSort(e) {
    handleSortOption(e.target.value);
    renderList(e.target.value);
  }

  const handleMoreReviews = () => {
    const showCount = reviewShownCount + 2;
    handleReviewShownCount(showCount);
    if (showCount >= reviewList.length) {
      handleButton(false);
    }
    handleShowReviews(reviewList.slice(0, showCount));
  };

  return (
    <div className="reviews-fixedH-container">
      <div><Sort data={sortByRel} changeSort={changeSort} /></div>

      <div className="all-reviews">
        {showReviews.map((review) => (
          <div key={review.review_id}>
            <div style={{ marginTop: 40, marginBottom: -40 }}><Star rating={review.rating} /></div>
            <div className="individual-review">
              <div style={{ color: 'grey', textAlign: 'right' }}>
                {review.reviewer_name}
                {moment(review.date).format(', MMM Do, YYYY')}
              </div>
              <div style={{ marginTop: 30, fontWeight: 'bold', color: '#3e3f3f' }}>{review.summary}</div>
              <br />
              <div style={{ color: 'grey' }}>{review.body}</div>
              <br />
              <div style={{ color: 'grey' }}><VoteHelpfulness review={review} /></div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {showButton ? <button className="button" onClick={handleMoreReviews}>MORE REVIEWS</button> : null}
        <button className="button">ADD A REVIEW  +</button>
      </div>
    </div>
  );
}

export default ReviewList;
