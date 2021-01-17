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
		public List<Instructor> getAllInstructor(){
			return instructorRepository.findAll();
		}
	
//	//getAllList
//	public List<Instructor> getAllList(){
//		return instructorRepository.findAll();
//	}
	
	public Instructor getInstructor(long id) {
		return instructorRepository.findById(id).get();
	}
		
	// insert Instructor
	public Instructor insertInstructor(Instructor Instructor) {
		return instructorRepository.save(Instructor);
	}

	// delete Instructor by id
	public void deleteInstructor(long id) {
		instructorRepository.deleteById(id);
	}
	// check student code update, true is OK we can update
	public boolean checkInsCodeUpdate(String oldInsCode, String newInsCode) {
		if(instructorRepository.checkInsCodeUpdate(oldInsCode, newInsCode).size()!= 0) {
			return false;
		}
		return true;
		
	}	
	//findByID
//	public Instructor getOneInstructorById(Long id){
//		return instructorRepository.findById(id).get();
//	}
//	
//	
//	public Instructor findInstructorByInsCode( String insCode) {
//		return instructorRepository.findByInsCode(insCode);
//	}
//	
//	//find Instructor By insCode có tồn tại hay chưa để check nó là duy nhất
//		public List<String> findInstructorByInsCodeUpdate( String insCode) {
//			return instructorRepository.findByInsCodeUpdate(insCode);
//		}
//	
//	//save update or insert
//	public Instructor saveInstructor(Instructor instructor) {
//		return instructorRepository.save(instructor);
//	}
//	
//	//delete
//	public void deleteById(Long id) {
//		instructorRepository.deleteById(id);
//
//	}
}
