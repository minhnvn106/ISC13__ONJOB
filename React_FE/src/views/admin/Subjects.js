import React from "react";

// components

import SubjectTable from './../../components/CardTables/SubjectTable';

export default function Companies() {
  return (
    <>
    {/* Màu sáng */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <SubjectTable />
        </div>
      {/* Màu tối   */}
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
