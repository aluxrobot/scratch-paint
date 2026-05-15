/* @todo This file should be pulled out into a shared library with scratch-gui,
consolidating this component with icon-button.jsx in gui.
See #13 */

import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

import Button from "../button/button.jsx";

import styles from "./labeled-icon-button.module.css";

const LabeledIconButton = ({
    className,
    hideLabel,
    imgAlt,
    imgSrc,
    onClick,
    svgContent,
    title,
    ...props
}) => (
    <Button
        className={classNames(className, styles.modEditField)}
        onClick={onClick}
        {...props}
    >
        {svgContent ? (
            <span
                aria-label={imgAlt || title}
                className={classNames(styles.editFieldIcon, styles.editFieldIconTinted)}
                role="img"
                title={title}
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />
        ) : (
            <img
                alt={imgAlt || title}
                className={styles.editFieldIcon}
                draggable={false}
                src={imgSrc}
                title={title}
            />
        )}
        {!hideLabel && <span className={styles.editFieldTitle}>{title}</span>}
    </Button>
);

LabeledIconButton.propTypes = {
    className: PropTypes.string,
    hideLabel: PropTypes.bool,
    highlighted: PropTypes.bool,
    imgAlt: PropTypes.string,
    imgSrc: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    svgContent: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default LabeledIconButton;
