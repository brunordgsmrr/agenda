package com.muralis.agenda.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muralis.agenda.dtos.ClienteDTO;
import com.muralis.agenda.entities.Cliente;
import com.muralis.agenda.repositories.ClienteRepository;

@Service
public class ClienteService {

	@Autowired
	ClienteRepository clienteRepository;

	public String cadastrar(ClienteDTO clienteDTO) {
		
		Cliente cliente = new Cliente();
		LocalDate hoje = LocalDate.now();
		int ano = hoje.getYear();
		
		if (clienteDTO.getNome().isEmpty() || clienteDTO.getCpf().isEmpty()) {
			return null;
		}
		
		if ( clienteDTO.getDataNascimento().getYear() > ano) {
			return null;
		}		
		
		if (clienteDTO.getCpf().length() != 11) {
			return null;
		}

		cliente.setNome(clienteDTO.getNome());
		cliente.setCpf(clienteDTO.getCpf());
		cliente.setDataNascimento(clienteDTO.getDataNascimento());
		cliente.setEndereco(clienteDTO.getEndereco());		
		
		try {
			clienteRepository.save(cliente);
			return "Cliente cadastrado com sucesso!";
		} catch (IllegalArgumentException e) {
			return null;
		}

	}

	public String editar(int id, ClienteDTO clienteDTO) {

		Cliente cliente = new Cliente();
		LocalDate hoje = LocalDate.now();
		int ano = hoje.getYear();
		
		if (clienteDTO.getNome().isEmpty() || clienteDTO.getCpf().isEmpty()) {
			return null;
		}
		
		if ( clienteDTO.getDataNascimento().getYear() > ano) {
			return null;
		}		
		
		if (clienteDTO.getCpf().length() != 11) {
			return null;
		}

		cliente.setId(id);
		cliente.setNome(clienteDTO.getNome());
		cliente.setCpf(clienteDTO.getCpf());
		cliente.setDataNascimento(clienteDTO.getDataNascimento());
		cliente.setEndereco(clienteDTO.getEndereco());

		try {
			clienteRepository.save(cliente);
			return ("Alterado com sucesso");
		} catch (IllegalArgumentException e) {
			return null;
		}
	}

	public List<ClienteDTO> consultarTodos() {
		List<Cliente> result = clienteRepository.findAll();
		return result.stream().map(cliente -> new ClienteDTO(cliente)).toList();
	}

	public String excluir(int id) {
		try {
			clienteRepository.deleteById(id);
			return "Excluido com sucesso!";
		} catch (IllegalArgumentException e) {
			return null;
		}
	}

	public List<ClienteDTO> consultaPorNomeCpf(String nome, String cpf) {
		List<Cliente> result = clienteRepository.consultaPorNomeCpf(nome, cpf);
		return result.stream().map(cliente -> new ClienteDTO(cliente)).toList();
	}
}
