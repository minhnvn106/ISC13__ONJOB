import React from 'react';
import PropTypes from "prop-types";

// components

// import TableDropdown from "components/Dropdowns/TableDropdown.js";


export default function RoomTable({ color }) {
  // state = { }
  return (
    <>
        {/* Colors */}
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-gray-800" : "text-white")
                }
              >
                {/* Table Title */}
                DANH SÁCH PHÒNG HỌC
              </h3>
            </div>
            
            <div className="col-auto">
              <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#editModal"
                  >
                <i className="fas fa-plus"></i> Thêm
              </button>

            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Phòng học
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Số phòng
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Loại phòng
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Tình trạng
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <img
                    src={require("assets/img/bootstrap.jpg")}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-gray-700" : "text-white")
                    }
                  >
                    Phòng học bootstrap
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  P.604
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  Thực hành
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {/* <i className="fas fa-circle text-orange-500 mr-2"></i>  */}
                  <i className="fas fa-circle text-teal-500 mr-2"></i>
                  Còn hoạt động
                </td>

                {/* CHỨC NĂNG */}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                  <a href="/">
                    <i className="fas fa-edit text-primary"></i>
                  </a>
                  <a href="/">
                    <i className="fas fa-trash-alt text-danger"></i>
                  </a>
                  {/* <TableDropdown /> */}
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <img
                    src={require("assets/img/angular.jpg")}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-gray-700" : "text-white")
                    }
                  >
                    Phòng học Angular
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  P.609
                </td>
                
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  Thực hành
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                  Ngưng hoạt động
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                  <a href="/">
                    <i className="fas fa-edit text-primary"></i>
                  </a>
                  <a href="/">
                    <i className="fas fa-trash-alt text-danger"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <img
                    src={require("assets/img/sketch.jpg")}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-gray-700" : "text-white")
                    }
                  >
                    Tiếng Anh
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  P.204
                </td>
                
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  Lý thuyết
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <i className="fas fa-circle text-teal-500 mr-2"></i> Hoạt động
                </td>
                
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                  <a href="/">
                    <i className="fas fa-edit text-primary"></i>
                  </a>
                  <a href="/">
                    <i className="fas fa-trash-alt text-danger"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <img
                    src={require("assets/img/react.jpg")}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-gray-700" : "text-white")
                    }
                  >
                    Phòng học React
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  P.603
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  Thực hành
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <i className="fas fa-circle text-teal-500 mr-2"></i>
                  Hoạt động 
                </td>
                
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                  <a href="/">
                    <i className="fas fa-edit text-primary"></i>
                  </a>
                  <a href="/">
                    <i className="fas fa-trash-alt text-danger"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Phòng mới</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                      <form>
                          <div className="form-group row ">
                            <label for="txtCode" className="col-sm-3 col-form-label ">Mã Phòng</label>
                            <div className="col-sm-9 ">
                              <input type="text" className="form-control" id="txtCode"/>
                            </div>
                          </div>

                          <div className="form-group row ">
                            <label for="txtName" className="col-sm-3 col-form-label ">Tên phòng</label>
                            <div className="col-sm-9 ">
                              <input type="text" className="form-control" id="txtName"/>
                            </div>
                          </div>
                          
                          <div className="form-group row ">
                            <label for="txtName" className="col-sm-3 col-form-label ">Loại phòng</label>
                            <div className="col-sm-9 ">
                              <div class="form-check">
                                  <div class="row py-2">
                                    <div class="col-sm-6">
                                        <input class="form-check-input" type="radio" name="Gender" id="rdGender" value="1" />
                                        <label class="form-check-label" for="Radios1">
                                          Lý thuyết
                                        </label>
                                      </div>
                                      <div class="col-sm-6">
                                        <input class="form-check-input" type="radio" name="Gender" id="rdGender" value="2" />
                                        <label class="form-check-label" for="Radios1">
                                          Thực hành
                                        </label>
                                      </div>
                                  </div> 
                              </div>
                            </div>
                          </div>      
                          
                          <div className="form-group row ">
                            <label for="txtName" className="col-sm-3 col-form-label ">Tình trạng</label>
                            <div className="col-sm-9 ">
                              <div class="form-check">
                                  <div class="row py-2">
                                    <div class="col-sm-6">
                                        <input class="form-check-input" type="radio" name="Status" id="rdStatus" value="1" />
                                        <label class="form-check-label" for="Radios2">
                                          Còn hoạt động
                                        </label>
                                      </div>
                                      <div class="col-sm-6">
                                        <input class="form-check-input" type="radio" name="Status" id="rdStatus" value="2" />
                                        <label class="form-check-label" for="Radios2">
                                          Ngưng hoạt động
                                        </label>
                                      </div>
                                    </div> 
                                </div>
                              </div>
                            </div>
                            
                      </form>
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                  <button type="button" className="btn btn-primary">Lưu</button>
                  </div>
                </div>
              </div>
          </div>
          </div>

      </div>
    </>
  );
}

RoomTable.defaultProps = {
  color: "light",
};

RoomTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
