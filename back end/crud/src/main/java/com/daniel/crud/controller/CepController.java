package com.daniel.crud.controller;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.daniel.crud.model.Cep;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CepController implements Serializable {

	private static final long serialVersionUID = 6046704732666502085L;

	@GetMapping(value = "/getCep/{cep}")
	public ResponseEntity<Cep> doObterCep(@PathVariable(name = "cep") String cep) {

	RestTemplate restTemplate = new RestTemplate();
	
	 String uri = "http://viacep.com.br/ws/{cep}/json/";
	 Map<String, String> params = new HashMap<String, String>();
	    params.put("cep", cep);
	    Cep cepController = restTemplate.getForObject(uri, Cep.class, params);
		
	    return new ResponseEntity<Cep>(cepController, HttpStatus.OK);
	}

}