package com.example.iscmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iscmanagement.model.Major;
import com.example.iscmanagement.service.MajorService;

@Controller
@RestController
public class MajorController {
	@Autowired
	private MajorService majorService;
	@RequestMapping(value = { "listMajors" }, method = RequestMethod.GET)
	public List<Major> getAllMajor() {

		return majorService.getAllMajor();
	}
	@RequestMapping(value = { "deleteMajor" }, method = RequestMethod.GET)
	public void deleteMajor(@RequestParam Long id) {
		majorService.deleteMajor(id);
	}
	@RequestMapping(path = { "updateMajor", "addMajor" }, method = RequestMethod.POST)
	public void updateStudent(@RequestBody Major major) {
		System.out.println(major);
		majorService.insertMajor(major);

	}
}
