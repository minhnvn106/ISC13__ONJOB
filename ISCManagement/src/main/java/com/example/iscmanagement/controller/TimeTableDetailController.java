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
import com.example.iscmanagement.model.TimeTableDetail;
import com.example.iscmanagement.service.TimeTableDetailService;

@CrossOrigin
@RestController
@RequestMapping("/api/timetabledetails")
public class TimeTableDetailController {
	@Autowired
	private TimeTableDetailService service;
	
	@GetMapping("")
	public List<TimeTableDetail> getAllTimeTableDetail() {
		return service.getAllTimeTableDetail();
	}

	@GetMapping("/{id}")
	public ResponseEntity<TimeTableDetail> getTimeTableDetailById(@PathVariable(value = "id") Long timeTableDetailId)
			throws ResourceNotFoundException {
		TimeTableDetail timeTableDetail = service.getTimeTableDetail(timeTableDetailId);
		return ResponseEntity.ok().body(timeTableDetail);
	}

	@PostMapping("")
	public TimeTableDetail createTimeTableDetail(@RequestBody TimeTableDetail timeTableDetail) {
		return service.insertTimeTableDetail(timeTableDetail);
	}

	@PutMapping("/{id}")
	public ResponseEntity updateRoom(@PathVariable(value = "id") Long id, @RequestBody TimeTableDetail timeTableDetailDetails)
			throws ResourceNotFoundException {
		TimeTableDetail timeTableDetail = service.getTimeTableDetail(id);
		timeTableDetail.setDate(timeTableDetailDetails.getDate());
		timeTableDetail.setFromTime(timeTableDetailDetails.getFromTime());
		timeTableDetail.setToTime(timeTableDetailDetails.getToTime());
		service.insertTimeTableDetail(timeTableDetail);
		return ResponseEntity.ok(timeTableDetail);
	}

	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteRoom(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		service.deleteTimeTableDetail(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;

	}
}
