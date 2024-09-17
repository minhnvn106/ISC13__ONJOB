package com.example.iscmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.iscmanagement.model.Intake;

public interface IntakeRepo extends JpaRepository<Intake, Long>{
	@Query(value="select intake_code from intake where intake_code !=?1 and intake_code = ?2", nativeQuery = true)
	List<String> checkIntakeCodeUpdate(String oldIntakeCode,String newIntakeCode);
	List<Intake> findByIntakeCode(String intakeCode);
}
