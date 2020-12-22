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
import com.example.iscmanagement.model.Intake;
import com.example.iscmanagement.service.IntakeService;
@CrossOrigin
@RestController
@RequestMapping("/api/intakes")
public class IntakeController {
	@Autowired
	private IntakeService intakeService;
	//get all intakes
		@GetMapping("")
		public ResponseEntity<List<Intake>> getAllIntakes() {
			return new ResponseEntity<List<Intake>>(intakeService.getAllIntake(),HttpStatus.OK);
		}

		
		//get intake by id
		@GetMapping("/{id}")
		public ResponseEntity<Intake> getIntakeById(@PathVariable(value = "id") Long intakeId) throws ResourceNotFoundException{
			Intake intake = intakeService.getIntake(intakeId);
					return ResponseEntity.ok().body(intake);
		}
		
		//insert intake
		@PostMapping("")
		public ResponseEntity<Intake> createIntake( @RequestBody Intake intake) {
			List<Intake> intakes = intakeService.findByIntakeCode(intake.getIntakeCode());
			if(intakes.size()!=0) {
				return new ResponseEntity<Intake>(HttpStatus.CONFLICT);
			}
			return ResponseEntity.ok(intakeService.insertIntake(intake));
		}
		
		//update intake
		@PutMapping("/{id}")
		public ResponseEntity<Intake> updateIntake(@PathVariable(value = "id") Long intakeId,@RequestBody Intake intakeDetails) throws ResourceNotFoundException{
			Intake intake = intakeService.getIntake(intakeId);
			String oldIntakeCode = intake.getIntakeCode();
			String newIntakeCode = intakeDetails.getIntakeCode();

			if(intakeService.checkIntakeCodeUpdate(oldIntakeCode, newIntakeCode)) {
				intake.setIntakeCode(intakeDetails.getIntakeCode());
				intake.setIntakeName(intakeDetails.getIntakeName());
				intake.setIntakeBeginDay(intakeDetails.getIntakeBeginDay());
				intake.setIntakeEndDay(intakeDetails.getIntakeEndDay());
				intake.setIntakeStatus(intakeDetails.getIntakeStatus());
				intake.setNote(intakeDetails.getNote());
				intake.setMajor(intakeDetails.getMajor());
				intake.setStudents(intakeDetails.getStudents());
				intake.setSubjects(intakeDetails.getSubjects());
				return ResponseEntity.ok(intakeService.insertIntake(intake));
			}
			return new ResponseEntity<Intake>(HttpStatus.CONFLICT);
		}
		
		
		//delete intake
		@DeleteMapping(path = "/{id}")
		public Map<String, Boolean> deleteIntake(@PathVariable(value = "id") Long intakeId) throws ResourceNotFoundException {
			intakeService.getIntake(intakeId);
			intakeService.deleteIntake(intakeId);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return response;
		}
		

}
