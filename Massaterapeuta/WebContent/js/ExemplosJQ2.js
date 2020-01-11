$(document).ready(function() {

	carregando();

	inicializaConfiguracoesBasicasDaTela();

});

function carregando(mensagem) {

	carregaTextos();

	if (mensagem == null || mensagem == "") {

		if ($("#locale").val() == "pt_BR") {
			mensagem = "Por favor, aguarde. A página está carregando...";
		} else {
			mensagem = "Please, wait. The page is loading...";
		}

	}

	$("#modal_carregando").window(
			{

				prefixo : "ma",
				titulo : "<div id='ma_header'></div>",
				corpo : "<div id='ma_corpo'><center><img src='"
						+ $("#URL_BASE").val()
						+ "/pub/imagens/ajax-loader.gif' /><br> " + mensagem
						+ "</center></div>",
				tamanho : "500px",
				botoes : [

				]
			});
}

function inicializaConfiguracoesBasicasDaTela() {

	$("body").addModal("ic", "700px");

	$.ajax({
		type : "GET",
		url : url_visitantes() + "/visitas/" + $("#visita").val() + "/pessoas/"
				+ $("#pessoa").val() + "/dadosBasicos",
		dataType : "json",
		async : true,
		headers : {
			"Authorization" : $("#authorizationToken").val()
		},
		success : function(data, textStatus, xhr) {

			if (xhr.status == 200) {
				$("#visitante").val(data.id);
				habilitaTodasAsAbas();
			}

			$("#carregamentoVisitante").val("1");

		}

	});

	$.ajax({
		type : "GET",
		url : url_visitantes() + "/visitas/candidatura/" + $("#visita").val(),
		dataType : "json",
		async : true,
		headers : {
			"Authorization" : $("#authorizationToken").val()
		},
		success : function(response, textStatus, xhr) {

			data = response.candidatura;

			if ($("#locale").val() == "pt_BR") {
				$("#nomePrograma").html(data.proposito);
				$(document).prop('title', "IMPA - " + data.proposito);
			} else {

				$("#nomePrograma").html(data.propositoEn);
				$(document).prop('title', "IMPA - " + data.propositoEn);
			}

			if (response.sePodeVisualizar) {
				$("#checksEventoValido").val("1");
			} else {

				if ($("#locale").val() == "pt_BR") {
					$("#ma_corpo").html("O período da candidatura expirou.");
					$("#ma_header").html("Informação");
				} else {
					$("#ma_header").html("Information");
					$("#ma_corpo").html("The application period has expired.");
				}

				$(".container").hide();

			}

		}

	});

	carregaAreasDePesquisa();

	carregaCategorias();

	carregaPesquisadores();

	configCalendar(
			"#dc_dataNascimento,#dataInicio,#dataFim,#dataVencimentoPassaporte",
			false);

	if ($("#hca").val() == "true") {

		$("#tab_dados_cadastro").click(function() {
			carregaAbaDadosPessoais(true);
		});
		$("#tab_dados_inscricao").click(function() {
			carregaAbaDadosInscricao(true);
		});
		$("#tab_documentos").click(function() {
			carregaAbaDocumentos(true);
		});
		$("#tab_resumo").click(function() {
			carregaAbaResumo();
		});

	}

	setTimeout(function() {

		if ($("#carregamentoVisitante").val() == "1"
				&& $("#carregamentoAreasPesquisa").val() == "1"
				&& $("#carregamentoCategorias").val() == "1"
				&& $("#carregamentoPesquisadores").val() == "1"
				&& $("#checksEventoValido").val() == "1") {

			if ($("#aba").val() == "" || $("#aba").val() == "dadosPessoais-1") {
				carregaAbaDadosPessoais(false);
			} else if ($("#aba").val() == "dadosCandidatura-2") {
				carregaAbaDadosInscricao(false);
			} else if ($("#aba").val() == "documentos-3") {
				carregaAbaDocumentos(false);
			} else if ($("#aba").val() == "resumo-4") {
				carregaAbaResumo(false);
			}

		}

	}, 1000);

}

function carregamentoConcluido() {
	$("#ma_window").modal("hide");
}

function habilitaTodasAsAbas() {
	$("#tab_dados_cadastro").removeClass("disabled");
	$("#tab_dados_cadastro").removeClass("active");
	$("#tab_dados_cadastro").addClass("tabNormal");

	$("#tab_dados_inscricao").removeClass("disabled");
	$("#tab_dados_inscricao").removeClass("active");
	$("#tab_dados_inscricao").addClass("tabNormal");

	$("#tab_documentos").removeClass("disabled");
	$("#tab_documentos").removeClass("active");
	$("#tab_documentos").addClass("tabNormal");

	$("#tab_resumo").removeClass("disabled");
	$("#tab_resumo").removeClass("active");
	$("#tab_resumo").addClass("tabNormal");
}

function carregaAreasDePesquisa() {

	if ($("#locale").val() == "pt_BR") {
		$('#areasDePesquisa').append(
				$("<option></option>").attr("value", "").text("Selecione"));
	} else {
		$('#areasDePesquisa').append(
				$("<option></option>").attr("value", "").text("Select"));
	}

	$.ajax({
		type : "GET",
		url : url_visitantes() + "/areasPesquisa",
		cache : false,
		async : false,
		headers : {
			"Authorization" : $("#authorizationToken").val()
		},
		dataType : 'json',
		success : function(result) {

			$.each(result, function(i, item) {
				if ($("#locale").val() == "pt_BR") {
					$('#areasDePesquisa').append(
							$("<option></option>").attr("value", item.id).text(
									item.nome));
				} else {
					$('#areasDePesquisa').append(
							$("<option></option>").attr("value", item.id).text(
									item.nomeIngles));
				}

			});

			$("#carregamentoAreasPesquisa").val("1");

		}

	});

}

function carregaCategorias() {

	if ($("#locale").val() == "pt_BR") {
		$('#categorias').append(
				$("<option></option>").attr("value", "").text("Selecione"));
	} else {
		$('#categorias').append(
				$("<option></option>").attr("value", "").text("Select"));
	}

	// Carregar Categoria
	$.ajax({
		type : "GET",
		url : url_visitantes() + "/visitas/" + $("#visita").val()
				+ "/categorias",
		cache : false,
		async : false,
		headers : {
			"Authorization" : $("#authorizationToken").val()
		},
		dataType : 'json',
		success : function(resultCategoria) {

			$.each(resultCategoria, function(indexCategoria, itemCategoria) {

				if ($("#locale").val() == "pt_BR") {
					$('#categorias').append($('<option>', {
						value : itemCategoria.id,
						text : itemCategoria.nome
					}));
				} else {
					$('#categorias').append($('<option>', {
						value : itemCategoria.id,
						text : itemCategoria.nomeIngles
					}));
				}

			});

			$("#carregamentoCategorias").val("1");
		}
	});

}

function carregaPesquisadores() {
	$('#pesquisadoresComQuemIraInteragir').append($('<option>', {
		value : "",
		text : "Selecione"
	}));

	$.ajax({
		type : "GET",
		url : $("#URL_BASE").val()
				+ "pessoas/webService!buscaPesquisadores.action",
		data : "",
		cache : false,
		async : false,
		dataType : 'json',
		success : function(result) {

			$.each(result.pesquisadores, function(i, item) {

				$('#pesquisadoresComQuemIraInteragir').append($('<option>', {
					value : item.id,
					text : item.nome
				}));

			});

			$("#carregamentoPesquisadores").val("1");

		}
	});

}

function carregaTextos() {

	var i18n = i18nLoadTexts("commons.passo,"
			+ "visitantes.candidatura.dadosCadastrais,"
			+ "visitantes.candidatura.dadosInscricao,"
			+ "visitantes.candidatura.uploadDocumentos,"
			+ "visitantes.candidatura.resumo," + "commons.definir.principal,"
			+ "commons.nome," + "commons.paisNascimento,"
			+ "pessoa.dataNascimento," + "pessoa.sexo,"
			+ "commons.dataVencimentoPassaporte,"
			+ "commons.evento.passaporte," + "commons.paisEmissaoPassaporte,"
			+ "commons.alterar," + "commons.dados.phd," + "commons.voltar,"
			+ "commons.proximoPasso," + "candidato.periodopermanencia,"
			+ "commons.dadosBancarios,"
			+ "visitantes.candidatura.pesquisadorInteracao,"
			+ "visitantes.candidatura.outroPesquisadorInteracao,"
			+ "commons.experiencia.profissional.atual,"
			+ "areaPesquisa.header," + "commons.categoria,"
			+ "visitantes.candidatura.tituloApresentacao,"
			+ "commons.necessitaSuporteFinanceiro,"
			+ "candidato.suporteFinanceiro,"
			+ "visitantes.candidatura.mensagemSucesso," + "commons.tipo,"
			+ "commons.quantidade");

	$("#passo1").html(i18n.get("commons.passo") + " 1");
	$("#passo2").html(i18n.get("commons.passo") + " 2");
	$("#passo3").html(i18n.get("commons.passo") + " 3");
	$("#passo4").html(i18n.get("commons.passo") + " 4");
	$("#dadosPessoaisLabel").html(
			i18n.get("visitantes.candidatura.dadosCadastrais"));
	$("#dadosInscricaoLabel").html(
			i18n.get("visitantes.candidatura.dadosInscricao"));

	$("#dadosInscricaoResumoLabel").html(
			i18n.get("visitantes.candidatura.dadosInscricao"));

	$("#envioDocumentosLabel").html(
			i18n.get("visitantes.candidatura.uploadDocumentos"));
	$("#resumoLabel").html(i18n.get("visitantes.candidatura.resumo"));
	$("#nomeLabel").html(i18n.get("commons.nome"));
	$("#nomeResumoLabel").html(i18n.get("commons.nome"));
	$("#paisNascimentoLabel").html(i18n.get("commons.paisNascimento"));
	$("#paisNascimentoResumoLabel").html(i18n.get("commons.paisNascimento"));

	$("#dataNascimentoLabel").html(i18n.get("pessoa.dataNascimento"));
	$("#dataNascimentoResumoLabel").html(i18n.get("pessoa.dataNascimento"));

	$("#numeroPassaporteLabel").html(i18n.get("commons.evento.passaporte"));
	$("#passaporteResumoLabel").html(i18n.get("commons.evento.passaporte"));

	$("#paisEmissorResumoLabel")
			.html(i18n.get("commons.paisEmissaoPassaporte"));
	$("#paisEmissaoPassaporteLabel").html(
			i18n.get("commons.paisEmissaoPassaporte"));

	$("#dataVencimentoPassaporteLabel").html(
			i18n.get("commons.dataVencimentoPassaporte"));
	$("#dataValidadeResumoLabel").html(
			i18n.get("commons.dataVencimentoPassaporte"));

	$("#experienciaProfissionalLabel").html(
			i18n.get("commons.experiencia.profissional.atual"));
	$("#experienciaProfissionalResumoLabel").html(
			i18n.get("commons.experiencia.profissional.atual"));

	$("#sexoLabel").html(i18n.get("pessoa.sexo"));
	$("#sexoResumoLabel").html(i18n.get("pessoa.sexo"));
	$("#paisNascimentoLabel").html(i18n.get("commons.paisNascimento"));

	$("#dadoBancarioLabel").html(i18n.get("commons.dadosBancarios"));

	$("#dadosBancariosResumoLabel").html(i18n.get("commons.dadosBancarios"));

	$("#btn_alterar_dadoBancario").html(i18n.get("commons.alterar"));
	$("#btn_alterar_experiencia_profissional")
			.html(i18n.get("commons.alterar"));
	$("#btn_alterar_formacaoAcademica").html(i18n.get("commons.alterar"));
	$("#btn_alterar_email").html(i18n.get("commons.alterar"));

	$("#formacaoAcademicaLabel").html(i18n.get("commons.dados.phd"));
	$("#formacaoAcademicaResumoLabel").html(i18n.get("commons.dados.phd"));

	$("#voltarPasso1").html(i18n.get("commons.voltar"));
	$("#voltarPasso2").html(i18n.get("commons.voltar"));
	$("#voltarPasso3").html(i18n.get("commons.voltar"));

	$("#salvarPasso1").html(i18n.get("commons.proximoPasso"));
	$("#salvarPasso2").html(i18n.get("commons.proximoPasso"));
	$("#salvarPasso3").html(i18n.get("commons.proximoPasso"));

	$("#personalDataResumoLabel").html(
			i18n.get("visitantes.candidatura.dadosCadastrais"));

	$("#periodoPermanenciaLabel")
			.html(i18n.get("candidato.periodopermanencia"));
	$("#periodoPermanenciaResumoLabel").html(
			i18n.get("candidato.periodopermanencia"));

	$("#pesquisadorInteracaoLabel").html(
			i18n.get("visitantes.candidatura.pesquisadorInteracao"));

	$("#outroPesquisadorInteracaoLabel").html(
			i18n.get("visitantes.candidatura.outroPesquisadorInteracao"));

	$("#pesquisadorInteracaoResumoLabel").html(
			i18n.get("visitantes.candidatura.pesquisadorInteracao"));

	$("#outroPesquisadorInteracaoResumoLabel").html(
			i18n.get("visitantes.candidatura.outroPesquisadorInteracao"));

	$("#areaPesquisaLabel").html(i18n.get("areaPesquisa.header"));
	$("#areaPesquisaResumoLabel").html(i18n.get("areaPesquisa.header"));

	$("#categoriaLabel").html(i18n.get("commons.categoria"));
	$("#categoriaResumoLabel").html(i18n.get("commons.categoria"));

	$("#apresentacaoLabel").html(
			i18n.get("visitantes.candidatura.tituloApresentacao"));
	$("#tituloApresentacaoResumoLabel").html(
			i18n.get("visitantes.candidatura.tituloApresentacao"));

	$("#auxilioFinanceiroLabel").html(
			i18n.get("commons.necessitaSuporteFinanceiro"));
	$("#auxilioFinanceiroResumoLabel").html(
			i18n.get("commons.necessitaSuporteFinanceiro"));

	$("#auxilioFinanceiroPanelLabel").html(
			i18n.get("candidato.suporteFinanceiro"));
	$("#auxilioFinanceiroPanelResumoLabel").html(
			i18n.get("candidato.suporteFinanceiro"));

	$("#tipoLabel").html(i18n.get("commons.tipo"));
	$("#tipoResumoLabel").html(i18n.get("commons.tipo"));

	$("#quantidadeLabel").html(i18n.get("commons.quantidade"));
	$("#quantidadeResumoLabel").html(i18n.get("commons.quantidade"));

	$("#aplicacaoFinalizadaLabel").html(
			i18n.get("visitantes.candidatura.mensagemSucesso"));

	if ($("#locale").val() == "pt_BR") {
		$("#sexoNaoInformadoLabel").html("Não Informado");
		$("#sexoMasculinoLabel").html("Masculino");
		$("#sexoFemininoLabel").html("Feminino");
		$("#naoLabel").html("Não");
		$("#simLabel").html("Sim");

		$("#diariasLabel").val("Diárias");

		$("#bancoResumoLabel").html("Banco");
		$("#agenciaResumoLabel").html("Agência");
		$("#contaResumoLabel").html("Conta");
		$("#instituicaoEResumoLabel").html("Instituição");
		$("#cargoResumoLabel").html("Cargo");
		$("#periodoResumoLabel").html("Período");
		$("#anoConclusaoResumoLabel").html("Ano de conclusão");
		$("#instituicaoResumoLabel").html("Instituição");

	} else {
		$("#sexoNaoInformadoLabel").html("Not Informed");
		$("#sexoMasculinoLabel").html("Male");
		$("#sexoFemininoLabel").html("Female");
		$("#naoLabel").html("No");
		$("#simLabel").html("Yes");

		$("#diariasLabel").val("Per diems");

		$("#bancoResumoLabel").html("Bank");
		$("#agenciaResumoLabel").html("Branch Number");
		$("#contaResumoLabel").html("Account Number");
		$("#instituicaoEResumoLabel").html("Institution");
		$("#cargoResumoLabel").html("Position");
		$("#periodoResumoLabel").html("Period");
		$("#anoConclusaoResumoLabel").html("Year of conclusion");
		$("#instituicaoResumoLabel").html("Institution");
	}

}