import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from "yup";
// import Input from './../controls/input';

import Input from './../../assets/services/input';

// components

// import TableDropdown from "components/Dropdowns/TableDropdown.js";
import roomService from './../../assets/services/roomService';


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
    const handleModalShow = (e, dataId) => {
        if (e) e.preventDefault();

        setRoomId(dataId);
        if (dataId > 0) {//edit
            roomService.get(dataId).then(res => {
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
            roomCode: "",
            roomName: "",
            roomType: "",
            roomStatus: "",
           
            //Nếu có thêm nhiều trường khác
        },
        validationSchema: Yup.object({
          roomCode: Yup.string().required("Required").min(4, "Must be 4 characters or more"),
          roomName: Yup.string().required("Required")
           
        }),
        onSubmit: (values) => {
            // console.log(values);
            //Tách ra một hàm riêng để xử lý form
            handleFormSubmit(values);
        }
    });

    //Function xử lý khi người dùng nhập dữ liệu và thêm dữ liệu thành công 
    const handleFormSubmit = (data) => {

        if (roomId === 0) {//add
            roomService.add(data).then((res) => {
                loadData();
                handleModalClose();
            })
        } else {//update
            roomService.update(roomId, data).then(res => {
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
        roomService.delete(dataId).then(res => {
            if (res.errorCode === 0) {
                loadData();
                console.log(res);

            } else {

            }
        });
    }

  
  return (
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
                Thêm
              </button>

              {/* Start Modal */}
              <Modal show={modalShow} onHide={handleModalClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Room</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="on" onSubmit={formik.handleSubmit}>
                        <Modal.Body>        
                            <Input id="txtRoomCode" type="text" className="inputClass form-control" label="Code" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("roomCode")}
                                err={formik.touched.roomCode && formik.errors.roomCode}
                                errMessage={formik.errors.roomCode}
                            />
                            <Input id="txtRoomName" type="text" className="inputClass form-control" label="Name" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("roomName")}
                                err={formik.touched.roomName && formik.errors.roomName}
                                errMessage={formik.errors.roomName}
                            />
                            <Input id="txtRoomType" type="text" className="inputClass form-control" label="Room Type" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("roomType")}
                                err={formik.touched.roomType && formik.errors.roomType}
                                errMessage={formik.errors.roomType}
                            />
                            <Input id="txtRoomStatus" type="text" className="inputClass form-control" label="Room Status" labelSize="4" maxLength="100"
                                frmField={formik.getFieldProps("roomStatus")}
                                err={formik.touched.roomStatus && formik.errors.roomStatus}
                                errMessage={formik.errors.roomStatus}
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
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render table */}
              {
                rooms.map((room,idx)=>{
                  return(
                    <tr key={room.roomId}>
                      <th>{idx+1}</th>
                      <td>{room.roomCode}</td>
                      <td>{room.roomName}</td>
                      <td>{room.roomType}</td>
                      <td>{room.roomStatus}</td>
                      <td>
                        <a href="/#" onClick={(e) => handleModalShow(e, room.roomId)}>
                          <i className="fas fa-edit text-primary"></i>
                        </a>
                        <a href="/#" onClick={(e) => deleteRow(e, room.roomId)}>
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

RoomTable.defaultProps = {
  color: "light",
};

RoomTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
