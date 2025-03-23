package com.muralis.agenda.dtos;

import java.time.LocalDate;

import org.springframework.beans.BeanUtils;

import com.muralis.agenda.entities.Cliente;

public class ClienteDTO {

	private int id;
	private String nome;
	private String cpf;
	private LocalDate dataNascimento;
	private String endereco;
	
	public ClienteDTO() {
		
	}
	
	public ClienteDTO(Cliente cliente) {
		BeanUtils.copyProperties(cliente, this);
	}
	
	public ClienteDTO(String nome, String cpf) {
		this.nome = nome;
		this.cpf = cpf;
		
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	
	
}
