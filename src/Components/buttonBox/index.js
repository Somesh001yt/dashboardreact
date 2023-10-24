import React from "react";
import styles from "./buttonBox.module.scss";
import PuffLoader from "react-spinners/PuffLoader";

const override = {
    display: "block",
    margin: "0 auto",
    color: "#628c2a",
  };

const ButtonBox = (props) => {
  return (
    <>
      {props.label && (
        <button
          type={props.type ? props.type : "button"}
          disabled={ props.loader}
          onClick={props?.click}
          className={`${styles.btn} ${
            props?.primary ? styles.btnPrimary : styles.btnOutline
          } ${props?.class} ${props.disabled && styles.disabled}`}
        >
          {props.loader ? ( 
            <PuffLoader
              color={"#fff"}
              size={38}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            props.label
          )}
        </button>
      )}
    </>
  );
};
export default ButtonBox;
