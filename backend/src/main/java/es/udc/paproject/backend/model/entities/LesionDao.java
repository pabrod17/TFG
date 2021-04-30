package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface LesionDao extends PagingAndSortingRepository<Lesion, Long>{

    List<Lesion> findByLesionType(String lesionType);
    
}