package com.example.iscmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
public class Classes {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long classId;
	@Column(unique = true)
	private String classCode;
	private String className;
	private int maxStudent;
	private int quantity;
	
//	@ManyToOne
//	@JsonBackReference(value = "subject")
//	@JoinColumn(name = "subject_fk")
//	private Subject subject;
	
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "subject_fk")
	private Subject subject;
	
	
	public Classes(Long classId, String classCode, String className, int maxStudent, int quantity, Subject subject) {
		super();
		this.classId = classId;
		this.classCode = classCode;
		this.className = className;
		this.maxStudent = maxStudent;
		this.quantity = quantity;
		this.subject = subject;
	}
	public Classes() {
		super();
	}
	public Long getClassId() {
		return classId;
	}
	public void setClassId(Long classId) {
		this.classId = classId;
	}
	public String getClassCode() {
		return classCode;
	}
	public void setClassCode(String classCode) {
		this.classCode = classCode;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public int getMaxStudent() {
		return maxStudent;
	}
	public void setMaxStudent(int maxStudent) {
		this.maxStudent = maxStudent;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Subject getSubject() {
		return subject;
	}
	public void setSubject(Subject subject) {
		this.subject = subject;
	}
	@Override
	public String toString() {
		return "Classes [classId=" + classId + ", classCode=" + classCode + ", className=" + className + ", maxStudent="
				+ maxStudent + ", quantity=" + quantity + ", subject=" + subject + "]";
	}
	
	
}
