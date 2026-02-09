
package com.elevatehr.service;

import com.elevatehr.model.Vacancy;
import com.elevatehr.repository.VacancyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VacancyService {

    private final VacancyRepository repository;

    @Autowired
    public VacancyService(VacancyRepository repository) {
        this.repository = repository;
    }

    public List<Vacancy> getAllVacancies() {
        return repository.findAll();
    }

    @Transactional
    public Vacancy saveVacancy(Vacancy vacancy) {
        return repository.save(vacancy);
    }

    public void deleteVacancy(Long id) {
        repository.deleteById(id);
    }
}
