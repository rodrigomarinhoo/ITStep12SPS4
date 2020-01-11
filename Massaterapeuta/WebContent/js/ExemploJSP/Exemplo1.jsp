<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Gerência de Visitas</title>

<link rel="stylesheet" type="text/css"
	href="<c:url value="/pub/css/visitantes/visitantes.default.css"/>" />

<!-- INCIO: Importa o componente de data -->
<script type="text/javascript"
	src="<c:url value='/pub/tecnologias/jquery/jquery.maskedinput.min.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/pub/componentes/js/commons/calendarioGeral.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/pub/componentes/window/1.0/window.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/pub/componentes/enviaEmail/1.0/enviaEmail.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/pub/componentes/auxilios/auxiliosAlocados/1.0/auxiliosAlocados.js'/>"></script>
<!-- FIM: Importa o componente de data -->

<script type="text/javascript"
	src="<c:url value='/pub/componentes/js/commons/autocomplete.js'/>"></script>

<script type="text/javascript"
	src="<c:url value="/pub/js/visitantes/visaoGeralVisitas.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pub/js/visitantes/utilitario.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pub/js/auxilio/utilitario.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pub/componentes/js/paginacao.js"/>"></script>

<!-- script type="text/javascript" src="<c:url value='/pub/tecnologias/jquery/jquery.maskedinput.min.js'/>"></script -->

<script type="text/javascript"
	src="<c:url value='/pub/js/componentes/multipleSelect.js'/>"></script>

<script type="text/javascript"
	src="<c:url value='/pub/ckeditor/ckeditor.js'/>"></script>


<style>

/* Template de Impressão */
@media print {
	.editar-visitante {
		display: none;
	}
	.table-visitantes-body-right {
		margin: 0px;
	}
	.panel-default {
		margin-left: -30px;
		width: 1000px;
		border: 0px;
		margin: 0px;
	}
	#panel_filtro {
		display: none;
	}
	#templatePanelHeading {
		display: none;
	}
	.img-thumbnail {
		display: none;
	}
	.btn-group {
		display: none;
	}
	.table-striped {
		font-size: 11px !important;
	}
	.panel-result {
		display: none;
	}
	.panel-heading {
		border-width: 0px !important;
	}
	#paginacao__ul_paginacao {
		display: none;
	}
}

.span-box {
	font-size: 11px;
	display: block;
	margin-top: 5px;
}

.tr-result:HOVER {
	background-color: white !important;
}

.box-result {
	background-image: none !important;
	border-radius: 0px;
	border: 0px;
	border: 1px solid #e3e3e3;
	padding: 8px;
	margin-bottom: 6px;
}

.panel-padding {
	padding: 5px 5px 5px 10px !important;
}

#ac_text {
	width: 100% !important;
}

.form-group {
	width: 100%;
}

#io_text {
	width: 100% !important;
}

#divFiltrosVisitante {
	display: none;
}

#dataNotificacoes {
	background-color: #FFFFFF;
	float: right;
	/* margin-bottom: 5px; */
	background-color: #FFFFFF;
	/* border-radius: 5px; */
	padding: 3px;
	margin-top: -5px;
	border: 1px;
	/* margin-bottom: -7px; */
	background-color: #FFFFFF;
	background-color: #FFFFFF;
}

#paginacao__ul_paginacao {
	margin-bottom: 0px !important;
	margin-top: 10px !important;
}

#ac_box_autocomplete, #io_box_autocomplete, #ap_box_autocomplete {
	padding: 0px;
}

#ac_cabecalho, #io_cabecalho, #ap_cabecalho {
	display: none;
}

.fieldset-impa {
	padding: 0px !important;
	margin: 0px !important;
	border: 0px !important;
}

.fieldset-impa .col-md-12 {
	margin-top: 0px !important;
	padding-right: 0px !important;
}

#ac_results, #io_results {
	overflow-x: hidden !important;
}

.form-control-date {
	background-color: #fff;
	background-image: none;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
	color: #555;
	display: block;
	font-size: 14px;
	height: 34px;
	line-height: 1.42857;
	padding: 6px 12px;
	transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s
		ease-in-out 0s;
	width: 95%;
}

.form-control {
	height: auto !important;
	font-size: 12px !important;
	border-radius: 0px !important;
}

#status #ms_fieldset div div fieldset {
	margin-right: 15px !important;
	border: 1px solid #ddd !important;
	padding: 5px !important;
	margin-left: 15px !important;
	margin-bottom: 15px !important;
}

#ms_table_out, #ms_table_in {
	margin-bottom: 0px;
}

#status #ms_fieldset div div fieldset .table-responsive {
	height: auto !important;
}

#ms_fieldset {
	padding-bottom: 15px !important;
}

#status #ms_fieldset div div fieldset legend {
	padding-left: 5px !important;
	padding-right: 5px !important;
}

.label {
	margin-top: 1px;
	display: inline-block;
}
</style>

</head>
<body>
	<input id="auxilioOrigemToken" type="hidden" value="${tokenVisitantes}" />
	<input type="hidden" id="authorizationToken" value="${token}" />

	<div class="row">

		<div class="col-md-12">

			<div id="panel_filtro" class="panel panel-default"
				style="margin-bottom: 0px !important;">

				<div class="panel-heading  panel-padding">
					<b>Filtro</b> <span id="btnMostraFiltros"
						style="float: left; cursor: pointer; font-size: 14px; margin-right: 8px;"
						class="btn-mostra-filtro"> <i
						class="glyphicon glyphicon-filter"></i>
					</span> <span id="btnOcultarFiltros"
						style="float: left; display: none; cursor: pointer; margin-right: 8px;"
						class=" btn-mostra-filtro"> <i
						class="glyphicon glyphicon-chevron-up"></i>
					</span>

					<div style="float: right;" id="agrupamentoHeaderDiv">

						<span>Tipo: </span> <select name="tipoCabecalho"
							id="tipoCabecalho"></select> &nbsp;&nbsp;&nbsp; <span>Agrupado
							por: </span> <select id="agrupamentoHeaderCb">
							<option value="periodo">Período</option>
							<option selected="selected" value="visitante">Visitante</option>
						</select> &nbsp;&nbsp;&nbsp; <span>Qtde por Página: </span> <select
							name="qtdePorPagina" id="idQtdePorPagina">
							<option value="6" selected="selected">6</option>
							<option value="12">12</option>
							<option value="18">18</option>
							<option value="24">24</option>
							<option value="30">30</option>
							<option value="999999">Todos</option>
						</select>

					</div>

				</div>

				<div id="body_filtro" class="panel-body" style="display: none;">

					<div class="row">

						<div class="col-md-12">

							<form id="form_filtro" enctype="multipart/form-data">

								<!-- Parâmetros de paginação -->

								<input id="hidden_pagina" name="pagina" value="1" type="hidden" />
								<input id="hidden_qtdPorPagina" name="qtdPorPagina" value="6"
									type="hidden" /> <input id="hidden_seImpressao" value="false"
									type="hidden" /> <input id="hidden_isLoaded" value="false"
									type="hidden" /> <input id="hidden_seMensagemGenerica"
									name="seMensagemGenerica" value="false" type="hidden" />

								<div class="row">

									<div class="col-md-4">
										<b>Origem Visita </b> <input id="seBuscaProposta"
											name="somenteProposta" value="true" checked="checked"
											type="checkbox" /> Proposta <input value="true"
											name="somenteCandidatura" id="seBuscaCandidatura"
											checked="checked" type="checkbox" /> Candidatura
									</div>


									<div class="col-md-4">
										<b>Tipo</b>
									</div>

									<div class="col-md-4">
										<b>Categoria</b>
									</div>

								</div>

								<div class="row">

									<div class="col-md-4">
										<select id='visitaCB' name='idVisita' class='form-control'></select>
									</div>

									<div class="col-md-4">
										<select name="tipo" id="tipo" class="form-control"></select>
									</div>

									<div class="col-md-4">
										<select name="categoria" id="categoria" class="form-control"></select>
									</div>

								</div>


								<div class="row" style="margin-top: 10px;">

									<div class="col-md-4" style="margin-top: 7px;">
										<b>Visitante</b>
									</div>

									<div class="col-md-4">
										<b>Instituição </b> <input name='tipoInstituicao'
											value='FORMACAO_ACADEMICA' type='radio' /> Acadêmica <input
											name='tipoInstituicao' value='EXPERIENCIA_PROFISSIONAL'
											type='radio' /> Profissional
									</div>

								</div>

								<div class="row">

									<div class="col-md-4">

										<div id="nomeVisitante"></div>

									</div>

									<div class="col-md-4">

										<div id="nomeInstituicaoOrigem"></div>

									</div>

								</div>


								<div class="row" style="margin-top: 10px;">

									<div class="col-md-4">
										<b>Pesquisador Responsável</b>
									</div>

									<div class="col-md-4">
										<b>Pesquisador Interação</b> <input value="false"
											name="pesquisadorVinculado" type="checkbox" /> Sem
										Pesquisador Vinculado
									</div>

									<div class="col-md-4">
										<b>Área de Pesquisa</b>
									</div>

								</div>

								<div class="row" style="margin-bottom: 20px;">

									<div class="col-md-4">

										<select name="pesquisadorResponsavel"
											id="pesquisadorResponsavel" class="form-control"></select>

									</div>


									<div class="col-md-4">

										<select name="pesquisadorInteracao" id="pesquisadorInteracao"
											class="form-control"></select>

									</div>

									<div class="col-md-4">

										<select name="areaPesquisa" id="areaDePesquisa"
											class="form-control"></select>

									</div>

								</div>

								<div class="row" style="margin-top: 20px;">

									<div class="col-md-4">
										<b>Período de Permanência</b> ( <input type="checkbox"
											name="somenteEntreOPeriodo" value="true" /> Somente entre o
										período )
									</div>

									<div class="col-md-2">
										<b>Fez Checkin?</b>
									</div>

									<div class="col-md-2">
										<b>Data do Checkin</b>
									</div>

									<div class="col-md-3">
										<b>Documentos de Conclusão Enviados?</b>
									</div>

								</div>

								<div class="row" style="margin-bottom: 20px;">

									<div class="col-md-4">

										<div class="row">

											<div class="col-md-5">
												<input type="text" class="form-control" name="dataInicio"
													id="dataInicio" maxlength="10" style="width: 120%;">
											</div>

											<div class="col-md-1"
												style="margin-top: 7px; padding: 0px; text-align: center;">
												<font style="margin-left: 20px !important;">à</font>
											</div>

											<div class="col-md-6">
												<input type="text" class="form-control" name="dataFim"
													id="dataFim" maxlength="10">
											</div>

										</div>

									</div>

									<div class="col-md-2">
										<select name="seFezCheckin" id="checkin" class="form-control">
											<option value="">Selecione</option>
											<option value="true">Sim</option>
											<option selected="selected" value="false">Não</option>
										</select>
									</div>

									<div class="col-md-2">

										<input type="text" align="middle" class="form-control"
											name="dataCheckin" id="dataCheckin" maxlength="10" size="10"
											data-mask="00/00/0000" autocomplete="off">

									</div>

									<div class="col-md-2">
										<select name="todosDocumentosConclusaoEnviados"
											id="todosDocumentosConclusaoEnviados" class="form-control">
											<option selected="selected" value="">Selecione</option>
											<option value="true">Sim</option>
											<option value="false">Não</option>
										</select>
									</div>

								</div>


								<!-- INCIO: Ativa o componente de data 
							<script type="text/javascript">
							
								$(document).ready(function(){
							        configCalendar("#dp_tf_dt_previsao_chegada,#dp_tf_dt_previsao_partida",false);        
							    });
							
							</script>
							 FIM: Ativa o componente de data -->



								<div class="row" style="margin-top: 10px;">

									<div class="col-md-2">

										<div class="row">

											<div class="col-md-12">
												<b>Candidatura Completa?</b>
											</div>

											<div class="col-md-12">
												<select name="candidaturaCompleta" class="form-control">
													<option value="">Selecione</option>
													<option value="true">Sim</option>
													<option value="false">Não</option>
												</select>
											</div>

										</div>

									</div>

									<div class="col-md-6">

										<div class="row">

											<div class="col-md-12">
												<b>Status do Período da Visita</b>
											</div>
											<div class="col-md-12">
												<div id="status"></div>
											</div>

										</div>

									</div>

									<div class="col-md-2">

										<div class="row">

											<div class="col-md-12">

												<b>Auxílio Financeiro Solicitado?</b>

											</div>

											<div class="col-md-12">

												<select name="auxilioFinanceiroSolicitado"
													class="form-control">
													<option value="">Selecione</option>
													<option value="true">Sim</option>
													<option value="false">Não</option>
												</select>

											</div>

										</div>

									</div>

									<div class="col-md-2">

										<div class="row">

											<div class="col-md-12">

												<b>Auxílio Financeiro Alocado?</b>

											</div>

											<div class="col-md-12">

												<select name="auxilioFinanceiroAlocado" class="form-control">
													<option value="">Selecione</option>
													<option value="true">Sim</option>
													<option value="false">Não</option>
												</select>

											</div>

										</div>

									</div>

								</div>

								<hr>

								<div class="row" style="margin-top: 10px;">

									<div class="col-md-6">

										<div class="row">

											<div class="col-md-4">

												<b>Agrupado por</b>

											</div>

											<div class="col-md-4">

												<b>Ordenado por</b>

											</div>

											<div class="col-md-4">&nbsp;</div>

										</div>

										<div class="row">

											<div class="col-md-4">

												<select name="agrupamento" id="agrupamento"
													class="form-control">
													<option value="periodo">Período</option>
													<option value="pessoa" style="display: none;">Pessoa</option>
													<option selected="selected" value="visitante">Visitante</option>
												</select>

											</div>

											<div class="col-md-4">

												<select name="ordenacao" class="form-control">
													<option selected="selected" value="periodo">Período</option>
													<option value="visitante">Visitante</option>
												</select>

											</div>

											<div class="col-md-4">

												<select name="tipoOrdenacao" class="form-control">
													<option selected="selected" value="asc">Crescente</option>
													<option value="desc">Decrescente</option>
												</select>

											</div>

										</div>

									</div>


								</div>



								<div class="row">

									<div class="col-md-12 modal-footer"
										style="margin-top: 10px; margin-bottom: -15px">

										<div class="input-group">
											<span class="input-group-btn"> <span
												style="float: right; display: none;"
												id="btnConsultaVisitante" class="btn btn-primary"
												value="Consultar"> <span
													class="glyphicon glyphicon-search"> </span> Consultar
											</span> <span style="float: right;" id="btnPreConsultaVisitante"
												class="btn btn-primary" value="Consultar"> <span
													class="glyphicon glyphicon-search"> </span> Consultar
											</span> <span style="float: right;" id="btnImprimir"
												class="btn btn-primary" value="Imprimir"> <span
													class="glyphicon glyphicon-print"> </span> Imprimir
											</span> <span style="float: right;" id="btnMensagemGenerica"
												class="btn btn-default" value="Mensagem Genérica"> <span
													class="glyphicon glyphicon-envelope"> </span> Mensagem
													Genérica
											</span> <span style="float: right;" id="btnEtiqueta"
												class="btn btn-default" value="Gerar Etiquetas"> <span
													class="glyphicon glyphicon-tags"> </span> Gerar Etiquetas
											</span>

											</span>
										</div>

									</div>

								</div>

							</form>
						</div>

					</div>
				</div>
			</div>

			<br>

			<div class="panel panel-default"
				style="margin-bottom: 0px !important;">

				<div class="panel-heading  panel-padding">
					<b class='panel-result'>Resultado</b>
				</div>
				<div class="panel-body">

					<div id="loadingVisaoGeral">
						<center>
							<img src="<c:url value="/pub/imagens/ajax-loader.gif" />" />
							Carregando...
						</center>
					</div>

					<table id="table-visitantes" width="100%" class="" border="0"
						style='display: none;'>

						<tbody id="table-visitantes-body">

							<div class="row">

								<div class="col-md-6" id="table-visitantes-body-left"
									style="margin: 0px; padding-left: 15px; padding-right: 0px;"></div>

								<div class="col-md-6" id="table-visitantes-body-right"
									style="margin: 0px; padding-right: 15px; padding-left: 0px;"></div>

							</div>


						</tbody>

					</table>

					<div style="margin-top: 20px;" id="paginacao"></div>

				</div>

			</div>

		</div>

	</div>

	</div>

	</div>

	<div id="modal_detalhamento"></div>
	<div id="modal_aguarde"></div>
	<div id="modal_mensagem_generica"></div>

</body>
</html>