import React, { Component } from "react";
import majorService from "assets/services/majorService";

class MajorTable2 extends Component {
  state = {
    major:[]
  };

  handleChange = this.handleChange.bind(this);

  componentDidMount(){
    majorService.major().then(res => {
      if (res.errorCode > 0) {
        // Wrong
        this.setState();
      }
      else {
        // Right
        this.setState({major:res});
        // Save user info
        // redirect to Home page
         console.log(res)
      }
    }); 
  }
  
    render() {   
      return (
        <>
          <div
            className=
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-white"
          >
            {/* <p>{this.state.major[0].majorID}</p> */}
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3
                    className=
                      "font-semibold text-lg bg-white  text-gray-800 text-white"                    
                  >
                    {/* Table Title */}
                    DANH SÁCH NGÀNH HỌC
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
                      className=
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                    >
                      Tên ngành
                    </th>
                    <th
                      className=
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"                      
                    >
                      Mã ngành
                    </th>
                    <th
                      className=
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                      <img
                        src={require("assets/img/angular.jpg")}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span className= "ml-3 font-bold text-gray-700"
                      >
                        
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-no-wrap p-4">
                      AN609
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
                        className=
                          "ml-3 font-bold text-gray-700"
                      >
                        Lập trình React
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      RE603
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
              <div
                className="modal fade"
                id="editModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Phòng mới
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group row ">
                          <label
                            for="txtCode"
                            className="col-sm-3 col-form-label "
                          >
                            Mã Phòng
                          </label>
                          <div className="col-sm-9 ">
                            <input
                              type="text"
                              className="form-control"
                              id="txtCode"
                            />
                          </div>
                        </div>
  
                        <div className="form-group row ">
                          <label
                            for="txtName"
                            className="col-sm-3 col-form-label "
                          >
                            Tên phòng
                          </label>
                          <div className="col-sm-9 ">
                            <input
                              type="text"
                              className="form-control"
                              id="txtName"
                            />
                          </div>
                        </div>
  
                        <div className="form-group row ">
                          <label
                            for="txtName"
                            className="col-sm-3 col-form-label "
                          >
                            Loại phòng
                          </label>
                          <div className="col-sm-9 ">
                            <div class="form-check">
                              <div class="row py-2">
                                <div class="col-sm-6">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="Gender"
                                    id="rdGender"
                                    value="1"
                                  />
                                  <label class="form-check-label" for="Radios1">
                                    Lý thuyết
                                  </label>
                                </div>
                                <div class="col-sm-6">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="Gender"
                                    id="rdGender"
                                    value="2"
                                  />
                                  <label class="form-check-label" for="Radios1">
                                    Thực hành
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <div className="form-group row ">
                          <label
                            for="txtName"
                            className="col-sm-3 col-form-label "
                          >
                            Tình trạng
                          </label>
                          <div className="col-sm-9 ">
                            <div class="form-check">
                              <div class="row py-2">
                                <div class="col-sm-6">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="Status"
                                    id="rdStatus"
                                    value="1"
                                  />
                                  <label class="form-check-label" for="Radios2">
                                    Còn hoạt động
                                  </label>
                                </div>
                                <div class="col-sm-6">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="Status"
                                    id="rdStatus"
                                    value="2"
                                  />
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
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Thoát
                      </button>
                      <button type="button" className="btn btn-primary">
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  
  export default MajorTable2;