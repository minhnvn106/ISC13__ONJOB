package com.example.iscmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.TimeTable;

public interface TimeTableRepo extends JpaRepository<TimeTable, Long>{

}
