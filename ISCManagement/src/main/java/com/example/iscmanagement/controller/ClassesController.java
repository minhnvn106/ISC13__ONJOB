package com.example.iscmanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Classes;
import com.example.iscmanagement.service.ClassService;

@CrossOrigin
@RestController
@RequestMapping("/api/classes")
public class ClassesController {
	@Autowired
	private ClassService classService;

	// get All class
	@GetMapping("")
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	@ApiResponses(value = { @ApiResponse(code = 400, message = "Something went wrong"),
//			@ApiResponse(code = 403, message = "Access dinied") })
	public List<Classes> getAllClass() {
		return classService.getAllClass();
	}

	@GetMapping("/{id}")
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	@ApiResponses(value = { @ApiResponse(code = 400, message = "Something went wrong"),
//			@ApiResponse(code = 404, message = "The class doesn't exists"),
//			@ApiResponse(code = 403, message = "Access dinied") })
	public ResponseEntity<Classes> getClassesById(@PathVariable(value = "id") Long classId)
			throws ResourceNotFoundException {
		Classes classes = classService.getClasses(classId);
		return ResponseEntity.ok().body(classes);
	}

	@PostMapping("")
//	@ApiResponses(value = { @ApiResponse(code = 400, message = "Something went wrong"),
//			@ApiResponse(code = 403, message = "Access dinied") })
	public Classes createClasses(@RequestBody Classes classes) {
		return classService.insertClasses(classes);
	}

	@PutMapping("/{id}")
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	@ApiResponses(value = { @ApiResponse(code = 400, message = "Something went wrong"),
//			@ApiResponse(code = 403, message = "Access dinied") })
	public ResponseEntity updateClass(@PathVariable(value = "id") Long id, @RequestBody Classes classDetails)
			throws ResourceNotFoundException {
		Classes classes = classService.getClasses(id);
		String oldRoomCode = classes.getClassCode();
		String newRoomCode = classDetails.getClassCode();
		if (oldRoomCode.equalsIgnoreCase(newRoomCode)
				|| classService.checkClassesCodeUpdate(oldRoomCode, newRoomCode)) {
			classes.setClassCode(classDetails.getClassCode());
			classes.setClassName(classDetails.getClassName());
			classes.setMaxStudent(classDetails.getMaxStudent());
			classes.setQuantity(classDetails.getQuantity());
			classService.insertClasses(classes);
			return ResponseEntity.ok(classes);
		}
		return ResponseEntity.badRequest().body("duplicated room code");
	}

	@DeleteMapping("/{id}")
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	@ApiResponses(value = { @ApiResponse(code = 400, message = "Something went wrong"),
//			@ApiResponse(code = 403, message = "Access dinied") })
	public Map<String, Boolean> deleteClass(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		classService.getClasses(id);
		classService.deleteClasses(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;

	}
}
