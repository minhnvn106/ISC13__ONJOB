package com.example.iscmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.model.Subject;
import com.example.iscmanagement.service.SubjectService;

@RestController
public class SubjectController {
	@Autowired
	private SubjectService subjectService;
	
	@RequestMapping(value = { "listSubject" }, method = RequestMethod.GET)
	public List<Subject> getAllSubject() {
		return subjectService.getAllSubject();
	}
	@RequestMapping(value = { "deleteSubject" }, method = RequestMethod.GET)
	public void deleteSubject(@RequestParam Long id) {
		subjectService.deleteSubject(id);
	}
	@RequestMapping(path = { "updateSubject", "addSubject" }, method = RequestMethod.POST)
	public void updateSubject(@RequestBody Subject subject) {
		subjectService.insertSubject(subject);

	}
}
