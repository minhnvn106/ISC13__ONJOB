package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.IntakeRepo;
import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Intake;

@Service
@Transactional
public class IntakeService {
	@Autowired
	private IntakeRepo repo;
	//get all intake
	public List<Intake> getAllIntake(){
		return repo.findAll();
	}
	//get intake by id
	public Intake getIntake(long id) throws ResourceNotFoundException {
		return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Intake isn't exist: " + id));
	}
	// insert intake
	public Intake insertIntake(Intake intake) {
		return repo.save(intake);
	}
	//delete intake by id
	public void deleteIntake(long id) {
		repo.deleteById(id);
	}
	// check intake code update, true is OK we can update
	public boolean checkIntakeCodeUpdate(String oldIntakeCode,String newIntakeCode) {
		if(repo.checkIntakeCodeUpdate(oldIntakeCode, newIntakeCode).size()!=0) return false;
		
		return true;
	}
	public List<Intake> findByIntakeCode(String intakeCode) {
		return repo.findByIntakeCode(intakeCode);
	}
}
