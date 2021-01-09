package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.ClassRepo;
import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Classes;
import com.example.iscmanagement.model.Company;

@Service
@Transactional
public class ClassService {
	@Autowired
	private ClassRepo repo;

	// get all Classes
	public List<Classes> getAllClass() {
		return repo.findAll();
	}

	// get Classes by id
	public Classes getClasses(long id) throws ResourceNotFoundException {
		Classes classes = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mã lớp này không tồn tại" + id));
		return classes;
	}

	// insert Classes
	public Classes insertClasses(Classes classes) {
		return repo.save(classes);
	}

	// delete Classes by id
	public void deleteClasses(long id) {
		repo.deleteById(id);
	}

	// check update
	public boolean checkClassesCodeUpdate(String oldRoomCode, String newRoomCode) {
		if (repo.checkClassesCodeUpdate(oldRoomCode, newRoomCode).size() != 0) {
			return false;
		}
		return true;
	}

}
