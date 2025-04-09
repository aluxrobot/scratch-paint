/* DO NOT EDIT
@todo This file is copied from GUI and should be pulled out into a shared library.
See https://github.com/LLK/scratch-paint/issues/13 */

/* NOTE:
Edited to add range prop
*/

import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

import styles from "./input.module.css";

const Input = ({
    className,
    range = false,
    small = false,
    ...componentProps
}) => {
    return (
        <input
            {...componentProps}
            className={classNames(styles.inputForm, className, {
                [styles.inputSmall]: small && !range,
                [styles.inputSmallRange]: small && range,
            })}
        />
    );
};

Input.propTypes = {
    className: PropTypes.string,
    range: PropTypes.bool,
    small: PropTypes.bool,
};

export default Input;
