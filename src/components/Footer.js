
import React from 'react';

function Footer() {
  return (
    <footer className="uk-section uk-section-default">
    <div className="uk-container uk-text-secondary uk-text-500">
      <div className="uk-child-width-1-2@s" data-uk-grid>
        <div>
          <a href="#" className="uk-logo">Daily Cook</a>
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
        <div>Made by Quý đẹp trai vô địch nhất vũ trụ.</div>
      </div>
    </div>
   </footer>
  );
}

export default Footer;
