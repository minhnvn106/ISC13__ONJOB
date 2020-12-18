package com.example.iscmanagement.controller;

import java.util.List;

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

	// get university by id
	@GetMapping("/{id}")
	public ResponseEntity<University> getUniversityById(@PathVariable(value = "id") Long universityId)
			throws ResourceNotFoundException {
		University univerysity = universityService.getUniversity(universityId);
		return ResponseEntity.ok().body(univerysity);
	}

	// insert university
	@PostMapping("")
	public University createUniversity(@RequestBody University university) {
		return universityService.insertUniversity(university);
	}
	@RequestMapping(path = { "updateUniversity", "addUniversity" }, method = RequestMethod.POST)
	public void updateUniversity(@RequestBody University university) {
		universityService.insertUniversity(university);
		return ResponseEntity.ok(university);
	}

	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteUniversity(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		universityService.getUniversity(id);
		universityService.deleteUniversity(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;

	}
}
