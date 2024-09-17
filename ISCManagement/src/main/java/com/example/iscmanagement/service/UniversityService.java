package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.UniversityRepo;
import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.University;

@Service
@Transactional
public class UniversityService {
	@Autowired
	private UniversityRepo repo;

	// get all university
	public List<University> getAllUniversity() {
		return repo.findAll();
	}

	// get university by id
	public University getUniversity(long id) throws ResourceNotFoundException {
		University university = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Mã trường này không tồn tại" + id));
		
		return university;
	}

	// insert university
	public University insertUniversity(University university) {
		return repo.save(university);
	}

	// delete university by id
	public void deleteUniversity(long id) {
		repo.deleteById(id);
	}
}
