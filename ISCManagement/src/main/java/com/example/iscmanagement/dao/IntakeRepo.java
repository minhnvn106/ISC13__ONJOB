package com.example.iscmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.Intake;

public interface IntakeRepo extends JpaRepository<Intake, Long>{

}
