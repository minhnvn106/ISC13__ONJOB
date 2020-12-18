package com.example.iscmanagement.model;

import java.util.Date;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	@JsonManagedReference
	@JoinColumn(name = "company_fk")
	private Company company;
	@ManyToOne
	@JsonManagedReference
	@JoinColumn(name = "university_fk")
	private University university;
	public Student() {
		super();
	}
	public Student(String stdCode, String stdName, EnumGender stdGender, Date stdBirthday, String stdEmail,
			String stdPhone, String stdImg, EnumStdType stdType, Double stdGPA, EnumWorkStatus stdWorkStatus,
			String stdNote, Company company, University university) {
		super();
		this.stdCode = stdCode;
		this.stdName = stdName;
		this.stdGender = stdGender;
		this.stdBirthday = stdBirthday;
		this.stdEmail = stdEmail;
		this.stdPhone = stdPhone;
		this.stdImg = stdImg;
		this.stdType = stdType;
		this.stdGPA = stdGPA;
		this.stdWorkStatus = stdWorkStatus;
		this.stdNote = stdNote;
		this.company = company;
		this.university = university;
	}
	public Long getStdId() {
		return stdId;
	}
	public void setStdId(Long stdId) {
		this.stdId = stdId;
	}
	public String getStdCode() {
		return stdCode;
	}
	public void setStdCode(String stdCode) {
		this.stdCode = stdCode;
	}
	public String getStdName() {
		return stdName;
	}
	public void setStdName(String stdName) {
		this.stdName = stdName;
	}
	public EnumGender getStdGender() {
		return stdGender;
	}
	public void setStdGender(EnumGender stdGender) {
		this.stdGender = stdGender;
	}
	public Date getStdBirthday() {
		return stdBirthday;
	}
	public void setStdBirthday(Date stdBirthday) {
		this.stdBirthday = stdBirthday;
	}
	public String getStdEmail() {
		return stdEmail;
	}
	public void setStdEmail(String stdEmail) {
		this.stdEmail = stdEmail;
	}
	public String getStdPhone() {
		return stdPhone;
	}
	public void setStdPhone(String stdPhone) {
		this.stdPhone = stdPhone;
	}
	public String getStdImg() {
		return stdImg;
	}
	public void setStdImg(String stdImg) {
		this.stdImg = stdImg;
	}
	public EnumStdType getStdType() {
		return stdType;
	}
	public void setStdType(EnumStdType stdType) {
		this.stdType = stdType;
	}
	public Double getStdGPA() {
		return stdGPA;
	}
	public void setStdGPA(Double stdGPA) {
		this.stdGPA = stdGPA;
	}
	public EnumWorkStatus getStdWorkStatus() {
		return stdWorkStatus;
	}
	public void setStdWorkStatus(EnumWorkStatus stdWorkStatus) {
		this.stdWorkStatus = stdWorkStatus;
	}
	public String getStdNote() {
		return stdNote;
	}
	public void setStdNote(String stdNote) {
		this.stdNote = stdNote;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public University getUniversity() {
		return university;
	}
	public void setUniversity(University university) {
		this.university = university;
	}
	@Override
	public String toString() {
		return "Student [stdId=" + stdId + ", stdCode=" + stdCode + ", stdName=" + stdName + ", stdGender=" + stdGender
				+ ", stdBirthday=" + stdBirthday + ", stdEmail=" + stdEmail + ", stdPhone=" + stdPhone + ", stdImg="
				+ stdImg + ", stdType=" + stdType + ", stdGPA=" + stdGPA + ", stdWorkStatus=" + stdWorkStatus
				+ ", stdNote=" + stdNote + ", company=" + company + ", university=" + university + "]";
	}


}
