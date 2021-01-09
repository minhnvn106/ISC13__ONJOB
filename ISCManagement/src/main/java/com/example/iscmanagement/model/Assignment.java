package com.example.iscmanagement.model;

import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Entity
public class Assignment {
	@EmbeddedId
	private AssignmentEmbedded id;
	@ManyToOne
	@MapsId("stdId")      
	@JoinColumn(name = "student_fk")
	private Student student;
	@ManyToOne
	@MapsId("classId")
	@JoinColumn(name = "class_fk")
	private Classes classId;
	private double score;
	public Assignment(AssignmentEmbedded id, Student student, Classes classId, double score) {
		super();
		this.id = id;
		this.student = student;
		this.classId = classId;
		this.score = score;
	}
	public Assignment() {
		super();
	}
	public AssignmentEmbedded getId() {
		return id;
	}
	public void setId(AssignmentEmbedded id) {
		this.id = id;
	}
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	public Classes getClassId() {
		return classId;
	}
	public void setClassId(Classes classId) {
		this.classId = classId;
	}
	public double getScore() {
		return score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((classId == null) ? 0 : classId.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		long temp;
		temp = Double.doubleToLongBits(score);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((student == null) ? 0 : student.hashCode());
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
		Assignment other = (Assignment) obj;
		if (classId == null) {
			if (other.classId != null)
				return false;
		} else if (!classId.equals(other.classId))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (Double.doubleToLongBits(score) != Double.doubleToLongBits(other.score))
			return false;
		if (student == null) {
			if (other.student != null)
				return false;
		} else if (!student.equals(other.student))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Assignment [id=" + id + ", student=" + student + ", classId=" + classId + ", score=" + score + "]";
	}
	
	
	
}
