import React from "react";
import PropTypes from "prop-types";

import configs from "../../utils/configs";
import { useLogo } from "../styles/theme";

export function AppLogo({ className }) {
  const logo = useLogo();
  return <img className={className} alt={configs.translation("app-name")} src={logo} />;
}

AppLogo.propTypes = {
  className: PropTypes.string,
  forceConfigurableLogo: PropTypes.bool
};
