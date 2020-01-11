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


import br.com.massoterapia.facade.PessoaJuridicaFacade;
import br.com.massoterapia.model.PessoaJuridica;



@Path("/pessoaJuridica")
public class PessoaJuridicaController {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/listarPessoasJuridicas")

	public List<PessoaJuridica> listarTodasPessoasJuridicas(@Context HttpHeaders httpHeaders) {
		List<PessoaJuridica> pessoasJuridicas = new ArrayList<PessoaJuridica>();
		PessoaJuridicaFacade pessoaJuridicaFacade = new PessoaJuridicaFacade();
		
		try {
			pessoasJuridicas = pessoaJuridicaFacade.listarTodasPessoasJuridicas();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return pessoasJuridicas;
	}
	
	
	
}
