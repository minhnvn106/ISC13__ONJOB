package com.example.iscmanagement.model;

import java.util.List;

import javax.persistence.*;

@Entity
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long companyId;
	private String companyName;
	@Column(length = 1000)
	private String companyAddress;
	private String companyContactPerson;
	@Column(length = 12)
	private String companyPhone;
	@Column(length = 500)
	private String companyUrl;
	private EnumStatus companyStatus;
	@OneToMany(mappedBy = "company")
	private List<Student> students;
}
