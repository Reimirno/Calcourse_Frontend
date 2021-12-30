/*
recommend.tsx
Description: The recommended schedule page root. This script communicates with the backend.
Author: Yu Long
*/
import axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from "react";
import CHead from "./shared_components/custom_head";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../node_modules/react-resizable/css/styles.css";
import "../node_modules/react-grid-layout/css/styles.css";
import Page from "./shared_components/page";
import SearchPanel from "./schedule_components/SearchPanel";
import ScheduleGrid from "./schedule_components/ScheduleGrid";

export const titleHeight = 2;
export const maxCoursePerSemester = 6;
export const startYofFirstRow = titleHeight;
export const startYofSecondRow = titleHeight * 2 + maxCoursePerSemester;

export interface RecommendPropsType {
  masterList: string[][];
  allData: Map<string, Map<string, string>>;
}

export interface CourseData {
  id: number;
  dept: string;
  code: string;
  name: string;
  desc: string;
  unit: number;
  avgGrade: number;
  x: number;
  y: number;
}

export default function Recommend(props: RecommendPropsType): React.ReactNode {
  //Parse course data passed from the server side into an array for looking up later
  //This array is stored in a constant which will not be changed
  const PrepareAllCourseList = (allData: Map<string, Map<string, string>>) => {
    var result: CourseData[] = [];
    for (const key in allData) {
      let value = allData[key];
      let courseToBeAdded: CourseData = {
        id: parseInt(key),
        dept: value["abbreviation"],
        code: value["courseNumber"],
        name: value["title"],
        desc: value["description"],
        unit: parseInt(value["units"]),
        avgGrade: parseFloat(value["gradeAverage"]),
        x: 0,
        y: 0,
      };
      result.push(courseToBeAdded);
    }
    return result;
  };
  
  //This array would be populated upon initialization and hold all course data
  const AllCourseData: CourseData[] = PrepareAllCourseList(props.allData);

  //Reads info from props, find corresponding courseInfo from the lists of all courseInfos
  //and initialize the selected course list with its result
  const PrepareSelectedCourseList = (masterList: string[][]) => {
    var result: CourseData[];
    result = [];
    console.log(masterList);
    for (let i = 0; i < masterList.length; i++) {
      let Ids: string[] = masterList[i];
      for (let j = 0; j < Ids.length; j++) {
        var courseInfo = AllCourseData.find((x) => x.id === parseInt(Ids[j]));
        if (!courseInfo) {
          console.log(
            "A recommended course has an Id that cannot be recognized."
          );
        } else {
          //Put the recommended course in place
          //Some maths... zzz
          let row = Math.floor(i / 4) * maxCoursePerSemester + titleHeight;
          let col = Math.floor(i % 4);
          courseInfo.x = col;
          courseInfo.y = row;
          result.push(courseInfo!);
        }
      }
    }
    console.log("Preparation result:", result);
    return result;
  };

  //2 Dynamically updated arrays as state, initialized from the previous two arrays
  //preLayout contained all courses selected into the schedule
  //filtered contains all courses. It is not really updated dynamically (for now).
  const [filtered, setFiltered] = useState(
    AllCourseData.sort((a, b) => {
      //sort the list of all courses upon initializing
      //This is just a lexi-sort by department name then by course code
      //We can specify other sorting protocols (sorting by unit, for example)
      //and allow the users to choose how to sort their list
      if (a.dept + a.code < b.dept + b.code) {
        return -1;
      }
      if (a.dept + a.code > b.dept + b.code) {
        return 1;
      }
      return 0;
    })
  );
  const [prevLayout, setPrevLayout] = useState(
    PrepareSelectedCourseList(props.masterList)
  );
  //keyword in search box; also need to be updated dynamically as a state
  const [courseName, setCourseName] = useState("");

  //function called when user drag a cell from the search list to schedule
  const onDropCell = (layout, layoutItem, _event) => {
    //find out the course id of the dragged cell
    let idOfInterest: number = Number(_event.dataTransfer.getData("transfer"));
    //safety check to avoid repetition
    if (isAlreadyIn(idOfInterest)) {
      alert("This course already exists!");
      return;
    }
    //get the course data
    const courseOfInterest: CourseData = filtered.find(
      ({ id }) => id === idOfInterest
    )!;
    //assign the position information, so that later it can be mapped to the correct place
    courseOfInterest.x = layoutItem.x;
    courseOfInterest.y = layoutItem.y;
    //actually add this into schedule
    setPrevLayout([
      ...prevLayout.filter(({ id }) => id !== idOfInterest),
      courseOfInterest,
    ]);
    //This line remove the added course from search list, but that has sync problems.
    //we don't do this for now.
    // setFiltered(filtered.filter(({ id }) => id !== idOfInterest));

    checkBound();
  };

  //function called when you remove a cell from schedule by clicking the cross
  const RemoveCell = (course: CourseData) => {
    course.x = 0;
    course.y = 0;
    //we don't do this for now.
    // setFiltered([...filtered.filter(({ id }) => id !== course.id), course]);
    setPrevLayout(prevLayout.filter(({ id }) => id !== course.id));
  };

  const ClearAll = () => {
    setPrevLayout([]);
  };

  //filter function used in search bar
  //This is a very naive matching algorithm
  //We can implement KMP if we have time
  //We can also build advanced filtering like filtering by units and such
  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      //Remove all white spaces and convert all to lowercase
      let key: string = keyword.replace(/\s/g, "").toLowerCase();
      //This is to allow them to search for cs courses by just typing "CS"
      //We can create an alias map for this feature if there are more aliases like this.
      key = key.replace(/^cs/, "compsci");
      //Filter the courses
      const results = AllCourseData.filter((course) => {
        //Prepare course info
        let code = course.code.toLowerCase();
        let dept = course.dept.toLowerCase();
        let deptAndCode = dept + code;
        if (
          course.name.replace(/\s/g, "").toLowerCase().match(key) ||
          deptAndCode.match(key)
        ) {
          return true;
        }
        //This is to account for the situation where course code could start with letter
        //For example, 26 could match W26AC
        if (/[a-zA-Z]/.test(code.charAt(0))) {
          if ((dept + code.substring(1)).match(key)) {
            return true;
          }
        }
        return false;
      });
      setFiltered(results);
    } else {
      // If the text field is empty (user never enter anything), show all courses
      setFiltered(AllCourseData);
    }
    setCourseName(keyword);
  };

  //check whether a course is already in schedule, given its index
  const isAlreadyIn = (idOfInterest) => {
    return prevLayout.find((x) => x.id === idOfInterest);
    // The following line has the same effect:
    // return prevLayout.find(({ id }) => id === idOfInterest);
  };

  //calculate total units of courses selected into schedule
  const getTotalUnit = () => {
    let units = prevLayout.map((course) => course.unit);
    return units.reduce(
      (previousValue: number, currentValue: number) =>
        previousValue + currentValue,
      0
    );
  };

  //Not implemented.
  //Ideally this should check whether a cell is out of bound.
  //Current implementation still allows a cell to go out of bound if you drag more than 6 courses to Semester 5, for example
  const checkBound = () => {
    console.log("Check bound!");
  };

  return (
    <React.Fragment>
      <CHead />
      <Page title="Recommend">
        <div className="horizontal-fitter">
          <SearchPanel
            courseName={courseName}
            filteredList={filtered}
            filterfunc={filter}
            checkInfunc={isAlreadyIn}
          />

          <ScheduleGrid
            layout={prevLayout}
            ondropfunc={onDropCell}
            removeCellfunc={RemoveCell}
            countUnitfunc={getTotalUnit}
            clearAllfunc={ClearAll}
            checkBoundfunc={checkBound}
          />
        </div>
      </Page>
    </React.Fragment>
  );
}

//function that communicates with the back ed
export async function getServerSideProps({ query }) {
  try {
    const res = await axios.get("/courseID", {
      params: query,
      baseURL: "http://localhost:8080",
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "comma" });
      },
    });
    const res2 = await axios.get("/getCourseInfoConcise", {
      //change this to "/getCourseInfoLong" to get description too
      params: query,
      baseURL: "http://localhost:8080",
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "comma" });
      },
    });
    const data = res.data;
    const data2 = res2.data;
    console.log("Data obtained", data);
    // console.log("Data obtained", data2);
    return { props: { masterList: data, allData: data2 } };
  } catch (error) {
    console.log("failed");
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    return { notFound: true };
  }
}
