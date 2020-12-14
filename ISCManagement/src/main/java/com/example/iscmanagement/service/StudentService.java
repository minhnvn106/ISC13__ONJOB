package com.example.iscmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.StudentRepo;

@Service
@Transactional
public class StudentService {
	@Autowired
	private StudentRepo repo;
}
