import React from "react";
import PropTypes from "prop-types";

import styles from "../assets/stylesheets/presence-log.scss";
import { FormattedMessage, useIntl } from "react-intl";

export default function VideoMessage({ name, body: { src: url }, className, maySpawn, hubId }) {
  return (
    <div className={className}>
      <div className={styles.mediaBody}>
        <FormattedMessage
          id="video-message.body"
          defaultMessage="{name} took a <a>video</a>."
          values={{
            name: <b>{name}</b>,
            // eslint-disable-next-line react/display-name
            a: chunks => (
              <b>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {chunks}
                </a>
              </b>
            )
          }}
        />
      </div>
    </div>
  );
}

VideoMessage.propTypes = {
  name: PropTypes.string,
  maySpawn: PropTypes.bool,
  body: PropTypes.object,
  className: PropTypes.string,
  hubId: PropTypes.string
};
