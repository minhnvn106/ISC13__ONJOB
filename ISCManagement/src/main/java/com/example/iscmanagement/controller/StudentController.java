package com.example.iscmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.model.Student;
import com.example.iscmanagement.service.StudentService;


@RestController	
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	@RequestMapping(value = { "listStudents" }, method = RequestMethod.GET)
	public List<Student> getAllStudent() {
		return studentService.getAllStudent();
	}
	@RequestMapping(value = { "deleteStudent" }, method = RequestMethod.GET)
	public void deleteStudent(@RequestParam Long id) {
		studentService.deleteStudent(id);
	}
	@RequestMapping(path = { "updateStudent", "addStudent" }, method = RequestMethod.POST)
	public void updateStudent(@RequestBody Student student) {
		studentService.insertStudent(student);

	}
}
