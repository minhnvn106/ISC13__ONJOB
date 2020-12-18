package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.RoomRepo;
import com.example.iscmanagement.model.Room;

@Service
@Transactional
public class RoomService {
	@Autowired
	private RoomRepo repo;
	//get all room
		public List<Room> getAllRoom(){
			return repo.findAll();
		}
		//get room by id
		public Room getRoom(long id) {
			return repo.findById(id).get();
		}
		// insert room
		public void insertRoom(Room room) {
			repo.save(room);
		}
		//delete room by id
		public void deleteRoom(long id) {
			repo.deleteById(id);
		}
}
