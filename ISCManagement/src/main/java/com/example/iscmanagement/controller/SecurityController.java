package com.example.iscmanagement.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.dto.UserDataDTO;
import com.example.iscmanagement.dto.UserResponseDTO;
import com.example.iscmanagement.model.ISCAccount;
import com.example.iscmanagement.service.ISCAccountService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;


@RestController
public class SecurityController {


	  @Autowired
	  private ISCAccountService userService;

	  @Autowired
	  private ModelMapper modelMapper;

	  @PostMapping("/signin")
	  @ApiOperation(value = "${UserController.signin}")
	  @ApiResponses(value = {//
	      @ApiResponse(code = 400, message = "Something went wrong"), //
	      @ApiResponse(code = 422, message = "Invalid username/password supplied")})
	  public String login(//
	      @ApiParam("Username") @RequestParam String username, //
	      @ApiParam("Password") @RequestParam String password) {
	    return userService.signin(username, password);
	  }

	  @PostMapping("/signup")
	  @ApiOperation(value = "${UserController.signup}")
	  @ApiResponses(value = {//
	      @ApiResponse(code = 400, message = "Something went wrong"), //
	      @ApiResponse(code = 403, message = "Access denied"), //
	      @ApiResponse(code = 422, message = "Username is already in use")})
	  public String signup(@ApiParam("Signup User") @RequestBody UserDataDTO user) {
	    return userService.signup(modelMapper.map(user, ISCAccount.class));
	  }

	  @DeleteMapping(value = "/{username}")
	  @PreAuthorize("hasRole('ROLE_ADMIN')")
	  @ApiOperation(value = "${UserController.delete}", authorizations = { @Authorization(value="apiKey") })
	  @ApiResponses(value = {//
	      @ApiResponse(code = 400, message = "Something went wrong"), //
	      @ApiResponse(code = 403, message = "Access denied"), //
	      @ApiResponse(code = 404, message = "The user doesn't exist"), //
	      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
	  public String delete(@ApiParam("Username") @PathVariable String username) {
	    userService.delete(username);
	    return username;
	  }

	  @GetMapping(value = "/{username}")
	  @PreAuthorize("hasRole('ROLE_ADMIN')")
	  @ApiOperation(value = "${UserController.search}", response = UserResponseDTO.class, authorizations = { @Authorization(value="apiKey") })
	  @ApiResponses(value = {//
	      @ApiResponse(code = 400, message = "Something went wrong"), //
	      @ApiResponse(code = 403, message = "Access denied"), //
	      @ApiResponse(code = 404, message = "The user doesn't exist"), //
	      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
	  public UserResponseDTO search(@ApiParam("Username") @PathVariable String username) {
	  	System.out.println("Đây là search controller");
	  	SecurityContext context = SecurityContextHolder.getContext();
	  	Authentication authentication = context.getAuthentication();
	  	System.out.println("Authentication: "+authentication);
	    return modelMapper.map(userService.search(username), UserResponseDTO.class);
	  }

	  @GetMapping(value = "/me")
	  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
	  @ApiOperation(value = "${UserController.me}", response = UserResponseDTO.class, authorizations = { @Authorization(value="apiKey") })
	  @ApiResponses(value = {//
	      @ApiResponse(code = 400, message = "Something went wrong"), //
	      @ApiResponse(code = 403, message = "Access denied"), //
	      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
	  public UserResponseDTO whoami(HttpServletRequest req) {
	    return modelMapper.map(userService.whoami(req), UserResponseDTO.class);
	  }

	  @GetMapping("/refresh")
	  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
	  public String refresh(HttpServletRequest req) {
	    return userService.refresh(req.getRemoteUser());
	  }

	  
	  @GetMapping(value = "/getAllUsers")
	  @PreAuthorize("hasRole('ROLE_ADMIN')")
	  @ApiOperation(value = "${UserController.getAllUsers}",  authorizations = { @Authorization(value="apiKey") })
	  @ApiResponses(value = {//
	      @ApiResponse(code = 400, message = "Something went wrong"), //
	      @ApiResponse(code = 403, message = "Access denied"), //
	      @ApiResponse(code = 404, message = "The user doesn't exist"), //
	      @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
	  public List<ISCAccount> getAllUsers() {
	    return userService.getAllUsers();
	  }
	  
	  @GetMapping(value="/getUser1")
	  @PreAuthorize("hasRole('ROLE_ADMIN')")
	  public ISCAccount getUser() {
		    return new ISCAccount();
	  }
}
