package br.com.massoterapia.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

import br.com.massoterapia.facade.PessoaFacade;
import br.com.massoterapia.model.Pessoa;



@Path("/pessoa")
public class PessoaController {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/listarPessoas")

	public List<Pessoa> listarTodasPessoas(@Context HttpHeaders httpHeaders) {
		List<Pessoa> pessoas = new ArrayList<Pessoa>();
		PessoaFacade pessoaFacade = new PessoaFacade();
		
		try {
			pessoas = pessoaFacade.listarTodasPessoas();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return pessoas;
	}

}
