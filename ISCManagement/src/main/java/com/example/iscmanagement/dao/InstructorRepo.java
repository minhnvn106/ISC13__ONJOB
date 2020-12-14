package com.example.iscmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.Instructor;

public interface InstructorRepo extends JpaRepository<Instructor, Long>{

}
