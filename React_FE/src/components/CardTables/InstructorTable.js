import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import instructorService from './../../assets/services/instructorService';
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";
import Input from '../../assets/services/input';
import Moment from 'react-moment';
import moment from 'moment' 

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

        //Nó sẽ nhận giá trị từ button(e, instructor.insId) update or thêm mới(null,0)
        setInstructorId(dataId);

        if (dataId > 0) {//edit 
            instructorService.get(dataId).then(res => {
                formik.setValues({
                  ...res, 
                  // insCode:res.insCode,
                  // insName:res.insName,
                  insGender : res.insGender.toString(),
                  // insBirthday : res.insBirthday,
                  // insEmail : res.insEmail,
                  // insPhone : res.insPhone,
                  // insImg : res.insImg,
                  // insCertification : res.insCertification,
                  insWorkStatus:res.insWorkStatus.toString(),
                  // insNote:res.insNote,
                });
                setModalShow(true);
            })
        } else {//add
            formik.resetForm();
            setModalShow(true);
        }
    }

    
    // const genderOnChange=(param)=>{
      
    //   formik.setFieldValue('insGender',param);
    // }

    /* ************************* */
    // Phần III: Formik và Function Xử lý handleFormSubmit 
    const formik = useFormik({
      //  initialValues là đối tượng khai báo giá trị mặc định
      // Tên thuôc tính đươc khai báo trong initialValue trùng với tên của <input />
      initialValues: {
            insCode: "",
            insName: "",
            insGender: "1",
            insBirthday: "",
            insEmail: "",
            insPhone: "",
            insImg: "",
            insCertification: "",
            insWorkStatus: "",
            insNote: ""
            //Nếu có thêm nhiều trường khác
        },
        //validationSchema này là một function của Yup
        validationSchema: Yup.object({
            insCode: Yup.string().required("Mã giảng viên bắt buộc phải nhập").min(4, "Mã giảng viên phải ít nhất 4 ký tự").max(10, "Mã giảng viên tối đa 10 ký tự"),
            insName: Yup.string().required("Tên giảng viên bắt buộc phải nhập"),
            insGender:Yup.number().required()

        }),
        onSubmit: (values) => {
            console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {
        console.log(data)
        if (instructorId === 0) {//add
            instructorService.add(data).then((res) => {
              loadData();
              handleModalClose();
              // alert("Thêm Dữ Liệu Thành Công");
              
            })
        } else {//update
            instructorService.update(instructorId, data).then(res => {
                loadData()
                handleModalClose();
                // alert("Cập Nhật Dữ Liệu Thành Công");
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
          alert("Delete Thành Công!");
          // console.log(res);
            // if (res.errorCode === 0) {

            // } else {

            // }
        });
        // console.log(dataId);
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
                  Thêm
                </button>
                
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

                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
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
                    <Moment format="DD/MM/YYYY">
                      {instructor.insBirthday}
                    </Moment>
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {instructor.insGender===1?"Nam":"Nữ"}
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
                        {instructor.insWorkStatus===0?"Chưa Làm":
                        instructor.insWorkStatus===1?"Đã Làm":
                        instructor.insWorkStatus===2?"Nghỉ Hưu":" "}
                    </td>
                    
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {instructor.insNote}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-no-wrap p-4 text-center">
                      <a href="/#" onClick={(e) => handleModalShow(e, instructor.insId)}>
                        <i className="fas fa-edit text-primary mr-4 "></i>
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
                   
        </div>
      </div>

      {/* Start Modal */}
      <Modal show={modalShow} onHide={handleModalClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Giảng Viên</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="on" onSubmit={formik.handleSubmit}  enctype="multipart/form-data">
                        <Modal.Body>
                                  
                            <Input id="txtInsCode" type="text" className="inputClass form-control" label="Mã giảng viên" span=" (*)" required labelSize="4" maxLength="100"
                                value={formik.values.insCode}
                                frmField={formik.getFieldProps("insCode")}
                                err={formik.touched.insCode && formik.errors.insCode}
                                errMessage={formik.errors.insCode}
                            />
                            <Input id="txtInsName" type="text" className="inputClass form-control" label="Tên giảng viên" span=" (*)" required labelSize="4" maxLength="100"
                                value={formik.values.insName}
                                frmField={formik.getFieldProps("insName")}
                                err={formik.touched.insName && formik.errors.insName}
                                errMessage={formik.errors.insName}
                            />
                            
                            {/* Gender */}
                            
                            <div className="formGroup row">
                                <label className="col-sm-4 col-form-label">Giới Tính</label>
                                <div className="col-sm-8">
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={formik.values.insGender === '1'} 
                                     onChange={formik.handleChange}
                                     id="customRadioInline1"  
                                     value="1" className="custom-control-input"
                                     name="insGender"
                                />
                                    
                                    <label className="custom-control-label" htmlFor="customRadioInline1">Nam</label>
                                  </div>

                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={formik.values.insGender === '0'} 
                                    onChange={formik.handleChange}
                                    id="customRadioInline2"
                                    value="0" className="custom-control-input"  
                                    name="insGender"/>
                                    
                                    <label className="custom-control-label" htmlFor="customRadioInline2">Nữ</label>
                                  </div>
                                </div>
                                
                            </div>
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
                            
                            <Input id="txtInsPhone" type="text" className="inputClass form-control" label="Số điện thoại" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insPhone")}
                                err={formik.touched.insPhone && formik.errors.insPhone}
                                errMessage={formik.errors.insPhone}
                            />
                            
                            <Input id="txtInsImg" type="file" className="inputClass form-control" label="Hình Ảnh" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insImg")}
                                err={formik.touched.insImg && formik.errors.insImg}
                                errMessage={formik.errors.insImg}
                                
                            />
                            
                            <Input id="txtInsCertification" type="text" className="inputClass form-control" label="Chứng Chỉ" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insCertification")}
                                err={formik.touched.insCertification && formik.errors.insCertification}
                                errMessage={formik.errors.insCertification}
                            />
                            {/* Start Work Status */}
                            {/* <Input id="txtInsWorkStatus" type="text" className="inputClass form-control" label="Tình trạng làm việc" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insWorkStatus")}
                                err={formik.touched.insWorkStatus && formik.errors.insWorkStatus}
                                errMessage={formik.errors.insWorkStatus}
                            /> */}
                            <div className="form-group row">
                              <label className="col-sm-4 col-form-label"  htmlFor="selectWorkStatus">Tình Trạng Làm Việc</label>
                              <div className=" col-sm-8">
                                <select className="custom-select form-control" id="selectWorkStatus" name="insWorkStatus" onChange={formik.handleChange}>
                                  <option value="0" selected={formik.values.insWorkStatus==='0'}>Chưa Làm</option>
                                  <option value="1"selected={formik.values.insWorkStatus==='1'}>Đã Làm</option>
                                  <option value="2"selected={formik.values.insWorkStatus==='2'}>Nghỉ Hưu</option>
                                </select>
                              </div>
                            </div>
                            {/* End Work Status */}
                            <Input id="txtInsNote" type="text" className="inputClass form-control" label="Ghi Chú" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("insNote")}
                                err={formik.touched.insNote && formik.errors.insNote}
                                errMessage={formik.errors.insNote}
                            />

                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose}>
                                Close
                            </Button>
                            {/* disabled={(!formik.isValid && formik.dirty)} */}
                            <Button variant="primary" type="submit" onClick={handleModalClose} >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
      {/* End Modal */}
      
    </Fragment>
  );
}

InstructorTable.defaultProps = {
  color: "light",
};

InstructorTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
