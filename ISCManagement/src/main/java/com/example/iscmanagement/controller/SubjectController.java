package com.example.iscmanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.example.iscmanagement.model.Subject;
import com.example.iscmanagement.service.SubjectService;
@CrossOrigin
@RestController
@RequestMapping("/api/subjects")
public class SubjectController {
	@Autowired
	private SubjectService subjectService;
	
	//get all subject
		@GetMapping("")
		public List<Subject> getAllSubjects() {
			return subjectService.getAllSubject();
		}

		
		//get subject by id
		@GetMapping("/{id}")
		public ResponseEntity<Subject> getSubjectById(@PathVariable(value = "id") Long subjectId) throws ResourceNotFoundException{
			Subject subject = subjectService.getSubject(subjectId);
					return ResponseEntity.ok().body(subject);
		}
		
		//insert subject
		@PostMapping("")
		public ResponseEntity<Subject> createSubject( @RequestBody Subject subject) {
			List<Subject> subjects = subjectService.findBySubCode(subject.getSubCode());
			if(subjects.size()!=0) {
				return new ResponseEntity<Subject>(HttpStatus.CONFLICT);
			}
			return ResponseEntity.ok(subjectService.insertSubject(subject));
		}
		
		//update subject
		@PutMapping("/{id}")
		public ResponseEntity<?> updateSubject(@PathVariable(value = "id") Long subjectId,@RequestBody Subject subjectDetails) throws ResourceNotFoundException{
			Subject subject = subjectService.getSubject(subjectId);
			String oldSubCode = subject.getSubCode();
			String newSubCode = subjectDetails.getSubCode();

			if(subjectService.checkSubjectCodeUpdate(oldSubCode, newSubCode)) {
				subject.setSubCode(subjectDetails.getSubCode());
				subject.setSubCredit(subjectDetails.getSubCredit());
				subject.setSubName(subjectDetails.getSubName());
				subject.setSubPassScore(subjectDetails.getSubPassScore());
				subject.setSubStatus(subjectDetails.getSubStatus());
				subjectService.insertSubject(subject);
				return ResponseEntity.ok(subject);
			}
			Map<String, Boolean> response = new HashMap<>();
			response.put("updated", Boolean.FALSE);
			return ResponseEntity.badRequest().body(response);
		}
		
		
		//delete subject
		@DeleteMapping("/{id}")
		public Map<String, Boolean> deleteSubject(@PathVariable(value = "id") Long subjectId) throws ResourceNotFoundException {
			subjectService.getSubject(subjectId);
			subjectService.deleteSubject(subjectId);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return response;
		}
}
