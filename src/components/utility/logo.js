import React, { Component } from "react";
import { connect } from "react-redux";
import appActions from "../../redux/app/actions";


const { toggleCollapsed } = appActions;


class TopbarButton extends Component {
  render() {
    const { toggleCollapsed } = this.props;

    return (

      <div className="isoLogoWrapper">

        <button

          style={{}}
          onClick={toggleCollapsed}
          className="triggerBtn"
        />

      </div>
    );
  }
  
};


export default connect(
  state => ({
    app: state.App,
    customizedTheme: state.ThemeSwitcher.sidebarTheme,
    height: state.App.height
  }),
  { toggleCollapsed }
)(TopbarButton);