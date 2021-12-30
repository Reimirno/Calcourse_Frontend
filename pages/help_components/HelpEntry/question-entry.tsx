import * as React from "react";
import Collapsible from "react-collapsible";

export interface QuestionEntryProps {
  question: string;
  answer: string[];
}
export default function QuestionEntry(props: QuestionEntryProps): JSX.Element {
  return (
    <Collapsible
      trigger={
        <div className="collapsible-title hvr-rotate">
          {" "}
          <div className="helper">{props.question}</div>
        </div>
      }
      triggerWhenOpen={
        <div className="collapsible-title-open">
          {" "}
          <div className="helper">{props.question}</div>
        </div>
      }
    >
      {props.answer.map((p) => (
        <p>{p}</p>
      ))}
    </Collapsible>
  );
}
