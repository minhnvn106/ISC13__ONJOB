import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";

import Input from './../../assets/services/input';

import subjectService from './../../assets/services/subjectService';
export default function SubjectTable({ color }){
    const[subjects,setSubjects] = useState([]);
    const[subjectId,setSubjectId] = useState(0);

    const loadData = ()=>{
        subjectService.getAll().then(res=>{
            setSubjects(res);
        })
    }
    useEffect(()=>{
        loadData();
    },[subjectId]);

    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    const handleModalShow = (e, dataId) => {
        if (e) e.preventDefault();

        setSubjectId(dataId);
        if (dataId > 0) {//edit
            subjectService.get(dataId).then(res => {
                formik.setValues(res);
                setModalShow(true);
            })
        } else {//add
            formik.resetForm();
            setModalShow(true);
        }
    }
    // Phần III: Formik và Function Xử lý handleFormSubmit 
    const formik = useFormik({
        initialValues: {
            subCode: "",
            subName: "",
            subCredit: "",
            subPassScore: "",
            subStatus: "",
           
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
            subCode: Yup.string().required("Required").min(4, "Must be 4 characters or more"),
            subName: Yup.string().required("Required")
            
        }),
        onSubmit: (values) => {
            // console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (subjectId === 0) {//add
            subjectService.add(data).then((res) => {
                loadData();
                handleModalClose();
            })
        } else {//update
            subjectService.update(subjectId, data).then(res => {
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
        subjectService.delete(dataId).then(res => {
        loadData();
        console.log(res);
            // if (res.errorCode === 0) {

            // } else {

            // }
        });
        console.log(dataId);
    }
    return(
        <Fragment>
            {/* Colors */}
            <div
                className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
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
                        DANH SÁCH MÔN HỌC
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

                    {/* Start Modal */}
                    <Modal show={modalShow} onHide={handleModalClose} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Môn học mới</Modal.Title>
                            </Modal.Header>
                            <form autoComplete="on" onSubmit={formik.handleSubmit}>
                                <Modal.Body>        
                                    <Input id="txtSubCode" type="text" className="inputClass form-control" label="Mã phòng" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("subCode")}
                                        err={formik.touched.subCode && formik.errors.subCode}
                                        errMessage={formik.errors.subCode}
                                    />
                                    <Input id="txtSubName" type="text" className="inputClass form-control" label="Tên phòng" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("subName")}
                                        err={formik.touched.subName && formik.errors.subName}
                                        errMessage={formik.errors.subName}
                                    />
                                    <Input id="txtSubCredit" type="text" className="inputClass form-control" label="Số tín chỉ" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("subCredit")}
                                        err={formik.touched.subCredit && formik.errors.subCredit}
                                        errMessage={formik.errors.subCredit}
                                    />
                                    <Input id="txtSubPassScore" type="text" className="inputClass form-control" label="Điểm qua môn" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("subPassScore")}
                                        err={formik.touched.subPassScore && formik.errors.subPassScore}
                                        errMessage={formik.errors.subPassScore}
                                    />
                                    <Input id="txtSubStatus" type="text" className="inputClass form-control" label="Tình trạng" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("subStatus")}
                                        err={formik.touched.subStatus && formik.errors.subStatus}
                                        errMessage={formik.errors.subStatus}
                                    />
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleModalClose}>
                                        Close
                                    </Button>
                                    {/*  */}
                                    <Button variant="primary" type="submit" onClick={handleModalClose} disabled={(!formik.isValid && formik.dirty)}>
                                        Save Changes
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
                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Mã môn
                        </th>

                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Tên môn học
                        </th>
                        
                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Số tín chỉ
                        </th>
                        
                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Điểm qua môn
                        </th>
                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Trạng Thái
                        </th>

                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Active
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Render table */}
                    {
                        subjects.map((subject,idx)=>{
                        return(
                            <tr key={subject.subID}>
                            <th className="text-center " >{idx + 1}</th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {subject.subCode}</td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {subject.subName}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {subject.subCredit}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {subject.subPassScore}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {subject.subStatus}
                            </td>
                            <td className="border-t-0 px-6 align-middle text-center border-l-0 border-r-0 whitespace-no-wrap p-4">
                            <a href="/#" onClick={(e) => handleModalShow(e, subject.subID)}>
                            <i className="fas fa-edit text-primary mr-4"></i>
                            </a>
                            <a href="/#" onClick={(e) => deleteRow(e, subject.subID)}>
                            <i className="fas fa-trash-alt text-danger"></i>
                            </a>
                            </td>
                            </tr>
                        )
                        })
                    }
                    
                    </tbody>
                </table>
                
                </div>

            </div>
        </Fragment>
    );


}

SubjectTable.defaultProps = {
    color: "light",
};
  
SubjectTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
  