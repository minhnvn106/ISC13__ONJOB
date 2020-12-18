package com.example.iscmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.Room;

public interface RoomRepo extends JpaRepository<Room, Long>{

}
