import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";

import Input from './../../assets/services/input';

import universityService from './../../assets/services/universityService';
export default function UniversityTable({ color }){
    const[universities,setUniversities] = useState([]);
    const[universityId,setUniversityId] = useState(0);

    const loadData = ()=>{
        universityService.getAll().then(res=>{
            setUniversities(res);
        })
    }
    useEffect(()=>{
        loadData();
    },[universityId]);

    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    const handleModalShow = (e, dataId) => {
        if (e) e.preventDefault();

        setUniversityId(dataId);
        if (dataId > 0) {//edit
            universityService.get(dataId).then(res => {
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
            universityName: "",
            universityAddress: "",
            universityContactPerson: "",
            universityPhone: "",
            universityUrl: "",
           
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
            universityName: Yup.string().required("Required").min(4, "Must be 4 characters or more"),
            
            
        }),
        onSubmit: (values) => {
            // console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (universityId === 0) {//add
            universityService.add(data).then((res) => {
                loadData();
                handleModalClose();
            })
        } else {//update
            universityService.update(universityId, data).then(res => {
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
        universityService.delete(dataId).then(res => {
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
                        DANH SÁCH TRƯỜNG HỌC
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
                                <Modal.Title>Đại học mới</Modal.Title>
                            </Modal.Header>
                            <form autoComplete="on" onSubmit={formik.handleSubmit}>
                                <Modal.Body>        
                                    <Input id="txtUniversityName" type="text" className="inputClass form-control" label="Tên Trường" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("universityName")}
                                        err={formik.touched.universityName && formik.errors.universityName}
                                        errMessage={formik.errors.universityName}
                                    />
                                    <Input id="txtUniversityAddress" type="text" className="inputClass form-control" label="Địa Chỉ" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("universityAddress")}
                                        err={formik.touched.universityAddress && formik.errors.universityAddress}
                                        errMessage={formik.errors.universityAddress}
                                    />
                                    <Input id="txtUniversityContactPerson" type="text" className="inputClass form-control" label="Người Liên Hệ" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("universityContactPerson")}
                                        err={formik.touched.universityContactPerson && formik.errors.universityContactPerson}
                                        errMessage={formik.errors.universityContactPerson}
                                    />
                                    <Input id="txtUniversityPhone" type="text" className="inputClass form-control" label="SĐT Trường" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("universityPhone")}
                                        err={formik.touched.universityPhone && formik.errors.universityPhone}
                                        errMessage={formik.errors.universityPhone}
                                    />
                                    <Input id="txtUniversityUrl" type="text" className="inputClass form-control" label="Trang Web" labelSize="4" maxLength="100"
                                        frmField={formik.getFieldProps("universityUrl")}
                                        err={formik.touched.universityUrl && formik.errors.universityUrl}
                                        errMessage={formik.errors.universityUrl}
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
                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Tên Trường
                        </th>

                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Địa Chỉ
                        </th>
                        
                        
                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Tên Người Liên Hệ
                        </th>
                        
                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Số Điện Thoại
                        </th>
                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        URL
                        </th>

                        <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                        Active
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Render table */}
                    {
                        universities.map((university,idx)=>{
                        return(
                            <tr key={university.universityId}>
                            <th className="text-center " >{idx + 1}</th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                            {university.universityName}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {university.universityAddress}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {university.universityContactPerson}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {university.universityPhone}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                                {university.universityUrl}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <a href="/#" onClick={(e) => handleModalShow(e, university.universityId)}>
                            <i className="fas fa-edit text-primary"></i>
                            </a>
                            <a href="/#" onClick={(e) => deleteRow(e, university.universityId)}>
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

UniversityTable.defaultProps = {
    color: "light",
};
  
UniversityTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
  