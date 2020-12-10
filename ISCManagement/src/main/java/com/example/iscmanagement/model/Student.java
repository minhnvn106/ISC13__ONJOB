package com.example.iscmanagement.model;

import java.util.Date;
import javax.persistence.*;

@Entity
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long stdId;
	@Column(unique = true, nullable = false, length = 20)
	private String stdCode;
	private String stdName;
	private EnumGender stdGender = EnumGender.Male;
	@Temporal(TemporalType.DATE)
	private Date stdBirthday;
	private String stdEmail;
	@Column(length = 12)
	private String stdPhone;
	private String stdImg;
	private EnumStdType stdType;
	private Double stdGPA;
	private EnumWorkStatus stdWorkStatus;
	@Column(length = 2000)
	private String stdNote;
	@ManyToOne
	@JoinColumn(name = "company_fk")
	private Company company;
	@ManyToOne
	@JoinColumn(name = "university_fk")
	private University university;

}
