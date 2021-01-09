package com.example.iscmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.Assignment;
import com.example.iscmanagement.model.AssignmentEmbedded;

public interface AssignmentRepo extends JpaRepository<Assignment, AssignmentEmbedded>{

}
