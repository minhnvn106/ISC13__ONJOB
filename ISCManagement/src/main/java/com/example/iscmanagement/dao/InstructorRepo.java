package com.example.iscmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.iscmanagement.model.Instructor;

public interface InstructorRepo extends JpaRepository<Instructor, Long>{
	//Load danh sách các instructor không có mã insCode truyền vào
	@Query(value="select ins_code from instructors where ins_code not in ( select ins_code from instructors where ins_code = ?1 )", nativeQuery = true)
	List<String> findByInsCodeUpdate(String insCode);
	
	@Query("select i from Instructor i where insCode = ?1")
	Instructor findByInsCode(String insCode);
}
