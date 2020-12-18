package com.example.iscmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.iscmanagement.dao.CompanyRepo;
import com.example.iscmanagement.model.Company;

@Service
@Transactional
public class CompanyService {
	@Autowired
	private CompanyRepo repo;

//get all major Company
	public List<Company> getAllCompany() {
		return repo.findAll();
	}

//get Company by id
	public Company getCompany(long id) {
		return repo.findById(id).get();
	}

// insert Company
	public void insertCompany(Company company) {
		repo.save(company);
	}

//delete Company by id
	public void deleteCompany(long id) {
		repo.deleteById(id);
	}
}
