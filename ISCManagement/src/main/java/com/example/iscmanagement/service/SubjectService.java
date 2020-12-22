package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.SubjectRepo;
import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Subject;

@Service
@Transactional
public class SubjectService {
	@Autowired
	private SubjectRepo repo;
	
	// get all Subject
		public List<Subject> getAllSubject() {
			return repo.findAll();
		}

		// get Subject by id
		public Subject getSubject(long id) throws ResourceNotFoundException {
			return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nhân viên này không tồn tại: " + id));
		}

		// insert Subject
		public Subject insertSubject(Subject Subject) {
			return repo.save(Subject);
		}

		// delete Subject by id
		public void deleteSubject(long id) {
			repo.deleteById(id);
		}
		
		// check subject code update, true is OK, we can update
		public boolean checkSubjectCodeUpdate(String oldSubCode,String newSubCode) {
			if(repo.checkSubjectCodeUpdate(oldSubCode, newSubCode).size()!=0) return false;
			
			return true;
		}
		public List<Subject> findBySubCode(String subCode) {
			return repo.findBySubCode(subCode);
		}
}
