package com.example.iscmanagement.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class AssignmentEmbedded implements Serializable{

	@Column(name = "class_fk")
	private Long classId;
	
	@Column(name = "student_fk")
	private Long stdId;

	public AssignmentEmbedded(Long classId, Long stdId) {
		super();
		this.classId = classId;
		this.stdId = stdId;
	}

	public Long getClassId() {
		return classId;
	}

	public void setClassId(Long classId) {
		this.classId = classId;
	}

	public Long getStdId() {
		return stdId;
	}

	public void setStdId(Long stdId) {
		this.stdId = stdId;
	}

	public AssignmentEmbedded() {
		super();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((classId == null) ? 0 : classId.hashCode());
		result = prime * result + ((stdId == null) ? 0 : stdId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AssignmentEmbedded other = (AssignmentEmbedded) obj;
		if (classId == null) {
			if (other.classId != null)
				return false;
		} else if (!classId.equals(other.classId))
			return false;
		if (stdId == null) {
			if (other.stdId != null)
				return false;
		} else if (!stdId.equals(other.stdId))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AssignmentEmbedded [classId=" + classId + ", stdId=" + stdId + "]";
	}
	
}
