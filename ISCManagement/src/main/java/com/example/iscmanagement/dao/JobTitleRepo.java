package com.example.iscmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.JobTitle;

public interface JobTitleRepo extends JpaRepository<JobTitle, Long>{

}
