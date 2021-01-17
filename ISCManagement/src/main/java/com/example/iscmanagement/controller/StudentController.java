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
import com.example.iscmanagement.model.Company;
import com.example.iscmanagement.model.EnumGender;
import com.example.iscmanagement.model.EnumStdType;
import com.example.iscmanagement.model.EnumWorkStatus;
import com.example.iscmanagement.model.Room;
import com.example.iscmanagement.model.Student;
import com.example.iscmanagement.model.University;
import com.example.iscmanagement.service.CompanyService;
import com.example.iscmanagement.service.FileStorageService;
import com.example.iscmanagement.service.StudentService;
import com.example.iscmanagement.service.UniversityService;

@CrossOrigin
@RestController
@RequestMapping("/api/students")
public class StudentController {
	@Autowired
	private FileStorageService fileStorageService;

	@Autowired
	private StudentService studentService;

	@Autowired
	private CompanyService companyService;

	@Autowired
	private UniversityService universityService;

	// get all student
	@GetMapping("")
	public List<Student> getAllStudent() {
		return studentService.getAllStudent();
	}

	// get student by id
	@GetMapping("/{id}")
	public ResponseEntity<Student> getUniversityById(@PathVariable(value = "id") Long studentId)
			throws ResourceNotFoundException {
		Student student = studentService.getStudent(studentId);
		return ResponseEntity.ok().body(student);
	}

	// insert student
//	@PostMapping("")
//	public Student createStudent(@RequestBody Student student) {
//		return studentService.insertStudent(student);
//	}
	@PostMapping(path = "", consumes = "multipart/form-data")
	public ResponseEntity<?> createStudent(@RequestParam("stdCode") String stdCode, @RequestParam("stdName") String stdName,
			@RequestParam("stdGender") EnumGender stdGender, @RequestParam("stdBirthday") Date stdBirthday,
			@RequestParam("stdEmail") String stdEmail, @RequestParam("stdPhone") String stdPhone,
			@RequestParam("stdImg") MultipartFile stdImg, @RequestParam("stdType") EnumStdType stdType,
			@RequestParam("stdGPA") Double stdGPA, @RequestParam("stdWorkStatus") EnumWorkStatus stdWorkStatus,
			@RequestParam("stdNote") String stdNote, @RequestParam("stdCompany") long stdCompany,
			@RequestParam("stdUniversity") long stdUniversity) throws ResourceNotFoundException {

		if (stdImg.isEmpty()) {
			HttpStatus.valueOf("Photo not found!");
		}
		// Lưu Hình
		String fileName = fileStorageService.storeFile(stdImg);
		// Lấy tên hình
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		// Kiểm tra xem company đó có hay chưa?
		Company comType = companyService.getCompany(stdCompany);

		// Kiểm tra xem university đó có hay chưa?
		University uniType = universityService.getUniversity(stdUniversity);

		Student student = new Student();
		student.setStdCode(stdCode);
		student.setStdName(stdName);
		student.setStdGender(stdGender);
		student.setStdBirthday(stdBirthday);
		student.setStdEmail(stdEmail);
		student.setStdPhone(stdPhone);
		student.setStdImg(fileDownloadUri);
		student.setStdType(stdType);
		student.setStdGPA(stdGPA);
		student.setStdWorkStatus(stdWorkStatus);
		student.setStdNote(stdNote);
		student.setCompany(comType);
		student.setUniversity(uniType);
		
		Student savedStudent = this.studentService.insertStudent(student);
		HttpHeaders headers = new HttpHeaders();
		headers.set("MyHeader", "MyValue");
		return new ResponseEntity<>(savedStudent, headers, HttpStatus.CREATED);
	}

	@PutMapping(path="/{id}", consumes = "multipart/form-data")
	public ResponseEntity<?> updateStudent(@PathVariable(value = "id") Long studentId,
			@RequestParam("stdCode") String stdCode, @RequestParam("stdName") String stdName,
			@RequestParam("stdGender") EnumGender stdGender, @RequestParam("stdBirthday") Date stdBirthday,
			@RequestParam("stdEmail") String stdEmail, @RequestParam("stdPhone") String stdPhone,
			@RequestParam("stdImg") MultipartFile stdImg, @RequestParam("stdType") EnumStdType stdType,
			@RequestParam("stdGPA") Double stdGPA, @RequestParam("stdWorkStatus") EnumWorkStatus stdWorkStatus,
			@RequestParam("stdNote") String stdNote, @RequestParam("stdCompany") long stdCompany,
			@RequestParam("stdUniversity")long stdUniversity)
			throws ResourceNotFoundException {
		if(stdImg.isEmpty()) {
			HttpStatus.valueOf("Not Found Photo!");
		}
		
		// Lưu Hình
		String fileName = fileStorageService.storeFile(stdImg);
		// Lấy tên hình
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		// Kiểm tra xem company đó có hay chưa?
		Company comType = companyService.getCompany(stdCompany);

		// Kiểm tra xem university đó có hay chưa?
		University uniType = universityService.getUniversity(stdUniversity);
		
		Student student = studentService.getStudent(studentId);
		
			student.setStdCode(stdCode);
			student.setStdName(stdName);
			student.setStdGender(stdGender);
			student.setStdBirthday(stdBirthday);
			student.setStdEmail(stdEmail);
			student.setStdPhone(stdPhone);
			student.setStdImg(fileDownloadUri);
			student.setStdType(stdType);
			student.setStdGPA(stdGPA);
			student.setStdWorkStatus(stdWorkStatus);
			student.setStdNote(stdNote);
			student.setCompany(comType);
			student.setUniversity(uniType);
			
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.set("MyHeader", "MyValue");
		
		return new ResponseEntity<Student>(studentService.insertStudent(student),httpHeaders,HttpStatus.OK);
	}
	
	//Update Không có hình ảnh
	@PutMapping(path="/updateWTI/{id}", consumes = "multipart/form-data")
	public ResponseEntity<?> updateStudentWithoutImg(@PathVariable(value = "id") Long studentId,
			@RequestParam("stdCode") String stdCode, @RequestParam("stdName") String stdName,
			@RequestParam("stdGender") EnumGender stdGender, @RequestParam("stdBirthday") Date stdBirthday,
			@RequestParam("stdEmail") String stdEmail, @RequestParam("stdPhone") String stdPhone,
			@RequestParam("stdType") EnumStdType stdType,
			@RequestParam("stdGPA") Double stdGPA, @RequestParam("stdWorkStatus") EnumWorkStatus stdWorkStatus,
			@RequestParam("stdNote") String stdNote, @RequestParam("stdCompany") long stdCompany,
			@RequestParam("stdUniversity")long stdUniversity)
			throws ResourceNotFoundException {
		


		// Kiểm tra xem company đó có hay chưa?
		Company comType = companyService.getCompany(stdCompany);

		// Kiểm tra xem university đó có hay chưa?
		University uniType = universityService.getUniversity(stdUniversity);
		
		Student student = studentService.getStudent(studentId);
		
			student.setStdCode(stdCode);
			student.setStdName(stdName);
			student.setStdGender(stdGender);
			student.setStdBirthday(stdBirthday);
			student.setStdEmail(stdEmail);
			student.setStdPhone(stdPhone);
			student.setStdType(stdType);
			student.setStdGPA(stdGPA);
			student.setStdWorkStatus(stdWorkStatus);
			student.setStdNote(stdNote);
			student.setCompany(comType);
			student.setUniversity(uniType);
			
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.set("MyHeader", "MyValue");
		
		return new ResponseEntity<Student>(studentService.insertStudent(student),httpHeaders,HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteStudent(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		studentService.getStudent(id);
		studentService.deleteStudent(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;

	}
}
