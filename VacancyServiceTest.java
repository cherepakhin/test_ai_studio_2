
package com.elevatehr.test;

import com.elevatehr.model.Vacancy;
import com.elevatehr.repository.VacancyRepository;
import com.elevatehr.service.VacancyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class VacancyServiceTest {

    private VacancyService vacancyService;
    @Mock private VacancyRepository vacancyRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        vacancyService = new VacancyService(vacancyRepository);
    }

    @Test
    public void testGetAllVacancies() {
        Vacancy v = new Vacancy();
        v.setTitle("Software Engineer");
        when(vacancyRepository.findAll()).thenReturn(Arrays.asList(v));

        List<Vacancy> result = vacancyService.getAllVacancies();
        
        assertEquals(1, result.size());
        assertEquals("Software Engineer", result.get(0).getTitle());
        verify(vacancyRepository, times(1)).findAll();
    }
}
