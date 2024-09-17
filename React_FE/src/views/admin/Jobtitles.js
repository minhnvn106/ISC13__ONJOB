import React from "react";

// components

import JobtitleTable from "components/CardTables/JobtitleTable.js";

export default function Jobtitles() {
  return (
    <>
    {/* Màu sáng */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <JobtitleTable />
        </div>
      {/* Màu tối   */}
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
