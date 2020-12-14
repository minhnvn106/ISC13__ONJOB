package com.example.iscmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.Subject;

public interface SubjectRepo extends JpaRepository<Subject, Long>{

}
