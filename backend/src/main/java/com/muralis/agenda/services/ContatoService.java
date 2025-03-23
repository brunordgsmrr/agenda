package com.muralis.agenda.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muralis.agenda.dtos.ContatoDTO;
import com.muralis.agenda.entities.Cliente;
import com.muralis.agenda.entities.Contato;
import com.muralis.agenda.repositories.ClienteRepository;
import com.muralis.agenda.repositories.ContatoRepository;

@Service
public class ContatoService {
	
	@Autowired
	ClienteRepository clienteRepository;
	
	@Autowired
	ContatoRepository contatoRepository;	
	

	public ContatoDTO cadastrar(int id, ContatoDTO contatoDTO) {
		Cliente cliente = clienteRepository.findById(id).orElseThrow();		

		if (contatoDTO.getTipo().isEmpty() || contatoDTO.getValor().isEmpty()) {
			return null;
		}
		
		
		Contato contato = new Contato();
		
		contato.setCliente(cliente);
		contato.setTipo(contatoDTO.getTipo());
		contato.setValor(contatoDTO.getValor());
		contato.setObservacao(contatoDTO.getObservacao());
		
		try {			
			return new ContatoDTO(contatoRepository.save(contato));
		} catch (IllegalArgumentException e) {
			return null;
		}
		
	}

	public String editar(int contatoId, ContatoDTO contatoDTO) {
		Contato contato = contatoRepository.findById(contatoId).orElse(null);
		
		contato.setTipo(contatoDTO.getTipo());
		contato.setValor(contatoDTO.getValor());
		contato.setObservacao(contatoDTO.getObservacao());
		
		try {
			contatoRepository.save(contato);
			return ("Contato alterado com sucesso");
		} catch (IllegalArgumentException e) {
			return ("Falha ao alterar o contato");
		}
	}


	public String excluir(int contatoId) {
		try {
			contatoRepository.deleteById(contatoId);
			return "Excluido com sucesso!";
		} catch (IllegalArgumentException e) {
			return "Não foi possível excluir";
		}
	}


	public List<ContatoDTO> listar(int clienteId) {
		List<Contato> result = contatoRepository.findByCliente(clienteId);		
		return result.stream().map(contato -> new ContatoDTO(contato)).toList();
	}
}
