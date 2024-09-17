package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.iscmanagement.dao.AssignmentRepo;
import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Assignment;
import com.example.iscmanagement.model.Company;

@Service
@Transactional
public class AssignmentService {
	@Autowired
	AssignmentRepo repo;

	// get all Assignment
	public List<Assignment> getAllAssignment() {
		return repo.findAll();
	}

	// get Company by id
//	public Assignment getAssignmentByClassId(long classId, long studentId) throws ResourceNotFoundException {
//		Page<Assignment> assignment = repo.findById(classId,studentId)
//				.orElseThrow(() -> new ResourceNotFoundException("Mã công này không tồn tại" + id));
//		return assignment;
//	}

	// insert Assignment
	public Assignment insertAssignment(Assignment assignment) {
		return repo.save(assignment);
	}

	// delete Company by id
//	public void deleteAssignment(long id) {
//		repo.deleteById(id);
//	}
}
