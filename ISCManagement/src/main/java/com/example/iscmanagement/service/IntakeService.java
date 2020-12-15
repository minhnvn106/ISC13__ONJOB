package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.IntakeRepo;
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
	public Intake getIntake(long id) {
		return repo.findById(id).get();
	}
	// insert intake
	public void insertIntake(Intake intake) {
		repo.save(intake);
	}
	//delete intake by id
	public void deleteIntake(long id) {
		repo.deleteById(id);
	}
}
