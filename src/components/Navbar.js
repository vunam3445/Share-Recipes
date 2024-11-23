// src/components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav className="uk-navbar-container uk-letter-spacing-small">
          <div className="uk-container">
            <div className="uk-position-z-index" data-uk-navbar>
              <div className="uk-navbar-left">
                <a className="uk-navbar-item uk-logo" href="/">Kocina</a>
                <ul className="uk-navbar-nav uk-visible@m uk-margin-large-left">
                  <li className="uk-active"><a href="/">Home</a></li>
                  <li><a href="/recipe">Recipe</a></li>
                  <li><a href="/search">Search</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
              <div className="uk-navbar-right">
                <div>
                  <a className="uk-navbar-toggle" data-uk-search-icon href="#"></a>
                  <div className="uk-drop uk-background-default" data-uk-drop="mode: click; pos: left-center; offset: 0">
                    <form className="uk-search uk-search-navbar uk-width-1-1">
                      <input className="uk-search-input uk-text-demi-bold" type="search" placeholder="Search..." autoFocus />
                    </form>
                  </div>
                </div>
                <ul className="uk-navbar-nav uk-visible@m">
                  <li><a href="/sign-in">Sign In</a></li>
                </ul>
                <div className="uk-navbar-item">
                  <a className="uk-button uk-button-primary" href="/sign-up">Sign Up</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
  );
}

export default Navbar;
