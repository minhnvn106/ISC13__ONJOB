package com.example.iscmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.model.Room;
import com.example.iscmanagement.service.RoomService;

@RestController
public class RoomController {
	@Autowired
	private RoomService roomService;

	@RequestMapping(value = { "listRooms" }, method = RequestMethod.GET)
	public List<Room> getAllRoom() {
		return roomService.getAllRoom();
	}
	@RequestMapping(value = { "deleteRoom" }, method = RequestMethod.GET)
	public void deleteRoom(@RequestParam Long id) {
		roomService.deleteRoom(id);
	}
	@RequestMapping(path = { "updateRoom", "addRoom" }, method = RequestMethod.POST)
	public void updateRoom(@RequestBody Room room) {
		roomService.insertRoom(room);

	}
}
