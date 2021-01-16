package com.example.iscmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.iscmanagement.model.Subject;

public interface SubjectRepo extends JpaRepository<Subject, Long>{
	@Query(value="select sub_code from subject where sub_code !=?1 and sub_code = ?2", nativeQuery = true)
	List<String> checkSubjectCodeUpdate(String oldSubCode,String newSubCode);
	List<Subject> findBySubCode(String subCode);
}
