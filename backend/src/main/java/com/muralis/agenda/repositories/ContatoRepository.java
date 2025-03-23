package com.muralis.agenda.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.muralis.agenda.entities.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {

	@Query(nativeQuery = true, value = """
			SELECT tb_contatos.cliente_id,
				tb_contatos.id,
				tb_contatos.tipo,
				tb_contatos.valor,
				tb_contatos.observacao
			FROM tb_contatos WHERE tb_contatos.cliente_id = :clienteId;
			""")
	List<Contato> findByCliente(int clienteId);

}
