package br.com.massoterapia.facade;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.com.massoterapia.dao.JdbcDAOFactory;
import br.com.massoterapia.model.Endereco;


public class EnderecoFacade {
	public List<Endereco> listarEnderecos() throws SQLException {
		// Buscar todas as pessoas
		JdbcDAOFactory jdbc = new JdbcDAOFactory();
		List<Endereco> enderecos = new ArrayList<Endereco>();

		String sql = "SELECT ID, ID_PESSOA,LOGRADOURO, COMPLEMENTO, NUMERO, BAIRRO, CIDADE, UF, TIPO_ENDERECO FROM T12SPS4.ENDERECO";
		PreparedStatement ps = jdbc.getConexao().prepareStatement(sql);

		ResultSet rs = ps.executeQuery();

		while (rs.next()) {
			Endereco endereco = new Endereco();
			endereco.setId(rs.getLong("ID"));
			//endereco.setPessoa(rs.getPessoa("ID_PESSOA"));
			endereco.setLogradouro(rs.getString("LOGRADOURO"));
			endereco.setComplemento(rs.getString("COMPLEMENTO"));
			endereco.setNumero(rs.getString("COMPLEMENTO"));
			endereco.setNumero(rs.getString("NUMERO"));
			endereco.setBairro(rs.getString("BAIRRO"));
			endereco.setCidade(rs.getString("CIDADE"));
			endereco.setUf(rs.getString("UF"));
			endereco.setTipoEndereco(rs.getString("TIPO_ENDERECO"));
			
			
			
			
			enderecos.add(endereco);

		}

		return enderecos;

	}

}
