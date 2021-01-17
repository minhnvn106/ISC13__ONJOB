package com.example.iscmanagement.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Instructor;
import com.example.iscmanagement.model.JobTitle;
import com.example.iscmanagement.model.Student;
import com.example.iscmanagement.model.University;
import com.example.iscmanagement.model.Company;
import com.example.iscmanagement.model.EnumGender;
import com.example.iscmanagement.model.EnumStdType;
import com.example.iscmanagement.model.EnumWorkStatus;

import com.example.iscmanagement.service.InstructorService;
import com.example.iscmanagement.service.FileStorageService;
import com.example.iscmanagement.service.JobTitleService;

@CrossOrigin
@RestController
@RequestMapping(value="/api/instructors")
public class InstructorController {
	
	@Autowired
	private FileStorageService fileStorageService;
	
	@Autowired
	private InstructorService instructorService;
	
	@Autowired
	private JobTitleService jobtitleService;
	
	//load InstructorList
//	@GetMapping(path = "")
//	public ResponseEntity<List<Instructor>>  getAllList(){
//		List<Instructor> insList = instructorService.getAllList();
//		return new ResponseEntity<List<Instructor>>(insList,HttpStatus.OK);
//	}
	
	@GetMapping("")
	public List<Instructor> getAllInstructor() {
		return instructorService.getAllInstructor();
	}
	
	//tìm một Instructor theo Id
	@GetMapping(path="/{id}")
	public ResponseEntity<Instructor> getJobTitleById(@PathVariable(value = "id") Long id)
			throws ResourceNotFoundException {
		Instructor instructor = instructorService.getInstructor(id);
		return ResponseEntity.ok().body(instructor);
		
//		Instructor instructor = instructorService.getOneInstructorById(id);
//		
//		//Không tìm thấy
//		if(instructor==null) {
//			return new ResponseEntity<Instructor>(HttpStatus.NOT_FOUND);
//		}
//		//Tìm thấy
//		return new ResponseEntity<Instructor>(instructor,HttpStatus.OK);
	}
	//create a new Instructor
	@PostMapping(path = "", consumes = "multipart/form-data")
	public ResponseEntity<?> createInstructor(@RequestParam("insCode") String insCode, @RequestParam("insName") String insName,
			@RequestParam("insGender") EnumGender insGender, @RequestParam("insBirthday") Date insBirthday,
			@RequestParam("insEmail") String insEmail, @RequestParam("insPhone") String insPhone,
			@RequestParam("insImg") MultipartFile insImg, 
			@RequestParam("insWorkStatus") EnumWorkStatus insWorkStatus, @RequestParam("insCertification") String insCertification,
			@RequestParam("insNote") String insNote, @RequestParam("insJobTitle") long insJobTitle)
			throws ResourceNotFoundException {

		if (insImg.isEmpty()) {
			HttpStatus.valueOf("Photo not found!");
		}
		// Lưu Hình
		String fileName = fileStorageService.storeFile(insImg);
		// Lấy tên hình
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		// Kiểm tra xem jobtitle đó có hay chưa?
		JobTitle jobType = jobtitleService.getJobTitle(insJobTitle);

		Instructor instructor = new Instructor();
		instructor.setInsCode(insCode);
		instructor.setInsName(insName);
		instructor.setInsGender(insGender);
		instructor.setInsBirthday(insBirthday);
		instructor.setInsEmail(insEmail);
		instructor.setInsPhone(insPhone);
		instructor.setInsImg(fileDownloadUri);
		instructor.setInsWorkStatus(insWorkStatus);
		instructor.setInsCertification(insCertification);
		instructor.setInsNote(insNote);
		instructor.setJobTitle(jobType);
		
		Instructor savedInstructor = this.instructorService.insertInstructor(instructor);
		HttpHeaders headers = new HttpHeaders();
		headers.set("MyHeader", "MyValue");
		return new ResponseEntity<>(savedInstructor, headers, HttpStatus.CREATED);
	}
//	public  ResponseEntity<Instructor> insertIns(@RequestBody Instructor instructorForm){
//		Instructor InsList = instructorService.findInstructorByInsCode(instructorForm.getInsCode());
//		//Nếu bằng null nghĩa là mã đó chưa tồn tại, cho thêm đối tượng, ngược lại thì báo conflict
//		if(InsList==null) {
//			System.out.println("Thêm Instructor thành công");
//			return new ResponseEntity<Instructor>(instructorService.saveInstructor(instructorForm),HttpStatus.CREATED);
//		}else {
//			System.out.println("Lỗi: Trùng mã insCode");
//			return new ResponseEntity<Instructor>(HttpStatus.CONFLICT);
//			
//		}
//	}
	//update a Instructor
	@PutMapping(path="/{id}", consumes = "multipart/form-data")
	public ResponseEntity<?> updateInstructor(@PathVariable(value = "id") Long id,
			@RequestParam("insCode") String insCode, @RequestParam("insName") String insName,
			@RequestParam("insGender") EnumGender insGender, @RequestParam("insBirthday") Date insBirthday,
			@RequestParam("insEmail") String insEmail, @RequestParam("insPhone") String insPhone,
			@RequestParam("insImg") MultipartFile insImg, @RequestParam("insCertification") String insCertification,
			@RequestParam("insWorkStatus") EnumWorkStatus insWorkStatus,
			@RequestParam("insNote") String insNote, @RequestParam("insJobTitle") long insJobTitle)
			throws ResourceNotFoundException {
		if(insImg.isEmpty()) {
			HttpStatus.valueOf("Not Found Photo!");
		}
		
		// Lưu Hình
		String fileName = fileStorageService.storeFile(insImg);
		// Lấy tên hình
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		// Kiểm tra xem jobtitle đó có hay chưa?
		JobTitle jobType = jobtitleService.getJobTitle(insJobTitle);
		
		Instructor instructor = new Instructor();
		instructor.setInsCode(insCode);
		instructor.setInsName(insName);
		instructor.setInsGender(insGender);
		instructor.setInsBirthday(insBirthday);
		instructor.setInsEmail(insEmail);
		instructor.setInsPhone(insPhone);
		instructor.setInsImg(fileDownloadUri);
		instructor.setInsWorkStatus(insWorkStatus);
		instructor.setInsCertification(insCertification);
		instructor.setInsNote(insNote);
		instructor.setJobTitle(jobType);
			
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.set("MyHeader", "MyValue");
		
		return new ResponseEntity<Instructor>(instructorService.insertInstructor(instructor),httpHeaders,HttpStatus.OK);
	}
	//	@PutMapping(path = "/{id}") 
//	public ResponseEntity<Instructor> updateIns(@PathVariable("id") Long id,@RequestBody Instructor instructorForm){
//		Instructor instructor = instructorService.getOneInstructorById(id);
////			List<String> insCodeOld = instructorService.findInstructorByInsCodeUpdate(instructor.getInsCode());
//
////			System.out.println("Code Cũ" + instructor.getInsCode());
////			System.out.println("Code Mới"+instructorForm.getInsCode());
//		
//		if(instructor.getInsCode().equals(instructorForm.getInsCode())) {
//			return new ResponseEntity<Instructor>(instructorService.saveInstructor(instructorForm),HttpStatus.OK);
//		}else if(checkCode(instructor.getInsCode(), instructorForm.getInsCode())) {
//			return new ResponseEntity<Instructor>(instructorService.saveInstructor(instructorForm),HttpStatus.OK);
//			
//		}else {
//			return new ResponseEntity<Instructor>(HttpStatus.CONFLICT);
//		}
//		
//
////			else{
////				instructor.setInsCode(instructorForm.getInsCode());
////				instructor.setInsName(instructorForm.getInsName());
////				instructor.setInsGender(instructorForm.getInsGender());
////				instructor.setInsBirthDay(instructorForm.getInsBirthDay());
////				instructor.setInsEmail(instructorForm.getInsEmail());
////				instructor.setInsPhone(instructorForm.getInsPhone());
////				instructor.setInsImg(instructorForm.getInsImg());
////				instructor.setInsStatus(instructorForm.getInsStatus());
////				instructor.setInsCertificate(instructorForm.getInsCertificate());
////				instructor.setInsNote(instructorForm.getInsNote());
////				
////				return new ResponseEntity<Instructor>(instructorService.saveInstructor(instructor),HttpStatus.OK);
////			}
//		
//	}
	
	//delete
	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteInstructor(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		instructorService.getInstructor(id);
		instructorService.deleteInstructor(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;

	}
//	@DeleteMapping(path="/{id}")
//	public void deleteIns(@PathVariable("id") Long id){
//		instructorService.deleteById(id);
//		
////		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//	}
//	
//	//Hàm check xem insCode có bị trùng hay không, nếu trùng thì không cho thêm.
//	public boolean checkCode(String codeOld, String codeNew) {
//		List<String> insCodeOld = instructorService.findInstructorByInsCodeUpdate(codeOld);
//		for(String ins : insCodeOld) {
//			if(codeNew.equals(ins))
//			{
//				return false;
//			}
//		}
//		return true;
//	}

}
