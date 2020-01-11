function carregaAbaDadosPessoais(exibeCarregando) {
	habilitaTodasAsAbas();

	$("#panel_dados_cadastro").show();
	$("#painel_dados_inscricao").hide();
	$("#painel_documentos").hide();
	$("#painel_resumo").hide();

	window.history.pushState({}, "", $("#URL_BASE").val()
			+ "visitantes/inscricaoCandidato.action?visita="
			+ $("#visita").val() + "&pessoa=" + $("#pessoa").val()
			+ "&aba=dadosPessoais-1");

	$("#passo").val("1");
	$("#aba").val("dadosPessoais-1");

	$("#tab_dados_cadastro").addClass("active");

	if (exibeCarregando) {
		carregando();
	}

	$("#dc_cpf").mask("999.999.999-99");

	$("#btn_alterar_dadoBancario").unbind("click");
	$("#btn_alterar_dadoBancario").click(function() {

		if ($("#locale").val() == "pt_BR") {
			$("#ic_title").html("Alterar Dado Bancário");
		} else {
			$("#ic_title").html("Select Bank Data");
		}

		$("#ic_body").selectDadoBancario({
			prefixo : "ic",
			idPessoaFisica : $("#pessoa").val(),
			divResultado : "dadoBancarioInfo",
			hiddenPrincipal : "idDadoBancario",
			hiddenAuxiliar : null,
			seHabilitaCriacao : true,
			idioma : $("#locale").val()
		});

		$("#ic_modal").modal("show");

	});

	$("#btn_alterar_email").unbind("click");
	$("#btn_alterar_email").click(function() {

		if ($("#locale").val() == "pt_BR") {
			$("#ic_title").html("Alterar Email");
		} else {
			$("#ic_title").html("Select Email");
		}

		$("#ic_body").selectEmail({
			prefixo : "ic",
			idPessoaFisica : $("#pessoa").val(),
			divResultado : "emailInfo",
			hiddenPrincipal : "idEmail",
			hiddenAuxiliar : null,
			seHabilitaCriacao : true,
			idioma : $("#locale").val()
		});

		$("#ic_modal").modal("show");

	});

	// Renderizando o modal de formação acadêmica ao clicar em alterar

	$("#btn_alterar_formacaoAcademica").unbind("click");
	$("#btn_alterar_formacaoAcademica").click(
			function() {

				if ($("#locale").val() == "pt_BR") {
					$("#ic_title").html("Alterar Formação Acadêmica");
				} else {
					$("#ic_title").html("Select Academic Formation");
				}

				$("#ic_body").selectFormacaoAcademica("ic", $("#pessoa").val(),
						"formacaoAcademicaInfo", "idFormacaoAcademica", null,
						true, $("#locale").val());

				$("#ic_modal").modal("show");

			});

	// Renderizando o modal de experiência profissional ao clicar em alterar

	$("#btn_alterar_experiencia_profissional").unbind("click");
	$("#btn_alterar_experiencia_profissional").click(function() {

		if ($("#locale").val() == "pt_BR") {
			$("#ic_title").html("Alterar Experiência Profissional");
		} else {
			$("#ic_title").html("Select Profesional Experience");
		}

		$("#ic_body").selectExperienciaProfissional({
			prefixo : "ic",
			idPessoaFisica : $("#pessoa").val(),
			divResultado : "experienciaProfissionalInfo",
			hiddenPrincipal : "idExperienciaProfissional",
			hiddenAuxiliar : null,
			seHabilitaCriacao : true,
			idioma : $("#locale").val()
		});

		$("#ic_modal").modal("show");

	});

	$
			.ajax({
				type : "GET",
				url : $("#URL_BASE").val()
						+ "/pessoas/pessoaFisica/ajax!get.action?idPessoa="
						+ $("#pessoa").val(),
				dataType : "json",
				async : true,
				success : function(data, textStatus, xhr) {

					$("#dc_nome").val(data.pessoa.nome);

					if (data.pessoa.dataNascimento != null) {
						$("#dc_dataNascimento").val(
								data.pessoa.dataNascimentoFormatada);
					}

					if (data.pessoa.pais != null) {
						$("#dc_paisNascimento").val(data.pessoa.pais.id);
						$("#dc_paisNascimento").change();
					}

					$("#dc_sexo").val(data.pessoa.sexo);

					if (data.pessoa.cpf != null) {
						$("#dc_cpf").val(data.pessoa.cpf);
					}

					if (data.pessoa.passaporte != null) {
						$("#dc_passaporte").val(data.pessoa.passaporte);
					}

					if (data.pessoa.paisEmissaoPassaporteId != null) {
						$("#idPaisEmissaoPassaporte").val(
								data.pessoa.paisEmissaoPassaporteId);
					}

					if (data.pessoa.dataValidadePassaporteFormatada != null) {
						$("#dataVencimentoPassaporte").val(
								data.pessoa.dataValidadePassaporteFormatada);
					}

					$("#carregamentoPasso1C1").val("1");

					if ($("#locale").val() == "pt_BR") {
						$("#experienciaProfissionalInfo").html("Não informado");
						$("#dadoBancarioInfo").html("Não informado");
						$("#formacaoAcademicaInfo").html("Não informado");
						$("#emailInfo").html("Não informado");

					} else {
						$("#experienciaProfissionalInfo").html("Not informed");
						$("#dadoBancarioInfo").html("Not informed");
						$("#formacaoAcademicaInfo").html("Not informed");
						$("#emailInfo").html("Not Informed");
					}

					if ($("#visitante").val() != "") {
						$
								.ajax({
									type : "GET",
									url : url_visitantes() + "/visitas/"
											+ $("#visita").val() + "/pessoas/"
											+ $("#pessoa").val()
											+ "/dadosBasicos",
									dataType : "json",
									async : true,
									headers : {
										"Authorization" : $(
												"#authorizationToken").val()
									},
									success : function(data, textStatus, xhr) {

										if (data.experienciaProfissional != null) {
											$("#idExperienciaProfissional")
													.val(
															data.experienciaProfissional.id);
											$("#experienciaProfissionalInfo")
													.html(
															data.experienciaProfissionalResumo);
										} else {
											if ($("#locale").val() == "pt_BR") {
												$(
														"#experienciaProfissionalInfo")
														.html("Não informado");
											} else {
												$(
														"#experienciaProfissionalInfo")
														.html("Not informed");
											}
										}

										if (data.email != null) {
											$("#idEmail").val(data.email.id);
											carregaEmailPorId(data.email.id);
										} else {

											if ($("#locale").val() == "pt_BR") {
												$("#emailInfo").html(
														"Não informado");
											} else {
												$("#emailInfo").html(
														"Not informed");
											}
										}

										if (data.dadoBancario != null) {
											$("#idDadoBancario").val(
													data.dadoBancario.id);
											carregaDadoBancarioPorId(data.dadoBancario.id);
										} else {
											if ($("#locale").val() == "pt_BR") {

												$("#dadoBancarioInfo").html(
														"Não informado");

											} else {

												$("#dadoBancarioInfo").html(
														"Not informed");

											}
										}

										if (data.formacaoAcademica != null) {
											$("#idFormacaoAcademica").val(
													data.formacaoAcademica.id);
											carregaFormacaoAcademicaPorId(data.formacaoAcademica.id);
										} else {
											if ($("#locale").val() == "pt_BR") {

												$("#formacaoAcademicaInfo")
														.html("Não informado");
											} else {

												$("#formacaoAcademicaInfo")
														.html("Not informed");
											}
										}

										$("#carregamentoPasso1C2").val("1");

									}

								});

					} else {

						if (data.pessoa.ultimoEmailCadastrado != null) {
							carregaEmailPorId(data.pessoa.ultimoEmailCadastrado.id);
						}

						if (data.pessoa.ultimoDadoBancarioCadastrado != null) {
							carregaDadoBancarioPorId(data.pessoa.ultimoDadoBancarioCadastrado.id);
						}

						if (data.pessoa.ultimaFormacaoAcademicaCadastrada != null) {
							carregaFormacaoAcademicaPorId(data.pessoa.ultimaFormacaoAcademicaCadastrada.id);
						}

						if (data.pessoa.ultimaExperienciaProfissionalCadastrada != null) {
							carregaExperienciaProfissionalPorId(data.pessoa.ultimaExperienciaProfissionalCadastrada.id);
						}

						$("#carregamentoPasso1C2").val("1");
					}

				},
				error : function(xhr) {
					alert('Request Status: ' + xhr.status + ' Status Text: '
							+ xhr.statusText + ' ' + xhr.responseText);
					$("#carregamentoPasso1C1").val("1");
				}
			});

	// xxxxxx
	ocultaCarregandoPagina();
	// xxxxxx

	$(document).off("change", "#dc_paisNascimento").on("change",
			"#dc_paisNascimento", function(e) {

				if ($(this).val() == "") {
					$("#box_passaporte").hide();
					// $("#box_cpf").hide();
					$("#idCPFObrigatorioAsteristico").hide();
					$("#idDadosBancariosObrigatorioAsteristico").hide();

				} else if ($(this).val() == "1") {
					$("#box_passaporte").hide();
					// $("#box_cpf").show();
					$("#idCPFObrigatorioAsteristico").show();
					$("#idDadosBancariosObrigatorioAsteristico").show();
				} else {
					$("#box_passaporte").show();
					// $("#box_cpf").hide();
					$("#idCPFObrigatorioAsteristico").hide();
					$("#idDadosBancariosObrigatorioAsteristico").hide();
				}

			});

	$(document).off("click", "#salvarPasso1").on(
			"click",
			"#salvarPasso1",
			function(e) {

				carregando();

				$("#pdc_mensagensErro").hide();
				$("#pdc_mensagensErro").html("");

				$.ajax({
					type : "POST",
					data : $("#formDadosCadastro").serialize(),
					url : url_visitantes() + "/visitantes/candidatura",
					dataType : "json",
					async : true,
					headers : {
						"Authorization" : $("#authorizationToken").val()
					},
					success : function(data, textStatus, xhr) {
						if (data.ok == false) {
							$.each(data.msg, function(i, item) {
								$("#pdc_mensagensErro").append(
										"<li>" + item + "</li>");
							});

							$("#pdc_mensagensErro").show();

							carregamentoConcluido();

						} else {

							habilitaTodasAsAbas();

							$("#panel_dados_cadastro").hide();

							$("#visitante").val(data.idVisitante);

							carregaAbaDadosInscricao(false);

						}
					}
				});

			});

}

function ocultaCarregandoPagina() {
	setTimeout(function() {

		if ($("#carregamentoPasso1C1").val() == "1"
				&& $("#carregamentoPasso1C2").val() == "1") {

			$("#panel_dados_cadastro").show();
			carregamentoConcluido();

		} else {
			ocultaCarregandoPagina();
		}

	}, 1000);

}

function carregaEmailPorId(id) {
	$.ajax({
		type : "GET",
		url : $("#URL_BASE").val()
				+ "/componentes/js/emailJSComponent!toStringById.action?id="
				+ id,
		dataType : "json",
		async : true,
		headers : {
			"Authorization" : $("#authorizationToken").val()
		},
		success : function(data2, textStatus, xhr) {
			$("#idEmail").val(id);
			$("#emailInfo").html(data2.object);
		}
	});
}

function carregaFormacaoAcademicaPorId(id) {
	$
			.ajax({
				type : "GET",
				url : $("#URL_BASE").val()
						+ "/componentes/js/formacaoAcademicaJSComponent!toStringById.action?id="
						+ id,
				dataType : "json",
				async : true,
				headers : {
					"Authorization" : $("#authorizationToken").val()
				},
				success : function(data2, textStatus, xhr) {
					$("#idFormacaoAcademica").val(id);
					$("#formacaoAcademicaInfo").html(data2.object);
				}
			});
}

function carregaExperienciaProfissionalPorId(id) {
	$
			.ajax({
				type : "GET",
				url : $("#URL_BASE").val()
						+ "/componentes/js/experienciaProfissionalJSComponent!toStringById.action?id="
						+ id,
				dataType : "json",
				async : true,
				headers : {
					"Authorization" : $("#authorizationToken").val()
				},
				success : function(data2, textStatus, xhr) {
					$("#idExperienciaProfissional").val(id);
					$("#experienciaProfissionalInfo").html(data2.object);
				}
			});
}

function carregaDadoBancarioPorId(id) {
	$
			.ajax({
				type : "GET",
				url : $("#URL_BASE").val()
						+ "/componentes/js/dadoBancarioJSComponent!toStringById.action?id="
						+ id,
				dataType : "json",
				async : true,
				headers : {
					"Authorization" : $("#authorizationToken").val()
				},
				success : function(data2, textStatus, xhr) {
					$("#idDadoBancario").val(id);
					$("#dadoBancarioInfo").html(data2.object);
				}
			});
}