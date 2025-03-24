package com.muralis.agenda.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.muralis.agenda.dtos.ClienteDTO;
import com.muralis.agenda.services.ClienteService;

@RestController
@RequestMapping(value = "/clientes")
public class ClienteController {

	@Autowired
	public ClienteService clienteService;

	@GetMapping(value = "/listar")
	public List<ClienteDTO> consultarTodos() {
		List<ClienteDTO> result = clienteService.consultarTodos();
		return result;
	}

	@PostMapping(value = "/cadastrar")
	public String cadastrar(@RequestBody ClienteDTO body) {
		if (clienteService.cadastrar(body) == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parâmetro inválido!"); 
		}
		return "OK";
	}

	@PutMapping(value = "/editar")
	public String editar(@RequestParam int id, @RequestBody ClienteDTO body) {		
		if (clienteService.editar(id, body) == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parâmetro inválido!"); 
		}
		return "OK";
	}

	@DeleteMapping(path = "/excluir")
	public String excluir(@RequestParam int id) {
		if (clienteService.excluir(id) == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parâmetro inválido!"); 
		}
		return "OK";
	}

	@GetMapping(value = "/consultar")
	public List<ClienteDTO> consultaPorNomeCpf(@RequestParam(defaultValue = "") String nome,
			@RequestParam(defaultValue = "") String cpf) {
		List<ClienteDTO> result = clienteService.consultaPorNomeCpf(nome, cpf);
		return result;
	}

}
