package com.example.iscmanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.JobTitle;
import com.example.iscmanagement.model.TimeTable;
import com.example.iscmanagement.service.TimeTableService;

@RestController
@RequestMapping("/api/timetables")
public class TimeTableController {
	@Autowired
	private TimeTableService service;

	@GetMapping("")
	public List<TimeTable> getAllTimeTable() {
		return service.getAllTimeTable();
	}

	@GetMapping("/{id}")
	public ResponseEntity<TimeTable> getTimeTableById(@PathVariable(value = "id") Long timeTableId)
			throws ResourceNotFoundException {
		TimeTable timeTable = service.getTimeTable(timeTableId);
		return ResponseEntity.ok().body(timeTable);
	}

	@PostMapping("")
	public TimeTable createTimeTable(@RequestBody TimeTable timeTable) {
		return service.insertTimeTable(timeTable);
	}

	@PutMapping("/{id}")
	public ResponseEntity updateTimeTable(@PathVariable(value = "id") Long id, @RequestBody TimeTable timeTableDetails)
			throws ResourceNotFoundException {
		TimeTable timeTable = service.getTimeTable(id);
		timeTable.setWeekNumber(timeTableDetails.getWeekNumber());
		timeTable.setFromTime(timeTableDetails.getFromTime());
		timeTable.setToTime(timeTableDetails.getToTime());
		service.insertTimeTable(timeTable);
		return ResponseEntity.ok(timeTable);
	}

	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteTimeTable(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		service.deleteTimeTable(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;

	}
}
