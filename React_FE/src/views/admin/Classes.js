import React from "react";

// components

import ClassTable from "components/CardTables/ClassTable.js";

export default function Classes() {
  return (
    <>
    {/* Màu sáng */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ClassTable />
        </div>
      {/* Màu tối   */}
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
