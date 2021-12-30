/*
index.tsx
Description: The search panel. Just lay out the items qualified.
Author: Yu Long
*/

import * as React from "react";
import { CourseData } from "../../recommend";

export interface SearchPanelProps {
  courseName: string;
  filteredList: CourseData[];
  filterfunc;
  checkInfunc;
}

export default function SearchPanel(props: SearchPanelProps): JSX.Element {
  return (
    <div className="search-panel">
      <input
        type="search"
        value={props.courseName}
        onChange={props.filterfunc}
        className="search-bar"
        placeholder="Course code or name..."
      />
      <div className="search-list">
        {props.filteredList && props.filteredList.length > 0 ? (
          props.filteredList.map((course: CourseData) => {
            return (
              <div
                key={String(course.id)}
                className={
                  props.checkInfunc(course.id)
                    ? "search-item alreadyin no-interaction"
                    : "search-item"
                }
                draggable={true}
                unselectable="on"
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", "");
                  e.dataTransfer.setData("transfer", String(course.id));
                }}
              >
                <div className="search-item-code">
                  {course.dept + " " + course.code}
                </div>
                <div className="search-item-name">{course.name}</div>
                <div className="search-item-desc">{course.desc}</div>
              </div>
            );
          })
        ) : (
          <p className="no-result">No results.</p>
        )}
      </div>
    </div>
  );
}
