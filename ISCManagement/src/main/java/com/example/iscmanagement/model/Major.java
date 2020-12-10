package com.example.iscmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Major {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long majorID;
	@Column(unique = true, nullable = false, length = 20)
	private String majorCode;
	private String majorName;

}
