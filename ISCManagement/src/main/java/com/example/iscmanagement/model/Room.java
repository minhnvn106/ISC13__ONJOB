package com.example.iscmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long roomId;
	@Column(unique = true, nullable = false, length = 20)
	@NotNull
	@Size(min = 4, message = "Room Code should have atleat 4 characters")
	private String roomCode;
	@NotNull
	@Size(min = 4, message = "Room name should have atleat 4 characters")
	private String roomName;
	@NotNull(message = "Room type should have atleat 1 ")
	private EnumRoomType roomType;
	@NotNull(message = "Room status should have atleat 1 ")
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
	@Column(nullable = false)
	public String getRoomCode() {
		return roomCode;
	}
	public void setRoomCode(String roomCode) {
		this.roomCode = roomCode;
	}
	@Column(nullable = false)
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	@Column(nullable = false)
	public EnumRoomType getRoomType() {
		return roomType;
	}
	public void setRoomType(EnumRoomType roomType) {
		this.roomType = roomType;
	}
	@Column(nullable = false)
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
