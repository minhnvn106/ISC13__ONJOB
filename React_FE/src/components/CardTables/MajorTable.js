import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
// import {useFormik} from "formik";
// import * as Yup from "yup";

// components

import { getList } from './../../assets/services/majorService';
// import { majorService } from 'assets/services/majorService';

// import {getAll, get, add, update, remove} from 'assets/services/majorService';

export default function MajorTable({ color }) {
  //Button
  const [show, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);
  // const handleFormSubmit = (data) => {
  //   //TODO: check for ADDING or UPDATING
  //   majorService.add(data).then((res) => {
  //     if (res.errorCode === 0) {
  //       //TODO: Show success message
  //       loadData();
  //       handleModalClose();
  //     } else {
  //       //TODO: Show error message
  //     };
  //   })
  // };

  // Load Function
  // const loadData = () => {
  //   majorService.getAll.then((res) => {
  //     if (res.errorCode ===0){
  //       setMajors(res.data);
  //     }
  //   });
  // };
  
  //   useEffect(()=>{
  //     loadData();
  //   },[]);
  // //calling API
  //   const [majors, setMajors] = useState([]);

  //   const formik = useFormik({
  //     initialValues: {
  //       majorName:"",
  //     },
  //     validationSchema: Yup.object({
  //       majorName: Yup.string().required("Required").min(2, "Phải có từ 2 kí tự trở lên"),
  //     }),
  //     onSubmit: (values) => {
  //       handleFormSubmit.log(values);
  //     },
  //   });

    const [list, setList] = useState([]);

    // Mount Success
    useEffect(() => {
    let mounted = true;
    getList()
        .then(items => {
        if(mounted) {
            setList(items)
        }
        })

    // Mount Fail
    return () => mounted = false;
    }, [])
    
    // Template
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
                  DANH SÁCH NGÀNH HỌC
                </h3>
              </div>

              <div className="col-auto">
                <Button 
                variant="primary" 
                onClick={handleModalShow(null,0)}
                type="submit"
                >
                  <i i className="fas fa-plus"></i> Thêm
                </Button>
                <Modal
              show={show}
              onHide={handleModalClose}
              // backdrop="static"
              // keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ngành mới
                  </h5>
                </Modal.Title>
              </Modal.Header>
              {/* <form > */}
              <Modal.Body>
                <form>
                <div className="form-group row ">
                  <label
                    for="txtCode"
                    className="col-sm-3 col-form-label "
                  >
                    Mã ngành
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
                          Tên ngành
                    </label>
                    <div className="col-sm-9 ">
                      <input
                        type="text"
                        className="form-control"
                        id="txtName"
                        // maxLength="100"
                        // frmfield={formik.getFieldProps("majorName")}
                        // err={formik.touch.majorName && formik.errors.majorName}
                        // errMessage={formik.errors.majorName}
                    />
                    </div>
                  </div>              
                </form>
              </Modal.Body>
              <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={handleModalClose}
                  >
                    Thoát
                </button>
                <button 
                    variant ="primary"
                    type="submit"
                    className="btn btn-primary"
                  >
                    Lưu
                </button>
              </Modal.Footer>
              {/* </form> */}
            </Modal>
            
              </div>
              {/* <div className="col-auto">
              <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#editModal"
                  >
                <i className="fas fa-plus"></i> Thêm
              </button> */}

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
                    Tên ngành
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-gray-100 text-gray-600 border-gray-200"
                        : "bg-blue-800 text-blue-300 border-blue-700")
                    }
                  >
                    Mã ngành
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
                {/* CÁCH 1: Một chức năng là một function kèm API và trang trí bảng */}
                    {/* <MajorGet/> */}

              

                  {/* CÁCH 2: Tạo một File service chứa các funtion, sang trang View gọi ra list*/}
                  {list.map(item => 
                  <tr key={item.majorID}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                        {item.majorName}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">{item.majorCode}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                        <a href="/">
                        <i className="fas fa-edit text-primary"></i>
                        </a>
                        <a href="/">
                        <i className="fas fa-trash-alt text-danger"></i>
                        </a>
                      </td>
                  </tr>)}
                </tbody>
            </table>
            {/* <div
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
            </div>*/}
          </div> 
        </div>
      </>
    );
  
}

MajorTable.defaultProps = {
  color: "light",
};

MajorTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
