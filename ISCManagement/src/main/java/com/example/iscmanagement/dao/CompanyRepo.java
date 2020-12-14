package com.example.iscmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.Company;

public interface CompanyRepo extends JpaRepository<Company, Long>{

}
