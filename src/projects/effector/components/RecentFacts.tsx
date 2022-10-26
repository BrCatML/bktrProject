import React from "react";
import { SyntheticEvent } from "react";

interface Props {
  open?: boolean;
  facts: string[];
  onToggle: (open: boolean) => void;
}

export const RecentFacts = (props: Props) => {
  return (
    <details
      className="History"
      open={props.open}
      onToggle={(e: SyntheticEvent<HTMLDetailsElement>) => {
        if (e.currentTarget.open !== props.open) {
          props.onToggle(!props.open);
        }
      }}
    >
      <summary>Recent Facts</summary>
      {props.facts.length === 0 ? (
        <p>No recent facts</p>
      ) : (
        <ol className="History_List">
          {props.facts.map((fact, i) => (
            <li key={i}>{fact}</li>
          ))}
        </ol>
      )}
    </details>
  );
};
