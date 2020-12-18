package com.example.iscmanagement.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	@JsonBackReference	
	private List<Student> students;
	public Company() {
		super();
	}
	public Company(String companyName, String companyAddress, String companyContactPerson, String companyPhone,
			String companyUrl, EnumStatus companyStatus, List<Student> students) {
		super();
		this.companyName = companyName;
		this.companyAddress = companyAddress;
		this.companyContactPerson = companyContactPerson;
		this.companyPhone = companyPhone;
		this.companyUrl = companyUrl;
		this.companyStatus = companyStatus;
		this.students = students;
	}
	public Long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getCompanyAddress() {
		return companyAddress;
	}
	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}
	public String getCompanyContactPerson() {
		return companyContactPerson;
	}
	public void setCompanyContactPerson(String companyContactPerson) {
		this.companyContactPerson = companyContactPerson;
	}
	public String getCompanyPhone() {
		return companyPhone;
	}
	public void setCompanyPhone(String companyPhone) {
		this.companyPhone = companyPhone;
	}
	public String getCompanyUrl() {
		return companyUrl;
	}
	public void setCompanyUrl(String companyUrl) {
		this.companyUrl = companyUrl;
	}
	public EnumStatus getCompanyStatus() {
		return companyStatus;
	}
	public void setCompanyStatus(EnumStatus companyStatus) {
		this.companyStatus = companyStatus;
	}
	public List<Student> getStudents() {
		return students;
	}
	public void setStudents(List<Student> students) {
		this.students = students;
	}
	@Override
	public String toString() {
		return "Company [companyId=" + companyId + ", companyName=" + companyName + ", companyAddress=" + companyAddress
				+ ", companyContactPerson=" + companyContactPerson + ", companyPhone=" + companyPhone + ", companyUrl="
				+ companyUrl + ", companyStatus=" + companyStatus + ", students=" + students + "]";
	}
	
	
}
