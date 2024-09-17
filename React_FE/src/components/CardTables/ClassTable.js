import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import classService from './../../assets/services/classService';
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";

import subjectService from './../../assets/services/subjectService';
//Toast
import Alert from './../../utils/toaster'
import 'react-toastify/dist/ReactToastify.css';

// Confirmation
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Input from './../../assets/services/input';
export default function ClassTable({ color }) {
  const [classes, setClasses] = useState([]);

  const [classId, setClassId] = useState(0);
  const [subjectSelection,setSubjectSelection] = useState([]);
  
      /* ************************* */
  const loadDataSubject = ()=>{
    subjectService.getAll().then(res=>{
      setSubjectSelection(res);
    })
  }

  const loadData = () => {
        classService.getAll().then(res => {
            setClasses(res);
        })
    }
    //B9 Remove Thay componentDidMount thành useEffect mngu
    useEffect(() => {
        
        loadData();
        loadDataSubject();
    }, [classId]); 

    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    const handleModalShow = (e, dataId) => {
        if (e) e.preventDefault();

        setClassId(dataId);
        if (dataId > 0) {//edit
            classService.get(dataId).then(res => {
              formik.setValues(res);
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
            classCode: "",
            className: "",
            maxStudent: "",
            quantity: "",
            subject:""
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
            classCode: Yup.string().required("Required").min(2, "Từ 2 kí tự trở lên"),
        }),
        onSubmit: (values) => {
            // console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (classId === 0) {//add
            classService.add(data).then((res) => {
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
            classService.update(classId, data).then(res => {
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
                classService.delete(dataId).then((res) => {
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
                DANH SÁCH LỚP HỌC
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
                    <Input id="txtClassCode" type="text" className="inputClass form-control" label="Mã" labelSize="4" maxLength="100"
                      frmField={formik.getFieldProps("classCode")}
                      err={formik.touched.classCode && formik.errors.classCode}
                      errMessage={formik.errors.classCode}
                    />
                    <Input id="txtClassName" type="text" className="inputClass form-control" label="Lớp" labelSize="4" maxLength="100"
                      frmField={formik.getFieldProps("className")}
                      err={formik.touched.className && formik.errors.className}
                      errMessage={formik.errors.className}
                    />
                    <Input id="txtMaxStudent" type="text" className="inputClass form-control" label="Tối đa" labelSize="4" maxLength="100"
                      frmField={formik.getFieldProps("maxStudent")}
                      err={formik.touched.maxStudent && formik.errors.maxStudent}
                      errMessage={formik.errors.maxStudent}
                    />
                    <Input id="txtQuantity" type="text" className="inputClass form-control" label="Tỉ số" labelSize="4" maxLength="100"
                      frmField={formik.getFieldProps("quantity")}
                      err={formik.touched.quantity && formik.errors.quantity}
                      errMessage={formik.errors.quantity}
                    />

                    <div class="form-group row">
                      <label for="" className="col-sm-4 col-form-label" >Môn học</label>
                      <div className="col-sm-8">

                        <select class="form-control form-control-sm" name="subject" id="">
                            {
                              subjectSelection.map((Subject, idx) => {
                                return (
                                  <option value={Subject.subID}>{Subject.subName}</option>
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
                  Mã
                </th>
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Lớp
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Tối đa
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Tỉ số
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Môn học
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
              classes.map((Class, idx) => {
                return (
                <tr key={Class.classId}>
                  <th className="text-center " >{idx + 1}</th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <span>
                    {Class.classCode}
                  </span>
                  {/* {idx + 1} */}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {Class.className}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {Class.maxStudent}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {Class.quantity}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {Class.subject.subName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-no-wrap p-4 text-center">
                    <a href="/#" onClick={(e) => handleModalShow(e, Class.classId)}>
                      <i className="fas fa-edit text-primary px-2"></i>
                    </a>
                    <a href="/#" onClick={(e) => deleteRow(e, Class.classId)}>
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

ClassTable.defaultProps = {
  color: "light",
};

ClassTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
