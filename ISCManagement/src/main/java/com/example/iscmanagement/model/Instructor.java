package com.example.iscmanagement.model;

import java.util.Date;
import javax.persistence.*;

@Entity
public class Instructor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long insId;
	@Column(unique = true, nullable = false, length = 20)
	private String insCode;
	private String insName;
	private EnumGender insGender = EnumGender.Male;
	@Temporal(TemporalType.DATE)
	private Date insBirthday;
	private String insEmail;
	@Column(length = 12)
	private String insPhone;
	private String insImg;
	private String insCertification;
	private EnumWorkStatus insWorkStatus;
	@Column(length = 2000)
	private String insNote;

	public Instructor() {
		super();
	}

	public Instructor(String insCode, String insName, EnumGender insGender, Date insBirthday, String insEmail,
			String insPhone, String insImg, String insCertification, EnumWorkStatus insWorkStatus, String insNote) {
		super();
		this.insCode = insCode;
		this.insName = insName;
		this.insGender = insGender;
		this.insBirthday = insBirthday;
		this.insEmail = insEmail;
		this.insPhone = insPhone;
		this.insImg = insImg;
		this.insCertification = insCertification;
		this.insWorkStatus = insWorkStatus;
		this.insNote = insNote;
	}

	public Long getInsId() {
		return insId;
	}

	public void setInsId(Long insId) {
		this.insId = insId;
	}

	public String getInsCode() {
		return insCode;
	}

	public void setInsCode(String insCode) {
		this.insCode = insCode;
	}

	public String getInsName() {
		return insName;
	}

	public void setInsName(String insName) {
		this.insName = insName;
	}

	public EnumGender getInsGender() {
		return insGender;
	}

	public void setInsGender(EnumGender insGender) {
		this.insGender = insGender;
	}

	public Date getInsBirthday() {
		return insBirthday;
	}

	public void setInsBirthday(Date insBirthday) {
		this.insBirthday = insBirthday;
	}

	public String getInsEmail() {
		return insEmail;
	}

	public void setInsEmail(String insEmail) {
		this.insEmail = insEmail;
	}

	public String getInsPhone() {
		return insPhone;
	}

	public void setInsPhone(String insPhone) {
		this.insPhone = insPhone;
	}

	public String getInsImg() {
		return insImg;
	}

	public void setInsImg(String insImg) {
		this.insImg = insImg;
	}

	public String getInsCertification() {
		return insCertification;
	}

	public void setInsCertification(String insCertification) {
		this.insCertification = insCertification;
	}

	public EnumWorkStatus getInsWorkStatus() {
		return insWorkStatus;
	}

	public void setInsWorkStatus(EnumWorkStatus insWorkStatus) {
		this.insWorkStatus = insWorkStatus;
	}

	public String getInsNote() {
		return insNote;
	}

	public void setInsNote(String insNote) {
		this.insNote = insNote;
	}

	@Override
	public String toString() {
		return "Instructor [insId=" + insId + ", insCode=" + insCode + ", insName=" + insName + ", insGender="
				+ insGender + ", insBirthday=" + insBirthday + ", insEmail=" + insEmail + ", insPhone=" + insPhone
				+ ", insImg=" + insImg + ", insCertification=" + insCertification + ", insWorkStatus=" + insWorkStatus
				+ ", insNote=" + insNote + "]";
	}

}
