
package com.elevatehr.controller;

import com.elevatehr.model.Vacancy;
import com.elevatehr.service.VacancyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacancies")
@CrossOrigin(origins = "*")
public class VacancyController {

    private final VacancyService service;

    @Autowired
    public VacancyController(VacancyService service) {
        this.service = service;
    }

    @GetMapping
    public List<Vacancy> getAll() {
        return service.getAllVacancies();
    }

    @PostMapping
    public ResponseEntity<Vacancy> create(@RequestBody Vacancy vacancy) {
        return ResponseEntity.ok(service.saveVacancy(vacancy));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteVacancy(id);
        return ResponseEntity.noContent().build();
    }
}
