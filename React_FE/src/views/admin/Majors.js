import React from "react";

// components

// import MajorTable from "components/CardTables/MajorTable.js";

// import CardTable from "components/Cards/CardTable.js";
import MajorTable3 from './../../components/CardTables/MajorTable3';

export default function Majors() {
  return (
    <>
    {/* Màu sáng */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <MajorTable3 />
        </div>
      {/* Màu tối   */}
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
