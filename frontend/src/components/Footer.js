import React from 'react';
function Footer(props) {


  if (props.loggedIn) {
    return (

      <footer className="footer">
        <p className="footer__text">© 2021 Mesto Russia</p>
      </footer>
    )
  }
  else {
    return '';
  }

}

export default Footer;
