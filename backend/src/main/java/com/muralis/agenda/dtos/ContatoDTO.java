package com.muralis.agenda.dtos;

import org.springframework.beans.BeanUtils;

import com.muralis.agenda.entities.Cliente;
import com.muralis.agenda.entities.Contato;

public class ContatoDTO {	

	private Cliente cliente;
	private int id;	
	private String tipo;
	private String valor;
	private String observacao;
	
	
	public ContatoDTO() {
	}
	
	public ContatoDTO(Contato contato) {
		BeanUtils.copyProperties(contato, this);
	}

	public ContatoDTO(Cliente cliente, int id, String tipo, String valor, String observacao) {
		this.cliente = cliente;
		this.id = id;
		this.tipo = tipo;
		this.valor = valor;
		this.observacao = observacao;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	
}
