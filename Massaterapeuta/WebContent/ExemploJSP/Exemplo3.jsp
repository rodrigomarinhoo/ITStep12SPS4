<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Visitante</title>


<link rel="stylesheet" type="text/css"
	href="<c:url value="/pub/css/visitantes/visitantes.default.css"/>" />

</head>
<body>

	<script type="text/javascript"
		src="<c:url value='/pub/ckeditor/ckeditor.js'/>"></script>

	<script>
		CKEDITOR.replace('dp_ta_observacoes', {
			toolbar : [ {
				name : 'basicstyles',
				items : [ 'Bold', '-', 'Italic' ]
			}, {
				name : 'paragraph',
				items : [ 'NumberedList', '-', 'BulletedList' ]
			}, {
				name : 'links',
				items : [ 'Link', '-', 'Unlink' ]
			}, {
				name : 'tools',
				items : [ 'Maximize' ]
			}

			]
		});
	</script>

	<style>
.cke_top, .cke_bottom {
	display: none !important;
}
</style>

	<input id="idPessoaFisica" type="hidden" value="" />
	<input id="idVisita" type="hidden" value="" />
	<input id="idVisitante" type="hidden" value="${id}" />
	<input id="idVisitaProposta" type="hidden" value="" />
	<input id="idVisitaTipo" type="hidden" value="" />
	<input id="idPeriodo" type="hidden" value="${idPeriodo}" />
	<input id="aba" type="hidden" value="${aba}" />
	<input id="origem" type="hidden" value="${origem}" />

	<input id="chamadaOrigem" type="hidden" value="${chamadaOrigem}" />

	<input id="authorizationToken" type="hidden" value="${token}" />
	<input id="sePropostaAprovada" type="hidden" value="" />
	<input id="auxilioOrigemToken" type="hidden" value="${tokenVisitantes}" />

	<ol class="breadcrumb">
		<li><a href="<c:url value='/'/>">Home</a></li>
		<li><a
			href="<c:url value='/visitantes/visaoGeralVisitas.action'/>">Gerência
				de Visitas</a></li>
		<li id='bc_propostas'><a
			href="<c:url value='/visitantes/propostas/propostaVisitaGeral.action'/>">Propostas</a></li>
		<li id='idBreadcrumbProposito'><a id="breadcrumbProposito"
			href="#">Carregando ...</a></li>
		<li id="breadcrumbNomeVisitante" class="active">Carregando ...</li>
	</ol>

	<div id="headerVisita" class="alert alert-info"
		style="color: #333; margin-top: 18px; border: 0px; border-radius: 0px; margin-bottom: -20px; background-image: linear-gradient(to bottom, #e8e8e8 20%, #EEE 100%)">

		<div class="container" style="margin-top: 0px;">
			<div id="propositoPropostaDiv" style="font-size: 16px;">
				<img src="<c:url value="/pub/imagens/ajax-loader.gif"/>" />
			</div>

			<div id="observacaoPropostaReduzidaDiv"
				style="color: #666; display: none;">Carregando...</div>

			<div id="observacaoPropostaReduzidaLerMais"
				style="display: none; cursor: pointer; color: #5687d3;">[Ler
				mais]</div>

			<div id="observacaoPropostaCompletaDiv"
				style="color: #666; display: none;">Carregando...</div>

			<div id="observacaoPropostaCompletaOcultar"
				style="display: none; cursor: pointer; color: #5687d3;">[Ocultar]</div>

			<div id="pesquisadorResponsavelDiv"></div>
		</div>

	</div>

	<div class="container">

		<div id="header">

			<div class="row">

				<div class="col-md-12">

					<div class="login-panel panel panel-default">



						<div class="panel-heading" style="font-size: 14px;">
							<span id="nomeVisitante" style="float: left; margin-top: 5px;"><img
								src="<c:url value="/pub/imagens/ajax-loader.gif"/>" /></span>
							<div class='' id="linkAcessarCadastro"
								style="float: right; display: block;">
								<img src="<c:url value="/pub/imagens/ajax-loader.gif"/>" />
							</div>
							<div class="clearfix"></div>
						</div>

						<div class="panel-body">
							<div class="row">

								<div class="col-md-2">
									<div class="thumbnail" style="margin-bottom: 0px;">
										<img id="fotoPerfil" style="width: 120px; height: 140px;"
											src="">
									</div>
								</div>


								<div class="col-md-10">
									<div class="row" style="margin-top: 13px;">
										<div class="col-md-4">

											<div class="row">
												<div class="col-md-12">
													<b>E-mail</b> <span id="btnAlterarEmail"
														style="display: none; margin-left: 10px; color: #1aa3ff; cursor: pointer;"><i
														class="glyphicon glyphicon-edit"></i> Alterar </span> <input
														type="hidden" id="idEmail" value="">
												</div>
											</div>

											<div class="row" style="margin-bottom: 10px;">
												<div class="col-md-12">
													<div style="dislplay: inline;" id="emailContent">
														<img src="<c:url value="/pub/imagens/ajax-loader.gif"/>" />
													</div>
												</div>
											</div>

										</div>

										<div class="col-md-4">

											<div class="row">
												<div class="col-md-12">
													<b>Dados Bancários</b> <span id="btnAlterarDadoBancario"
														style="display: none; margin-left: 10px; color: #1aa3ff; cursor: pointer;"><i
														class="glyphicon glyphicon-edit"></i> Alterar </span> <input
														type="hidden" id="idDadoBancario" />
												</div>
											</div>

											<div class="row" style="margin-bottom: 10px;">
												<div class="col-md-12">
													<div style="dislplay: inline;" id="dadoBancarioContent">
														<img src="<c:url value="/pub/imagens/ajax-loader.gif"/>" />
													</div>
												</div>
											</div>

										</div>

										<div class="col-md-4">

											<div class="row">
												<div class="col-md-12">
													<b>Áreas de Pesquisa <span style='color: red;'>*</span>
													</b> <span id="btnAlterarAreaPesquisa"
														style="margin-left: 10px; color: #1aa3ff; cursor: pointer;"><i
														class="glyphicon glyphicon-edit"></i> Alterar </span>
												</div>
											</div>


											<div class="row">
												<input type="hidden" id="areasPesquisasHidden" value="false">

												<div class="col-md-12" id="areasPesquisas">--</div>
											</div>

										</div>

										<div class="col-md-12">

											<div class="row">
												<div class="col-md-12">
													<b>Formação Acadêmica <span style='color: red;'>*</span></b>
													<span id="btnAlterarFormacaoAcademica"
														style="display: none; margin-left: 10px; color: #1aa3ff; cursor: pointer;"><i
														class="glyphicon glyphicon-edit"></i> Alterar </span> <input
														type="hidden" id="idFormacaoAcademica" />
												</div>
											</div>

											<div class="row" style="margin-bottom: 10px;">
												<div class="col-md-12">
													<div style="dislplay: inline;"
														id="formacaoAcademicaContent">
														<img src="<c:url value="/pub/imagens/ajax-loader.gif"/>" />
													</div>
												</div>
											</div>

										</div>


										<div class="col-md-12">

											<div class="row">
												<div class="col-md-12">
													<b>Instituição Atual <span style='color: red;'>*</span></b>
													<span id="btnAlterarExperienciaProfissional"
														style="display: none; margin-left: 10px; color: #1aa3ff; cursor: pointer;"><i
														class="glyphicon glyphicon-edit"></i> Alterar </span> <input
														type="hidden" id="idExperienciaProfissional" />
												</div>
											</div>

											<div class="row" style="margin-bottom: 10px;">
												<div class="col-md-12">
													<div style="dislplay: inline;"
														id="experienciaProfissionalContent">
														<img src="<c:url value="/pub/imagens/ajax-loader.gif"/>" />
													</div>
												</div>
											</div>

										</div>

									</div>
								</div>


							</div>

						</div>

					</div>


				</div>

			</div>

		</div>

		<div class="panel panel-default">
			<div class="panel-heading">
				<span id="btnOcultarDocumentos" style="cursor: pointer;"
					class=" btn-mostra-filtro"> <i id="documentosIcone"
					class="glyphicon glyphicon-chevron-down"></i>
				</span> Documentos Fornecidos
			</div>
			<div id="documentosBody" class="panel-body" style="display: none;">
				<div id="documentosTable"></div>
			</div>

		</div>

		<!-- FIM HEADER -->

		<!-- FIM COMPONENTES DADOS DE VISITANTES -->

		<div class="panel panel-default">

			<div id="panelPeriodosHeading" class="panel-heading">Períodos</div>

			<div class="panel-body">

				<img id='loadPeriodosTable'
					src="<c:url value="/pub/imagens/ajax-loader.gif"/>" />

				<table id="periodosTable" class="table table-stripped"
					style="margin-bottom: 0px; display: none;">

					<thead>
						<tr>
							<th></th>
							<th>Período</th>
							<th>Categoria</th>
							<th id="periodosTableStatus">Status</th>
							<th></th>
						</tr>
					</thead>

					<tbody id="periodosTableBody">

					</tbody>

				</table>

			</div>
		</div>




		<!--  CRIAÇÃO DAS TABS DE INFORMAÇÕES DE PERIODOS -->

		<ul class="nav nav-tabs">

			<li id="informacoesPeriodoTab_dadosPeriodo"
				style="cursor: pointer; display: none;"><a
				style="padding: 12px 20px; border-radius: 0px;"
				id="informacoesPeriodoTab_dadosPeriodo_link">Dados do Período</a></li>

			<li id="informacoesPeriodoTab_auxiliosSolicitados"
				style="cursor: pointer; display: none;"><a
				style="padding: 12px 20px; border-radius: 0px;"
				id="informacoesPeriodoTab_auxiliosSolicitados_link">Auxílios
					Solicitados</a></li>

			<li id="informacoesPeriodoTab_auxiliosAlocados"
				style="cursor: pointer; display: none;"><a
				style="padding: 12px 20px; border-radius: 0px;"
				id="informacoesPeriodoTab_auxiliosAlocados_link">Auxílios
					Alocados</a></li>

			<!-- 
			  		
				  	<li id="informacoesPeriodoTab_espacosAlocados" class="disabled">
				  		<a>Espaços Alocados</a>
			  		</li> -->

			<li id="informacoesPeriodoTab_checkin"
				style="cursor: pointer; display: none;"><a
				style="padding: 12px 20px; border-radius: 0px;"
				id="informacoesPeriodoTab_checkin_link">Check-In</a></li>

		</ul>

		<div id="informacoesPeriodoTab_dadosPeriodo_content"
			class="tab-content"
			style="display: none; background-color: white; height: 770px;">

			<div id="dadosPeriodoLoader" style='margin-bottom: 12px;'>
				<center>
					<img src='<c:url value="/pub/imagens/ajax-loader.gif"/>' />
				</center>
			</div>

			<div style="display: none;" id="informacoesPeriodoTab_mensagens"></div>

			<form style="display: none;"
				id="informacoesPeriodoTab_dadosPeriodo_content_form" action=""
				method="">

				<div class="row">
					<div class="col-md-3">
						<b>Data Previsão Chegada</b>
					</div>
					<div class="col-md-3">
						<b>Data Previsão Partida</b>
					</div>
					<div id="dataChegadaLabel" class="col-md-3">
						<b>Data Chegada</b>
					</div>
					<div id="dataPartidaLabel" class="col-md-3">
						<b>Data Partida</b>
					</div>
				</div>

				<div class="row margin-bottom-5">
					<div class="col-md-3">
						<input class="form-control" style=""
							id="dp_tf_dt_previsao_chegada" name="dataPrevisaoChegada"
							type="text">
					</div>
					<div class="col-md-3">

						<input class="form-control" style="" name="dataPrevisaoPartida"
							id="dp_tf_dt_previsao_partida" type="text">
					</div>

					<div id="dataChegadaField" class="col-md-3">
						<input class="form-control" id="dp_tf_dt_chegada" type="text"
							disabled="disabled">
					</div>
					<div id="dataPartidaField" class="col-md-3">
						<input class="form-control" id="dp_tf_dt_partida" type="text"
							disabled="disabled">
					</div>
				</div>


				<div class="row">

					<div class="col-md-3">
						<b>Tipo da Visita</b>
					</div>

					<div class="col-md-3">
						<b>Categoria</b>
					</div>

					<div id="tituloApresentacaoLabel" class="col-md-6">
						<b>Título da Apresentação</b>
					</div>

				</div>

				<div class="row margin-bottom-5">

					<div class="col-md-3">
						<input type='text' name="nomeVisitaTipoTexto"
							id="idVisitaTipoTexto" class="form-control" disabled="disabled" />
						<input type='hidden' id="idVisitaTipo" value="" />
					</div>

					<div class="col-md-3">
						<select class="form-control" style="" name="categoria"
							id="dp_cb_categoria">
							<option value="">Selecione</option>
						</select>
					</div>

					<div id="tituloApresentacaoField" class="col-md-6">
						<input type='text' name="tituloApresentacao"
							id="tituloApresentacao" class="form-control" />
					</div>

				</div>

				<div class="row margin-bottom-5">
					<div class="col-md-12">

						<div class="row">
							<div class="col-md-6">
								<b>Pesquisadores com quem irá interagir</b>
							</div>
						</div>

						<div class="row ">
							<div id="dp_c_pesquisadoresInteracao" class="col-md-12"></div>
						</div>

					</div>
				</div>

				<div class="row" style='margin-top: 3px;'>
					<div class="col-md-12">

						<div class="row">
							<div class="col-md-12">
								<b>Observações</b>
							</div>
						</div>

						<div class="row margin-bottom-5">
							<div class='col-md-12'>
								<textarea class='ckeditor' id="dp_ta_observacoes"></textarea>
								<input type="hidden" name='observacoes'
									id="dp_ta_observacoes_hidden" />
								<div class="clearfix"></div>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="clearfix"></div>

					</div>
					<div class="clearfix"></div>
				</div>

				<div class="clearfix"></div>
				<div class="clear-fix"></div>

				<div class="row">
					<div class="col-md-12 content-align-center">
						<span id="btnSalvarDadosPeriodo" class="btn btn-primary"
							style="margin-top: -10px;">Salvar</span>
					</div>
				</div>

			</form>
		</div>

		<div id="informacoesPeriodoTab_auxiliosAlocados_content"
			class="tab-content"
			style="display: none; background-color: white; height: 550px;">

			<div id="auxiliosAlocadosLoader" style='margin-bottom: 12px;'>
				<center>
					<img src='<c:url value="/pub/imagens/ajax-loader.gif"/>' />
				</center>
			</div>

			<div id="auxiliosAlocados"></div>

			<div class='row modal-footer'>
				<span id="alocarAuxilio" class='btn btn-default '
					style='float: right;'>Incluir</span>
			</div>
			<div class='clearfix'></div>

		</div>

		<div id="informacoesPeriodoTab_auxiliosSolicitados_content"
			class="tab-content"
			style="display: none; background-color: white; height: 550px;">

			<div id="auxiliosSolicitados"></div>

			<div class='clearfix'></div>

		</div>

		<div id="informacoesPeriodoTab_checkin_content" class="tab-content"
			style="display: none; background-color: white; height: 550px;">
			<form id="informacoesPeriodoTab_checkin_content_form">
				<div class="row">

					<div id="alert_checkin" class="col-md-12" style="display: none;">

					</div>

				</div>

				<div class="row">
					<div class="col-md-3">
						<b>Data</b>
					</div>
				</div>

				<div class="row margin-bottom-5">
					<div class="col-md-3">
						<input class="form-control" style="" id="dp_tf_dt_checkin"
							name="dataChegada" type="text">
					</div>
				</div>

				<div class="row modal-footer">

					<div class="col-md-12 content-align-center">

						<span id="btnRealizarCheckin" class="btn btn-primary">Realizar
							Checkin</span> <span id="btnDesconsiderarCheckin" class="btn btn-danger">Desconsiderar
							Checkin</span>

					</div>

				</div>
			</form>

		</div>



		<!--  DADOS DADOS PERIODO CONTENT -->


	</div>

	<br>
	<br>

	<div id="alocarAuxilioModal"></div>

	<div id="loading" class="modal-backdrop fade in" style='display: none;'></div>


	<script type="text/javascript"
		src="<c:url value='/pub/componentes/window/1.0/window.js'/>"></script>

	<script type="text/javascript"
		src="<c:url value='/pub/componentes/js/commons/addModal.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/componentes/js/pessoas/addEmail.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/componentes/js/pessoas/addFormacaoAcademica.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/componentes/js/pessoas/addDadoBancario.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/componentes/js/pessoas/addExperienciaProfissional.js'/>"></script>

	<script type="text/javascript"
		src="<c:url value='/pub/js/componentes/multipleSelect.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/js/componentes/comboSelect.js'/>"></script>


	<script src="<c:url value='/pub/js/visitantes/utilitario.js'/>"></script>
	<script src="<c:url value='/pub/js/auxilio/utilitario.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value="/pub/js/jquery/jquery.form.js"/>"></script>

	<script
		src="<c:url value="/pub/plugins/inputmask-bundle/4.x/jquery.inputmask.bundle.js"/>"></script>
	<script
		src="<c:url value="/pub/plugins/inputmask-bundle/4.x/phone.js"/>"></script>

	<script type="text/javascript"
		src="<c:url value='/pub/tecnologias/jquery/jquery.maskedinput.min.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/componentes/js/commons/calendarioGeral.js'/>"></script>


	<script type="text/javascript"
		src="<c:url value="/pub/js/visitantes/formulario/fv.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/pub/js/visitantes/formulario/fv.dadosPessoais.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/pub/js/visitantes/formulario/fv.informacoesPeriodo.tabs.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/pub/js/visitantes/formulario/fv.informacoesPeriodo.tabs.dadosPeriodo.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/pub/js/visitantes/formulario/fv.informacoesPeriodo.tabs.checkin.js"/>"></script>

	<script type="text/javascript"
		src="<c:url value='/pub/js/componentes/alertDanger.js'/>"></script>

	<script type="text/javascript"
		src="<c:url value='/pub/componentes/auxilios/alocarAuxilio/1.0/alocarAuxilio.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/componentes/auxilios/auxiliosAlocados/1.0/auxiliosAlocados.js'/>"></script>

	<input type="hidden" id="fvLoaded" value="0" />

</body>
</html>