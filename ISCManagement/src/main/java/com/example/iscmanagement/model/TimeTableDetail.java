package com.example.iscmanagement.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
@Entity
public class TimeTableDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tTDId;
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;
	@Temporal(TemporalType.TIMESTAMP)
	private Date fromTime;
	@Temporal(TemporalType.TIMESTAMP)
	private Date toTime;
	@ManyToOne
	@JoinColumn(name = "timetable_fk")
	private TimeTable timeTable;
	@ManyToOne
	@JoinColumn(name = "room_fk")
	private Room room;
	@ManyToOne
	@JoinColumn(name = "class_fk")
	private Classes classes;
	@ManyToOne
	@JoinColumn(name = "instructor_fk")
	private Instructor instructor;
	public TimeTableDetail(Long tTDId, Date date, Date fromTime, Date toTime, TimeTable timeTable, Room room,
			Classes classes, Instructor instructor) {
		super();
		this.tTDId = tTDId;
		this.date = date;
		this.fromTime = fromTime;
		this.toTime = toTime;
		this.timeTable = timeTable;
		this.room = room;
		this.classes = classes;
		this.instructor = instructor;
	}
	public TimeTableDetail() {
		super();
	}
	public Long gettTDId() {
		return tTDId;
	}
	public void settTDId(Long tTDId) {
		this.tTDId = tTDId;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Date getFromTime() {
		return fromTime;
	}
	public void setFromTime(Date fromTime) {
		this.fromTime = fromTime;
	}
	public Date getToTime() {
		return toTime;
	}
	public void setToTime(Date toTime) {
		this.toTime = toTime;
	}
	public TimeTable getTimeTable() {
		return timeTable;
	}
	public void setTimeTable(TimeTable timeTable) {
		this.timeTable = timeTable;
	}
	public Room getRoom() {
		return room;
	}
	public void setRoom(Room room) {
		this.room = room;
	}
	public Classes getClasses() {
		return classes;
	}
	public void setClasses(Classes classes) {
		this.classes = classes;
	}
	public Instructor getInstructor() {
		return instructor;
	}
	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}
	@Override
	public String toString() {
		return "TimeTableDetail [tTDId=" + tTDId + ", date=" + date + ", fromTime=" + fromTime + ", toTime=" + toTime
				+ ", timeTable=" + timeTable + ", room=" + room + ", classes=" + classes + ", instructor=" + instructor
				+ "]";
	}
	
	
}