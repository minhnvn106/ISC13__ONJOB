import React from "react";

// components

import InstructorTable from "components/CardTables/InstructorTable.js";
// import CardTable from "components/Cards/CardTable.js";

export default function Instructors() {
  return (
    <>
    {/* Màu sáng */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <InstructorTable />
        </div>
      {/* Màu tối   */}
        {/* <div className="w-full mb-12 px-4">
          <InstructorTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
