package com.annual.report.Controller;

import com.annual.report.Entity.Student;
import com.annual.report.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStreamReader;
import java.util.*;
import com.opencsv.CSVReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadStudents(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "File is empty"
                ));
            }

            if (!file.getOriginalFilename().endsWith(".csv")) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Only CSV files are allowed"
                ));
            }

            List<Student> students = parseCSV(file);
            if (students.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "No valid student data found in CSV"
                ));
            }

            // Get session from first student (assuming all have same session)
            String session = students.get(0).getSession();

            studentRepository.saveAll(students);

            return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "message", "CSV uploaded successfully",
                    "session", session,
                    "count", students.size()
            ));

        } catch (Exception e) {
            logger.error("CSV Upload Failed", e);
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "message", "Error processing CSV: " + e.getMessage()
            ));
        }
    }


    private List<Student> parseCSV(MultipartFile file) throws Exception {
        List<Student> students = new ArrayList<>();
        try (CSVReader csvReader = new CSVReader(new InputStreamReader(file.getInputStream()))) {

            String[] header = csvReader.readNext();  // Read header first

            if (header == null || header.length < 5) {
                // No subjects found, or invalid CSV
                return students;
            }

            // Subjects start from index 4
            String[] subjectsHeaders = Arrays.copyOfRange(header, 4, header.length);

            String[] nextLine;
            while ((nextLine = csvReader.readNext()) != null) {
                if (nextLine.length < 4) continue; // Not enough data

                try {
                    Student student = new Student();
                    student.setName(nextLine[0].trim());
                    student.setRollNo(nextLine[1].trim());
                    student.setSemester(Integer.parseInt(nextLine[2].trim()));
                    student.setSession(nextLine[3].trim());

                    // Parse subjects and grades from columns 4+
                    Map<String, String> subjects = new HashMap<>();

                    for (int i = 4; i < nextLine.length; i++) {
                        String grade = nextLine[i].trim();
                        if (!grade.isEmpty()) {
                            String subject = subjectsHeaders[i - 4];
                            subjects.put(subject, grade);
                        }
                    }

                    student.setSubjects(subjects);

                    students.add(student);
                } catch (Exception e) {
                    logger.warn("Skipping invalid row: " + Arrays.toString(nextLine));
                }
            }
        }
        return students;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/semester/{semester}")
    public List<Student> getStudentsBySemester(@PathVariable int semester) {
        return studentRepository.findBySemester(semester);
    }

    @GetMapping("/semester/{semester}/session/{session}")
    public List<Student> getStudentsBySemesterAndSession(
            @PathVariable int semester,
            @PathVariable String session) {
        return studentRepository.findBySemesterAndSession(semester, session);
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
