package com.annual.report.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.*;
import java.util.Map;

@Entity
public class Student {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        private String rollNo;
        private int semester;

        @ElementCollection(fetch = FetchType.EAGER)
        @CollectionTable(name = "student_subjects", joinColumns = @JoinColumn(name = "student_id"))
        @MapKeyColumn(name = "subject")
        @Column(name = "grade")
        private Map<String, String> subjects;

        // Getters and Setters
        public Long getId() {
                return id;
        }

        public String getName() {
                return name;
        }

        public String getRollNo() {
                return rollNo;
        }

        public int getSemester() {
                return semester;
        }

        public Map<String, String> getSubjects() {
                return subjects;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public void setName(String name) {
                this.name = name;
        }

        public void setRollNo(String rollNo) {
                this.rollNo = rollNo;
        }

        public void setSemester(int semester) {
                this.semester = semester;
        }

        public void setSubjects(Map<String, String> subjects) {
                this.subjects = subjects;
        }
}



