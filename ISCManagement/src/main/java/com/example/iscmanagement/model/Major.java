package com.example.iscmanagement.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Major {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long majorID;
	@Column(unique = true, nullable = false, length = 20)
	private String majorCode;
	private String majorName;
	
	@OneToMany(mappedBy = "major")
	@JsonBackReference	
	private List<Intake> intakes;
	
	public Major(Long majorID, String majorCode, String majorName, List<Intake> intakes) {
		super();
		this.majorID = majorID;
		this.majorCode = majorCode;
		this.majorName = majorName;
		this.intakes = intakes;
	}
	public Major() {
		super();
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
	
	public List<Intake> getIntakes() {
		return intakes;
	}
	public void setIntakes(List<Intake> intakes) {
		this.intakes = intakes;
	}
	
	@Override
	public String toString() {
		return "Major [majorID=" + majorID + ", majorCode=" + majorCode + ", majorName=" + majorName + ", intakes=" + intakes + "]";
	}
	

}
