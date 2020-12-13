package com.example.iscmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.IntakeRepo;

@Service
@Transactional
public class IntakeService {
	@Autowired
	private IntakeRepo repo;
}
