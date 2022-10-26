import React from "react";

interface Props {
    fact: string;
    busy?: boolean;
    onClickNext: () => void;
  }
  
  export const CatFact = (props: Props) => {
    return (
      <div className="Component">
        <button className="btn" disabled={props.busy} onClick={props.onClickNext}>
          {props.busy ? "Loading..." : "Next random fact"}
        </button>
        <p className="Component_text">{props.fact}</p>
      </div>
    );
  };
  