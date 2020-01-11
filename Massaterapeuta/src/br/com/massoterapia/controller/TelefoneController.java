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


import br.com.massoterapia.facade.TelefoneFacade;
import br.com.massoterapia.model.Telefone;

@Path("/telefone")
public class TelefoneController {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/listarTelefones")

	public List<Telefone> listarTelefones(@Context HttpHeaders httpHeaders) {
		List<Telefone> telefones = new ArrayList<Telefone>();
		TelefoneFacade telefoneFacade = new TelefoneFacade();
		
		try {
			telefones = telefoneFacade.listarTelefones();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return telefones;
	}
	

	
}
