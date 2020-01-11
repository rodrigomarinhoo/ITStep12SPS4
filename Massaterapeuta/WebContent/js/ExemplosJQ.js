//Exemplos jQuery
$(document).ready(function() {

	// alert("entrou document");

});

// Carregar Categoria
$.ajax({
	type : "GET",
	url : "http://viacep.com.br/ws/21311282/json",
	cache : false,
	async : false,
	dataType : 'json',
	success : function(resultCep) {

		alert(resultCep.length);
		// var i;
		// for (i = 0; i<=resultCep.length;i++) {

		$("#idLogradouro").val(resultCep.logradouro);
		$("#idBairro").val(resultCep.bairro);

		// }

	}
});

// Exemplos 2
function desenhaTodasCategorias() {

	desenhaCategorias(url_visitantes() + "/categorias/");

}

function desenhaCategoriasPorTipo(idTipo) {

	desenhaCategorias(url_visitantes() + "visitas/tipos/" + idTipo
			+ "/categorias");

}

function desenhaCategorias(url) {

	$.ajax({
		type : "GET",
		url : url,
		data : "",
		cache : false,
		dataType : 'json',
		headers : {
			"Authorization" : $("#authorizationToken").val()
		},
		success : function(response) {

			var html = " <select id=categoriaCBX class=form-control> ";
			html += "<option value=''>Selecione</option>";

			for (var i = 0; i < response.length; i++) {

				html += "<option value=" + response[i].id + ">"
						+ response[i].nome + "</option>";

			}

			html += " </select> ";

			$("#categoria").html(html);

		}
	});

}

function carregaVisitas() {
	carregaTipos();

	desenhaTodasCategorias();

	var origem = "todas";

	if ($("#seBuscaProposta").is(":checked") == true
			&& $("#seBuscaCandidatura").is(":checked") == false) {
		origem = "propostas";
	}

	if ($("#seBuscaCandidatura").is(":checked") == true
			&& $("#seBuscaProposta").is(":checked") == false) {
		origem = "candidaturas";
	}

	$('#visitaCB').attr("disabled", "disabled");

	$('#visitaCB').find('option').remove().end().append(
			$("<option></option>").attr("value", "").text("Selecione"));

	// Carrega todos os propósitos para o filtro
	$.ajax({
		type : "GET",
		url : url_visitantes() + "/visitas/" + origem + "/propositos",
		data : "",
		cache : false,
		dataType : 'json',
		headers : {
			"Authorization" : $("#authorizationToken").val()
		},

		success : function(response) {

			$.each(response.propositos, function(arrKey, arrValue) {

				$('#visitaCB').append(
						$("<option></option>").attr("value", arrKey).text(
								arrValue));

			});

			$('#visitaCB').attr("disabled", "");
			$('#visitaCB').removeAttr("disabled");

		}

	});
}

function carregaTipos(idVisita) {

	if (idVisita == undefined) {
		var url = url_visitantes() + "/visitas/tipos";
	} else {
		var url = url_visitantes() + "/visitas/" + idVisita + "/tipo";
	}

	// Carrega todos os Tipos
	$.ajax({
		type : "GET",
		url : url,
		data : "",
		cache : false,
		async : false,
		dataType : 'json',
		headers : {
			"Authorization" : $("#authorizationToken").val()
		},
		success : function(response) {

			var html = " <select id=tipoCBX class=form-control> ";
			html += "<option value=''>Selecione</option>";

			for (var i = 0; i < response.length; i++) {

				html += "<option value=" + response[i].id + ">"
						+ response[i].nome + "</option>";

			}

			html += " </select> ";

			$("#tipo").html(html);
			$("#tipoCabecalho").html(html);

		}
	});
}

$(document)
		.ready(
				function() {

					$(document)
							.off("click", "#btnEtiqueta")
							.on(
									"click",
									"#btnEtiqueta",
									function() {

										// Carrega as etiquetas
										$("#form_filtro").attr(
												"action",
												url_visitantes()
														+ "/periodos/gerarCsv");
										$("#hidden_qtdPorPagina").val("999999");
										$("#form_filtro")
												.attr("method", "POST");
										$("#form_filtro").submit();
										$("#form_filtro").attr("action", "");
										$("#hidden_qtdPorPagina").val(
												$("#idQtdePorPagina").val());

										// Executa a consulta
										$("#btnConsultaVisitante").click();

									});

					$(document).off("click", "#btnMensagemGenerica").on(
							"click",
							"#btnMensagemGenerica",
							function() {

								var qntdePorPagina = $("#idQtdePorPagina")
										.val();

								var ordenacao = $("select[name=ordenacao]")
										.val();

								var tipoOrdenacao = $(
										"select[name=tipoOrdenacao]").val();

								//

								$("#hidden_qtdPorPagina").val("999999");

								$("#hidden_seMensagemGenerica").val(true);

								$("select[name=ordenacao]").val("visitante");

								$("select[name=tipoOrdenacao]").val("asc");

								//

								$("#modal_mensagem_generica").window({
									prefixo : "mmg",
									titulo : "Envio de Mensagem Genérica",
									corpo : "<div id='mmg_corpo'></div>",
									tamanho : "1000px",
									closeButton : true,
									botoes : []
								});

								// Carrega todos as visitas
								$.ajax({
									type : "POST",
									url : url_visitantes() + "/periodos/list",
									data : $("#form_filtro").serialize(),
									cache : false,
									async : true,
									dataType : 'json',
									headers : {
										"Authorization" : $(
												"#authorizationToken").val()
									},
									success : function(response) {

										$("#mmg_corpo").enviaEmail({
											de : "dac@impa.br",
											para : response
										});

									}

								});

								setTimeout(function() {

									$("#hidden_seMensagemGenerica").val(false);
									$("#hidden_qtdPorPagina").val(
											qntdePorPagina);
									$("select[name=ordenacao]").val(ordenacao);
									$("select[name=tipoOrdenacao]").val(
											tipoOrdenacao);

								}, 100);

							});

					$(document).off("change", "#visitaCB").on("change",
							"#visitaCB", function(e) {
								carregaTipos($("#visitaCB").val());
								desenhaTodasCategorias();
							});

					$(document)
							.off("click", "a[id^=deferirPeriodo_]")
							.on(
									"click",
									"a[id^=deferirPeriodo_]",
									function(e) {

										$("#modal_aguarde")
												.window(
														{

															prefixo : "ma",
															titulo : "Aguarde",
															corpo : "<div id='ma_corpo'><center><img src='"
																	+ $(
																			"#URL_BASE")
																			.val()
																	+ "/pub/imagens/ajax-loader.gif' /></center></div>",
															tamanho : "500px",
															botoes : [

															]

														});

										var idPeriodo = $(this).attr("id")
												.substring(15);

										$
												.ajax({
													type : "PUT",
													url : url_visitantes()
															+ "/periodos/"
															+ idPeriodo
															+ "/desfazerIndeferimento",
													data : "",
													cache : false,
													async : true,
													dataType : 'json',
													headers : {
														"Authorization" : $(
																"#authorizationToken")
																.val()
													},
													success : function(response) {
														$(
																"#btnConsultaVisitante")
																.click();
														$("#ma_window").modal(
																"toggle");
													}
												});

									});

					$(document)
							.off("click", "a[id^=indeferirPeriodo_]")
							.on(
									"click",
									"a[id^=indeferirPeriodo_]",
									function(e) {

										$("#modal_aguarde")
												.window(
														{

															prefixo : "ma",
															titulo : "Aguarde",
															corpo : "<div id='ma_corpo'><center><img src='"
																	+ $(
																			"#URL_BASE")
																			.val()
																	+ "/pub/imagens/ajax-loader.gif' /></center></div>",
															tamanho : "500px",
															botoes : [

															]

														});

										var idPeriodo = $(this).attr("id")
												.substring(17);

										$
												.ajax({
													type : "PUT",
													url : url_visitantes()
															+ "/periodos/"
															+ idPeriodo
															+ "/indeferir",
													data : "",
													cache : false,
													async : true,
													dataType : 'json',
													headers : {
														"Authorization" : $(
																"#authorizationToken")
																.val()
													},
													success : function(response) {
														$(
																"#btnConsultaVisitante")
																.click();

														$("#ma_window").modal(
																"toggle");

													}
												});

									});

					$("#tab_visao_geral").addClass("active");

					var now = new Date();

					var dia = now.getDate();
					if (dia < 10) {
						dia = "0" + dia;
					}

					var mes = now.getMonth() + 1;

					if (mes < 10) {
						mes = "0" + mes;
					}

					var data = dia + "/" + mes + "/" + now.getFullYear();

					$("#dataNotificacoes").val(data);

					$("input[id^=data]").mask("99/99/9999");

					// Carrega todos os Links
					$.ajax({
						type : "GET",
						url : url_visitantes()
								+ "/programasCientificos/abertos",
						data : "",
						cache : false,
						dataType : 'json',
						headers : {
							"Authorization" : $("#authorizationToken").val()
						},
						success : function(response) {

							desenhaLinkTabela(response);

						}
					});

					carregaVisitas();

					// Carrega todas as areas de pesquisa
					$.ajax({
						type : "GET",
						url : url_visitantes() + "/areasPesquisa",
						data : "",
						cache : false,
						dataType : 'json',
						headers : {
							"Authorization" : $("#authorizationToken").val()
						},
						success : function(response) {

							desenhaAreaDePesquisaSelect(response);

						}
					});

					$("#seBuscaProposta").change(function() {
						carregaVisitas();
					});

					$("#seBuscaCandidatura").change(function() {
						carregaVisitas();
					});

					$("input[name=pesquisadorVinculado]").click(function() {

						if ($(this).is(":checked")) {

							$("#pesquisadorInteracao").val("");

						}

					});

					$("#tipo").change(function() {

						// Carrega todas as categorias pelo tipo

						if ($(this).val() == "") {

							desenhaTodasCategorias();

						} else {

							desenhaCategoriasPorTipo($("#tipo").val());

						}

					});

					$("#tipo").change();

					// carregando os status default

					var status_selecionados;

					$
							.ajax({
								type : "GET",
								url : url_visitantes()
										+ "periodos/status/selecionados",
								data : "",
								dataType : 'json',
								async : false,
								headers : {
									"Authorization" : $("#authorizationToken")
											.val()
								},
								success : function(response) {

									status_selecionados = response;

								}

							});

					// carregando os outros status

					var status_outros;

					$.ajax({
						type : "GET",
						url : url_visitantes() + "periodos/status/outros",
						data : "",
						dataType : 'json',
						async : false,
						headers : {
							"Authorization" : $("#authorizationToken").val()
						},
						success : function(response) {

							status_outros = response;

						}

					});

					// Desenha o campo status
					desenhaStatusSelecionados(status_selecionados,
							status_outros);

					// Carrega todas os Pesquisadores
					$
							.ajax({
								type : "GET",
								url : $("#URL_BASE").val()
										+ "/pessoas/webService!buscaPesquisadores.action",
								data : "",
								cache : false,
								dataType : 'json',
								success : function(response) {

									desenhaPesquisadoresSelect(response);

								}
							});

					// Filtra as notificaçõers
					$("#dataNotificacoes").on(
							'change',
							function() {

								var dataNaoFormatada = $("#dataNotificacoes")
										.val();
								var dataConvertida = dataNaoFormatada.substr(6,
										4)
										+ dataNaoFormatada.substr(3, 2)
										+ dataNaoFormatada.substr(0, 2);

								$.ajax({
									type : "GET",
									url : url_visitantes() + "/notificacoes/"
											+ dataConvertida,
									data : "",
									cache : false,
									dataType : 'json',
									headers : {
										"Authorization" : $(
												"#authorizationToken").val()
									},
									success : function(response) {

										desenhaNotificacaoTabela(response);

									}
								});

							});

					// Filtra por Tipo
					$("#tipoCabecalho").on('change', function() {

						$("#tipo").val($("#tipoCabecalho").val());

						$("#btnConsultaVisitante").trigger("click");

					});

					// Filtra visitantes
					$("#btnPreConsultaVisitante").on('click', function() {
						$("#hidden_pagina").val("1");
						$("#btnConsultaVisitante").click();
					});

					// Botão de impressão

					$("#btnImprimir")
							.on(
									'click',
									function() {

										var qtdPorPagina = $(
												"#hidden_qtdPorPagina").val();

										// passando um nulo na quantidade de
										// páginas da paginação para trazer
										// todos os resultados

										$("#hidden_qtdPorPagina").val(999999);

										$("#hidden_seImpressao").val(true);

										// setando a busca por todos no select
										// de quantidade por página

										$("#idQtdePorPagina").val("999999");

										$("#btnPreConsultaVisitante").click();

										// quando terminar a consulta realizar o
										// trecho abaixo

										$(document)
												.off("change",
														"#hidden_isLoaded")
												.on(
														"change",
														"#hidden_isLoaded",
														function() {

															if ($(
																	"#hidden_seImpressao")
																	.val() == 'true') {

																$(
																		".nome_visitante")
																		.hide();
																$(
																		".nome_visitante_impressao")
																		.show();
																$(".proposito")
																		.hide();
																$(
																		".proposito-impressao")
																		.show();
																$(
																		".span-instituicao")
																		.hide();

																window.print();

																$(
																		"#hidden_qtdPorPagina")
																		.val(
																				qtdPorPagina);
																$(
																		"#hidden_seImpressao")
																		.val(
																				false);

															}

														});

										// fim do trecho

									});

					// Filtra visitantes - Paginação
					$("#btnConsultaVisitante")
							.on(
									'click',
									function() {

										$("#table-visitantes-body-left").html(
												"");
										$("#table-visitantes-body-right").html(
												"");

										$("#btnOcultarFiltros")
												.trigger("click");

										$("#loadingVisaoGeral").show();
										$("#table-visitantes").hide();
										$("#paginacao").hide();

										// Carrega todas as visitas
										$
												.ajax({
													type : "POST",
													url : url_visitantes()
															+ "/periodos/list",
													data : $("#form_filtro")
															.serialize(),
													cache : false,
													async : true,
													dataType : 'json',
													headers : {
														"Authorization" : $(
																"#authorizationToken")
																.val()
													},
													success : function(response) {

														$(
																"#table-visitantes-body-left")
																.html("");
														$(
																"#table-visitantes-body-right")
																.html("");

														// Iguala o filtro do
														// cabeçalho
														$("#tipoCabecalho")
																.val(
																		$(
																				"#tipo")
																				.val());

														var count = 0;

														if (response == null
																|| response.length == 0) {

															$(
																	"#table-visitantes-body-left")
																	.html(
																			"Nenhum visitante encontrado.")

														} else {

															if ($(
																	"select[name=agrupamento]")
																	.val() == "periodo") {

																$
																		.each(
																				response,
																				function(
																						i,
																						visitaPeriodo) {

																					var div = "";

																					if (count % 2 == 0
																							|| $(
																									"#hidden_seImpressao")
																									.val() == 'true') {
																						div = "table-visitantes-body-left";
																					} else {
																						div = "table-visitantes-body-right";
																					}

																					desenhaVisitaPeriodo(
																							visitaPeriodo,
																							div);

																					count++;

																					// se
																					// último
																					// registro
																					// desenhado
																					// na
																					// tela
																					// definir
																					// variável
																					// isLoaded
																					// true

																					if (response.length == count
																							&& $(
																									"#hidden_seImpressao")
																									.val() == 'true') {

																						var delayLoadAuxilio = response.length * 100;

																						setTimeout(
																								function() {

																									$(
																											"#hidden_isLoaded")
																											.val(
																													true);
																									$(
																											"#hidden_isLoaded")
																											.change();

																								},
																								delayLoadAuxilio);

																					}

																				});

															} else {

																$
																		.each(
																				response,
																				function(
																						i,
																						visitante) {

																					var div = "";

																					if (count % 2 == 0
																							|| $(
																									"#hidden_seImpressao")
																									.val() == 'true') {
																						div = "table-visitantes-body-left";
																					} else {
																						div = "table-visitantes-body-right";
																					}

																					desenhaVisitante(
																							visitante,
																							div);

																					count++;

																					// se
																					// último
																					// registro
																					// desenhado
																					// na
																					// tela
																					// definir
																					// variável
																					// isLoaded
																					// true

																					if (response.length == count
																							&& $(
																									"#hidden_seImpressao")
																									.val() == 'true') {

																						var delayLoadAuxilio = response.length * 100;

																						setTimeout(
																								function() {

																									$(
																											"#hidden_isLoaded")
																											.val(
																													true);
																									$(
																											"#hidden_isLoaded")
																											.change();

																								},
																								delayLoadAuxilio);

																					}

																				});

															}

															$(
																	"tr[id^=tr_result_]")
																	.unbind(
																			"click");
															$(
																	"tr[id^=tr_result_]")
																	.click(
																			function() {

																				var arr_url_visitantes = $(
																						this)
																						.attr(
																								"id")
																						.split(
																								"_");

																				window.location = $(
																						"#URL_BASE")
																						.val()
																						+ "visitantes/visitas/formularioVisitante.action?id="
																						+ arr_url_visitantes[arr_url_visitantes.length - 2]
																						+ "&idPeriodo="
																						+ arr_url_visitantes[arr_url_visitantes.length - 1];

																			});

														}

														$("#loadingVisaoGeral")
																.hide();
														$("#table-visitantes")
																.show();

														// Carrega a paginação
														$
																.ajax({
																	type : "POST",
																	url : url_visitantes()
																			+ "/periodos/count",
																	data : $(
																			"#form_filtro")
																			.serialize(),
																	cache : false,
																	async : true,
																	dataType : 'json',
																	headers : {
																		"Authorization" : $(
																				"#authorizationToken")
																				.val()
																	},
																	success : function(
																			response2) {

																		var nPaginas = parseInt(parseInt(response2)
																				/ parseInt($(
																						"#hidden_qtdPorPagina")
																						.val()));

																		if (parseInt(response2)
																				% parseInt($(
																						"#hidden_qtdPorPagina")
																						.val()) > 0) {
																			nPaginas++;
																		}

																		$(
																				"#paginacao")
																				.paginacao(
																						"paginacao_",
																						nPaginas,
																						$(
																								"#hidden_qtdPorPagina")
																								.val(),
																						response2,
																						"btnConsultaVisitante",
																						"hidden_pagina");
																		$(
																				"#paginacao")
																				.show();
																	}
																});

													}
												});

									});

					// Desenha Status Periodo Visita
					function desenhaStatusSelecionados(dadosSelecionados,
							dadosOutros) {

						var html = "";

						for (var i = 0; i < dadosSelecionados.length; i++) {

							html += "<input id='status' name='status' value='"
									+ dadosSelecionados[i].id
									+ "' type='checkbox' checked>"
									+ dadosSelecionados[i].value
									+ "&nbsp;&nbsp;&nbsp;";

						}

						for (var i = 0; i < dadosOutros.length; i++) {

							html += "<input id='status' name='status' value='"
									+ dadosOutros[i].id + "' type='checkbox'>"
									+ dadosOutros[i].value
									+ "&nbsp;&nbsp;&nbsp;";

						}

						$("#status").html(html);

					}

					// Desenha Visita Período

					function desenhaVisitaPeriodo(visitaPeriodo, div) {

						var seSolicitouAlocacao = false;

						if (visitaPeriodo.visitaCriadaPorProposta) {
							$
									.ajax({
										type : "GET",
										url : url_auxilio()
												+ "/auxilios/alocacoes/solicitacoes/visitas/"
												+ visitaPeriodo.idVisita,
										cache : false,
										async : true,
										dataType : 'json',
										headers : {
											"Authorization" : $(
													"#authorizationToken")
													.val(),
											"origem" : $("#auxilioOrigemToken")
													.val()
										},
										success : function(response) {
											seSolicitouAlocacao = true;
										},
										error : function(XMLHttpRequest,
												textStatus, errorThrown) {
											seSolicitouAlocacao = false;
										}

									});
						} else {

							$
									.ajax({
										type : "GET",
										url : url_auxilio()
												+ "/auxilios/alocacoes/solicitacoes/visitantes/"
												+ visitaPeriodo.idVisitante,
										cache : false,
										async : true,
										dataType : 'json',
										headers : {
											"Authorization" : $(
													"#authorizationToken")
													.val(),
											"origem" : $("#auxilioOrigemToken")
													.val()
										},
										success : function(response) {
											seSolicitouAlocacao = true;
										},
										error : function(XMLHttpRequest,
												textStatus, errorThrown) {
											seSolicitouAlocacao = false;
										}

									});

						}

						var _html_visita_periodo = "";

						_html_visita_periodo +=

						"<div class='col-md-12' style='margin:0px;padding:2px;'>"
								+

								"<div class='well' style='background-image:none;padding:5px!important;margin-bottom:0px;'>"
								+

								"<div class='row'>"
								+

								"<div class='col-md-2'>"
								+

								"<img style='width:100%;height:110px;' class='img img-thumbnail' src='"
								+ $("#URL_BASE").val()
								+ "pessoas/pessoaFisica/foto/view.action?pessoaFisicaId="
								+ visitaPeriodo.idPessoa
								+ "&thumb=true'>"
								+

								"</div>"
								+

								"<div class='col-md-10'>"
								+

								"<b class='nome_visitante'><a href='"
								+ $("#URL_BASE").val()
								+ "pessoas/pessoaFisica/dadosPessoais.action?id="
								+ visitaPeriodo.idPessoa
								+ "&origem=visaoGeral'>"
								+ visitaPeriodo.nomeVisitante
								+ "</a></b>"
								+ "<span style='display:none;' class='nome_visitante_impressao'><b>"
								+ visitaPeriodo.nomeVisitante + "</b>";

						if (visitaPeriodo.instituicaoAtual != null) {

							_html_visita_periodo += " - "
									+ visitaPeriodo.instituicaoAtual
									+ "</span>";

							_html_visita_periodo += "<br><span class='span-instituicao'>"
									+ visitaPeriodo.instituicaoAtual
									+ "</span>";
						}

						var origemVisita = "";

						if (visitaPeriodo.visitaCriadaPorCandidatura) {
							origemVisita = "&origemVisitaCadastro=candidatura";
						}

						_html_visita_periodo += "<span class='span-box'>											<b>Tipo da Visita: </b>"
								+ visitaPeriodo.tipoVisita
								+ "</span>"
								+ "<span class='span-box proposito'>  								<b>Propósito: </b><a href='"
								+ $("#URL_BASE").val()
								+ "visitantes/visitas/formularioVisita.action?id="
								+ visitaPeriodo.idVisita
								+ "&origem=visaoGeral"
								+ origemVisita
								+ "'>"
								+ visitaPeriodo.proposito
								+ "</a></span>"
								+ "<span class='span-box proposito-impressao' style='display:none;'>	<b>Propósito: </b>"
								+ visitaPeriodo.proposito
								+ "</span>"
								+ "<span class='span-box'>											<b>Responsável: </b>"
								+ visitaPeriodo.responsavel
								+ "</span>"
								+

								"</div>"
								+

								"</div>"
								+

								"<div class='row'>"
								+

								"<div class='col-md-12'>"
								+

								"<table class='table table-bordred table-striped' style='margin-bottom:0px;'>"
								+

								"<thead>"
								+

								"<tr>"
								+ "<th>Período</th>"
								+ "<th>Categoria</th>"
								+ "<th>Status</th>"
								+ "<th>Valor Alocado</th>"
								+ "<th></th>"
								+ "</tr>"
								+

								"</thead>"
								+

								"<tbody id='tbody_periodos_"
								+ visitaPeriodo.idVisitante
								+ "'>"
								+

								"<tr>"
								+

								"<td>"
								+ visitaPeriodo.dataPrevisaoChegada
								+ " à "
								+ visitaPeriodo.dataPrevisaoPartida
								+ "</td>"
								+ "<td>"
								+ visitaPeriodo.categoria.nome
								+ "</td>"
								+ "<td>"
								+ __renderizaStatusPeriodo(
										visitaPeriodo.status,
										visitaPeriodo.dataChegada)
								+ "<input type='hidden' id='statusPeriodo_"
								+ visitaPeriodo.id
								+ "' value='"
								+ visitaPeriodo.status
								+ "'/></td>"
								+ "<td id='valor_alocado_"
								+ visitaPeriodo.id
								+ "'><img class='loader-auxilio' src='"
								+ $("#URL_BASE").val()
								+ "/pub/imagens/ajax-loader.gif' /></td>"
								+

								"<td>"
								+ "<div class='btn-group pull-right'>"
								+ "<button class='btn btn-default dropdown-toggle' type='button' data-toggle='dropdown' aria-expanded='false'>"
								+ "<i class='glyphicon glyphicon-cog'></i>"
								+ "<span style='margin-top:-4px;margin-left:3px;' class='caret'></span>"
								+ "</button>"
								+ "<ul id='dropdown_menu_' class='dropdown-menu'>"
								+ "<li><a target='_blank' href='"
								+ $("#URL_BASE").val()
								+ "visitantes/visitas/formularioVisitante.action?id="
								+ visitaPeriodo.idVisitante
								+ "&idPeriodo="
								+ visitaPeriodo.id
								+ "&aba=periodo'>Editar Período</li>";

						if (visitaPeriodo.status != "INDEFERIDO"
								|| visitaPeriodo.visitaCriadaPorCandidatura) {

							if (seSolicitouAlocacao == true) {
								_html_visita_periodo += "<li><a target='_blank' href='"
										+ $("#URL_BASE").val()
										+ "visitantes/visitas/formularioVisitante.action?id="
										+ visitaPeriodo.idVisitante
										+ "&idPeriodo="
										+ visitaPeriodo.id
										+ "&aba=auxilio'>Editar Auxílios</a></li>";

								if (visitaPeriodo.visitaCriadaPorCandidatura) {

									_html_visita_periodo += "<li><a target='_blank' href='"
											+ $("#URL_BASE").val()
											+ "/visitantes/propostas/auxilioFinanceiro.action'>Mensagem Auxílio</a></li>";

								}

							}

							_html_visita_periodo += "<li><a target='_blank' href='"
									+ $("#URL_BASE").val()
									+ "visitantes/visitas/formularioVisitante.action?id="
									+ visitaPeriodo.idVisitante
									+ "&idPeriodo="
									+ visitaPeriodo.id
									+ "&aba=checkin'>Editar Check-in</a></li>";

							if (visitaPeriodo.visitaCriadaPorProposta) {

								_html_visita_periodo += "<li><a style='display:none;cursor:pointer;' id='indeferirPeriodo_"
										+ visitaPeriodo.id
										+ "'>Indeferir Período</a></li>";

							}
						}

						if (visitaPeriodo.status == "INDEFERIDO"
								&& visitaPeriodo.visitaCriadaPorProposta) {
							_html_visita_periodo += "<li><a style='cursor:pointer;' id='deferirPeriodo_"
									+ visitaPeriodo.id
									+ "'>Desfazer Indeferimento</a></li>";
						}

						_html_visita_periodo += "</ul>" + "</div>" + "</td>" +

						"</tr>" +

						"</tbody>" +

						"</table>" +

						"</div>" +

						"</div>" +

						"</div>" +

						"</div>";

						setTimeout(
								function() {

									$
											.ajax({
												type : "GET",
												url : url_auxilio()
														+ "/auxiliosAlocados/porBeneficiario/"
														+ visitaPeriodo.id
														+ "/valorAlocado",
												cache : false,
												async : true,
												dataType : 'json',
												headers : {
													"Authorization" : $(
															"#authorizationToken")
															.val(),
													"origem" : $(
															"#auxilioOrigemToken")
															.val()
												},
												success : function(response) {

													// $("#valor_alocado_" +
													// response.idBeneficiario).html(response.valorTotalAlocado);

													$(
															"#valor_alocado_"
																	+ response.idBeneficiario)
															.html(
																	"<a style='cursor:pointer' id='detalhamento_valor_alocado_"
																			+ response.idBeneficiario
																			+ "'>"
																			+ response.valorTotalAlocado
																			+ "</a>");

													if (($(
															"#statusPeriodo_"
																	+ response.idBeneficiario)
															.val() == "AGUARDANDO_CONFIRMACAO" || $(
															"#statusPeriodo_"
																	+ response.idBeneficiario)
															.val() == "PREVISTO")
															&& response.valorTotalAlocado == "R$ 0,00") {
														$(
																"#indeferirPeriodo_"
																		+ response.idBeneficiario)
																.show();
													}

													if (response.possuiAlocacoes) {

														$(document)
																.off("click",
																		"a[id^=detalhamento_valor_alocado_]")
																.on(
																		"click",
																		"a[id^=detalhamento_valor_alocado_]",
																		function(
																				e) {

																			// $(document).off("click",
																			// "td[id^=valor_alocado_]").on("click",
																			// "td[id^=valor_alocado_]",
																			// function(e){

																			e
																					.preventDefault();

																			var id = $(
																					this)
																					.attr(
																							"id")
																					.substring(
																							14);

																			$(
																					"#modal_detalhamento")
																					.window(
																							{

																								prefixo : "dft",
																								titulo : "Auxílios Alocados",
																								corpo : "<div id='dft_corpo'><center><img src='"
																										+ $(
																												"#URL_BASE")
																												.val()
																										+ "/pub/imagens/ajax-loader.gif' /></center></div>",
																								tamanho : "1000px",
																								botoes : [ {
																									texto : "Fechar",
																									css : "default",
																									evento : function() {

																										$(
																												"#dft_window")
																												.modal(
																														"toggle");

																									}
																								} ]

																							});

																			setTimeout(
																					function() {

																						$(
																								"#dft_corpo")
																								.auxiliosAlocados(
																										{
																											authorizationToken : $(
																													"#authorizationToken")
																													.val(),
																											auxilioOrigemToken : $(
																													"#auxilioOrigemToken")
																													.val(),
																											seHabilitaAcoes : false,
																											filtro : {
																												idBeneficiario : id,
																												idAgenciaFomento : "0",
																												idModalidadeAuxilio : "0",
																												idTipoAuxilio : "0",
																												dataInicial : "",
																												dataFinal : ""
																											}
																										});

																					},
																					100);

																		});

													} else {
														$(
																"#valor_alocado_"
																		+ response.idBeneficiario)
																.html(
																		response.valorTotalAlocado);
														$(
																"#detalhar_valor_alocado_"
																		+ response.idBeneficiario)
																.hide();
													}
												}
											});

								}, 100);

						$("#" + div).append(_html_visita_periodo);

					}

					// Desenha Visitante

					function desenhaVisitante(visitante, div) {

						var seSolicitouAlocacao = false;

						if (visitante.visita.criadaPorProposta) {

							$
									.ajax({
										type : "GET",
										url : url_auxilio()
												+ "/auxilios/alocacoes/solicitacoes/visitas/"
												+ visitante.visita.id,
										cache : false,
										async : true,
										dataType : 'json',
										headers : {
											"Authorization" : $(
													"#authorizationToken")
													.val(),
											"origem" : $("#auxilioOrigemToken")
													.val()
										},
										success : function(response) {
											seSolicitouAlocacao = true;
										},
										error : function(XMLHttpRequest,
												textStatus, errorThrown) {
											seSolicitouAlocacao = false;
										}

									});

						} else {

							$
									.ajax({
										type : "GET",
										url : url_auxilio()
												+ "/auxilios/alocacoes/solicitacoes/visitantes/"
												+ visitante.id,
										cache : false,
										async : true,
										dataType : 'json',
										headers : {
											"Authorization" : $(
													"#authorizationToken")
													.val(),
											"origem" : $("#auxilioOrigemToken")
													.val()
										},
										success : function(response) {
											seSolicitouAlocacao = true;
										},
										error : function(XMLHttpRequest,
												textStatus, errorThrown) {
											seSolicitouAlocacao = false;
										}

									});

						}

						var _html_visitante = "";

						_html_visitante +=

						"<div class='col-md-12' style='margin:0px;padding:2px;'>"
								+

								"<div class='well' style='background-image:none;padding:5px!important;margin-bottom:0px;'>"
								+

								"<div class='row'>"
								+

								"<div class='col-md-2'>"
								+

								"<img style='width:100%;height:110px;' class='img img-thumbnail' src='"
								+ $("#URL_BASE").val()
								+ "pessoas/pessoaFisica/foto/view.action?pessoaFisicaId="
								+ visitante.pessoa.id
								+ "&thumb=false'>"
								+

								"</div>"
								+

								"<div class='col-md-8'>"
								+

								"<b class='nome_visitante'><a href='"
								+ $("#URL_BASE").val()
								+ "pessoas/pessoaFisica/dadosPessoais.action?id="
								+ visitante.pessoa.id
								+ "&origem=visaoGeral'>"
								+ visitante.pessoa.nome
								+ "</a></b>"
								+ "<span style='display:none;' class='nome_visitante_impressao'><b>"
								+ visitante.pessoa.nome + "</b>";

						if (visitante.experienciaProfissional != null) {
							_html_visitante += " - "
									+ visitante.experienciaProfissional.instituicao
									+ "</span>";
							_html_visitante += "<br><span class='span-instituicao'>"
									+ visitante.experienciaProfissional.instituicao
									+ "</span>";
						}

						var origemVisita = "";

						if (visitante.visita.criadaPorCandidatura) {
							origemVisita = "&origemVisitaCadastro=candidatura";
						}

						var link_editar = $("#URL_BASE").val();

						if (visitante.periodos.length > 0
								&& (visitante.candidaturaCompleta == null || visitante.candidaturaCompleta)) {

							link_editar += "visitantes/visitas/formularioVisitante.action?id="
									+ visitante.id
									+ "&idPeriodo="
									+ visitante.periodos[0].id
									+ "&aba=periodo&chamadaOrigem=VisaoGeral";

						} else if (visitante.candidaturaCompleta == false) {

							link_editar += "visitantes/inscricaoCandidato.action?visita="
									+ visitante.visita.id
									+ "&pessoa="
									+ visitante.pessoa.id
									+ "&aba=dadosPessoais-1";

						} else {

							link_editar += "visitantes/visitas/formularioVisitante.action?id="
									+ visitante.id + "&origem=proposta";

						}

						_html_visitante += "<span class='span-box'>											<b>Tipo da Visita: </b>"
								+ visitante.visita.tipo.nome
								+ "</span>"
								+ "<span class='span-box proposito'>									<b>Propósito: </b><a href='"
								+ $("#URL_BASE").val()
								+ "visitantes/visitas/formularioVisita.action?id="
								+ visitante.visita.id
								+ "&origem=visaoGeral"
								+ origemVisita
								+ "'>"
								+ visitante.visita.proposito
								+ "</a></span>"
								+ "<span class='span-box proposito-impressao' style='display:none;'>	<b>Propósito: </b>"
								+ visitante.visita.proposito
								+ "</span>"
								+ "<span class='span-box'>											<b>Responsável: </b>"
								+ visitante.visita.pesquisadorResponsavel.nome
								+ "</span>"
								+

								"</div>"
								+

								"<div class='col-md-2' style='text-align:right;'>"
								+

								"<a title='Editar' href='"
								+ link_editar
								+ "' class='btn btn-default editar-visitante'>"
								+ "<span class='glyphicon glyphicon-pencil'></span>"
								+ "</a>"
								+

								"</div>"
								+

								"</div>"
								+

								"<div class='row'>"
								+

								"<div class='col-md-12'>"
								+

								"<table class='table table-bordred table-striped' style='margin-bottom:0px;'>"
								+

								"<thead>"
								+

								"<tr>"
								+ "<th>Período</th>"
								+ "<th>Categoria</th>"
								+ "<th>Status</th>"
								+ "<th>Valor Alocado</th>"
								+ "<th></th>"
								+ "</tr>"
								+

								"</thead>"
								+

								"<tbody id='tbody_periodos_"
								+ visitante.id
								+ "'>";

						var categoriaNome = "";

						if (visitante.periodos.length > 0) {

							$
									.each(
											visitante.periodos,
											function(k, periodo) {

												if (periodo.categoria != null) {
													categoriaNome = periodo.categoria.nome;
												} else {
													categoriaNome = "--";
												}

												_html_visitante +=

												"<tr>" +

												"<td>"
														+ periodo.dataPrevisaoChegada
														+ " à "
														+ periodo.dataPrevisaoPartida
														+ "</a></td>"
														+ "<td>"
														+ categoriaNome
														+ "</td>"
														+ "<td>"
														+ __renderizaStatusPeriodo(
																periodo.status,
																periodo.dataChegada)
														+ "<input type='hidden' id='statusPeriodo_"
														+ periodo.id
														+ "' value='"
														+ periodo.status
														+ "'/></td>"
														+ "<td id='valor_alocado_"
														+ periodo.id
														+ "'><img class='loader-auxilio' src='"
														+ $("#URL_BASE").val()
														+ "/pub/imagens/ajax-loader.gif' /></td>"
														+

														"<td>"
														+ "<div class='btn-group pull-right'>"
														+ "<button class='btn btn-default dropdown-toggle' type='button' data-toggle='dropdown' aria-expanded='false'>"
														+ "<i class='glyphicon glyphicon-cog'></i>"
														+ "<span style='margin-top:-4px;margin-left:3px;' class='caret'></span>"
														+ "</button>"
														+ "<ul id='dropdown_menu_' class='dropdown-menu'>"
														+ "<li><a target='_blank' href='"
														+ $("#URL_BASE").val()
														+ "visitantes/visitas/formularioVisitante.action?id="
														+ visitante.id
														+ "&idPeriodo="
														+ periodo.id
														+ "&aba=periodo&chamadaOrigem=VisaoGeral'>Editar Período</li>";

												if (periodo.status != "INDEFERIDO"
														|| visitante.visita.criadaPorCandidatura) {

													if (seSolicitouAlocacao == true) {
														_html_visitante += "<li><a target='_blank' href='"
																+ $("#URL_BASE")
																		.val()
																+ "visitantes/visitas/formularioVisitante.action?id="
																+ visitante.id
																+ "&idPeriodo="
																+ periodo.id
																+ "&aba=auxilio&chamadaOrigem=VisaoGeral'>Editar Auxílios</a></li>";

														if (visitante.visita.criadaPorCandidatura) {
															_html_visitante += "<li><a target='_blank' href='"
																	+ $(
																			"#URL_BASE")
																			.val()
																	+ "/visitantes/propostas/auxilioFinanceiro.action'>Mensagem Auxílio</a></li>";
														}

													}

													_html_visitante += "<li><a target='_blank' href='"
															+ $("#URL_BASE")
																	.val()
															+ "visitantes/visitas/formularioVisitante.action?id="
															+ visitante.id
															+ "&idPeriodo="
															+ periodo.id
															+ "&aba=checkin&chamadaOrigem=VisaoGeral'>Editar Check-in</a></li>";

													if (visitante.visita.criadaPorProposta) {
														_html_visitante += "<li><a style='display:none;cursor:pointer;' id='indeferirPeriodo_"
																+ periodo.id
																+ "'>Indeferir Período</a></li>";
													}

												}

												if (periodo.status == "INDEFERIDO"
														&& visitante.visita.criadaPorProposta) {
													_html_visitante += "<li><a style='cursor:pointer;' id='deferirPeriodo_"
															+ periodo.id
															+ "'>Desfazer Indeferimento</a></li>";
												}

												_html_visitante += "</ul>" +

												"</div>" + "</td>" +

												"</tr>";

												setTimeout(
														function() {

															$
																	.ajax({
																		type : "GET",
																		url : url_auxilio()
																				+ "/auxiliosAlocados/porBeneficiario/"
																				+ periodo.id
																				+ "/valorAlocado",
																		cache : false,
																		async : true,
																		dataType : 'json',
																		headers : {
																			"Authorization" : $(
																					"#authorizationToken")
																					.val(),
																			"origem" : $(
																					"#auxilioOrigemToken")
																					.val()
																		},
																		success : function(
																				response) {

																			if (response.valorTotalAlocado == "R$ 0,00") {

																				$(
																						"#valor_alocado_"
																								+ response.idBeneficiario)
																						.html(
																								response.valorTotalAlocado);

																			} else {

																				$(
																						"#valor_alocado_"
																								+ response.idBeneficiario)
																						.html(
																								"<a style='cursor:pointer' id='detalhamento_valor_alocado_"
																										+ response.idBeneficiario
																										+ "'>"
																										+ response.valorTotalAlocado
																										+ "</a>");

																			}

																			if (($(
																					"#statusPeriodo_"
																							+ response.idBeneficiario)
																					.val() == "AGUARDANDO_CONFIRMACAO" || $(
																					"#statusPeriodo_"
																							+ response.idBeneficiario)
																					.val() == "PREVISTO")
																					&& response.valorTotalAlocado == "R$ 0,00") {
																				$(
																						"#indeferirPeriodo_"
																								+ response.idBeneficiario)
																						.show();
																			}

																			if (response.possuiAlocacoes) {

																				$(
																						document)
																						.off(
																								"click",
																								"a[id^=detalhamento_valor_alocado_]")
																						.on(
																								"click",
																								"a[id^=detalhamento_valor_alocado_]",
																								function(
																										e) {
																									e
																											.preventDefault();
																									var id = $(
																											this)
																											.attr(
																													"id")
																											.substring(
																													27);

																									$(
																											"#modal_detalhamento")
																											.window(
																													{

																														prefixo : "dft",
																														titulo : "Auxílios Alocados",
																														corpo : "<div id='dft_corpo'><center><img src='"
																																+ $(
																																		"#URL_BASE")
																																		.val()
																																+ "/pub/imagens/ajax-loader.gif' /></center></div>",
																														tamanho : "1000px",
																														botoes : [ {
																															texto : "Fechar",
																															css : "default",
																															evento : function() {

																																$(
																																		"#dft_window")
																																		.modal(
																																				"toggle");

																															}
																														} ]

																													});

																									setTimeout(
																											function() {

																												$(
																														"#dft_corpo")
																														.auxiliosAlocados(
																																{
																																	authorizationToken : $(
																																			"#authorizationToken")
																																			.val(),
																																	auxilioOrigemToken : $(
																																			"#auxilioOrigemToken")
																																			.val(),
																																	seHabilitaAcoes : false,
																																	filtro : {
																																		idBeneficiario : id,
																																		idAgenciaFomento : "0",
																																		idModalidadeAuxilio : "0",
																																		idTipoAuxilio : "0",
																																		dataInicial : "",
																																		dataFinal : ""
																																	}
																																});

																											},
																											100);

																								});

																			} else {
																				$(
																						"#li_detalhar_valor_alocado_")
																						.hide();
																			}
																		}
																	});

														}, 100);

											});

						} else {

							_html_visitante +=

							"<tr>"
									+ "<td colspan='5'>Nenhum período foi cadastrado.</td>"
									+ "</tr>";

						}

						_html_visitante +=

						"</tbody>" +

						"</table>" +

						"</div>" +

						"</div>" +

						"</div>" +

						"</div>";

						$("#" + div).append(_html_visitante);

					}

					// canditura completa?

					$("select[name=candidaturaCompleta]").change(function() {

						if ($(this).val() == 'false') {

							$("input[name=status]").removeAttr('checked');
							$("select[name=seFezCheckin]").val('false');
							$("select[name=agrupamento]").val('visitante');
							$("select[name=ordenacao]").val('visitante');

						}

					});

					// Carrega todas as visitas

					$("#btnConsultaVisitante").trigger("click");

					// Mostra Filtros de pesquisa
					$("#btnMostraFiltros").click(function() {
						$("#body_filtro").fadeIn();
						$("#btnOcultarFiltros").show();
						$(this).hide();
						$("#agrupamentoHeaderDiv").hide();

						$("#agrupamento").val($("#agrupamentoHeaderCb").val());

					});

					$("#btnOcultarFiltros").click(function() {

						$("#body_filtro").fadeOut();
						$("#btnMostraFiltros").show();
						$(this).hide();

						$("#agrupamentoHeaderDiv").show();

						$("#agrupamentoHeaderCb").val($("#agrupamento").val());

					});

					$("#agrupamentoHeaderCb").change(function() {
						$("#agrupamento").val($("#agrupamentoHeaderCb").val());
						$("#btnConsultaVisitante").click();
					});

					$("#idQtdePorPagina").change(
							function() {
								$("#hidden_qtdPorPagina").val(
										$("#idQtdePorPagina").val());
								$("#btnConsultaVisitante").click();
							});

					// Campos que se autocompletam

					$("#nomeVisitante")
							.autocomplete(
									{
										prefixo : "ac",
										url : $("#URL_BASE").val()
												+ "componentes/js/pessoasFisicasAutoComplete!autocomplete.action",
										cabecalho : "Visitante",
										mensagem_semResultado : "Visitante não encontrado.",
										hidden_name : "idPessoa",
										text_name : "nomePessoaFisica",
										buscarPeloInicio_name : "buscarNomePessoaFisicaPeloInicio",
										width_cabecalho : "75px"
									});

					$("#nomeInstituicaoOrigem")
							.autocomplete(
									{
										prefixo : "io",
										url : $("#URL_BASE").val()
												+ "componentes/js/instituicoesDeEnsinoAutoComplete!autocomplete.action",
										cabecalho : "Selecione a Instituição",
										mensagem_semResultado : "Instituição não encontrado.",
										hidden_name : "idInstituicao",
										text_name : "nomePessoaJuridica",
										buscarPeloInicio_name : "buscarNomePessoaJuridicaPeloInicio",
										width_cabecalho : "460px"
									});

					// Formata datas para calendário
					configCalendar(
							"#dataNotificacoes,#dataInicio,#dataFim,#dataCheckin,#dataCheckOut",
							false);

					// Busca outra data de notificação
					$("#dataNotificacoes").change();

				});

function desenhaNotificacaoTabela(dados) {

	$(".js-notificacoes-table-body").html("");

	$(".js-notificacoes-table-body tr").remove();
	var contador = dados.length;

	if (contador > 0) {

		if (contador > 11) {
			contador = 11;
		}

		for (var i = 0; i < contador; i++) {
			desenhaNotificacao(dados[i]);
		}

	} else {
		$(".js-notificacoes-table-body").append(
				"Não existem notificações cadastradas.");
	}

}

function desenhaNotificacao(linha) {

	var dataOld = new Date(linha.dataNotificacao);

	var dataNova = dataOld.toLocaleString('pt-BR');

	var linhaTabela = $("<tr/>");
	$(".js-notificacoes-table-body").append(linhaTabela);

	var html = "<div class='row'><div class='col-md-12'><div class=\"alert alert-info\" style=\"color:#666 !important;padding: 10px;margin-bottom: 2px;background-image: none !important;background-color:#eee !important; border:0px !important;\">"
			+ linha.titulo;

	html = html
			+ "<div class='row' style=\"margin-top:14px;\"><div class='col-md-9' style=\"color:#666;font-size:11px;\"><i>Notificado às "
			+ dataOld.getHours()
			+ ":"
			+ dataOld.getMinutes()
			+ "</i></div><div class='col-md-3'><span class='btn btn-default' style='font-size:10px !important;float:right;padding:7px;margin-top:-7px;'>Acessar <i class='glyphicon glyphicon-share-alt'></i></span></div></div>";

	html = html + "" + "</div></div></div>";

	linhaTabela.append("<td>" + html + "</td>");

}

function desenhaLinkTabela(dados) {

	$(".js-links-table-body tr").remove();

	if (dados.length > 0) {

		for (var i = 0; i < dados.length; i++) {

			desenhaLink(dados[i]);

		}

	} else {

		$(".js-links-table-body").append(
				"<td>Nenhum programa científico em andamento.</td>");

	}

}

function desenhaLink(linha) {

	var now = new Date;
	var nowFormatado = now.toLocaleString('pt-BR');

	var linhaTabela = $("<tr/>");
	$(".js-links-table-body").append(linhaTabela);
	linhaTabela.append("<td><b><a href='" + $("#URL_BASE").val()
			+ "/eventos/inscricaoEvento/index.action?idEvento=" + linha.id
			+ "' target=blank>" + linha.nomePortugues
			+ "</a></b>  <br> Gerenciar Inscrições"
			+ " <hr style=\"margin-bottom:10px;margin-top:10px;\"></td>");

}

function __renderizaStatusPeriodo(status, checkin) {

	var checkinTexto = "";

	if (checkin != null) {
		checkinTexto = "&nbsp;&nbsp;<div class=\"label-large label label-success\">Checkin Confirmado</div>";
	} else {
		checkinTexto = "&nbsp;&nbsp;<div class=\"label-large label label-danger\">Sem Checkin</div>";
	}

	if (status == "AGUARDANDO_CONFIRMACAO") {
		return "<div class=\"label-large label label-warning\">Aguardando Confirmação</div>";
	} else if (status == "ATIVO") {
		return "<div class=\"label-large label label-success\">Ativo</div>"
				+ checkinTexto;
	} else if (status == "FINALIZADO") {
		return "<div class=\"label-large label label-default\">Finalizado</div>";
	} else if (status == "PREVISTO") {
		return "<div class=\"label-large label label-info\">Previsto</div>";
	} else if (status == "CANCELADO") {
		return "<div class=\"label-large label label-danger\">Cancelado</div>";
	} else if (status == "INDEFERIDO") {
		return "<div class=\"label-large label label-danger\">Indeferido</div>";
	} else {
		return "<div class=\"\">Erro!</div>";
	}

}

function desenhaAreaDePesquisaSelect(dados) {

	var html = " <select id=areaDePesquisaCBX class=form-control> ";
	html += "<option value=\"\">Selecione</option>";

	for (var i = 0; i < dados.length; i++) {

		html += "<option value=" + dados[i].id + ">" + dados[i].nome
				+ "</option>";

	}

	html += " </select> ";

	$("#areaDePesquisa").html(html);

}

function desenhaOrigemSelect(dados) {

	var html = " <select id=programaCBX class=form-control> ";
	html += "<option value=''>Selecione</option>";

	for (var i = 0; i < dados.length; i++) {

		html += "<option value=" + dados[i].id + ">" + dados[i].nomePortugues
				+ "</option>";

	}

	html += " </select> ";

	$("#programa_cientifico").html(html);

}

function desenhaPesquisadoresSelect(dados) {

	var html = " <select id=pesquisadorResponsavelCBX class=form-control style=width:300> ";
	html += "<option value=''>Selecione</option>";

	for (var i = 0; i < dados.pesquisadores.length; i++) {

		html += "<option value=" + dados.pesquisadores[i].idPessoaFisica + ">"
				+ dados.pesquisadores[i].nome + "</option>";

	}

	html += " </select> ";

	$("#pesquisadorResponsavel").html(html);

	// Pesuisador Interacao
	html = null;
	html = " <select id=pesquisadorInteracaoCBX class=form-control style=width:300> ";
	html += "<option value=''>Selecione</option>";

	for (var i = 0; i < dados.pesquisadores.length; i++) {

		html += "<option value=" + dados.pesquisadores[i].idPessoaFisica + ">"
				+ dados.pesquisadores[i].nome + "</option>";

	}

	html += " </select> ";

	$("#pesquisadorInteracao").html(html);

}
