import React from "react";

import "../styles/home.css";
function SubscribeSection() {
  return (
    <div className="uk-container" style={{backgroundColor: "white"}} >
      <div className="uk-background-primary uk-border-rounded-large uk-light">
        <div className="uk-width-3-4@m uk-margin-auto uk-padding-large">
          <div className="uk-text-center">
            <h2 className="uk-h2 uk-margin-remove uk-text-medium uk-text-bold">
              Be the first to know about the latest deals, receive new trending
              recipes &amp; more!
            </h2>
          </div>
          <div className="uk-margin-medium-top">
            <div data-uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
              <form>
                <div className="uk-grid-small" data-uk-grid>
                  <div className="uk-width-1-1 uk-width-expand@s">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="uk-input uk-form-large uk-width-1-1 uk-border-pill"
                      required
                    />
                  </div>
                  <div className="uk-width-1-1 uk-width-auto@s">
                    <input
                      type="submit"
                      value="Subscribe"
                      className="uk-button uk-button-large uk-button-warning"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribeSection;
