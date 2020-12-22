import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import instructorService from './../../assets/services/instructorService';
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";
// import Input from './../controls/input';

import Input from './../../assets/services/input';
export default function InstructorTable({ color }) {
  const [instructors, setInstructors] = useState([]);

  const [instructorId, setInstructorId] = useState(0);

    /* ************************* */
  const loadData = () => {
        instructorService.getAll().then(res => {
            setInstructors(res);
        })
    }
    //B9 Remove Thay componentDidMount thành useEffect mngu
    useEffect(() => {
        
        loadData();
       
    }, [instructorId]); //[] Bắt buộc phải có nếu không nó sẽ load lại nhiều lần
    //Set instructors vào để khi thay đổi update or delete thì nó sẽ set lại giá trị của instructors để nó gọi function loadData()


    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    const handleModalShow = (e, dataId) => {
        if (e) e.preventDefault();

        setInstructorId(dataId);
        if (dataId > 0) {//edit
            instructorService.get(dataId).then(res => {
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
            insCode: "",
            insName: "",
            insGender: "",
            insBirthday: "",
            insEmail: "",
            insPhone: "",
            insImg: "",
            insCertification: "",
            insWorkStatus: "",
            insNote: ""
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
            insCode: Yup.string().required("Required").min(4, "Must be 4 characters or more"),
            insName: Yup.string().required("Required"),
            insEmail: Yup.string().email(),
        }),
        onSubmit: (values) => {
            // console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (instructorId === 0) {//add
            instructorService.add(data).then((res) => {
                loadData();
                handleModalClose();
            })
        } else {//update
            instructorService.update(instructorId, data).then(res => {
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
        instructorService.delete(dataId).then(res => {
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
                DANH SÁCH GIẢNG VIÊN
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
                        <Modal.Title>Giảng viên mới</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="on" onSubmit={formik.handleSubmit}>
                        <Modal.Body>        
                            <Input id="txtInsCode" type="text" className="inputClass form-control" label="Mã Giảng viên" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insCode")}
                                err={formik.touched.insCode && formik.errors.insCode}
                                errMessage={formik.errors.insCode}
                            />
                            <Input id="txtInsName" type="text" className="inputClass form-control" label="Tên" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insName")}
                                err={formik.touched.insName && formik.errors.insName}
                                errMessage={formik.errors.insName}
                            />
                            
                            {/* Gender */}
                            <Input id="txtInsGender" type="text" className="inputClass form-control" label="Giới tính" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insGender")}
                                err={formik.touched.insGender && formik.errors.insGender}
                                errMessage={formik.errors.insGender}
                            />
                            {/* End Gender */}
                            
                            <Input id="txtInsBirthday" type="date" className="inputClass form-control" label="Ngày sinh" labelSize="4" maxLength="100"
                    
                                frmField={formik.getFieldProps("insBirthday")}
                                err={formik.touched.insBirthday && formik.errors.insBirthday}
                                errMessage={formik.errors.insBirthday}
                            />
                            
                            <Input id="txtInsEmail" type="email" className="inputClass form-control" label="Email" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insEmail")}
                                err={formik.touched.insEmail && formik.errors.insEmail}
                                errMessage={formik.errors.insEmail}
                            />
                            
                            <Input id="txtInsPhone" type="text" className="inputClass form-control" label="Điện thoại" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insPhone")}
                                err={formik.touched.insPhone && formik.errors.insPhone}
                                errMessage={formik.errors.insPhone}
                            />
                            
                            <Input id="txtInsImg" type="text" className="inputClass form-control" label="Ảnh" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insImg")}
                                err={formik.touched.insImg && formik.errors.insImg}
                                errMessage={formik.errors.insImg}
                            />
                            
                            <Input id="txtInsCertification" type="text" className="inputClass form-control" label="Bằng cấp" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insCertification")}
                                err={formik.touched.insCertification && formik.errors.insCertification}
                                errMessage={formik.errors.insCertification}
                            />
                            
                            <Input id="txtInsWorkStatus" type="text" className="inputClass form-control" label="Tình trạng làm" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insWorkStatus")}
                                err={formik.touched.insWorkStatus && formik.errors.insWorkStatus}
                                errMessage={formik.errors.insWorkStatus}
                            />
                            
                            <Input id="txtInsNote" type="text" className="inputClass form-control" label="Note" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insNote")}
                                err={formik.touched.insNote && formik.errors.insNote}
                                errMessage={formik.errors.insNote}
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
                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  STT
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Mã số 
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Họ Tên
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Hình Ảnh
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Ngày sinh
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Giới tính
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Email
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Điện thoại
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Chứng chỉ
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Tình trạng
                </th>
                
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Ghi chú
                </th>                

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
            {
              instructors.map((instructor, idx) => {
                return (
                <tr key={instructor.insId}>
                  <th className="text-center " >{idx + 1}</th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insCode}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insName}
                  </td>

                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <img 
                    src={instructor.insImg}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img></th>
                    
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insBirthday}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insGender}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insEmail}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insPhone}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insCertification}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insWorkStatus}
                    </td>
                    
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insNote}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                      <a href="/#" onClick={(e) => handleModalShow(e, instructor.insId)}>
                        <i className="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#" onClick={(e) => deleteRow(e, instructor.insId)}>
                        <i className="fas fa-trash-alt text-danger"></i>
                      </a>
                      {/* <TableDropdown /> */}
                    </td>
                  </tr>
                  )
              })}             
          </tbody>
        </table>
          {/* <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  STT
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Họ Tên
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Mã số
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Ngày sinh
                </th>
                
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Email
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Điện thoại
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Chứng chỉ
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Tình trạng
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Giới tính
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Ghi chú
                </th>                

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
            {
              instructors.map((instructor, idx) => {
                return (
                <tr key={instructor.insId}>
                  <th className="text-center " >{idx + 1}</th>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <img 
                    src={instructor.insImg}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                  <span>
                    {instructor.insName}
                  </span></th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insCode}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insBirthday}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insEmail}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insPhone}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insCertification}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insWorkStatus}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insGender}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insNote}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                      <a href="/#" onClick={(e) => handleModalShow(e, instructor.insId)}>
                        <i className="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#" onClick={(e) => deleteRow(e, instructor.insId)}>
                        <i className="fas fa-trash-alt text-danger"></i>
                      </a>
                      {/* <TableDropdown /> 
                    </td>
                  </tr>
                  )
              })}             
          </tbody>
        </table>
                    */}
        </div>
      </div>
      
    </Fragment>
  );
}

InstructorTable.defaultProps = {
  color: "light",
};

InstructorTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
