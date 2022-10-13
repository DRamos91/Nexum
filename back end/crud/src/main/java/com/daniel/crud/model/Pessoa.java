package com.daniel.crud.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="ID")
	private Long id;
	
	private String nome;
	private String email;
	private String tipoPessoa;
	private String cpf;
	private String cnpj;
	private String cep;	
	private String endereco;
	private String logradouro;
	private String bairro;
	private String cidade;
	private String estado;
	
	

}
