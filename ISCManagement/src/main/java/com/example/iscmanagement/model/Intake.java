package com.example.iscmanagement.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
public class Intake {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long intakeId;
	@Column(unique = true, nullable = false, length = 20)
	private String intakeCode;
	private String intakeName;
	@Temporal(TemporalType.DATE)
	private Date intakeBeginDay;
	@Temporal(TemporalType.DATE)
	private Date intakeEndDay;
	private EnumStatus intakeStatus;
	@Column(length = 2000)
	private String note;
	@ManyToOne
	@JoinColumn(name = "major_fk")
	private Major major;
	@ManyToMany
	@JoinTable(name = "join_intake_std",
	joinColumns = @JoinColumn(name ="intake_fk"),
	inverseJoinColumns =@JoinColumn(name="student_fk"))
	private List<Student> students;
	@ManyToMany
	@JoinTable(name = "join_intake_sub",
	joinColumns = @JoinColumn(name ="intake_fk"),
	inverseJoinColumns =@JoinColumn(name="sub_fk"))
	private List<Subject> subjects;
	public Intake() {
		super();
	}
	public Intake(String intakeCode, String intakeName, Date intakeBeginDay, Date intakeEndDay, EnumStatus intakeStatus,
			String note, Major major, List<Student> students, List<Subject> subjects) {
		super();
		this.intakeCode = intakeCode;
		this.intakeName = intakeName;
		this.intakeBeginDay = intakeBeginDay;
		this.intakeEndDay = intakeEndDay;
		this.intakeStatus = intakeStatus;
		this.note = note;
		this.major = major;
		this.students = students;
		this.subjects = subjects;
	}
	public Long getIntakeId() {
		return intakeId;
	}
	public void setIntakeId(Long intakeId) {
		this.intakeId = intakeId;
	}
	public String getIntakeCode() {
		return intakeCode;
	}
	public void setIntakeCode(String intakeCode) {
		this.intakeCode = intakeCode;
	}
	public String getIntakeName() {
		return intakeName;
	}
	public void setIntakeName(String intakeName) {
		this.intakeName = intakeName;
	}
	public Date getIntakeBeginDay() {
		return intakeBeginDay;
	}
	public void setIntakeBeginDay(Date intakeBeginDay) {
		this.intakeBeginDay = intakeBeginDay;
	}
	public Date getIntakeEndDay() {
		return intakeEndDay;
	}
	public void setIntakeEndDay(Date intakeEndDay) {
		this.intakeEndDay = intakeEndDay;
	}
	public EnumStatus getIntakeStatus() {
		return intakeStatus;
	}
	public void setIntakeStatus(EnumStatus intakeStatus) {
		this.intakeStatus = intakeStatus;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public Major getMajor() {
		return major;
	}
	public void setMajor(Major major) {
		this.major = major;
	}
	public List<Student> getStudents() {
		return students;
	}
	public void setStudents(List<Student> students) {
		this.students = students;
	}
	public List<Subject> getSubjects() {
		return subjects;
	}
	public void setSubjects(List<Subject> subjects) {
		this.subjects = subjects;
	}
	@Override
	public String toString() {
		return "Intake [intakeId=" + intakeId + ", intakeCode=" + intakeCode + ", intakeName=" + intakeName
				+ ", intakeBeginDay=" + intakeBeginDay + ", intakeEndDay=" + intakeEndDay + ", intakeStatus="
				+ intakeStatus + ", note=" + note + ", major=" + major + ", students=" + students + ", subjects="
				+ subjects + "]";
	}
	
	

}
