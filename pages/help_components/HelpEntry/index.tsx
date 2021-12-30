/*
index.tsx
Description: The help entries. To create more Q&A entries, simply add a <QuestionEntry> tag.
Author: Yu Long
*/
import * as React from "react";
import QuestionEntry from "./question-entry";

export default function HelpEntry(): JSX.Element {
  return (
    <div className="questions">
      <QuestionEntry
        question="How to use this website?"
        answer={[
          "Start generating your personalized 4-year schedule by entering your major(s) and the number of semesters you have left.",
          "After a schedule has been generated, you can move courses to a different semester, delete courses, and search for additional course to add to your course plan.",
        ]}
      />
      {/* <QuestionEntry
        question="Question 2"
        answer={["This is a paragraph.", "This is another paragraph."]}
      />
      <QuestionEntry
        question="Question 3"
        answer={["This is a paragraph.", "This is another paragraph."]}
      />
      <QuestionEntry
        question="Question 4"
        answer={["This is a paragraph.", "This is another paragraph."]}
      /> */}
    </div>
  );
}
