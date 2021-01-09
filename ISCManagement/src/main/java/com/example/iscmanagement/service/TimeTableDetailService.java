package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.TimeTableDetailRepo;
import com.example.iscmanagement.model.TimeTableDetail;

@Service
@Transactional
public class TimeTableDetailService {
	@Autowired
	private TimeTableDetailRepo repo;

	// get all timeTableDetail
	public List<TimeTableDetail> getAllTimeTableDetail() {
		return repo.findAll();
	}

	// get timeTableDetail by id
	public TimeTableDetail getTimeTableDetail(long id) {
		return repo.findById(id).get();
	}

	// insert timeTableDetail
	public TimeTableDetail insertTimeTableDetail(TimeTableDetail timeTableDetail) {
		return repo.save(timeTableDetail);
	}

	// delete timeTableDetail by id
	public void deleteTimeTableDetail(long id) {
		repo.deleteById(id);
	}

}
