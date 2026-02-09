
package com.elevatehr.repository;

import com.elevatehr.model.Vacancy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VacancyRepository extends JpaRepository<Vacancy, Long> {
    List<Vacancy> findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCase(String title, String company);
}
