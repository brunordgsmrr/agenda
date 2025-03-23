package com.muralis.agenda.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.muralis.agenda.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

	@Query(nativeQuery = true, value = """
			SELECT tb_clientes.id,
				tb_clientes.nome,
				tb_clientes.cpf,
				tb_clientes.data_nascimento,
				tb_clientes.endereco
			FROM tb_clientes
			WHERE tb_clientes.cpf = :cpf OR tb_clientes.nome = :nome;
			""")
	List<Cliente> consultaPorNomeCpf(String nome, String cpf);

}
