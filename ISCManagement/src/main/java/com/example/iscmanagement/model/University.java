package com.example.iscmanagement.model;

import java.util.List;

import javax.persistence.*;


@Entity
public class University {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long universityId;
	private String universityName;
	private String universityAddress;
	private String universityContactPerson;
	@Column(length = 12)
	private String universityPhone;
	private String universityUrl;
	@OneToMany(mappedBy = "university")
	private List<Student> students;
}
