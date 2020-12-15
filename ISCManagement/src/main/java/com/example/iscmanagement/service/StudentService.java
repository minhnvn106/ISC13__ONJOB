package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.StudentRepo;
import com.example.iscmanagement.model.Student;

@Service
@Transactional
public class StudentService {
	@Autowired
	private StudentRepo repo;

	// get all Student
	public List<Student> getAllStudent() {
		return repo.findAll();
	}

	// get Student by id
	public Student getStudent(long id) {
		return repo.findById(id).get();
	}

	// insert Student
	public void insertStudent(Student Student) {
		repo.save(Student);
	}

	// delete Student by id
	public void deleteStudent(long id) {
		repo.deleteById(id);
	}
}
