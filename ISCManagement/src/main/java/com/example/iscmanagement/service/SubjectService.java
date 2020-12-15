package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.SubjectRepo;
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
		public Subject getSubject(long id) {
			return repo.findById(id).get();
		}

		// insert Subject
		public void insertSubject(Subject Subject) {
			repo.save(Subject);
		}

		// delete Subject by id
		public void deleteSubject(long id) {
			repo.deleteById(id);
		}
}
