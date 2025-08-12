//package com.annual.report.Controller;
//
//import com.annual.report.Entity.Faculty;
//import com.annual.report.Repository.FacultyRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Random;
//
//@RestController
//@RequestMapping("/api/faculty")
//@CrossOrigin(origins = "http://localhost:5173")  // your React port
//public class FacultyController {
//
//    @Autowired
//    private FacultyRepository facultyRepository;
//
//    @PostMapping("/add")
//    public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
//        String deptCode = faculty.getDepartment() != null && faculty.getDepartment().length() >= 3
//                ? faculty.getDepartment().substring(0, 3).toUpperCase()
//                : faculty.getDepartment().toUpperCase();
//
//        int randomNum = 1000 + new Random().nextInt(9000);
//        String generatedId = deptCode + "-" + randomNum;
//        faculty.setGeneratedId(generatedId);
//        faculty.setDateAdded(LocalDate.now());
//
//        Faculty savedFaculty = facultyRepository.save(faculty);
//        return ResponseEntity.ok(savedFaculty);
//    }
//
//    @GetMapping("/all")
//    public List<Faculty> getAllFaculty() {
//        return facultyRepository.findAll();
//    }
//
//    @GetMapping("/by-role/{role}")
//    public List<Faculty> getByRole(@PathVariable String role) {
//        return facultyRepository.findByRole(role);
//    }
//
//    @GetMapping("/by-department/{department}")
//    public List<Faculty> getByDepartment(@PathVariable String department) {
//        return facultyRepository.findByDepartment(department);
//    }
//}








//
//package com.annual.report.Controller;
//
//import com.annual.report.Entity.Faculty;
//import com.annual.report.Repository.FacultyRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Random;
//
//@RestController
//@RequestMapping("/api/faculty")
//@CrossOrigin(origins = "http://localhost:5173")  // your React port
//public class FacultyController {
//
//    @Autowired
//    private FacultyRepository facultyRepository;
//
//    @PostMapping("/add")
//    public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
//        String deptCode = faculty.getDepartment() != null && faculty.getDepartment().length() >= 3
//                ? faculty.getDepartment().substring(0, 3).toUpperCase()
//                : faculty.getDepartment().toUpperCase();
//
//        int randomNum = 1000 + new Random().nextInt(9000);
//        String generatedId = deptCode + "-" + randomNum;
//        faculty.setGeneratedId(generatedId);
//        faculty.setDateAdded(LocalDate.now());
//
//        Faculty savedFaculty = facultyRepository.save(faculty);
//        return ResponseEntity.ok(savedFaculty);
//    }
//
//    @GetMapping("/all")
//    public List<Faculty> getAllFaculty() {
//        return facultyRepository.findAll();
//    }
//
//    @GetMapping("/by-role/{role}")
//    public List<Faculty> getByRole(@PathVariable String role) {
//        return facultyRepository.findByRole(role);
//    }
//
//    @GetMapping("/by-department/{department}")
//    public List<Faculty> getByDepartment(@PathVariable String department) {
//        return facultyRepository.findByDepartment(department);
//    }
//
//    // Delete by database ID (primary key)
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> deleteFaculty(@PathVariable Long id) {
//        if (!facultyRepository.existsById(id)) {
//            return ResponseEntity.notFound().build();
//        }
//        facultyRepository.deleteById(id);
//        return ResponseEntity.ok("Faculty with id " + id + " deleted successfully.");
//    }
//
//    // Delete by generatedId (like "CSE-1234")
//    @DeleteMapping("/delete-by-generatedId/{generatedId}")
//    public ResponseEntity<String> deleteFacultyByGeneratedId(@PathVariable String generatedId) {
//        Faculty faculty = facultyRepository.findByGeneratedId(generatedId);
//        if (faculty == null) {
//            return ResponseEntity.notFound().build();
//        }
//        facultyRepository.delete(faculty);
//        return ResponseEntity.ok("Faculty with generatedId " + generatedId + " deleted successfully.");
//    }
//}







package com.annual.report.Controller;

import com.annual.report.Entity.Faculty;
import com.annual.report.Repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "http://localhost:5173")  // React frontend port
public class FacultyController {

    @Autowired
    private FacultyRepository facultyRepository;

    @PostMapping("/add")
    public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
        String deptCode = faculty.getDepartment() != null && faculty.getDepartment().length() >= 3
                ? faculty.getDepartment().substring(0, 3).toUpperCase()
                : faculty.getDepartment().toUpperCase();

        int randomNum = 1000 + new Random().nextInt(9000);
        String generatedId = deptCode + "-" + randomNum;
        faculty.setGeneratedId(generatedId);
        faculty.setDateAdded(LocalDate.now());

        Faculty savedFaculty = facultyRepository.save(faculty);
        return ResponseEntity.ok(savedFaculty);
    }

    @GetMapping("/all")
    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    @GetMapping("/by-role/{role}")
    public List<Faculty> getByRole(@PathVariable String role) {
        return facultyRepository.findByRole(role);
    }

    @GetMapping("/by-department/{department}")
    public List<Faculty> getByDepartment(@PathVariable String department) {
        return facultyRepository.findByDepartment(department);
    }

    // Delete by database ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFaculty(@PathVariable Long id) {
        if (!facultyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        facultyRepository.deleteById(id);
        return ResponseEntity.ok("Faculty with id " + id + " deleted successfully.");
    }

    // Delete by generatedId (e.g., "CSE-1234")
    @DeleteMapping("/delete-by-generatedId/{generatedId}")
    public ResponseEntity<String> deleteFacultyByGeneratedId(@PathVariable String generatedId) {
        Faculty faculty = facultyRepository.findByGeneratedId(generatedId);
        if (faculty == null) {
            return ResponseEntity.notFound().build();
        }
        facultyRepository.delete(faculty);
        return ResponseEntity.ok("Faculty with generatedId " + generatedId + " deleted successfully.");
    }


    @PostMapping("/login")
    public ResponseEntity<String> facultyLogin(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String role,
            @RequestParam String department) {

        Faculty faculty = facultyRepository.findByEmailAndRoleAndDepartment(username, role, department);

        if (faculty == null) {
            return ResponseEntity.status(401).body("Invalid credentials or user not found.");
        }

        if (!faculty.getPassword().equals(password)) {
            return ResponseEntity.status(401).body("Incorrect password.");
        }

        return ResponseEntity.ok("Login successful");
    }
}


