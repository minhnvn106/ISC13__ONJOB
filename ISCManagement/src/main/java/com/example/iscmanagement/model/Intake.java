package com.example.iscmanagement.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
public class Intake {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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

}
