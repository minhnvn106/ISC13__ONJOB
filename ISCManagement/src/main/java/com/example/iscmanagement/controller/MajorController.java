package com.example.iscmanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Major;
import com.example.iscmanagement.service.MajorService;
@CrossOrigin
@RestController
@RequestMapping("/api/majors")
public class MajorController {
	@Autowired
	private MajorService majorService;
	
	//get all major
	@GetMapping("")
	public ResponseEntity<List<Major>> getAllMajors() {
		return new ResponseEntity<List<Major>>(majorService.getAllMajor(),HttpStatus.OK);
	}

	
	//get major by id
	@GetMapping("/{id}")
	public ResponseEntity<Major> getMajorById(@PathVariable(value = "id") Long majorId) throws ResourceNotFoundException{
		Major major = majorService.getMajor(majorId);
				return ResponseEntity.ok().body(major);
	}
	
	//insert major
	@PostMapping("")
	public ResponseEntity<Major> createMajor( @RequestBody Major major) {
		List<Major> majors = majorService.findByMajorCode(major.getMajorCode());
		if(majors.size()!=0) {
			return new ResponseEntity<Major>(HttpStatus.CONFLICT);
		}
		return new ResponseEntity<Major>(majorService.insertMajor(major),HttpStatus.OK);
		
	}
	
	//update major
	@PutMapping("/{id}")
	public ResponseEntity<Major> updateMajor(@PathVariable(value = "id") Long majorId,@RequestBody Major majorDetails) throws ResourceNotFoundException{
		Major major = majorService.getMajor(majorId);
		String oldMajorCode = major.getMajorCode();
		String newMajorCode = majorDetails.getMajorCode();

		if(majorService.checkMajorCodeUpdate(oldMajorCode, newMajorCode)) {
			major.setMajorCode(majorDetails.getMajorCode());
			major.setMajorName(majorDetails.getMajorName());
			majorService.insertMajor(major);
			return ResponseEntity.ok(major);
		}
		
		return new ResponseEntity<Major>(HttpStatus.CONFLICT);
	}
	
	
	//delete major
	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteMajor(@PathVariable(value = "id") Long majorId) throws ResourceNotFoundException {
		majorService.getMajor(majorId);
		majorService.deleteMajor(majorId);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
}
