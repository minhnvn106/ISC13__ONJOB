package com.example.iscmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.model.Intake;
import com.example.iscmanagement.service.IntakeService;

@RestController
public class IntakeController {
	@Autowired
	private IntakeService intakeService;
	
	@RequestMapping(value = { "listIntakes" }, method = RequestMethod.GET)
	public List<Intake> getAllIntake() {
		return intakeService.getAllIntake();
	}
	@RequestMapping(value = { "deleteIntake" }, method = RequestMethod.GET)
	public void deleteIntake(@RequestParam Long id) {
		intakeService.deleteIntake(id);
	}
	@RequestMapping(path = { "updateIntake", "updateIntake" }, method = RequestMethod.POST)
	public void updateIntake(@RequestBody Intake intake) {
		System.out.println(intake);
		intakeService.insertIntake(intake);

	}
}
