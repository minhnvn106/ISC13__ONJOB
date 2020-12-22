import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import companyService from './../../assets/services/companyService';
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";

import Input from './../../assets/services/input';
export default function CompanyTable({ color }) {
  const [companies, setCompanies] = useState([]);

  const [companyId, setCompanyId] = useState(0);

    /* ************************* */
  const loadData = () => {
    companyService.getAll().then(res => {
    setCompanies(res);
    })
    }
    //B9 Remove Thay componentDidMount thành useEffect mngu
    useEffect(() => {        
        loadData();
    }, [companyId]); 

  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false); 

    //Hàm xử lý để biết xem là thêm mới hay update
    const handleModalShow = (e, dataId) => {
        if (e) e.preventDefault();

        setCompanyId(dataId);
        if (dataId > 0) {//edit
            companyService.get(dataId).then(res => {
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
        companyName: "",
        companyAddress: "",
        companyContactPerson:"",
        companyPhone:"",
        companyUrl:"",
        companyStatus:"",
    },
    validationSchema: Yup.object({
        companyName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
        // console.log(values);
        //Tách ra một hàm riêng để xử lý form
        handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (companyId === 0) {//add
            companyService.add(data).then((res) => {
                loadData();
                handleModalClose();
            })
        } else {//update
            companyService.update(companyId, data).then(res => {
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
        companyService.delete(dataId).then(res => {
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
             DANH SÁCH CÔNG TY
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
                <Modal.Title>
                Công ty mới 
                </Modal.Title>
            </Modal.Header>
            <form autoComplete="on" onSubmit={formik.handleSubmit}>
                <Modal.Body>        
                
                <Input id="txtcompanyName" type="text" className="inputClass form-control" label="Công ty" labelSize="4" maxLength="100"
                frmField={formik.getFieldProps("companyName")}
                err={formik.touched.companyName && formik.errors.companyName}
                errMessage={formik.errors.companyName}
                />

                <Input id="txtcompanyAddress" type="text" className="inputClass form-control" label="Địa chỉ" labelSize="4" maxLength="100"
                frmField={formik.getFieldProps("companyAddress")}
                err={formik.touched.companyAddress && formik.errors.companyAddress}
                errMessage={formik.errors.companyAddress}
                />
                
                <Input id="txtcompanyContactPerson" type="text" className="inputClass form-control" label="Người liên hệ" labelSize="4" maxLength="100"
                frmField={formik.getFieldProps("companyContactPerson")}
                err={formik.touched.companyContactPerson && formik.errors.companyContactPerson}
                errMessage={formik.errors.companyContactPerson}
                />

                <Input id="txtcompanyPhone" type="text" className="inputClass form-control" label="Điện thoại" labelSize="4" maxLength="100"
                frmField={formik.getFieldProps("companyPhone")}
                err={formik.touched.companyPhone && formik.errors.companyPhone}
                errMessage={formik.errors.companyPhone}
                />

                <Input id="txtcompanyUrl" type="text" className="inputClass form-control" label="Trang Web" labelSize="4" maxLength="100"
                frmField={formik.getFieldProps("companyUrl")}
                err={formik.touched.companyUrl && formik.errors.companyUrl}
                errMessage={formik.errors.companyUrl}
                />

                <Input id="txtcompanyStatus" type="text" className="inputClass form-control" label="Tình trạng" labelSize="4" maxLength="100"
                frmField={formik.getFieldProps("companyStatus")}
                err={formik.touched.companyStatus && formik.errors.companyStatus}
                errMessage={formik.errors.companyStatus}
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
                  Địa chỉ
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-blue-800 text-blue-300 border-blue-700")
                  }
                >
                  Người liên hệ
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
                  Website
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
                  }>
                </th>
              </tr>
            </thead>
            <tbody>
            {
              companies.map((company, idx) => {
                return (
                <tr key={company.companyId}>
                  <th className="text-center " >{idx + 1}</th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                  <span>
                    {company.companyName}
                  </span>
                  
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {company.companyAddress}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {company.companyContactPerson}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {company.companyPhone}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {company.companyUrl}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {company.companyStatus}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                    <a href="/#" onClick={(e) => handleModalShow(e, company.companyId)}>
                      <i className="fas fa-edit text-primary"></i>
                    </a>
                    <a href="/#" onClick={(e) => deleteRow(e, company.companyId)}>
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

CompanyTable.defaultProps = {
  color: "light",
};

CompanyTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
