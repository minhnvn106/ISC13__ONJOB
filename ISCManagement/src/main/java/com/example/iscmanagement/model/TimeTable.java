package com.example.iscmanagement.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
@Entity
public class TimeTable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tTId;
	private int weekNumber;
	@Temporal(TemporalType.TIMESTAMP)
	private Date fromTime;
	@Temporal(TemporalType.TIMESTAMP)
	private Date toTime;
	public TimeTable(Long tTId, int weekNumber, Date fromTime, Date toTime) {
		super();
		this.tTId = tTId;
		this.weekNumber = weekNumber;
		this.fromTime = fromTime;
		this.toTime = toTime;
	}
	public TimeTable() {
		super();
	}
	public Long gettTId() {
		return tTId;
	}
	public void settTId(Long tTId) {
		this.tTId = tTId;
	}
	public int getWeekNumber() {
		return weekNumber;
	}
	public void setWeekNumber(int weekNumber) {
		this.weekNumber = weekNumber;
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
	@Override
	public String toString() {
		return "TimeTable [tTId=" + tTId + ", weekNumber=" + weekNumber + ", fromTime=" + fromTime + ", toTime="
				+ toTime + "]";
	}
	
	
}
