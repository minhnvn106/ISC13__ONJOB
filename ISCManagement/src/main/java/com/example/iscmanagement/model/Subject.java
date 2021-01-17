package com.example.iscmanagement.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Subject {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long subID;
	@Column(unique = true, nullable = false, length = 20)
	private String subCode;
	private String subName;
	private double subCredit;
	private double subPassScore;
	private EnumStatus subStatus;
//	@OneToMany(mappedBy = "subject")
//	@JsonManagedReference(value = "subject")
//	private List<Classes> classes;
	
	@OneToMany(mappedBy = "subject")
	@JsonBackReference	
	private List<Classes> classes;
	
	
	public Subject(Long subID, String subCode, String subName, double subCredit, double subPassScore,
			EnumStatus subStatus, List<Classes> classes) {
		super();
		this.subID = subID;
		this.subCode = subCode;
		this.subName = subName;
		this.subCredit = subCredit;
		this.subPassScore = subPassScore;
		this.subStatus = subStatus;
		this.classes = classes;
	}
	public Subject() {
		super();
	}
	public Long getSubID() {
		return subID;
	}
	public void setSubID(Long subID) {
		this.subID = subID;
	}
	public String getSubCode() {
		return subCode;
	}
	public void setSubCode(String subCode) {
		this.subCode = subCode;
	}
	public String getSubName() {
		return subName;
	}
	public void setSubName(String subName) {
		this.subName = subName;
	}
	public double getSubCredit() {
		return subCredit;
	}
	public void setSubCredit(double subCredit) {
		this.subCredit = subCredit;
	}
	public double getSubPassScore() {
		return subPassScore;
	}
	public void setSubPassScore(double subPassScore) {
		this.subPassScore = subPassScore;
	}
	public EnumStatus getSubStatus() {
		return subStatus;
	}
	public void setSubStatus(EnumStatus subStatus) {
		this.subStatus = subStatus;
	}
	public List<Classes> getClasses() {
		return classes;
	}
	public void setClasses(List<Classes> classes) {
		this.classes = classes;
	}
	@Override
	public String toString() {
		return "Subject [subID=" + subID + ", subCode=" + subCode + ", subName=" + subName + ", subCredit=" + subCredit
				+ ", subPassScore=" + subPassScore + ", subStatus=" + subStatus + ", classes=" + classes + "]";
	}
	
	

}
