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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.exception.ResourceNotFoundException;
import com.example.iscmanagement.model.Company;
import com.example.iscmanagement.model.Room;
import com.example.iscmanagement.service.CompanyService;
@CrossOrigin
@RestController
@RequestMapping("/api/companies")
public class CompanyController {
	@Autowired
	private CompanyService companyService;

	// get all company
	@GetMapping("")
	public List<Company> getAllCompany() {
		return companyService.getAllCompany();
	}

	// get company by id
	@GetMapping("/{id}")
	public ResponseEntity<Company> getCompanyById(@PathVariable(value = "id") Long companyId)
			throws ResourceNotFoundException {
		Company company = companyService.getCompany(companyId);
		return ResponseEntity.ok().body(company);
	}

	// insert company
	@PostMapping("")
	public Company createRoom(@RequestBody Company company) {
		return companyService.insertCompany(company);
	}

	@PutMapping("/{id}")
	public ResponseEntity updateRoom(@PathVariable(value = "id") Long id, @RequestBody Company companyDetails)
			throws ResourceNotFoundException {
		Company company = companyService.getCompany(id);
		company.setCompanyAddress(companyDetails.getCompanyAddress());
		company.setCompanyContactPerson(companyDetails.getCompanyContactPerson());
		company.setCompanyName(companyDetails.getCompanyName());
		company.setCompanyPhone(companyDetails.getCompanyPhone());
		company.setCompanyStatus(companyDetails.getCompanyStatus());
		company.setCompanyUrl(companyDetails.getCompanyUrl());
		companyService.insertCompany(company);
		return ResponseEntity.ok(company);
	}

	@DeleteMapping("/{id}")
	public Map<String, Boolean> deleteRoom(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		companyService.getCompany(id);
		companyService.deleteCompany(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;

	}
}
