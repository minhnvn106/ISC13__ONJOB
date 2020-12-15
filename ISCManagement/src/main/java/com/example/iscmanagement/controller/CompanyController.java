package com.example.iscmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.model.Company;
import com.example.iscmanagement.service.CompanyService;

@RestController
public class CompanyController {
	@Autowired
	private CompanyService companyService;
	
	@RequestMapping(value = { "listCompanys" }, method = RequestMethod.GET)
	public List<Company> getAllCompany() {
		return companyService.getAllCompany();
	}
	@RequestMapping(value = { "deleteCompany" }, method = RequestMethod.GET)
	public void deleteCompany(@RequestParam Long id) {
		companyService.deleteCompany(id);
	}
	@RequestMapping(path = { "updateCompany", "addCompany" }, method = RequestMethod.POST)
	public void updateCompany(@RequestBody Company company) {
		companyService.insertCompany(company);

	}
}
