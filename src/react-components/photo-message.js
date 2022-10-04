import React from "react";
import PropTypes from "prop-types";

import styles from "../assets/stylesheets/presence-log.scss";

import { getLandingPageForPhoto } from "../utils/phoenix-utils";
import { FormattedMessage } from "react-intl";

export default function PhotoMessage({ name, body: { src: url }, className, maySpawn, hubId }) {
  const landingPageUrl = getLandingPageForPhoto(url);

  return (
    <div className={className}>
      <div className={styles.mediaBody}>
        <FormattedMessage
          id="photo-message.body"
          defaultMessage="{name} took a <a>photo</a>."
          values={{
            name: <b>{name}</b>,
            // eslint-disable-next-line react/display-name
            a: chunks => (
              <b>
                <a href={landingPageUrl} target="_blank" rel="noopener noreferrer">
                  {chunks}
                </a>
              </b>
            )
          }}
        />
      </div>
      <a href={landingPageUrl} target="_blank" rel="noopener noreferrer">
        <img src={url} />
      </a>
    </div>
  );
}
PhotoMessage.propTypes = {
  name: PropTypes.string,
  maySpawn: PropTypes.bool,
  body: PropTypes.object,
  className: PropTypes.string,
  hubId: PropTypes.string
};
