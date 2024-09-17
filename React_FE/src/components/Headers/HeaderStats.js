import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="HỌC VIÊN"
                  statTitle="35"
                  statArrow="up"
                  statPercent="3"
                  statPercentColor="text-green-500"
                  statDescripiron="So với khóa trước"
                  statIconName="fas fa-user-graduate"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="CÔNG TY"
                  statTitle="356"
                  statArrow="down"
                  statPercent="48"
                  statPercentColor="text-red-500"
                  statDescripiron="So với năm ngoái"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="GIÁO VIÊN"
                  statTitle="24"
                  statArrow="up"
                  statPercent="10"
                  statPercentColor="text-orange-500"
                  statDescripiron="So với năm ngoái"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ĐI LÀM"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-green-500"
                  statDescripiron="So với khóa trước"
                  statIconName="fas fa-percent"
                  statIconColor="bg-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
