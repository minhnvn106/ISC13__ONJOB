package com.example.iscmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.Student;

public interface StudentRepo extends JpaRepository<Student, Long>{

}
