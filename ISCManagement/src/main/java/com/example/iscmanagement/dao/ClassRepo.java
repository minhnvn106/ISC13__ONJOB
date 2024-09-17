package com.example.iscmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.iscmanagement.model.Classes;

public interface ClassRepo extends JpaRepository<Classes, Long> {
	@Query(value = "Select class_code from classes where class_code = ?1 and class_code = ?2", nativeQuery = true)
	public List<Classes> checkClassesCodeUpdate(String oldRoomCode, String newRoomCode);
}
