package com.example.iscmanagement.dao;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.iscmanagement.model.ISCAccount;


public interface ISCAccountRepo extends JpaRepository<ISCAccount, Integer> {

	  boolean existsByUsername(String username);

	  ISCAccount findByUsername(String username);

	  @Transactional
	  void deleteByUsername(String username);

	}
