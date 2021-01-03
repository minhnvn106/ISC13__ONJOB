package com.example.iscmanagement.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import com.example.iscmanagement.model.Room;
import com.example.iscmanagement.model.Student;
import com.example.iscmanagement.service.FileStorageService;
import com.example.iscmanagement.service.StudentService;

@CrossOrigin
@RestController
@RequestMapping("/api/students")

public class StudentController {
	@Autowired
	private StudentService studentService;
	@Autowired
	private ServletContext servletContext;
	@Value("${file.upload-dir}")
	private String UPLOADED_FOLDER;
	@Autowired
	private FileStorageService fileStorageService;

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
	@PostMapping("")
	public Student createStudent(@RequestParam("file") MultipartFile stdImg,
			@RequestBody @RequestParam Student studentDetails) {
		Student student = new Student();
		student.setStdBirthday(studentDetails.getStdBirthday());
		student.setStdEmail(studentDetails.getStdEmail());
		student.setStdGPA(studentDetails.getStdGPA());
		student.setStdGender(studentDetails.getStdGender());
//		student.setStdImg(studentDetails.getStdImg());
		student.setStdName(studentDetails.getStdName());
		student.setStdNote(studentDetails.getStdNote());
		student.setStdPhone(studentDetails.getStdPhone());
		student.setStdType(studentDetails.getStdType());
		student.setStdWorkStatus(studentDetails.getStdWorkStatus());
		student.setCompany(studentDetails.getCompany());
		student.setUniversity(studentDetails.getUniversity());

		if (stdImg.isEmpty()) {

		}
		Path path = Paths.get(UPLOADED_FOLDER);
		try {
			InputStream inputStream = stdImg.getInputStream();
			Files.copy(inputStream, path.resolve(stdImg.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
			student.setStdImg(stdImg.getOriginalFilename() + "_" + student.getStdCode());

		} catch (Exception e) {
			// TODO: handle exception
		}
		return studentService.insertStudent(student);
	}

	@PutMapping("/{id}")
	public ResponseEntity updateStudent(@PathVariable(value = "id") Long studentId, @RequestBody Student studentDetails)
			throws ResourceNotFoundException {
		Student student = studentService.getStudent(studentId);
		String oldStdCode = student.getStdCode();
		String newStdCode = studentDetails.getStdCode();
		if (oldStdCode.equalsIgnoreCase(newStdCode) || studentService.checkStdCodeUpdate(oldStdCode, newStdCode)) {
			student.setStdCode(studentDetails.getStdCode());
			student.setStdBirthday(studentDetails.getStdBirthday());
			student.setStdEmail(studentDetails.getStdEmail());
			student.setStdGPA(studentDetails.getStdGPA());
			student.setStdGender(studentDetails.getStdGender());
			student.setStdImg(studentDetails.getStdImg());
			student.setStdName(studentDetails.getStdName());
			student.setStdNote(studentDetails.getStdNote());
			student.setStdPhone(studentDetails.getStdPhone());
			student.setStdType(studentDetails.getStdType());
			student.setStdWorkStatus(studentDetails.getStdWorkStatus());
			student.setCompany(studentDetails.getCompany());
			student.setUniversity(studentDetails.getUniversity());
			studentService.insertStudent(student);
			return ResponseEntity.ok(student);
		}
		return ResponseEntity.badRequest().body("duplicated student code");
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
