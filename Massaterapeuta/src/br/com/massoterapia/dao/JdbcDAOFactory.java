package br.com.massoterapia.dao;
import java.sql.*;
public class JdbcDAOFactory {
	
	private Connection connection;

	public JdbcDAOFactory() throws SQLException {
		
		try {
						
			Class.forName("oracle.jdbc.driver.OracleDriver");
			this.connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "SYSTEM", "root");
			
		} catch (Exception e) {

			throw new RuntimeException("Erro recuperando conexão com o banco", e);
			
		} 
		
	}
	
	
	public Connection getConexao() {
		return this.connection;
	}

}
