import React from "react";

// components

import IntakeTable from "components/CardTables/IntakeTable.js";

export default function Intakes() {
  return (
    <>
    {/* Màu sáng */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <IntakeTable />
        </div>
      {/* Màu tối   */}
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
