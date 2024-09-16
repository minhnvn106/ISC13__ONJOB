package com.example.iscmanagement.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.iscmanagement.dao.ISCAccountRepo;
import com.example.iscmanagement.exception.CustomException;
import com.example.iscmanagement.model.ISCAccount;
import com.example.iscmanagement.security.JwtTokenProvider;



@Service
public class ISCAccountService {

	@Autowired
	private ISCAccountRepo ISCAccountRepo;
	  @Autowired
	  private PasswordEncoder passwordEncoder;

	  @Autowired
	  private JwtTokenProvider jwtTokenProvider;

	  @Autowired
	  private AuthenticationManager authenticationManager;
	  
	  public String signin(String username, String password) {
		    try {
		    	System.out.println("Đây là login service");
		    	SecurityContext context = SecurityContextHolder.getContext();
		    	Authentication authentication = context.getAuthentication();
		    	System.out.println("Authentication: "+authentication);
		    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		      return jwtTokenProvider.createToken(username, ISCAccountRepo.findByUsername(username).getRoles());
		    } catch (AuthenticationException e) {
		      throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
		    }
		  }

		  public String signup(ISCAccount user) {
		    if (!ISCAccountRepo.existsByUsername(user.getUsername())) {
		      user.setPassword(passwordEncoder.encode(user.getPassword()));
		      ISCAccountRepo.save(user);
		      return jwtTokenProvider.createToken(user.getUsername(), user.getRoles());
		    } else {
		      throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
		    }
		  }

		  public void delete(String username) {
			  ISCAccountRepo.deleteByUsername(username);
		  }
		  public List<ISCAccount> getAllUsers(){
			  return ISCAccountRepo.findAll();
		  }
		  public ISCAccount search(String username) {
			  ISCAccount user = ISCAccountRepo.findByUsername(username);
		    if (user == null) {
		      throw new CustomException("The user doesn't exist", HttpStatus.NOT_FOUND);
		    }
		    return user;
		  }

		  public ISCAccount whoami(HttpServletRequest req) {
		    return ISCAccountRepo.findByUsername(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
		  }

		  public String refresh(String username) {
		    return jwtTokenProvider.createToken(username, ISCAccountRepo.findByUsername(username).getRoles());
		  }
}
