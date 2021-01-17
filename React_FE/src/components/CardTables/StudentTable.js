import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'react-bootstrap';

// import { Pnotify } from '../../utils/pnotify';
// import Input from './../controls/input';

import Input from './../../assets/services/input';

// components
import { useFormik } from 'formik';
import * as Yup from "yup";

//Toast
import Alert from './../../utils/toaster'
import 'react-toastify/dist/ReactToastify.css';

// Confirmation
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// DD/MM/YYYY
import Moment from 'react-moment';
import moment from 'moment' 

// import TableDropdown from "components/Dropdowns/TableDropdown.js";
import studentService from './../../assets/services/studentService';
import companyService from './../../assets/services/companyService';
import universityService from './../../assets/services/universityService';

export default function StudentTable({ color }) {
  // state = { }
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState(0);
  const [companySelection,setCompanySelection] = useState([]);
  const [universitySelection, setUniversitySelection] = useState([]);
  
    /* ************************* */
  const loadDataCompany = ()=>{
    companyService.getAll().then(res=>{
      setCompanySelection(res);
    })
  }

  const loadDataUniversity = ()=>{
    universityService.getAll().then(res=>{
      setUniversitySelection(res);
    })
  }

    const loadData = () => {
      studentService.getAll().then(res => {
          setStudents(res);
      })
  }
  //B9 Remove Thay componentDidMount thành useEffect mngu
  useEffect(() => {
      
      loadData();
      loadDataCompany();
      loadDataUniversity();

     
  }, [studentId]); //[] Bắt buộc phải có nếu không nó sẽ load lại nhiều lần
  //Set instructors vào để khi thay đổi update or delete thì nó sẽ set lại giá trị của instructors để nó gọi function loadData()

  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    
    /* ************************* */
    // Phần III: Formik và Function Xử lý handleFormSubmit 
    const formik = useFormik({
        initialValues: {
            stdCode: "",
            stdName: "",
            stdGender: "0",
            stdBirthday: "",
            stdEmail: "",
            stdPhone: "",
            stdImg: "",
            stdType: "0",
            stdGPA: "",
            stdWorkStatus: "1",
            stdNote: "",
            stdCompany:"",
            stdUniversity:""
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
          stdCode: Yup.string().required("Required").min(4, "Must be 4 characters or more"),
          stdName: Yup.string().required("Required")           
        }),
        onSubmit: (values) => {
            // console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    const handleModalShow = (e, dataId) => {
      if (e) e.preventDefault();

      setStudentId(dataId);
      if (dataId > 0) {//edit
          studentService.get(dataId).then(res => {
            console.log(res)
            formik.setValues({
              ...res,
              stdGender: res.stdGender === "Male" ? "0" : "1",
              stdType: res.stdType === "DANGHOC"  ? "0" : 
                       res.stdType === "TOTNGHIEP"? "1":
                       res.stdType === "BAOLUU"   ? "2":" ",              
              stdWorkStatus: res.stdWorkStatus === "DALAM"  ? "0":
                             res.stdWorkStatus === "CHUALAM"? "1":
                             res.stdWorkStatus === "NGHIHUU"? "2":" ",
            });
            setModalShow(true);
          })
      } else {//add
          formik.resetForm();
          setModalShow(true);
      }
    }

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (studentId === 0) {//add
            studentService.add(data).then((res) => {
                // loadData();
                // handleModalClose();
                if (res.errorCode !== 0) {
                  // Thông báo kết quả 
                  Alert('success', 'Đã tạo thành công')   
                  loadData();
                  console.log(res);
                } else {
                  // Alert('success', 'Không tạo được')   
                  // loadData();
                }
            })
        } else {//update
            studentService.update(studentId, data).then(res => {
                // loadData()
                // handleModalClose();
                if (res.errorCode !== 0) {
                  // Thông báo kết quả 
                  Alert('success', 'Đã chỉnh thành công')   
                  loadData();
                  console.log(res);
                } else {
                  // Alert('success', 'Chỉnh không được')   
                  // loadData();
                }
                // if(res.errorCode===0){

                // }else{

                // }
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
                studentService.delete(dataId).then((res) => {
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
                DANH SÁCH HỌC VIÊN
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
                <Modal show={modalShow} onHide={handleModalClose} backdrop="static" keyboard={false} >
                    <Modal.Header closeButton>
                    <Modal.Title><h3> Học viên mới </h3></Modal.Title>
                    </Modal.Header>
                    <form autoComplete="on" onSubmit={formik.handleSubmit} action="/" method="post" enctype="multipart/form-data">
                        <Modal.Body>
                            <Input id="txtStdCode" type="text" className="inputClass form-control" label="Mã học viên" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdCode")}
                                err={formik.touched.stdCode && formik.errors.stdCode}
                                errMessage={formik.errors.stdCode}
                            />
                          
                            <Input id="txtStdName" type="text" className="inputClass form-control" label="Họ tên" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdName")}
                                err={formik.touched.stdName && formik.errors.stdName}
                                errMessage={formik.errors.stdName}
                            />
                            {/* <div className="formGroup mb-5 row">
                              <label className="col-sm-1 col-form-label">Mã</label>
                              <div className="col-sm-4">
                                <input id="txtStdCode" type="text" className="inputClass form-control" maxLength="100"
                                frmField={formik.getFieldProps("stdCode")}
                                err={formik.touched.stdCode && formik.errors.stdCode}
                                errMessage={formik.errors.stdCode}
                                />
                              </div>
                              <label className="col-sm-2 col-form-label">Họ tên</label>
                              <div className="col-sm-5">
                                <input id="txtStdName" type="text" className="inputClass form-control" maxLength="100"
                                frmField={formik.getFieldProps("stdName")}
                                err={formik.touched.stdName && formik.errors.stdName}
                                errMessage={formik.errors.stdName}
                                />
                              </div>   
                            </div> */}
                            
                            {/* Loại */}

                            {/* <div className="form-group row">
                              <label className="col-sm-1 col-form-label"  htmlFor="selectStudentType">Loại</label>
                              <div className=" col-sm-4">
                                <select className="custom-select form-control" id="selectStudentType" name="stdType" onChange={formik.handleChange}>
                                  <option value="0" selected={formik.values.stdType ==='0'}>Đang học</option>
                                  <option value="2" selected={formik.values.stdType ==='2'}>Bảo lưu</option>
                                  <option value="1" selected={formik.values.stdType ==='1'}>Đã tốt nghiệp</option>
                                </select>
                              </div>
                              <label className="col-sm-2 col-form-label"  htmlFor="selectstdWorkStatus">Hiện</label>
                              <div className=" col-sm-5">
                                <select className="custom-select form-control" id="selectstdWorkStatus" name="stdWorkStatus" onChange={formik.handleChange}>
                                  <option value="0" selected={formik.values.stdWorkStatus ==='0'}>Đã đi làm</option>
                                  <option value="1" selected={formik.values.stdWorkStatus ==='1'}>Chưa đi làm</option>
                                  <option value="2" selected={formik.values.stdWorkStatus ==='2'}>Nghỉ hưu</option>
                                </select>
                              </div>
                            </div> */}
                            <Input id="txtstdBirthday" type="date"  className="inputClass form-control" label="Ngày sinh" labelSize="4" maxLength="100"
                                
                                frmField={formik.getFieldProps("stdBirthday")}
                                err={formik.touched.stdBirthday && formik.errors.stdBirthday}
                                errMessage={formik.errors.stdBirthday}
                            />
                            
                            {/* Giới tính */}

                            <div className="formGroup mb-3 row">
                                <label className="col-sm-4 col-form-label">Giới tính</label>
                                <div className="col-sm-8 pt-2">
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={formik.values.stdGender === '0'} 
                                     onChange={formik.handleChange}
                                     id="customRadStatus1"  
                                     value="0" className="custom-control-input"
                                     name="stdGender"
                                     />
                                    
                                    <label className="custom-control-label" htmlFor="customRadStatus1"> Nam <i class="fas fa-mars text-blue-500"></i></label>
                                  </div>

                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={formik.values.stdGender === '1'} 
                                    onChange={formik.handleChange}
                                    id="customRadStatus2"
                                    value="1" className="custom-control-input"  
                                    name="stdGender"/>
                                    
                                    <label className="custom-control-label" htmlFor="customRadStatus2"> Nữ <i class="fas fa-venus text-red-500"></i></label>
                                  </div>
                                </div>
                                
                            </div>
                        
                            
                            
                            <Input id="txtstdEmail" type="email" className="inputClass form-control" label="Email" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdEmail")}
                                err={formik.touched.stdEmail && formik.errors.stdEmail}
                                errMessage={formik.errors.stdEmail}
                            />
                            
                            <Input id="txtstdPhone" type="text" className="inputClass form-control" label="Điện thoại" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdPhone")}
                                err={formik.touched.stdPhone && formik.errors.stdPhone}
                                errMessage={formik.errors.stdPhone}
                            />
                            
                            <Input id="txtInsImg" type="file"  className="inputClass form-control" label="Hình Ảnh" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insImg")}
                                err={formik.touched.insImg && formik.errors.insImg}
                                errMessage={formik.errors.insImg}
                                
                            />
                            
                            <div className="form-group row">
                              <label className="col-sm-4 col-form-label"  htmlFor="selectstdWorkStatus">Loại</label>
                              <div className=" col-sm-8">
                                <select className="custom-select form-control" id="selectStudentType" name="stdType" onChange={formik.handleChange}>
                                  <option value="0" selected={formik.values.stdType ==='0'}>Đang học</option>
                                  <option value="2" selected={formik.values.stdType ==='2'}>Bảo lưu</option>
                                  <option value="1" selected={formik.values.stdType ==='1'}>Đã tốt nghiệp</option>
                                </select>
                              </div>
                            </div>

                            {/* <Input id="txtStdType" type="text" className="inputClass form-control" label="Loại" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdType")}
                                err={formik.touched.stdType && formik.errors.stdType}
                                errMessage={formik.errors.stdType}
                            /> */}
                            
                            {/* Tình trạng */}

                            <div className="form-group row">
                              <label className="col-sm-4 col-form-label"  htmlFor="selectstdWorkStatus">Tình trạng</label>
                              <div className=" col-sm-8">
                                <select className="custom-select form-control" id="selectstdWorkStatus" name="stdWorkStatus" onChange={formik.handleChange}>
                                  <option value="0" selected={formik.values.stdWorkStatus ==='0'}>Đã đi làm</option>
                                  <option value="1" selected={formik.values.stdWorkStatus ==='1'}>Chưa đi làm</option>
                                  <option value="2" selected={formik.values.stdWorkStatus ==='2'}>Nghỉ hưu</option>
                                </select>
                              </div>
                            </div>
                            
                            <Input id="txtStdGPA" type="text" className="inputClass form-control" label="Điểm GPA" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdGPA")}
                                err={formik.touched.stdGPA && formik.errors.stdGPA}
                                errMessage={formik.errors.stdGPA}
                            />
                            <div class="form-group row">
                                <label for="" className="col-sm-4 col-form-label" >Công ty</label>
                                <div className="col-sm-8">

                                  <select class="form-control form-control-sm" name="stdCompany" id="">
                                      {
                                          companySelection.map((company, idx) => {
                                              return (

                                                  <option value={company.companyId}>{company.companyName}</option>
                                              )
                                          })
                                      }
                                  </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" className="col-sm-4 col-form-label">Trường Học</label>
                                <div className="col-sm-8">
                                  
                                  <select class="form-control form-control-sm" name="stdUniversity" id="">
                                      {
                                          universitySelection.map((university, idx) => {
                                              return (

                                                  <option value={university.universityId}>{university.universityName}</option>
                                              )
                                          })
                                      }
                                  </select>
                                </div>
                            </div>
                            <Input id="txtStdNote" type="text" className="inputClass form-control" label="Ghi chú" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdNote")}
                                err={formik.touched.stdNote && formik.errors.stdNote}
                                errMessage={formik.errors.stdNote}
                            />

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
                  Mã số
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Họ Tên
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Hình ảnh
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Ngày sinh
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Giới tính
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Email
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Điện thoại
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Loại
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  GPA
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
                >
                  Công ty
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Trường học
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
                  }
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
            {
              students.map((student,idx) => {
                return (
                <tr key={student.stdId}>
                  <th className="text-center " >{idx + 1}</th>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdCode}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {student.stdName}
                  </td>

                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <img 
                    src={student.stdImg}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  </th>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <Moment format="DD/MM/YYYY">
                      {student.stdBirthday}
                    </Moment>
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdGender==="Male"?
                    <p><i class="fas fa-mars text-blue-500"></i> Nam</p>:
                    <p><i class="fas fa-venus text-red-500"></i>&nbsp;Nữ</p>}
                  </td>
                  

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdEmail}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdPhone}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    { student.stdType==="DANGHOC"?<p>Đang học</p>:
                      student.stdType==="TOTNGHIEP"?<p>Đã tốt nghiệp</p>:
                      student.stdType==="BAOLUU"?<p>Bảo lưu</p>:" "}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdGPA}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    { student.stdWorkStatus==="CHUALAM"?<p>Chưa đi làm</p>:
                      student.stdWorkStatus==="DALAM"?<p>Đã đi làm</p>:
                      student.stdWorkStatus==="NGHIHUU"?<p>Nghỉ hưu</p>:" "}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.company.companyName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.university.universityName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdNote}
                  </td>
                  
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-no-wrap p-4 text-center">
                        <a href="/#" onClick={(e) => handleModalShow(e, student.stdId)}>
                          <i className="fas fa-edit text-primary px-2"></i>
                        </a>
                        <a href="/#" onClick={(e) => deleteRow(e, student.stdId)}>
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

StudentTable.defaultProps = {
  color: "light",
};

StudentTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
