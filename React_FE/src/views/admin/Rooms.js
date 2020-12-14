import React from "react";

// components

import RoomTable from "components/CardTables/RoomTable.js";
// import CardTable from "components/Cards/CardTable.js";

export default function Rooms() {
  return (
    <>
    {/* Màu sáng */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <RoomTable />
        </div>
      {/* Màu tối   */}
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
