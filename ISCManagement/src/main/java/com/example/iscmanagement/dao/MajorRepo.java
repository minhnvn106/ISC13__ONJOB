package com.example.iscmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.iscmanagement.model.Major;

public interface MajorRepo extends JpaRepository<Major, Long>{
	//
		@Query(value="select major_code from major where major_code !=?1 and major_code = ?2", nativeQuery = true)
		List<String> checkMajorCodeUpdate(String oldMajorCode,String newMajorCode);
		List<Major> findByMajorCode(String majorCode);
}
