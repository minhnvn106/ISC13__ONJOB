package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.InstructorRepo;
import com.example.iscmanagement.model.Instructor;

@Service
@Transactional
public class InstructorService {
	@Autowired
	private InstructorRepo repo;
	//get all instructor
	public List<Instructor> getAllInstructor(){
		return repo.findAll();
	}
	//get instructor by id
	public Instructor getInstructor(long id) {
		return repo.findById(id).get();
	}
	// insert instructor
	public void insertInstructor(Instructor instructor) {
		repo.save(instructor);
	}
	//delete instructor by id
	public void deleteInstructor(long id) {
		repo.deleteById(id);
	}
}
