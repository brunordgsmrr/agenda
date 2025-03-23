package com.muralis.agenda.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.muralis.agenda.dtos.ClienteDTO;
import com.muralis.agenda.services.ClienteService;

@RestController
@RequestMapping(value = "/cliente")
public class ClienteController {

	@Autowired
	public ClienteService clienteService;

	@GetMapping(value = "/todos")
	public List<ClienteDTO> consultarTodos() {
		List<ClienteDTO> result = clienteService.consultarTodos();
		return result;
	}

	@PostMapping(value = "/cadastrar")
	public ClienteDTO cadastrar(@RequestBody ClienteDTO body) {
		return clienteService.cadastrar(body);
	}

	@PostMapping(value = "/editar/{id}")
	public String editar(@PathVariable int id, @RequestBody ClienteDTO body) {
		return (clienteService.editar(id, body));
	}

	@DeleteMapping(path = "/excluir/{id}")
	public String excluir(@PathVariable int id) {
		return (clienteService.excluir(id));
	}

	@GetMapping(value = "/consultar")
	public List<ClienteDTO> consultaPorNomeCpf(@RequestParam(defaultValue = "") String nome,
			@RequestParam(defaultValue = "") String cpf) {
		List<ClienteDTO> result = clienteService.consultaPorNomeCpf(nome, cpf);
		return result;
	}

}
