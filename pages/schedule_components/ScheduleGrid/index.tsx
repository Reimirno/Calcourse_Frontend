/*
index.tsx
Description: The schedule grid generated. It supports search, delete, drag and drop.
Author: Yu Long
*/

import * as React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../../../node_modules/react-resizable/css/styles.css";
import "../../../node_modules/react-grid-layout/css/styles.css";
import { CourseData, maxCoursePerSemester, titleHeight } from "../../recommend";

const ResponsiveGridLayout = WidthProvider(Responsive);
const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export interface ScheduleGridProps {
  layout: CourseData[];
  ondropfunc;
  removeCellfunc;
  countUnitfunc;
  clearAllfunc;
  checkBoundfunc;
}
export default function ScheduleGrid(props: ScheduleGridProps): JSX.Element {
  const maxRows = (maxCoursePerSemester + titleHeight) * 2 + 1;
  return (
    <ResponsiveGridLayout
      className="grid-panel"
      isResizable={false}
      isDraggable={true}
      isDroppable={true}
      maxRows={maxRows}
      onDrop={props.ondropfunc}
      onDragStop={props.checkBoundfunc}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
      rowHeight={32}
      isBounded={true}
      containerPadding={[0, 0]}
      margin={[20, 10]}
      measureBeforeMount={false}
    >
      {/* The headers for each semester */}
      {semesters.map((num) => {
        let idx = num - 1;
        let row = Math.floor(idx % 4);
        let col = Math.floor(idx / 4) * (titleHeight + maxCoursePerSemester);
        return (
          <div
            className="grid-cell semester-cell no-interaction"
            key={"Title-Sem" + num}
            data-grid={{
              x: row,
              y: col,
              w: 1,
              h: titleHeight,
              static: true,
            }}
          >
            <div className="cell-text">{"Semester " + num}</div>
          </div>
        );
      })}
      {/* The unit count cell, at the bottom of the grid */}
      <div
        className="grid-cell unit-count-cell"
        key={"Unit Count"}
        data-grid={{
          x: 0,
          y: 2 * (titleHeight + maxCoursePerSemester),
          w: 1,
          h: 1,
          static: true,
        }}
      >
        <div className="cell-text">
          {"Total Unit: " + props.countUnitfunc()}
        </div>
      </div>
      {/* The clear all button, at the bottom of the grid */}
      <div
        className="grid-cell clear-all-button-cell no-interaction"
        key={"Clear Button"}
        data-grid={{
          x: 3,
          y: 2 * (titleHeight + maxCoursePerSemester),
          w: 1,
          h: 1,
          static: true,
        }}
      >
        <div className="cell-text" onClick={props.clearAllfunc}>
          Clear All
        </div>
      </div>
      {/* The course cards */}
      {props.layout.map((course) => {
        return (
          <div
            className="grid-cell course-cell no-interaction"
            key={"Course" + course.id}
            data-grid={{ x: course.x, y: course.y, w: 1, h: 1 }}
          >
            <div className="cell-text course-cell-text">
              {course.dept + " " + course.code}
            </div>
            <div
              className="hide-button"
              onClick={() => props.removeCellfunc(course)}
            >
              &times;
            </div>
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
}
