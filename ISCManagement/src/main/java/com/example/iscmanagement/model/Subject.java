package com.example.iscmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
	public Subject() {
		super();
	}
	public Subject(String subCode, String subName, double subCredit, double subPassScore, EnumStatus subStatus) {
		super();
		this.subCode = subCode;
		this.subName = subName;
		this.subCredit = subCredit;
		this.subPassScore = subPassScore;
		this.subStatus = subStatus;
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
	@Override
	public String toString() {
		return "Subject [subID=" + subID + ", subCode=" + subCode + ", subName=" + subName + ", subCredit=" + subCredit
				+ ", subPassScore=" + subPassScore + ", subStatus=" + subStatus + "]";
	}
	
	

}
