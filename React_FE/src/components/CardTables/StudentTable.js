import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import studentService from './../../assets/services/studentService';
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";
// import Input from './../controls/input';

import Input from './../../assets/services/input';
export default function StudentTable({ color }) {
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState(0);

  
    /* ************************* */
    const loadData = () => {
      studentService.getAll().then(res => {
          setStudents(res);
      })
  }
  //B9 Remove Thay componentDidMount thành useEffect mngu
  useEffect(() => {
      
      loadData();
     
  }, [studentId]); //[] Bắt buộc phải có nếu không nó sẽ load lại nhiều lần
  //Set instructors vào để khi thay đổi update or delete thì nó sẽ set lại giá trị của instructors để nó gọi function loadData()


    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    const handleModalShow = (e, dataId) => {
        if (e) e.preventDefault();

        setStudentId(dataId);
        if (dataId > 0) {//edit
            studentService.get(dataId).then(res => {
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
            stdCode: "",
            stdName: "",
            stdGender: "",
            stdBirthday: "",
            stdEmail: "",
            stdPhone: "",
            stdImg: "",
            stdType: "",
            stdGPA: "",
            stdWorkStatus: "",
            stdNote: ""
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
            stdCode: Yup.string().required("Required").min(4, "Must be 4 characters or more"),
            stdName: Yup.string().required("Required"),
            stdEmail: Yup.string().email(),
        }),
        onSubmit: (values) => {
            // console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (studentId === 0) {//add
            studentService.add(data).then((res) => {
                loadData();
                handleModalClose();
            })
        } else {//update
            studentService.update(studentId, data).then(res => {
                loadData()
                handleModalClose();
                // if(res.errorCode===0){

                // }else{

                // }
            })
        }
    }


    //Delete 1 dòng dữ liệu
    const deleteRow = (e, dataId) => {
        e.preventDefault();
        studentService.delete(dataId).then(res => {
        loadData();
        console.log(res);
            // if (res.errorCode === 0) {

            // } else {

            // }
        });
        console.log(dataId);
    }
  
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
                <Modal show={modalShow} onHide={handleModalClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title> Học viên mới </Modal.Title>
                    </Modal.Header>
                    <form autoComplete="on" onSubmit={formik.handleSubmit}>
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
                            
                            <Input id="txtStdGender" type="text" name="stdGender"  label="Giới tính"   className="inputClass form-control" 
                                  frmField={formik.getFieldProps("stdGender")}
                                  err={formik.touched.stdGender && formik.errors.stdGender}
                                  errMessage={formik.errors.stdGender}
                                  />
                        
                            <Input id="txtstdBirthday" type="date" className="inputClass form-control" label="Ngày sinh" labelSize="4" maxLength="100"
                                
                                data-format="DD-MM-YYYY"
                                
                                frmField={formik.getFieldProps("stdBirthday")}
                                err={formik.touched.stdBirthday && formik.errors.stdBirthday}
                                errMessage={formik.errors.stdBirthday}
                            />
                            
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
                            
                            <Input id="txtstdImg" type="text" className="inputClass form-control" label="Ảnh" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdImg")}
                                err={formik.touched.stdImg && formik.errors.stdImg}
                                errMessage={formik.errors.stdImg}
                            />
                            
                            <Input id="txtStdType" type="text" className="inputClass form-control" label="Loại" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdType")}
                                err={formik.touched.stdType && formik.errors.stdType}
                                errMessage={formik.errors.stdType}
                            />

                            <Input id="txtStdGPA" type="text" className="inputClass form-control" label="Điểm GPA" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdGPA")}
                                err={formik.touched.stdGPA && formik.errors.stdGPA}
                                errMessage={formik.errors.stdGPA}
                            />
                            
                            <Input id="txtStdStatus" type="text" className="inputClass form-control" label="Tình trạng đi làm" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("stdWorkStatus")}
                                err={formik.touched.stdWorkStatus && formik.errors.stdWorkStatus}
                                errMessage={formik.errors.stdWorkStatus}
                            />
                            
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
                  Ghi chú
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
                  {student.stdBirthday}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdGender}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdEmail}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdPhone}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdType}
              
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdGPA}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdWorkStatus}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {student.stdNote}
                  </td>
                  
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                    <a href="/#" onClick={(e) => handleModalShow(e, student.stdId)}>
                      <i className="fas fa-edit text-primary"></i>
                    </a>
                    <a href="/#" onClick={(e) => deleteRow(e, student.stdId)}>
                      <i className="fas fa-trash-alt text-danger"></i>
                    </a>
                    {/* <TableDropdown /> */}
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
