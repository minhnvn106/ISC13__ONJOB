package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.InstructorRepo;
import com.example.iscmanagement.model.Instructor;

@Service
@Transactional
public class InstructorService {
	@Autowired
	private InstructorRepo instructorRepository;
	
	//getAllList
	public List<Instructor> getAllList(){
		return instructorRepository.findAll();
	}
	
	//findByID
	public Instructor getOneInstructorById(Long id){
		return instructorRepository.findById(id).get();
	}
	
	
	public Instructor findInstructorByInsCode( String insCode) {
		return instructorRepository.findByInsCode(insCode);
	}
	
	//find Instructor By insCode có tồn tại hay chưa để check nó là duy nhất
		public List<String> findInstructorByInsCodeUpdate( String insCode) {
			return instructorRepository.findByInsCodeUpdate(insCode);
		}
	
	//save update or insert
	public Instructor saveInstructor(Instructor instructor) {
		return instructorRepository.save(instructor);
	}
	
	//delete
	public void deleteById(Long id) {
		instructorRepository.deleteById(id);

	}
}
