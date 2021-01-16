package com.example.iscmanagement.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Company;
import com.example.iscmanagement.model.JobTitle;
import com.example.iscmanagement.service.JobTitleService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

//@CrossOrigin
@RestController
@RequestMapping("/api/jobtitles")
public class JobTitleController {
	@Autowired
	private JobTitleService jobTitleService;

	@GetMapping("")
	public List<JobTitle> getAllJobTitle() {
		return jobTitleService.getAllJobTitle();
	}

	@GetMapping("/{id}")
	public ResponseEntity<JobTitle> getJobTitleById(@PathVariable(value = "id") Long jobTitleId)
			throws ResourceNotFoundException {
		JobTitle jobTitle = jobTitleService.getJobTitle(jobTitleId);
		return ResponseEntity.ok().body(jobTitle);
	}

	@PostMapping("")
	public JobTitle createRoom(@RequestBody JobTitle jobTitle) {
		return jobTitleService.inserJobTitle(jobTitle);
	}

	@PutMapping("/{id}")
	public ResponseEntity updateRoom(@PathVariable(value = "id") Long id, @RequestBody JobTitle jobTitleDetails)
			throws ResourceNotFoundException {
		JobTitle jobTitle = jobTitleService.getJobTitle(id);
		jobTitle.setJtName(jobTitleDetails.getJtName());
		jobTitle.setJtStatus(jobTitleDetails.isJtStatus());
		jobTitleService.inserJobTitle(jobTitle);
		return ResponseEntity.ok(jobTitle);
	}

	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteRoom(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		jobTitleService.deleteJobTitle(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;

	}
}
