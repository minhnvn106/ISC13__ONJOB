package com.example.iscmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long roomId;
	@Column(unique = true, nullable = false, length = 20)
	private String roomCode;
	private String roomName;
	private EnumRoomType roomType;
	private EnumStatus roomStatus;
	public Room() {
		super();
	}
	public Room(String roomCode, String roomName, EnumRoomType roomType, EnumStatus roomStatus) {
		super();
		this.roomCode = roomCode;
		this.roomName = roomName;
		this.roomType = roomType;
		this.roomStatus = roomStatus;
	}
	public Long getRoomId() {
		return roomId;
	}
	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}
	public String getRoomCode() {
		return roomCode;
	}
	public void setRoomCode(String roomCode) {
		this.roomCode = roomCode;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public EnumRoomType getRoomType() {
		return roomType;
	}
	public void setRoomType(EnumRoomType roomType) {
		this.roomType = roomType;
	}
	public EnumStatus getRoomStatus() {
		return roomStatus;
	}
	public void setRoomStatus(EnumStatus roomStatus) {
		this.roomStatus = roomStatus;
	}
	@Override
	public String toString() {
		return "Room [roomId=" + roomId + ", roomCode=" + roomCode + ", roomName=" + roomName + ", roomType=" + roomType
				+ ", roomStatus=" + roomStatus + "]";
	}
	
	
}
