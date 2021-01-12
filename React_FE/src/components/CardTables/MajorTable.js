import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import majorService from './../../assets/services/majorService';
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";

import Input from './../../assets/services/input';

//Toast
import Alert from './../../utils/toaster'
import 'react-toastify/dist/ReactToastify.css';

// Confirmation
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
export default function MajorTable({ color }) {
  const [majors, setMajors] = useState([]);

  const [majorID, setMajorId] = useState(0);

    /* ************************* */
  const loadData = () => {
        majorService.getAll().then(res => {
            setMajors(res);
        })
    }
    //B9 Remove Thay componentDidMount thành useEffect mngu
    useEffect(() => {
        
        loadData();
       
    }, [majorID]); 


    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    const handleModalShow = (e, dataId) => {
        if (e) e.preventDefault();

        setMajorId(dataId);
        if (dataId > 0) {//edit
            majorService.get(dataId).then(res => {
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
            majorCode: "",
            majorName: "",
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
            majorCode: Yup.string().required("Phải nhập").min(2, "Phải 2 kí tự trở lên"),
            majorName: Yup.string().required("Phải nhập")
        }),
        onSubmit: (values) => {
            // console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (majorID === 0) {//add
            majorService.add(data).then((res) => {
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
            majorService.update(majorID, data).then(res => {
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
                majorService.delete(dataId).then((res) => {
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
                DANH SÁCH NGÀNH HỌC
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
                    <Modal.Title><h3> Ngành mới </h3></Modal.Title>
                    </Modal.Header>
                    <form autoComplete="on" onSubmit={formik.handleSubmit}>
                        <Modal.Body>        
                            <Input id="txtmajorCode" type="text" className="inputClass form-control" label="Mã" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("majorCode")}
                                err={formik.touched.majorCode && formik.errors.majorCode}
                                errMessage={formik.errors.majorCode}
                            />
                            <Input id="txtmajorName" type="text" className="inputClass form-control" label="Tên" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("majorName")}
                                err={formik.touched.majorName && formik.errors.majorName}
                                errMessage={formik.errors.majorName}
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

                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Mã ngành
                </th>
                
                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Ngành học
                </th>
                
                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                    Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
            {
              majors.map((major,idx) => {
                return (
                <tr key={major.majorID}>
                  <th className="text-center " >{idx + 1}</th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center flex items-center">
                  <span>
                    {major.majorCode}
                  </span>
                  {/* {idx + 1} */}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center">
                  {major.majorName}
                  </td>
                  
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-no-wrap p-4 text-center">
                        <a href="/#" onClick={(e) => handleModalShow(e, major.majorID)}>
                          <i className="fas fa-edit text-primary px-2"></i>
                        </a>
                        <a href="/#" onClick={(e) => deleteRow(e, major.majorID)}>
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

MajorTable.defaultProps = {
  color: "light",
};

MajorTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
