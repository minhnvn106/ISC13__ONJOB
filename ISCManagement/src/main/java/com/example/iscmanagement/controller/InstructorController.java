package com.example.iscmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.model.Instructor;
import com.example.iscmanagement.service.InstructorService;

@RestController	
public class InstructorController {
	@Autowired
	private InstructorService instructorService;
	
	@RequestMapping(value = { "listInstructors" }, method = RequestMethod.GET)
	public List<Instructor> getAllInstructor() {
		return instructorService.getAllInstructor();
	}
	@RequestMapping(value = { "deleteInstructor" }, method = RequestMethod.GET)
	public void deleteInstructor(@RequestParam Long id) {
		instructorService.deleteInstructor(id);
	}
	@RequestMapping(path = { "updateInstructor", "addInstructor" }, method = RequestMethod.POST)
	public void updateInstructor(@RequestBody  Instructor instructor) {
		instructorService.insertInstructor(instructor);

	}	
}
