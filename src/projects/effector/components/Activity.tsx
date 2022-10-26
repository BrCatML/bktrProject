import React from "react";

interface Props {
    activity: string;
    type?: string;
    busy?: boolean;
    onClickNext: () => void;
  }
  
  export const Activity = (props: Props) => {
    return (
      <div className="Component">
        <button className="btn" onClick={props.onClickNext} disabled={props.busy}>
          {props.busy ? "Loading..." : "Next random activity"}
        </button>
        {props.type ? (
          <div>
            <p className="Component_title">{props.type.toUpperCase()}</p>
            <p className="Component_text">{props.activity}</p>
          </div>
        ) : (
          <p className="Component_text">Нажми на кнопку, получишь результат.</p>
        )}
      </div>
    );
  };
  