package com.example.iscmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.model.University;
import com.example.iscmanagement.service.UniversityService;

@CrossOrigin
@RestController
@RequestMapping("/api/universities")
public class UniversiryController {
	@Autowired
	private UniversityService universityService;
	
	@RequestMapping(value = { "listUniversity" }, method = RequestMethod.GET)
	public List<University> getAllUniversity() {
		return universityService.getAllUniversity();
	}
	@RequestMapping(value = { "deleteUniversity" }, method = RequestMethod.GET)
	public void deleteUniversity(@RequestParam Long id) {
		universityService.deleteUniversity(id);
	}
	@RequestMapping(path = { "updateUniversity", "addUniversity" }, method = RequestMethod.POST)
	public void updateUniversity(@RequestBody University university) {
		universityService.insertUniversity(university);

	}
}
