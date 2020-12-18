package com.example.iscmanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Room;
import com.example.iscmanagement.service.RoomService;
@CrossOrigin
@RestController
@RequestMapping("/api/room")
public class RoomController {
	@Autowired
	private RoomService roomService;

	//get all room
	@GetMapping("")
	public List<Room> getAllRoom() {
		return roomService.getAllRoom();
	}
	//get room by id
	@GetMapping("/{id}")
	public ResponseEntity<Room> getRoomById(@PathVariable( value = "id") Long roomId) throws ResourceNotFoundException{
		Room room = roomService.getRoom(roomId);
		return ResponseEntity.ok().body(room);
	}
	
	//insert room
	@PostMapping("")
	public Room createRoom(@RequestBody Room room) {
		return roomService.insertRoom(room);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity updateRoom(@PathVariable(value = "id") Long id, @RequestBody Room roomDetails) throws ResourceNotFoundException{
		Room room = roomService.getRoom(id);
		String oldRoomCode = room.getRoomCode();
		String newRoomCode = roomDetails.getRoomCode();
		if(oldRoomCode.equalsIgnoreCase(newRoomCode) || roomService.checkRoomCodeUpdate(oldRoomCode, newRoomCode)) {
			room.setRoomCode(roomDetails.getRoomCode());
			room.setRoomName(roomDetails.getRoomName());
			room.setRoomStatus(roomDetails.getRoomStatus());
			room.setRoomType(roomDetails.getRoomType());
			roomService.insertRoom(room);
			return ResponseEntity.ok(room);
					}
		return ResponseEntity.badRequest().body("duplicated room code");
	}
	
	
	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteRoom(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		roomService.getRoom(id);
		roomService.deleteRoom(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
		
	}
	
}
