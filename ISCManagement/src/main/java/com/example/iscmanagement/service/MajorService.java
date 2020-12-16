package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.MajorRepo;
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
	public Major getMajor(long id) {
		return repo.findById(id).get();
	}
	// insert major
	public Major insertMajor(Major major) {
		return repo.save(major);

	}
	//delete major by id
	public void deleteMajor(long id) {
		repo.deleteById(id);
	}
}
