package com.daniel.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.crud.model.Pessoa;

public interface Repository extends JpaRepository<Pessoa, Long>{

}
