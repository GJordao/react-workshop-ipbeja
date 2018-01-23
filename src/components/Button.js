// React - This is what allows us to write JSX
import React from "react";
// Styles
import { css, StyleSheet } from "aphrodite";

const styles = StyleSheet.create({
    button: {
        backgroundColor: "teal",
        color: "white"
    }
});

function Button({ text, onButtonClick }) {
    return <input className={css(styles.button)} type="button" value={text} onClick={onButtonClick} />;
}

export default Button;
