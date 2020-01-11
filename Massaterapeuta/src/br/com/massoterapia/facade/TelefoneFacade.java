package br.com.massoterapia.facade;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.com.massoterapia.dao.JdbcDAOFactory;
import br.com.massoterapia.model.Telefone;

public class TelefoneFacade {
	public List<Telefone> listarTelefones() throws SQLException {
		// Buscar todas as pessoas
		JdbcDAOFactory jdbc = new JdbcDAOFactory();
		List<Telefone> telefones = new ArrayList<Telefone>();

		String sql = "SELECT ID, ID_PESSOA, TIPO, DDD, NUMERO FROM T12SPS4.TELEFONE";
		PreparedStatement ps = jdbc.getConexao().prepareStatement(sql);

		ResultSet rs = ps.executeQuery();

		while (rs.next()) {
			Telefone telefone = new Telefone();
			telefone.setId(rs.getLong("ID"));
			//telefone.setPessoa(rs.getPessoa("ID_PESSOA"));
			telefone.setTipo(rs.getString("TIPO"));
			telefone.setDdd(rs.getString("DDD"));
			telefone.setNumero(rs.getString("NUMERO"));
			
			telefones.add(telefone);

		}

		return telefones;

	}
	
	
	
	
}
