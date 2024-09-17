import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import intakeService from './../../assets/services/intakeService';
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";

import majorService from './../../assets/services/majorService';
//Toast
import Alert from './../../utils/toaster'
import 'react-toastify/dist/ReactToastify.css';

// Confirmation
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// DD/MM/YYYY
import Moment from 'react-moment';

import Input from './../../assets/services/input';
export default function IntakeTable({ color }) {
  const [intakes, setIntakes] = useState([]);

  const [intakeId, setIntakeId] = useState(0);
  const [majorSelection,setMajorSelection] = useState([]);
  
      /* ************************* */
  const loadDataMajor = ()=>{
    majorService.getAll().then(res=>{
      setMajorSelection(res);
    })
  }

  const loadData = () => {
        intakeService.getAll().then(res => {
            setIntakes(res);
        })
    }
    //B9 Remove Thay componentDidMount thành useEffect mngu
    useEffect(() => {
        
        loadData();
        loadDataMajor();
    }, [intakeId]); 

    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    const handleModalShow = (e, dataId) => {
        if (e) e.preventDefault();

        setIntakeId(dataId);
        if (dataId > 0) {//edit
            intakeService.get(dataId).then(res => {
              formik.setValues({
                ...res,
                intakeStatus: res.intakeStatus === "HOATDONG"? "0" : "1",               
              });
                setModalShow(true);
            })
        } else {//add
            formik.resetForm();
            setModalShow(true);
        }
    }
    /* ************************* */
    // Phần III: Formik và Function Xử lý handleFormSubmit 
    const formik = useFormik({
        initialValues: {
            intakeCode: "",
            intakeName: "",
            intakeBeginDay: "",
            intakeEndDay: "",
            intakeStatus: "1",
            note: "",
            major:""
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
            intakeCode: Yup.string().required("Required").min(2, "Từ 2 kí tự trở lên"),
            intakeName: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            // console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (intakeId === 0) {//add
            intakeService.add(data).then((res) => {
              if (res.errorCode !== 0) {
                // Thông báo kết quả 
                Alert('success', 'Đã tạo thành công')   
                loadData();
                console.log(res);
              } else {
                // Alert('error', 'Không tạo được')   
                // loadData();
              }
            })
        } else {//update
            intakeService.update(intakeId, data).then(res => {
              if (res.errorCode !== 0) {
                // Thông báo kết quả 
                Alert('success', 'Đã chỉnh thành công')   
                loadData();
                console.log(res);
              } else {
                // Alert('success', 'Chỉnh không được')   
                // loadData();
              }
            })
        }
    }


    //Delete 1 dòng dữ liệu
    const deleteRow = (e, dataId) => {
      
      // Ngưng vòng lặp map
      e.preventDefault();
      
      // Thông báo người dùng trước khi xóa
      confirmAlert({
        title: 'Thông báo',
        message: 'Bạn có chắc muốn xóa không?',
        buttons: [
          {
            label: 'Xóa',
            onClick: () => 
            {
                
                //TODO: Hiện notification
                //TODO: Xóa dữ liệu
                intakeService.delete(dataId).then((res) => {
                // loadData();
                // console.log(res);   
                  if (res.errorCode !== 0) {
                    // Thông báo kết quả
                    Alert('success', 'Đã xóa thành công')   
                    loadData();
                    console.log(res);
                  } else {
                    
                  }
                });
                // console.log(dataId);
              }
            },
          {
            label: 'Không',
          }
        ]
      });
    };
  
  return (
    <Fragment>
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
                DANH SÁCH KHÓA HỌC
              </h3>
            </div>
            
            <div className="col-auto">
            <button 
            type="button" 
            className="btn btn-primary" 
            data-toggle="modal" data-target="#editModal" 
            variant="primary" onClick={() => 
            handleModalShow(null, 0)}>
              <i className="fas fa-plus"></i> 
              &nbsp; Thêm
            </button>
            <Modal show={modalShow} onHide={handleModalClose} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
              <Modal.Title> Khóa mới </Modal.Title>
              </Modal.Header>
              <form autoComplete="on" onSubmit={formik.handleSubmit}>
                  <Modal.Body>        
                    <Input id="txtIntakeCode" type="text" className="inputClass form-control" label="Mã" labelSize="4" maxLength="100"
                      frmField={formik.getFieldProps("intakeCode")}
                      err={formik.touched.intakeCode && formik.errors.intakeCode}
                      errMessage={formik.errors.intakeCode}
                    />
                    <Input id="txtIntakeName" type="text" className="inputClass form-control" label="Tên" labelSize="4" maxLength="100"
                      frmField={formik.getFieldProps("intakeName")}
                      err={formik.touched.intakeName && formik.errors.intakeName}
                      errMessage={formik.errors.intakeName}
                    />

                    <Input id="txtIntakeBeginDay" type="date" className="inputClass form-control" label="Ngày bắt đầu" labelSize="4" maxLength="100"
                            
                      data-format="DD-MM-YYYY"
                      
                      frmField={formik.getFieldProps("intakeBeginDay")}
                      err={formik.touched.intakeBeginDay && formik.errors.intakeBeginDay}
                      errMessage={formik.errors.intakeBeginDay}
                    />

                    <Input id="txtIntakeEndDay" type="date" className="inputClass form-control" label="Ngày kết thúc" labelSize="4" maxLength="100"
                            
                      data-format="DD-MM-YYYY"
                      
                      frmField={formik.getFieldProps("intakeEndDay")}
                      err={formik.touched.intakeEndDay && formik.errors.intakeEndDay}
                      errMessage={formik.errors.intakeEndDay}
                    />

                    {/* Tinh trang */}
                    <div className="formGroup row">
                      <label className="col-sm-4 col-form-label">Tình trạng</label>
                      <div className="col-sm-8">
                        <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" checked={formik.values.intakeStatus === '1'} 
                            onChange={formik.handleChange}
                            id="customRadStatus1"  
                            value="1" className="custom-control-input"
                            name="intakeStatus"
                            />
                          
                          <label className="custom-control-label" htmlFor="customRadStatus1">Không dạy</label>
                        </div>

                        <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" checked={formik.values.intakeStatus === '0'} 
                          onChange={formik.handleChange}
                          id="customRadStatus2"
                          value="0" className="custom-control-input"  
                          name="intakeStatus"/>
                          
                          <label className="custom-control-label" htmlFor="customRadStatus2">Đang dạy</label>
                        </div>
                      </div>
                      
                    </div>

                    <Input id="txtIntakeNote" type="text" className="inputClass form-control" label="Ghi chú" labelSize="4" maxLength="100"
                      frmField={formik.getFieldProps("note")}
                      err={formik.touched.note && formik.errors.note}
                      errMessage={formik.errors.note}
                    />

                    <div class="form-group row">
                      <label for="" className="col-sm-4 col-form-label" >Ngành học</label>
                      <div className="col-sm-8">

                        <select class="form-control form-control-sm" name="major" id="">
                            {
                              majorSelection.map((major, idx) => {
                                return (
                                  <option value={major.majorID}>{major.majorName}</option>
                                )
                              })
                            }
                        </select>
                      </div>
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Thoát
                    </Button>
                    {/*  */}
                    <Button variant="primary" type="submit" onClick={handleModalClose} disabled={(!formik.isValid && formik.dirty)}>
                      Lưu
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>
            </div>
          </div>
        </div>
        
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className={
                  "px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  STT
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Mã khóa
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Khóa học
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Ngày bắt đầu
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Ngày kết thúc
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Trạng thái
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Ngành
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Ghi chú
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
            {
              intakes.map((intake, idx) => {
                return (
                <tr key={intake.intakeId}>
                  <th className="text-center " >{idx + 1}</th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <span>
                    {intake.intakeCode}
                  </span>
                  {/* {idx + 1} */}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {intake.intakeName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <Moment format="DD/MM/YYYY">
                      {intake.intakeBeginDay}
                    </Moment>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <Moment format="DD/MM/YYYY">
                      {intake.intakeEndDay}
                    </Moment>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {intake.intakeStatus==="KHONGHOATDONG"?
                      <p><i className="fas fa-circle text-orange-500 mr-2"></i>Không dạy</p>:
                      <p><i className="fas fa-circle text-teal-500 mr-2"></i>Đang dạy</p>}</td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {intake.major.majorName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {intake.note}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-no-wrap p-4 text-center">
                    <a href="/#" onClick={(e) => handleModalShow(e, intake.intakeId)}>
                      <i className="fas fa-edit text-primary px-2"></i>
                    </a>
                    <a href="/#" onClick={(e) => deleteRow(e, intake.intakeId)}>
                      <i className="fas fa-trash-alt text-danger px-2"></i>
                    </a>
                  </td>
                </tr>
                )
              })}             
          </tbody>
          </table>                   
        </div>
      </div>
      
    </Fragment>
  );
}

IntakeTable.defaultProps = {
  color: "light",
};

IntakeTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
