import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'react-bootstrap';
import roomService from './../../assets/services/roomService';

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

export default function RoomTable({ color }) {
  // state = { }
  const[rooms,setRooms] = useState([]);
  const[roomId,setRoomId] = useState(0);
  
  const loadData = ()=>{
    roomService.getAll().then(res=>{
      setRooms(res);
    })
  }

  useEffect(()=>{
    loadData();
  },[roomId]);

  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);

    //Hàm xử lý để biết xem là thêm mới hay update
    
    /* ************************* */
    // Phần III: Formik và Function Xử lý handleFormSubmit 
    const formik = useFormik({
        initialValues: {
            roomCode: "",
            roomName: "",
            roomType: "",
            roomStatus: "1",
           
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
          roomCode: Yup.string().required("Phải nhập").min(2, "Phải 2 kí tự trở lên"),
          roomName: Yup.string().required("Phải nhập")           
        }),
        onSubmit: (values) => {
            console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });
    
    const handleModalShow = (e, dataId) => {
      if (e) e.preventDefault();

      setRoomId(dataId);
      if (dataId > 0) {//edit
          roomService.get(dataId).then(res => {
              formik.setValues({
                ...res,
                roomType: res.roomStatus === "LYTHUYET"?"0":"1",
                roomStatus: res.roomType === "HOATDONG"?"0":"1",
                // ...res, roomStatus : String(res.roomStatus), roomType: String(res.roomType)
                
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
        if (roomId === 0) {//add
            roomService.add(data).then((res) => {
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
            roomService.update(roomId, data).then(res => {
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
                roomService.delete(dataId).then((res) => {
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
                DANH SÁCH PHÒNG HỌC
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
                        <Modal.Title><h3>Phòng mới</h3></Modal.Title>
                    </Modal.Header>
                    <form autoComplete="on" onSubmit={formik.handleSubmit}>
                        <Modal.Body>        
                            <Input id="txtRoomCode" type="text" className="inputClass form-control" label="Mã Phòng" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("roomCode")}
                                err={formik.touched.roomCode && formik.errors.roomCode}
                                errMessage={formik.errors.roomCode}
                            />
                            <Input id="txtRoomName" type="text" className="inputClass form-control" label="Tên phòng" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("roomName")}
                                err={formik.touched.roomName && formik.errors.roomName}
                                errMessage={formik.errors.roomName}
                            />

                            {/* Loại phòng */}

                            <div className="form-group row">
                              <label className="col-sm-4 col-form-label"  htmlFor="selectRoomType">Loại phòng</label>
                              <div className=" col-sm-8">
                                <select className="custom-select form-control" id="selectRoomType" name="roomType" onChange={formik.handleChange}>
                                  <option value="0" selected={formik.values.roomType ==='0'}>Lý thuyết</option>
                                  <option value="1"selected={formik.values.roomType ==='1'}>Thực hành</option>
                                </select>
                              </div>
                            </div>

                            {/* Tình trạng */}

                            <div className="formGroup row">
                                <label className="col-sm-4 col-form-label">Tình trạng</label>
                                <div className="col-sm-8">
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={formik.values.roomStatus === '1'} 
                                     onChange={formik.handleChange}
                                     id="customRadStatus1"  
                                     value="1" className="custom-control-input"
                                     name="roomStatus"
                                     />
                                    
                                    <label className="custom-control-label" htmlFor="customRadStatus1">Không dùng</label>
                                  </div>

                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={formik.values.roomStatus === '0'} 
                                    onChange={formik.handleChange}
                                    id="customRadStatus2"
                                    value="0" className="custom-control-input"  
                                    name="roomStatus"/>
                                    
                                    <label className="custom-control-label" htmlFor="customRadStatus2">Đang dùng</label>
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
                  Mã phòng
                </th>

                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Phòng học
                </th>
                
                
                <th className={"px-3 w-5 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold " + (color === "light"? "bg-gray-100 text-gray-600 border-gray-200": "bg-blue-800 text-blue-300 border-blue-700")}>
                  Loại phòng
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
                rooms.map((room,idx)=>{
                  return(
                    <tr key={room.roomId}>
                      <th className="text-center align-middle text-xs whitespace-no-wrap p-4" >{idx + 1}</th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {room.roomCode}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {room.roomName}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {room.roomType==="LYTHUYET"?
                      <p><i class="fas fa-book text-green-500"></i> &nbsp;Phòng lý thuyết</p>:
                      <p><i class="fas fa-tools text-gray-500"></i>&nbsp;Phòng thực hành</p>}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {room.roomStatus==="KHONGHOATDONG"?
                      <p><i className="fas fa-circle text-orange-500 mr-2"></i>Không dùng</p>:
                      <p><i className="fas fa-circle text-teal-500 mr-2"></i>Đang dùng</p>}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-no-wrap p-4 text-center">
                        <a href="/#" onClick={(e) => handleModalShow(e, room.roomId)}>
                          <i className="fas fa-edit text-primary px-2"></i>
                        </a>
                        <a href="/#" onClick={(e) => deleteRow(e, room.roomId)}>
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

RoomTable.defaultProps = {
  color: "light",
};

RoomTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
