import React from "react";
import PropTypes from "prop-types";
import configs from "../../utils/configs";
import { ExitedRoomScreen } from "./ExitedRoomScreen";

export function ExitedRoomScreenContainer({ reason }) {
  return (
    <ExitedRoomScreen
      showSourceLink={configs.feature("show_source_link")}
      reason={reason}
      contactEmail={configs.translation("contact-email")}
    />
  );
}

ExitedRoomScreenContainer.propTypes = {
  reason: PropTypes.string.isRequired
};
