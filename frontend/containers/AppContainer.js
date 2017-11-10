import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Feed from '../components/Feed';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const AppContainer = () => {
    return (
        <div>
            <Header /><br />
            <SideBar /><br /><br />
        </div>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
