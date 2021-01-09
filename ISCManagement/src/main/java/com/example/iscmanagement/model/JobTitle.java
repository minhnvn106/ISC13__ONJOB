package com.example.iscmanagement.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class JobTitle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long jtId;
	private String jtName;
	private boolean jtStatus;
	public JobTitle(Long jtId, String jtName, boolean jtStatus) {
		super();
		this.jtId = jtId;
		this.jtName = jtName;
		this.jtStatus = jtStatus;
	}
	public JobTitle() {
		super();
	}
	public Long getJtId() {
		return jtId;
	}
	public void setJtId(Long jtId) {
		this.jtId = jtId;
	}
	public String getJtName() {
		return jtName;
	}
	public void setJtName(String jtName) {
		this.jtName = jtName;
	}
	public boolean isJtStatus() {
		return jtStatus;
	}
	public void setJtStatus(boolean jtStatus) {
		this.jtStatus = jtStatus;
	}
	@Override
	public String toString() {
		return "JobTitle [jtId=" + jtId + ", jtName=" + jtName + ", jtStatus=" + jtStatus + "]";
	}

	
}
