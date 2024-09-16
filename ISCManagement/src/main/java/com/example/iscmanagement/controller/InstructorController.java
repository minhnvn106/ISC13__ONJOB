package com.example.iscmanagement.controller;

import java.util.List;

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

import com.example.iscmanagement.model.Instructor;
import com.example.iscmanagement.service.InstructorService;


@CrossOrigin
@RestController
@RequestMapping(value="/api/instructors")
public class InstructorController {
	@Autowired
	private InstructorService instructorService;
	
	//load InstructorList
	@GetMapping(path = "")
	public ResponseEntity<List<Instructor>>  getAllList(){
		List<Instructor> insList = instructorService.getAllList();
		return new ResponseEntity<List<Instructor>>(insList,HttpStatus.OK);
	}
	
	//tìm một Instructor theo Id
	@GetMapping(path="/{id}")
	public ResponseEntity<Instructor> getInstructor(@PathVariable("id") Long id){
		Instructor instructor = instructorService.getOneInstructorById(id);
		
		//Không tìm thấy
		if(instructor==null) {
			return new ResponseEntity<Instructor>(HttpStatus.NOT_FOUND);
		}
		//Tìm thấy
		return new ResponseEntity<Instructor>(instructor,HttpStatus.OK);
	}
	
	
	//create a new Instructor
	@PostMapping(path = "")
	public  ResponseEntity<Instructor> insertIns(@RequestBody Instructor instructorForm){
		Instructor InsList = instructorService.findInstructorByInsCode(instructorForm.getInsCode());
		//Nếu bằng null nghĩa là mã đó chưa tồn tại, cho thêm đối tượng, ngược lại thì báo conflict
		if(InsList==null) {
			System.out.println("Thêm Instructor thành công");
			return new ResponseEntity<Instructor>(instructorService.saveInstructor(instructorForm),HttpStatus.CREATED);
		}else {
			System.out.println("Lỗi: Trùng mã insCode");
			return new ResponseEntity<Instructor>(HttpStatus.CONFLICT);
			
		}


	}
	
	
	//update a Instructor
	@PutMapping(path = "/{id}") 
	public ResponseEntity<Instructor> updateIns(@PathVariable("id") Long id,@RequestBody Instructor instructorForm){
		Instructor instructor = instructorService.getOneInstructorById(id);
//			List<String> insCodeOld = instructorService.findInstructorByInsCodeUpdate(instructor.getInsCode());

//			System.out.println("Code Cũ" + instructor.getInsCode());
//			System.out.println("Code Mới"+instructorForm.getInsCode());
		
		if(instructor.getInsCode().equals(instructorForm.getInsCode())) {
			return new ResponseEntity<Instructor>(instructorService.saveInstructor(instructorForm),HttpStatus.OK);
		}else if(checkCode(instructor.getInsCode(), instructorForm.getInsCode())) {
			return new ResponseEntity<Instructor>(instructorService.saveInstructor(instructorForm),HttpStatus.OK);
			
		}else {
			return new ResponseEntity<Instructor>(HttpStatus.CONFLICT);
		}
		

//			else{
//				instructor.setInsCode(instructorForm.getInsCode());
//				instructor.setInsName(instructorForm.getInsName());
//				instructor.setInsGender(instructorForm.getInsGender());
//				instructor.setInsBirthDay(instructorForm.getInsBirthDay());
//				instructor.setInsEmail(instructorForm.getInsEmail());
//				instructor.setInsPhone(instructorForm.getInsPhone());
//				instructor.setInsImg(instructorForm.getInsImg());
//				instructor.setInsStatus(instructorForm.getInsStatus());
//				instructor.setInsCertificate(instructorForm.getInsCertificate());
//				instructor.setInsNote(instructorForm.getInsNote());
//				
//				return new ResponseEntity<Instructor>(instructorService.saveInstructor(instructor),HttpStatus.OK);
//			}
		
	}
	
	//delete
	@DeleteMapping(path="/{id}")
	public void deleteIns(@PathVariable("id") Long id){
		instructorService.deleteById(id);
		
//		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	//Hàm check xem insCode có bị trùng hay không, nếu trùng thì không cho thêm.
	public boolean checkCode(String codeOld, String codeNew) {
		List<String> insCodeOld = instructorService.findInstructorByInsCodeUpdate(codeOld);
		for(String ins : insCodeOld) {
			if(codeNew.equals(ins))
			{
				return false;
			}
		}
		return true;
	}

}
