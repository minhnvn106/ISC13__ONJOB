package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.TimeTableRepo;
import com.example.iscmanagement.model.TimeTable;

@Service
@Transactional
public class TimeTableService {
	@Autowired
	private TimeTableRepo repo;

	// get all timeTable
	public List<TimeTable> getAllTimeTable() {
		return repo.findAll();
	}

	// get TimeTable by id
	public TimeTable getTimeTable(long id) {
		return repo.findById(id).get();
	}

	// insert TimeTable
	public TimeTable insertTimeTable(TimeTable timeTable) {
		return repo.save(timeTable);
	}

	// delete TimeTable by id
	public void deleteTimeTable(long id) {
		repo.deleteById(id);
	}
}
