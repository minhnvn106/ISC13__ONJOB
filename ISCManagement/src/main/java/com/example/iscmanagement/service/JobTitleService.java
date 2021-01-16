package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.JobTitleRepo;
import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Classes;
import com.example.iscmanagement.model.JobTitle;

@Service
@Transactional
public class JobTitleService {
	@Autowired
	JobTitleRepo repo;

	// get all Classes
	public List<JobTitle> getAllJobTitle() {
		return repo.findAll();
	}

	// get Classes by id
	public JobTitle getJobTitle(long id) throws ResourceNotFoundException {
		JobTitle jobTitle = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mã Job này không tồn tại" + id));
		return jobTitle;
	}

	// insert Classes
	public JobTitle inserJobTitle(JobTitle jobTitle) {
		return repo.save(jobTitle);
	}

	// delete Classes by id
	public void deleteJobTitle(long id) {
		repo.deleteById(id);
	}
}
