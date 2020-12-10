package com.example.iscmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long roomId;
	@Column(unique = true, nullable = false, length = 20)
	private String roomCode;
	private String roomName;
	private EnumRoomType roomType;
	private EnumStatus roomStatus;
}
