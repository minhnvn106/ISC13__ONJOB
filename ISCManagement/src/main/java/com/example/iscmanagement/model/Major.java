package com.example.iscmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Major {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long majorID;
	@Column(unique = true, nullable = false, length = 20)
	private String majorCode;
	private String majorName;
	public Major() {
		super();
	}
	public Major(String majorCode, String majorName) {
		super();
		this.majorCode = majorCode;
		this.majorName = majorName;
	}
	public Long getMajorID() {
		return majorID;
	}
	public void setMajorID(Long majorID) {
		this.majorID = majorID;
	}
	public String getMajorCode() {
		return majorCode;
	}
	public void setMajorCode(String majorCode) {
		this.majorCode = majorCode;
	}
	public String getMajorName() {
		return majorName;
	}
	public void setMajorName(String majorName) {
		this.majorName = majorName;
	}
	@Override
	public String toString() {
		return "Major [majorID=" + majorID + ", majorCode=" + majorCode + ", majorName=" + majorName + "]";
	}
	
	

}
