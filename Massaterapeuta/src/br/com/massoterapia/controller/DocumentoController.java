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


import br.com.massoterapia.facade.DocumentoFacade;
import br.com.massoterapia.model.Documento;


@Path("/documento")
public class DocumentoController {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/listarDocumentos")

	public List<Documento> listarDocumentos(@Context HttpHeaders httpHeaders) {
		List<Documento> documentos = new ArrayList<Documento>();
		DocumentoFacade documentoFacade = new DocumentoFacade();
		
		try {
			documentos = documentoFacade.listarDocumentos();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return documentos;
	}

}
