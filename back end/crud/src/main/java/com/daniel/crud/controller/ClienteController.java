package com.daniel.crud.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daniel.crud.model.Pessoa;
import com.daniel.crud.repository.Repository;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/cliente")
public class ClienteController {

	Repository repository;
	
	@GetMapping()
	public List<Pessoa> getAllCliente(){
		return repository.findAll();
	}
	
	@GetMapping("/{id}")
	public Pessoa getClienteById(@PathVariable Long id) {
		return repository.findById(id).get();
	}
	
	@PostMapping("/criar")
	public Pessoa saveCliente(@RequestBody Pessoa cliente) {
		return repository.save(cliente);
	}
	
	@PutMapping("/editar/{id}")
	public void atualizarCliente(@RequestBody Pessoa cliente) {
		repository.save(cliente);
	}
	
	@DeleteMapping("/excluir/{id}")
	public void deleteCliente(@PathVariable Long id) {
		repository.deleteById(id);
	}
	
	
}