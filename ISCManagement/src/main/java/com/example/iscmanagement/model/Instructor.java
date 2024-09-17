package com.example.iscmanagement.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Instructor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long insId;
	@Column(unique = true, nullable = false, length = 20)
	private String insCode;
	private String insName;

//	@Enumerated(EnumType.ORDINAL)
//	private EnumGender insGender;
	
	private EnumGender insGender = EnumGender.Male;
	
	@Temporal(TemporalType.DATE)
	private Date insBirthday;
	private String insEmail;
	@Column(length = 12)
	private String insPhone;
	private String insImg;
	private String insCertification;
	
//	private EnumWorkStatus insWorkStatus;
//	@Enumerated(EnumType.ORDINAL)
	@Enumerated()
	private EnumWorkStatus insWorkStatus;
	
	@Column(length = 2000)
	private String insNote;
	
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "jobtitle_fk")
	private JobTitle jobTitle;
	
//	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
//	@OneToMany(fetch = FetchType.LAZY)
//	@JoinColumn(name = "account_student_fk")
//	private List<ISCAccount> listAccount;
	
	
	public Instructor(Long insId, String insCode, String insName, EnumGender insGender, Date insBirthday,
			String insEmail, String insPhone, String insImg, String insCertification, EnumWorkStatus insWorkStatus,
			String insNote, JobTitle jobTitle) {
		super();
		this.insId = insId;
		this.insCode = insCode;
		this.insName = insName;
		this.insGender = insGender;
		this.insBirthday = insBirthday;
		this.insEmail = insEmail;
		this.insPhone = insPhone;
		this.insImg = insImg;
		this.insCertification = insCertification;
		this.insWorkStatus = insWorkStatus;
		this.insNote = insNote;
		this.jobTitle = jobTitle;
		
	}
	public Instructor() {
		super();
	}
	public Long getInsId() {
		return insId;
	}
	public void setInsId(Long insId) {
		this.insId = insId;
	}
	public String getInsCode() {
		return insCode;
	}
	public void setInsCode(String insCode) {
		this.insCode = insCode;
	}
	public String getInsName() {
		return insName;
	}
	public void setInsName(String insName) {
		this.insName = insName;
	}
	public EnumGender getInsGender() {
		return insGender;
	}
	public void setInsGender(EnumGender insGender) {
		this.insGender = insGender;
	}
	public Date getInsBirthday() {
		return insBirthday;
	}
	public void setInsBirthday(Date insBirthday) {
		this.insBirthday = insBirthday;
	}
	public String getInsEmail() {
		return insEmail;
	}
	public void setInsEmail(String insEmail) {
		this.insEmail = insEmail;
	}
	public String getInsPhone() {
		return insPhone;
	}
	public void setInsPhone(String insPhone) {
		this.insPhone = insPhone;
	}
	public String getInsImg() {
		return insImg;
	}
	public void setInsImg(String insImg) {
		this.insImg = insImg;
	}
	public String getInsCertification() {
		return insCertification;
	}
	public void setInsCertification(String insCertification) {
		this.insCertification = insCertification;
	}
	public EnumWorkStatus getInsWorkStatus() {
		return insWorkStatus;
	}
	public void setInsWorkStatus(EnumWorkStatus insWorkStatus) {
		this.insWorkStatus = insWorkStatus;
	}
	public String getInsNote() {
		return insNote;
	}
	public void setInsNote(String insNote) {
		this.insNote = insNote;
	}
	public JobTitle getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(JobTitle jobTitle) {
		this.jobTitle = jobTitle;
	}
	
	@Override
	public String toString() {
		return "Instructor [insId=" + insId + ", insCode=" + insCode + ", insName=" + insName + ", insGender="
				+ insGender + ", insBirthday=" + insBirthday + ", insEmail=" + insEmail + ", insPhone=" + insPhone
				+ ", insImg=" + insImg + ", insCertification=" + insCertification + ", insWorkStatus=" + insWorkStatus
				+ ", insNote=" + insNote + ", jobTitle=" + jobTitle + "]";
	}
	

}
