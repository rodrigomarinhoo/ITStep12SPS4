package br.com.massoterapia.facade;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.com.massoterapia.dao.JdbcDAOFactory;
import br.com.massoterapia.model.Pessoa;

public class PessoaFacade {
	public List<Pessoa> listarTodasPessoas() throws SQLException {
		// Buscar todas as pessoas
		JdbcDAOFactory jdbc = new JdbcDAOFactory();
		List<Pessoa> pessoas = new ArrayList<Pessoa>();

		String sql = "SELECT ID, NOME, EMAIL,SENHA FROM T12SPS4.PESSOA";
		PreparedStatement ps = jdbc.getConexao().prepareStatement(sql);

		ResultSet rs = ps.executeQuery();

		while (rs.next()) {
			Pessoa pessoa = new Pessoa();
			pessoa.setId(rs.getLong("ID"));
			pessoa.setNome(rs.getString("NOME"));
			pessoa.setEmail(rs.getString("EMAIL"));
			pessoa.setSenha(rs.getString("SENHA"));

			pessoas.add(pessoa);

		}

		return pessoas;

	}

}
