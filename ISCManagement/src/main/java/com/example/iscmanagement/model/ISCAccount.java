package com.example.iscmanagement.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class ISCAccount {

	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Integer id;

	  @Size(min = 4, max = 255, message = "Minimum username length: 4 characters")
	  @Column(unique = true, nullable = false)
	  private String username;

	  @Column(unique = true, nullable = false)
	  private String email;
	  
	  @Size(min = 8, message = "Minimum password length: 8 characters")
	  private String password;

//	  @ElementCollection(fetch = FetchType.EAGER)
//	  List<Role> roles;

	public ISCAccount(Integer id,
			@Size(min = 4, max = 255, message = "Minimum username length: 4 characters") String username, String email,
			@Size(min = 8, message = "Minimum password length: 8 characters") String password) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
//		this.roles = roles;
	}

	public ISCAccount() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

//	public List<Role> getRoles() {
//		return roles;
//	}
//
//	public void setRoles(List<Role> roles) {
//		this.roles = roles;
//	}

//	@Override
//	public String toString() {
//		return "ISCAccount [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
//				+ ", roles=" + roles + "]";
//	}



}
