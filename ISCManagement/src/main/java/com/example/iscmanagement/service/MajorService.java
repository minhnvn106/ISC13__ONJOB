package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.MajorRepo;
import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Major;

@Service
@Transactional
public class MajorService {
	@Autowired
	private MajorRepo repo;
	//get all major
	public List<Major> getAllMajor(){
		return repo.findAll();
	}
	//get major by id
	public Major getMajor(long id) throws ResourceNotFoundException {
		 return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Major isn't exist: " + id));
		
	}
	// insert major
	public Major insertMajor(Major major) {
		return repo.save(major);

	}
	//delete major by id
	public void deleteMajor(long id) {
		repo.deleteById(id);
	}
	
	// check major code update, true is OK we can update
	public boolean checkMajorCodeUpdate(String oldMajorCode,String newMajorCode) {
		if(repo.checkMajorCodeUpdate(oldMajorCode, newMajorCode).size()!=0) return false;
		return true;
	}
	public List<Major> findByMajorCode(String majorCode) {
		return repo.findByMajorCode(majorCode);
	}
}
