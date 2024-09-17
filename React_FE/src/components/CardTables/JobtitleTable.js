import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'react-bootstrap';
import jobtitleService from './../../assets/services/jobtitleService';

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

export default function JobtitleTable({ color }) {
  // state = { }
  const[jobtitles,setJobtitles] = useState([]);
  const[jobtitleId,setJobtitleId] = useState(0);
  
  const loadData = ()=>{
    jobtitleService.getAll().then(res=>{
      setJobtitles(res);
    })
  }

  useEffect(()=>{
    loadData();
  },[jobtitleId]);

  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    
    /* ************************* */
    // Phần III: Formik và Function Xử lý handleFormSubmit 
    const formik = useFormik({
        initialValues: {
            jtName: "",
            jtStatus: "0",           
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
          jtName: Yup.string().required("Phải nhập"),
          jtStatus: Yup.string().required("Phải nhập")           
        }),
        onSubmit: (values) => {
            console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });
    
    const handleModalShow = (e, dataId) => {
      if (e) e.preventDefault();

      setJobtitleId(dataId);
      if (dataId > 0) {//edit
          jobtitleService.get(dataId).then(res => {
            console.log(res)
              formik.setValues({
                ...res,
                jtStatus: res.jtStatus === "KHONGCHINHTHUC"? "0" : "1",
              });
              setModalShow(true);
              console.log(res);
          })
      } else {//add
          formik.resetForm();
          setModalShow(true);
      }
    }

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {
        console.log(data)
        if (jobtitleId === 0) {//add
            jobtitleService.add(data).then((res) => {
                // loadData();
                // handleModalClose();
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
            jobtitleService.update(jobtitleId, data).then(res => {
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

    // Hiện CONFIRM khi Delete 1 dòng dữ liệu
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
                jobtitleService.delete(dataId).then((res) => {
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
                DANH SÁCH NGÀNH
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
                        <Modal.Title><h3>NGÀNH NGHỀ</h3></Modal.Title>
                    </Modal.Header>
                    <form autoComplete="on" onSubmit={formik.handleSubmit}>
                        <Modal.Body>        
                            <Input id="txtJobtitleName" type="text" className="inputClass form-control" label="Nghề nghiệp" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("jtName")}
                                err={formik.touched.jtName && formik.errors.jtName}
                                errMessage={formik.errors.jtName}
                            />

                            {/* Tình trạng */}

                            <div className="formGroup row">
                                <label className="col-sm-4 col-form-label">Tình trạng</label>
                                <div className="col-sm-8">
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={formik.values.jtStatus === '1'} 
                                     onChange={formik.handleChange}
                                     id="customRadStatus1"  
                                     value="1" className="custom-control-input"
                                     name="jtStatus"
                                     />                                    
                                    <label className="custom-control-label" htmlFor="customRadStatus1">Chính thức</label>
                                  </div>

                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={formik.values.jtStatus === '0'} 
                                    onChange={formik.handleChange}
                                    id="customRadStatus2"
                                    value="0" className="custom-control-input"  
                                    name="jtStatus"/>
                                    
                                    <label className="custom-control-label" htmlFor="customRadStatus2">Không chính thức</label>
                                  </div>
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
                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  STT
                </th>

                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Nghề nghiệp
                </th>
                
                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Tình trạng
                </th>

                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render table */}
              {
                jobtitles.map((jobtitle,idx)=>{
                  return(
                    <tr key={jobtitle.jtId}>
                      <th className="text-center align-middle text-xs whitespace-no-wrap p-4" >{idx + 1}</th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {jobtitle.jtName}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {jobtitle.jtStatus==="KHONGCHINHTHUC"?
                      <p><i className="fas fa-circle text-orange-500 mr-2"></i>Nhân viên không chính thức</p>:
                      <p><i className="fas fa-circle text-green-500 mr-2"></i>Nhân viên chính thức</p>}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-no-wrap p-4 text-center">
                        <a href="/#" onClick={(e) => handleModalShow(e, jobtitle.jtId)}>
                          <i className="fas fa-edit text-primary px-2"></i>
                        </a>
                        <a href="/#" onClick={(e) => deleteRow(e, jobtitle.jtId)}>
                          <i className="fas fa-trash-alt text-danger px-2"></i>
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

JobtitleTable.defaultProps = {
  color: "light",
};

JobtitleTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
