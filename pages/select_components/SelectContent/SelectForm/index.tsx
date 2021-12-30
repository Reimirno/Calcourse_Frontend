/*
index.tsx
Description: The selection form component. This script sends information to the backend.
Author: Yu Long
*/

import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import SubmitButton from "./submit_button";
import majors from "../../../../data/majors.json";

//Not used for now. May integrate this into the algorithm in the future.
enum WorkloadEnum {
  easy,
  medium,
  hard,
}
//Type for form value
export type FormValues = {
  major: string;
  major2: string;
  interests: string; //Not used for now
  semesters: number;
  workload: WorkloadEnum; //Not used for now
};
//At most 8 semesters (4 years)
const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export default function SelectForm(): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const { push } = useRouter();
  const postSelections: SubmitHandler<FormValues> = (data) => {
    console.log("User Selection", data);
    const { major, major2, interests, semesters } = data;
    push({
      pathname: "/recommend",
      query: {
        major,
        major2,
        interests,
        semesters,
      },
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit(postSelections)}>
      <div className="panel-column" id="form-col1">
        {/* Question about majors */}
        <div className="form-question">
          <label>Major </label> <br />
          <select
            {...register("major", { required: "Please enter your major!" })}
          >
            {majors.map((major, index) => {
              // Cannot be None!
              if (major !== "None") {
                return (
                  <option key={index} value={major}>
                    {major}
                  </option>
                );
              }
            })}
          </select>
        </div>
        {errors.major && <p>{errors.major.message}</p>}

        {/* Question about semesters */}
        <div className="form-question">
          <label>Semesters Left</label> <br />
          <select
            {...register("semesters", {
              required: "Please enter your number of remaining semester!",
            })}
          >
            {semesters.map((x, index) => (
              <option key={index} value={x}>
                {" "}
                {x}
                {" semster(s) "}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Question about the second major */}
      <div className="panel-column" id="form-col2">
        <div className="form-question">
          <label>Second Major </label> <br />
          <select {...register("major2")}>
            {majors.map((major, index) => (
              <option key={index} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>
        {errors.major && <p>{errors.major.message}</p>}

        {/* The submit button */}
        <SubmitButton />
      </div>
    </form>
  );
}
