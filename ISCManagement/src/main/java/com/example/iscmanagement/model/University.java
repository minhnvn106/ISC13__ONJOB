package com.example.iscmanagement.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class University {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long universityId;
	private String universityName;
	private String universityAddress;
	private String universityContactPerson;
	@Column(length = 12)
	private String universityPhone;
	private String universityUrl;
	@OneToMany(mappedBy = "university")
	@JsonBackReference	
	private List<Student> students;
	public University() {
		super();
	}
	public University(String universityName, String universityAddress, String universityContactPerson,
			String universityPhone, String universityUrl, List<Student> students) {
		super();
		this.universityName = universityName;
		this.universityAddress = universityAddress;
		this.universityContactPerson = universityContactPerson;
		this.universityPhone = universityPhone;
		this.universityUrl = universityUrl;
		this.students = students;
	}
	public Long getUniversityId() {
		return universityId;
	}
	public void setUniversityId(Long universityId) {
		this.universityId = universityId;
	}
	public String getUniversityName() {
		return universityName;
	}
	public void setUniversityName(String universityName) {
		this.universityName = universityName;
	}
	public String getUniversityAddress() {
		return universityAddress;
	}
	public void setUniversityAddress(String universityAddress) {
		this.universityAddress = universityAddress;
	}
	public String getUniversityContactPerson() {
		return universityContactPerson;
	}
	public void setUniversityContactPerson(String universityContactPerson) {
		this.universityContactPerson = universityContactPerson;
	}
	public String getUniversityPhone() {
		return universityPhone;
	}
	public void setUniversityPhone(String universityPhone) {
		this.universityPhone = universityPhone;
	}
	public String getUniversityUrl() {
		return universityUrl;
	}
	public void setUniversityUrl(String universityUrl) {
		this.universityUrl = universityUrl;
	}
	public List<Student> getStudents() {
		return students;
	}
	public void setStudents(List<Student> students) {
		this.students = students;
	}
	@Override
	public String toString() {
		return "University [universityId=" + universityId + ", universityName=" + universityName
				+ ", universityAddress=" + universityAddress + ", universityContactPerson=" + universityContactPerson
				+ ", universityPhone=" + universityPhone + ", universityUrl=" + universityUrl + ", students=" + students
				+ "]";
	}
	
	
}
