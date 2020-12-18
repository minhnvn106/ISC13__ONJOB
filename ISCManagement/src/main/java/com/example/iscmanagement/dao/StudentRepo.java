package com.example.iscmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.iscmanagement.model.Student;

public interface StudentRepo extends JpaRepository<Student, Long>{

	@Query( value = "Select std_code from room where std_code = ?1 and std_code = ?2", nativeQuery = true)
	public List<Student> checkStdCodeUpdate(String oldStdCode, String newStdCode);
}
