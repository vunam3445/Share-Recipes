import React from "react";

function Recipes() {
  const recipeCards = [
    {
      title: "Chef John's Turkey Sloppy Joes",
      img: "https://source.unsplash.com/-YHSwy6uqvk/300x160",
      rating: 5.0,
      reviews: 73,
      author: "John Keller",
    },
    {
      title: "Brown Sugar Meatloaf",
      img: "https://source.unsplash.com/jUPOXXRNdcA/300x160",
      rating: 3.0,
      reviews: 94,
      author: "Danial Caleem",
    },
  ];

  return (
    <div className="uk-section uk-section-default">
      <div className="uk-container">
        <div data-uk-grid>
          <div className="uk-width-expand@m">
            <form className="uk-search uk-search-default uk-width-1-1">
              <span data-uk-search-icon></span>
              <input
                className="uk-search-input uk-text-small uk-border-rounded uk-form-large"
                type="search"
                placeholder="Search for recipes..."
              />
            </form>
          </div>
          <div className="uk-width-1-3@m uk-text-right@m uk-light">
            <select className="uk-select uk-select-light uk-width-auto uk-border-pill uk-select-primary">
              <option>Sort by: Latest</option>
              <option>Sort by: Top Rated</option>
              <option>Sort by: Trending</option>
            </select>
          </div>
        </div>
        <div className="uk-child-width-1-2 uk-child-width-1-3@s" data-uk-grid>
          {recipeCards.map((recipe, index) => (
            <div key={index}>
              <div className="uk-card">
                <div className="uk-card-media-top uk-inline uk-light">
                  <img
                    className="uk-border-rounded-medium"
                    src={recipe.img}
                    alt={recipe.title}
                  />
                  <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
                  <div className="uk-position-xsmall uk-position-top-right">
                    <a
                      href="#"
                      className="uk-icon-button uk-like uk-position-z-index uk-position-relative"
                      data-uk-icon="heart"
                    ></a>
                  </div>
                </div>
                <div>
                  <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">
                    {recipe.title}
                  </h3>
                  <div className="uk-text-xsmall uk-text-muted" data-uk-grid>
                    <div className="uk-width-auto uk-flex uk-flex-middle">
                      <span
                        className="uk-rating-filled"
                        data-uk-icon="icon: star; ratio: 0.7"
                      ></span>
                      <span className="uk-margin-xsmall-left">
                        {recipe.rating}
                      </span>
                      <span>({recipe.reviews})</span>
                    </div>
                    <div className="uk-width-expand uk-text-right">
                      by {recipe.author}
                    </div>
                  </div>
                </div>
                <a href="recipe.html" className="uk-position-cover"></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
