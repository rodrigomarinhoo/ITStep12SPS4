package br.com.massoterapia.model;

import java.util.Date;

public class PessoaFisica extends Pessoa {


	private Date datNascimento;
	private String cpf;
	
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public Date getDatNascimento() {
		return datNascimento;
	}
	public void setDatNascimento(Date datNascimento) {
		this.datNascimento = datNascimento;
	}
	
	
}
