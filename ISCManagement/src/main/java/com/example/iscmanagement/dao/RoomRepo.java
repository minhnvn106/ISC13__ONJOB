package com.example.iscmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.iscmanagement.model.Room;

public interface RoomRepo extends JpaRepository<Room, Long>{

	@Query( value = "Select room_code from room where room_code = ?1 and room_code = ?2", nativeQuery = true)
	public List<Room> checkRoomCodeUpdate(String oldRoomCode, String newRoomCode);
}
