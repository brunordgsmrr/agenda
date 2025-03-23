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

import com.muralis.agenda.dtos.ContatoDTO;
import com.muralis.agenda.services.ContatoService;

@RestController
@RequestMapping(value = "/contatos")
public class ContatoController {
	
	@Autowired
	ContatoService contatoService;
	
	@PostMapping(value = "/cadastrar")
	public ContatoDTO cadastrar (@RequestParam int clienteId, @RequestBody ContatoDTO contatoDTO) {
		return contatoService.cadastrar(clienteId, contatoDTO);
	}
	
	@PostMapping(value = "/editar")
	public String editar (@RequestParam(defaultValue = "") int contatoId, @RequestBody ContatoDTO contatoDTO) {
		String res = contatoService.editar(contatoId, contatoDTO);
		return res;
	}
	
	@DeleteMapping(value = "/excluir/{contatoId}")
	public String excluir (@PathVariable int contatoId) {
		String res = contatoService.excluir(contatoId);
		return res;
	}
	
	@GetMapping(value = "/listar/{clienteId}")
	public List<ContatoDTO> listar (@PathVariable int clienteId) {
		List<ContatoDTO> contatoDTO = contatoService.listar(clienteId);
		return contatoDTO;
	}

}
