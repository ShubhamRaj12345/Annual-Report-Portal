package com.annual.report.Controller;

import com.annual.report.Entity.Student;
import com.annual.report.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // Add a single student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // Upload multiple students from CSV
    @PostMapping("/upload")
    public List<Student> uploadStudents(@RequestBody List<Student> students) {
        return studentRepository.saveAll(students);
    }

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get students by semester
    @GetMapping("/semester/{semester}")
    public List<Student> getStudentsBySemester(@PathVariable int semester) {
        return studentRepository.findBySemester(semester);
    }
}


