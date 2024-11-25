import React from 'react';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';

const RecipeDetail = ({ recipe }) => {
  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="uk-navbar-container uk-letter-spacing-small">
        <div className="uk-container">
          <div className="uk-position-z-index" data-uk-navbar>
            <div className="uk-navbar-left">
              <a className="uk-navbar-item uk-logo" href="/">Kocina</a>
              <ul className="uk-navbar-nav uk-visible@m uk-margin-large-left">
                <li><a href="/">Home</a></li>
                <li className="uk-active"><a href="/recipe">Recipe</a></li>
                <li><a href="/search">Search</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="uk-navbar-right">
              <a className="uk-navbar-toggle" data-uk-search-icon href="#"></a>
              <div className="uk-navbar-item">
                <a className="uk-button uk-button-primary" href="/sign-up">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="uk-container">
        <div data-uk-grid>
          <div className="uk-width-1-2@s">
            <img
              className="uk-border-rounded-large"
              src={recipe.image}
              alt={recipe.name}
            />
          </div>
          <div className="uk-width-expand@s uk-flex uk-flex-middle">
            <div>
              <h1>{recipe.name}</h1>
              <p>{recipe.description}</p>
              <div
                className="uk-margin-medium-top uk-child-width-expand uk-text-center uk-grid-divider"
                data-uk-grid
              >
                <div>
                  <span data-uk-icon="icon: clock; ratio: 1.4"></span>
                  <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">
                    Active Time
                  </h5>
                  <span className="uk-text-small">{recipe.activeTime}</span>
                </div>
                <div>
                  <span data-uk-icon="icon: future; ratio: 1.4"></span>
                  <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">
                    Total Time
                  </h5>
                  <span className="uk-text-small">{recipe.totalTime}</span>
                </div>
                <div>
                  <span data-uk-icon="icon: users; ratio: 1.4"></span>
                  <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">
                    Yield
                  </h5>
                  <span className="uk-text-small">{recipe.servings} Servings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="uk-section uk-section-default">
        <div className="uk-container uk-container-small">
          <h3>Ingredients</h3>
          <ul className="uk-list uk-list-large uk-list-divider uk-margin-medium-top">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="uk-section uk-section-default">
        <div className="uk-container uk-text-secondary uk-text-500">
          <div className="uk-child-width-1-2@s" data-uk-grid>
            <div>
              <a href="#" className="uk-logo">Kocina</a>
            </div>
            <div className="uk-flex uk-flex-middle uk-flex-right@s">
              <div data-uk-grid className="uk-child-width-auto uk-grid-small">
                <div>
                  <a
                    href="https://www.facebook.com/"
                    data-uk-icon="icon: facebook; ratio: 0.8"
                    className="uk-icon-button facebook"
                    target="_blank"
                    rel="noreferrer"
                  ></a>
                </div>
                <div>
                  <a
                    href="https://www.instagram.com/"
                    data-uk-icon="icon: instagram; ratio: 0.8"
                    className="uk-icon-button instagram"
                    target="_blank"
                    rel="noreferrer"
                  ></a>
                </div>
                <div>
                  <a
                    href="https://twitter.com/"
                    data-uk-icon="icon: twitter; ratio: 0.8"
                    className="uk-icon-button twitter"
                    target="_blank"
                    rel="noreferrer"
                  ></a>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-margin-medium-top uk-text-small uk-text-muted">
            <div>Made by Unbound Studio in Guatemala City.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipeDetail;
