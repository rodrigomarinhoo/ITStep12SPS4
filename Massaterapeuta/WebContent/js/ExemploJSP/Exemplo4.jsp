<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<c:if test="${origemVisitaCadastro == 'candidatura'}">
	<title>Formulário de Candidatura</title>
</c:if>

<c:if test="${empty origemVisitaCadastro}">
	<title>Formulário de Proposta</title>
</c:if>

<link rel="stylesheet" type="text/css"
	href="<c:url value='/pub/css/visitantes/visitantes.default.css'/>"></link>
</head>
<body>
	<!-- Parâmetros de Edição -->
	<input id="hidden_origemVisitaCadastro" value="${origemVisitaCadastro}"
		type="hidden" />
	<input id="hidden_aba" value="${aba}" type="hidden" />
	<input id="auxilioAlocacaoSolicitacaoId" value="" type="hidden" />
	<input id="authorizationToken" value="${token}" type="hidden" />
	<input id="tokenVisitantes" value="${tokenVisitantes}" type="hidden" />
	<!-- Fim dos Parâmetros de Edição -->

	<!-- Fim dos Parâmetros de paginação -->

	<ol class="breadcrumb">
		<li><a href="<c:url value='/'/>">Home</a></li>
		<li><a
			href="<c:url value='/visitantes/visaoGeralVisitas.action'/>">Gerência
				de Visitas</a></li>
		<li id="breadcrumb_propostas"><img
			src="<c:url value='/pub/imagens/ajax-loader.gif'/>" /></li>
		<li id="breadcrumb_visita" class="active"><img
			src="<c:url value='/pub/imagens/ajax-loader.gif'/>" /></li>
	</ol>

	<div class="container" style="width: 100%;">
		<div class="row">
			<div class="col-md-12">
				<div id="alert_data_finalizacao" style="display: none;"
					class="alert alert-info"></div>
			</div>
		</div>

		<ul class="nav nav-tabs">
			<li id="tab_dados_visita" role="presentation"><a href="#"
				style="text-align: center;"><b style='font-size: 12px;'>Passo
						1</b><br>Dados da Visita </a></li>
			<li id="tab_visitante" role="presentation" class="disabled"><a
				href="#" style="text-align: center;"><b style='font-size: 12px;'>Passo
						2</b><br>Visitantes </a></li>
			<li id="tab_auxilio_financeiro_solicitado" class="disabled"
				role="presentation" style="display: none;"><a href="#"
				style="text-align: center;"><b style='font-size: 12px;'>Passo
						3</b><br>Auxílio Financeiro Solicitado </a></li>
		</ul>

		<!-- Início do primeiro passo -->
		<form id="form_primeiro_passo" method="post" style="display: none;">
			<input id="hidden_id_visita" value="${id}" type="hidden"
				name="idVisita" /> <input id="hidden_origem_visita"
				name="idOrigemVisita" type="hidden" />

			<div id="primeiro_passo" style="background-color: white;">

				<div class="row" style="margin-top: 10px;">
					<div id="alert_primeiro_passo" class="col-md-12">
						<!-- alert -->
					</div>
				</div>

				<div class="row" style="padding: 10px;">

					<div id="idProponenteVisivel" class="col-md-4">
						<b>Proponente <span class="required">*</span></b> <input
							id="text_proponente" disabled="disabled" class="form-control"
							type="text" /> <input name="idProponente" id="hidden_proponente"
							type="hidden" />
					</div>

					<div class="col-md-4">
						<b>Pesquisador Responsável</b> <span class="required">*</span><select
							name="idPesquisadorResponsavel"
							id="select_pesquisador_responsavel" class="form-control"><option
								value="0">Selecione</option></select>
					</div>

					<div class="col-md-4">
						<b>Tipo da Visita</b> <span class="required">*</span><select
							name="idVisitaTipo" id="select_visita_tipo" class="form-control"><option
								value="0">Selecione</option></select>
					</div>

				</div>


				<div class="row" id="visitaCandidaturaBox" style="padding: 10px;">


					<div id="idDtInicioInscricaoVisivel" class="col-md-2">
						<b>Data Início Inscrição</b> <span class="required">*</span><input
							class="form-control" style="" id="idDtInicioInscricao"
							name="DtInicioInscricao" type="text">
					</div>

					<div class="col-md-2">
						<b>Data Fim Inscrição</b> <span class="required">*</span><input
							class="form-control" style="" id="idDtFimInscricao"
							name="DtFimInscricao" type="text">
					</div>

					<div class="col-md-2">
						<b>Data Início Realização</b> <span class="required">*</span><input
							class="form-control" style="" id="idDtInicioRealizacao"
							name="DtInicioRealizacao" type="text">
					</div>

					<div class="col-md-2">
						<b>Data Fim Realização</b> <span class="required">*</span><input
							class="form-control" style="" id="idDtFimRealizacao"
							name="DtFimRealizacao" type="text">
					</div>

					<div class="col-md-4">
						<b>Data Fim Avaliação dos Pesquisadores</b> <span class="required">*</span><input
							class="form-control" style="width: 180px;"
							id="idDtFimAvaliacaoPesquisador" name="dtFimAvaliacaoPesquisador"
							type="text">
					</div>

				</div>


				<div class="row" style="padding: 10px;">

					<div class="col-md-6">

						<b>Propósito</b><span class="required">*</span> <input
							id="text_proposito" name="proposito" maxlength="255"
							class="form-control" type="text" />

					</div>

					<div class="col-md-6" id="propositoEnBox" style="display: none;" />

					<b>Propósito em Inglês</b><span class="required">*</span> <input
						id="text_proposito_en" name="propositoEn" maxlength="255"
						class="form-control" type="text" />

				</div>

			</div>

			<div class="row" style="padding: 10px;">

				<div class="col-md-12">

					<b>Observação</b>

					<textarea maxlength="2000" id="text_observacao" name="observacao"
						rows="5" class="form-control"></textarea>

				</div>

			</div>

			<div class="row"
				style="padding: 10px; text-align: right; margin-right: 0px;">

				<input id="btn_salvar_visita_proposta" type="button" value="Salvar"
					class="btn btn-primary" />

			</div>
	</div>

	</form>
	<!-- Fim do primeiro passo -->

	<!-- Início do passo um e meio -->
	<div id="um_passo_e_meio"
		style="background-color: white; display: none; padding: 10px;">

		<div class="row">

			<div class="col-md-12">

				Necessita de Auxílio Financeiro? <input id="auxilio_necessita"
					name="necessitaAuxilio" value="true" type="radio"> Sim <input
					id="auxilio_nao_necessita" name="necessitaAuxilio" value="false"
					checked="checked" type="radio" /> Não

				<div id="modal_confirma_exclusao_auxilio"></div>
				<div id="modal_detalhamento"></div>

			</div>

		</div>

		<div class="row" style="margin-top: 10px;">

			<div class="col-md-12">

				<fieldset id="fieldset_tipos_auxilio" class="fieldset-impa"
					style="display: none;">
					<legend class="panel-title" style="width: 115px;">&nbsp;Tipos
						de Auxílio</legend>

					<table id="at_table" class="table table-bordred table-striped">

						<thead>

							<tr>
								<td>Tipo</td>
								<td>Quantidade</td>
								<td>Valor Unitário</td>
								<td>Total</td>
								<td></td>
							</tr>

						</thead>

						<tbody id="at_tbody">

							<tr id='at_sem_registro'>

								<td colspan="5"><img
									src="<c:url value='/pub/imagens/ajax-loader.gif'/>" /></td>

							</tr>


						</tbody>

					</table>

					<input id="incluir_auxilio_tipo" class="btn btn-default"
						style="float: right;" type="button" value="Incluir" />

					<div id="modal_auxilio_tipo"></div>

				</fieldset>

			</div>

		</div>

		<div class="row">

			<div class="col-md-12">

				<fieldset id="fieldset_fontes_pagamento" class="fieldset-impa"
					style="display: none;">

					<legend class="panel-title" style="width: 145px;">&nbsp;Fontes
						de Pagamento</legend>

					<table id="fp_table" class="table table-bordred table-striped">

						<thead>

							<tr>
								<td>Agência de Fomento</td>
								<td>Modalidade</td>
								<td>Valor Previsto</td>
								<td></td>
							</tr>

						</thead>

						<tbody id="fp_tbody">

							<tr>

								<td id='fp_sem_registro' colspan="4"><img
									src="<c:url value='/pub/imagens/ajax-loader.gif'/>" /></td>

							</tr>


						</tbody>


					</table>

					<input id="incluir_fonte_pagamento" class="btn btn-default"
						style="float: right;" type="button" value="Incluir" />

					<div id="modal_fonte_pagamento"></div>

				</fieldset>

			</div>

		</div>

		<div class="row">

			<div class="col-md-12">

				<fieldset id="fieldset_visitantes" class="fieldset-impa"
					style="display: none;">

					<legend class="panel-title" style="width: 75px;">
						Visitantes</legend>

					<table id="v_table" class="table table-bordred table-striped">

						<tr>
							<td>Nenhum visitante com auxílio alocado.</td>
						</tr>

					</table>

				</fieldset>

			</div>

		</div>

		<!-- Início dos botões adicionar outro visitante e finalizar proposta -->

		<div class="row">

			<div id="botoes" class="col-md-12"
				style="text-align: right; background-color: white;">

				<input id="btn_concluir_processo_proposta" type="button"
					value="Voltar para Propostas" class="btn btn-primary"
					style="float: right;"> <input
					id="btn_concluir_processo_visita" type="button"
					value="Voltar para Gerência de Visitas" class="btn btn-primary"
					style="float: right; display: none;">

			</div>

		</div>
		<!-- Fim dos botões adicionar outro visitante e finalizar proposta -->

	</div>
	<!-- Fim do passo um e meio -->

	<!-- Início do segundo passo -->
	<div id="segundo_passo" style="background-color: white; display: none;">

		<div class="row" style="margin-top: 10px;">
			<div id="alert_segundo_passo" class="col-md-12">
				<!-- alert -->
			</div>
		</div>

		<!-- Início da Lista de Visitantes -->

		<input id="n_visitantes" value="0" type="hidden" />
		<div style="margin-top: 10px;">
			<div id="panelFormFiltro" class="panel panel-default"
				style="margin-bottom: 0px !important; display: none;">
				<div class="panel-heading  panel-padding">
					<b>Filtro</b>
				</div>
				<div class="panel-body">
					<form id="form_filtro">
						<input id="hidden_id" name="id" value="${id}" type="hidden" /> <input
							id="hidden_pagina" name="pagina" value="1" type="hidden" /> <input
							id="hidden_qtdPorPagina" name="qtdPorPagina" value="6"
							type="hidden" />
						<div class="form-group row" style="margin-top: 10px;">
							<div class="col-md-2">
								<label for="statusCandidatura">Status da Candidatura</label> <select
									name="statusCandidatura" class="form-control"
									id="statusCandidatura">
									<option value="">Todas</option>
									<option value="true">Completas</option>
									<option value="false">Incompletas</option>
								</select>
							</div>
							<div class="col-md-2">
								<label for="pesquisadorVinculado">Pesquisador Vinculado</label>
								<select name="pesquisadorVinculado" class="form-control"
									id="pesquisadorVinculado">
									<option value="">Todos</option>
									<option value="true">Sim</option>
									<option value="false">Não</option>
								</select>
							</div>
							<div class="col-md-2">
								<input id="btnFiltro" type="button" class="btn btn-primary"
									value="Consultar" style="margin-top: 22px;" />
							</div>
						</div>
						<div class="row" style="margin-top: 10px;"></div>
					</form>
				</div>
			</div>
		</div>
		<div class="row" style="margin-top: 10px;">
			<div class="col-md-12">
				<div class="tab-content">
					<table id="table_visitantes"
						class="table table-bordred table-striped">
						<thead style="font-size: 12px;">
							<tr>

								<th></th>
								<th>Visitante</th>
								<th>Áreas de Pesquisa</th>
								<th>Período(s) Previsto(s)</th>
								<th>Ações</th>

							</tr>

						</thead>

						<tbody id="tbody_visitantes">

							<tr>

								<td colspan="7">Nenhum visitante foi adicionado à proposta.</td>

							</tr>

						</tbody>

					</table>

					<div style="margin-top: 20px;" id="paginacao"></div>

					<input id="btn_adicionar_visitante" type="button" value="Incluir"
						class="btn btn-default" style="margin-right: 5px; float: right;">

					<div class='clearfix'></div>

				</div>

			</div>

		</div>

		<div class="row" style="margin-top: 10px;">

			<div class="col-md-12">

				<input id="aux_continuar" class="btn btn-primary"
					style="float: right;" type="button" value="Continuar" />

			</div>

		</div>

	</div>

	<!-- Fim do Segundo Passo -->

	<!-- Início do Modal para Selecionar Pessoa -->

	<div id="modal_selecionar_pessoa" class='modal fade' role='dialog'
		style='z-index: 10000;'>

		<div class='modal-dialog' style='width: 60%;'>

			<div class='modal-content'>

				<div class='modal-header'>

					<button type='button' class='close' data-dismiss='modal'>&times;</button>

					<h4 class='modal-title'>Selecionar Visitante</h4>

				</div>

				<div class='modal-body' style='font-size: 15px;'>

					<!-- Início do buscar pessoa -->
					<div class="row" style="margin-top: 10px;">

						<div class="col-md-12">

							<div class="login-panel panel panel-default">

								<div class="panel-heading" style="padding: 8px;">
									<h3 class="panel-title">Buscar Pessoa</h3>
								</div>

								<div id="div_autocomplete" class="panel-body"></div>

							</div>

						</div>

					</div>
					<!-- Fim do buscar pessoa -->

					<!-- Início dos dados pessoais -->

					<input id="hidden_id_pessoa_fisica" type="hidden" />

					<div class="row">

						<div class="col-md-12" id="dadosPessoaisDiv">

							<form id="form_dados_pessoais" method="post">

								<div class="login-panel panel panel-default">

									<div class="panel-heading" style="padding: 8px;">
										<h3 class="panel-title">Dados Pessoais</h3>
									</div>

									<div class="panel-body">

										<div class="row">

											<div id="alert_dados_pessoais" style="display: none;"
												class="col-md-12"></div>

										</div>

										<div class="row">

											<div class="col-md-2" style="text-align: center;">

												<img class='img img-thumbnail'
													style="width: 150px; height: 132px;" id="img_foto"
													src="<c:url value='/pub/imagens/fotoDefaultParaDocumentoThumb.jpg'/>" />

											</div>

											<div class="col-md-10">

												<div class="row">

													<div class="col-md-6">

														Nome <span id="required_nome" class="required"
															style="display: none;">*</span> <input name="nome"
															disabled id="text_nome" type="text" class="form-control" />

													</div>

													<div class="col-md-6">

														País de Nascimento <span id="required_pais"
															class="required" style="display: none;">*</span> <select
															name="idPaisNascimento" disabled
															id="select_pais_nascimento" class="form-control"><option
																value="0">Selecione</option></select>

													</div>

												</div>

												<div class="row" style="margin-top: 10px;">

													<div class="col-md-6">

														E-mail Principal <span id="required_email"
															class="required" style="display: none;">*</span> <input
															name="email" disabled id="text_email_principal"
															type="text" class="form-control" />

													</div>

													<div class="col-md-6">

														CPF <span id="required_cpf" style="display: none;"
															class="required">*</span> <input name="cpf" disabled
															id="text_cpf" type="text" class="form-control" />

													</div>

												</div>

											</div>

										</div>

									</div>

								</div>

							</form>

						</div>

					</div>
					<!-- Fim dos dados pessoais -->

				</div>

				<div class='modal-footer'>
					<button id="btn_salvar_visitante" href="#" type='button'
						class='btn btn-primary'>Continuar</button>
					<button type='button' class='btn btn-default' data-dismiss='modal'>Fechar</button>
				</div>

			</div>

		</div>

	</div>

	<!-- Fim do Modal para Selecionar Pessoa -->

	<!-- Início do Modal de Sucesso -->

	<div id="modal_sucesso" class='modal fade' role='dialog'
		style='z-index: 10000;'>

		<div class='modal-dialog'>

			<div class='modal-content'>

				<div class='modal-header'>

					<button type='button' class='close' data-dismiss='modal'>&times;</button>

					<h4 class='modal-title'>Mensagem</h4>

				</div>

				<div class='modal-body' style='font-size: 15px;'>A proposta
					foi finalizada com sucesso.</div>

				<div class='modal-footer'>
					<button type='button' class='btn btn-primary' data-dismiss='modal'>Listar
						Propostas</button>
					<button type='button' class='btn btn-default' data-dismiss='modal'>Fechar</button>
				</div>

			</div>

		</div>

	</div>

	<!-- Fim do Modal de Sucesso -->

	<input id="token" type="hidden" value="${token}" />

	<!--  Scripts -->

	<script src="<c:url value='/pub/js/visitantes/utilitario.js'/>"></script>
	<script src="<c:url value='/pub/js/auxilio/utilitario.js'/>"></script>

	<script src="<c:url value='/pub/js/componentes/alertWarning.js'/>"></script>
	<script src="<c:url value='/pub/js/componentes/alertDanger.js'/>"></script>

	<script
		src="<c:url value='/pub/componentes/js/commons/jquery.form.min.js'/>"></script>
	<script
		src="<c:url value='/pub/tecnologias/jquery/jquery.maskedinput.min.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/componentes/js/commons/addModal.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/componentes/js/commons/calendarioGeral.js'/>"></script>

	<script
		src="<c:url value='/pub/componentes/js/commons/addAutoComplete.js'/>"></script>
	<script
		src="<c:url value='/pub/componentes/js/commons/defaultSelect.js'/>"></script>

	<script src="<c:url value='/pub/componentes/window/1.0/window.js'/>"></script>

	<script src="<c:url value='/pub/js/componentes/alertDanger.js'/>"></script>

	<script
		src="<c:url value='/pub/js/visitantes/propostas/formularioVisita.visitantes.js'/>"></script>
	<script
		src="<c:url value='/pub/js/visitantes/propostas/formularioVisita.auxilioFinanceiroSolicitado.js'/>"></script>
	<script
		src="<c:url value='/pub/js/visitantes/propostas/formularioVisita.dadosVisita.js'/>"></script>
	<script
		src="<c:url value='/pub/js/visitantes/propostas/formularioVisita.js'/>"></script>

	<script
		src="<c:url value="/pub/plugins/inputmask-bundle/4.x/jquery.inputmask.bundle.js"/>"></script>
	<script
		src="<c:url value="/pub/plugins/inputmask-bundle/4.x/phone.js"/>"></script>

	<script
		src="<c:url value='/pub/componentes/auxilios/auxiliosAlocados/1.0/auxiliosAlocados.js'/>"></script>

	<script type="text/javascript"
		src="<c:url value="/pub/componentes/js/paginacao.js"/>"></script>

	<style>
#paginacao__ul_paginacao {
	margin-bottom: 0px !important;
	margin-top: 10px !important;
}
</style>

</body>
</html>