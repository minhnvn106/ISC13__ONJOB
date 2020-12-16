package com.example.iscmanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.model.Major;
import com.example.iscmanagement.service.MajorService;

@Controller
@RestController
@RequestMapping("majors")
public class MajorController {
	@Autowired
	private MajorService majorService;
	
	//get all major
	@GetMapping("")
	public List<Major> getAllMajors() {
		return majorService.getAllMajor();
	}

	
	//get major by id
	@GetMapping("/{id}")
	public ResponseEntity<Major> getEmployeeById(@PathVariable(value = "id") Long majorId){
		Major major = majorService.getMajor(majorId);
				return ResponseEntity.ok().body(major);
	}
	
	//insert major
	@PostMapping("")
	public Major createEmployee( @RequestBody Major major) {
		return majorService.insertMajor(major);
	}
	
	//update major
	@PutMapping("")
	public ResponseEntity<Major> updateEmployee(@RequestBody Major majorDetails){
//		Major major = majorService.getMajor(majorId);
		
		
		majorService.insertMajor(majorDetails);
		return ResponseEntity.ok(majorDetails);
	}
	
	
	//delete major
	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteEmployee(@PathVariable(value = "id") Long majorId) {
		Major major = majorService.getMajor(majorId);
		majorService.deleteMajor(majorId);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
}
