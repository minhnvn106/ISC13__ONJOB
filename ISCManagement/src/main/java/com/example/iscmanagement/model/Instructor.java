package com.example.iscmanagement.model;

import java.util.Date;
import javax.persistence.*;

@Entity
public class Instructor {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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

}
