package com.example.iscmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Subject {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long subID;
	@Column(unique = true, nullable = false, length = 20)
	private String subCode;
	private String subName;
	private double subCredit;
	private double subPassScore;
	private EnumStatus subStatus;

}
