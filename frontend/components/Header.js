import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img alt='logo' src='https://upload.wikimedia.org/wikipedia/en/8/82/Reddit_logo_and_wordmark.svg' />
      </div>
    );
  }
};

export default Header;
