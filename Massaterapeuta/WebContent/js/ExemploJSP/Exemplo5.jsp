<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Gerência de Propostas</title>

<link rel="stylesheet" type="text/css"
	href="<c:url value="/pub/css/visitantes/visitantes.default.css"/>" />

<script type="text/javascript"
	src="<c:url value='/pub/componentes/js/commons/autocomplete.js'/>"></script>

<script type="text/javascript"
	src="<c:url value="/pub/js/visitantes/propostas/propostaVisitaGeral.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pub/js/visitantes/utilitario.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pub/componentes/js/paginacao.js"/>"></script>

<script type="text/javascript"
	src="<c:url value='/pub/tecnologias/jquery/jquery.maskedinput.min.js'/>"></script>

<script type="text/javascript"
	src="<c:url value='/pub/js/componentes/multipleSelect.js'/>"></script>

<script type="text/javascript"
	src="<c:url value='/pub/componentes/js/commons/addModal.js'/>"></script>

<style>
.span-box {
	font-size: 11px;
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
}
</style>

</head>

<body>

	<input type="hidden" id="authorizationToken" value="${token}" />

	<div class="row" style="margin-top: 10px;">

		<div class="col-md-12">

			<div class="panel panel-default"
				style="margin-bottom: 0px !important;">

				<div class="panel-heading  panel-padding">
					<b>Propostas</b>
				</div>

				<div class="panel-body">

					<!-- <div class="row">
						<div class="col-md-6"><b>Visitante</b></div>
					</div>
					
					<div class="row">
						<div class="col-md-4"><b>Pesquisador</b></div>
						<div class="col-md-2"><b>Status</b></div>
					</div> -->


					<form id="form_filtro">

						<!-- Parâmetros de paginação -->

						<input id="hidden_pagina" name="pagina" value="1" type="hidden" />
						<input id="hidden_qtdPorPagina" name="qtdPorPagina" value="10"
							type="hidden" /> <input name="order" value="id" type="hidden" />
						<input name="orderType" value="ASC" type="hidden" />

						<div class="row">

							<div class="col-md-6">
								<b>Visitante</b>
								<div id="nomeVisitante"></div>
							</div>

						</div>

						<div class="row">

							<div class="col-md-4">
								<b>Pesquisador</b> <select name="pesquisadorResponsavel"
									id="pesquisadorResponsavel" class="form-control"></select>
							</div>

							<div class="col-md-2">
								<b>Status</b> <select name="status" id="status"
									class="form-control"></select>
							</div>

						</div>

						<div class="row">

							<div class="col-md-12" style="text-align: right;">
								<div class="input-group">
									<span class="input-group-btn"> <span
										id="btnConsultaProposta" class="btn btn-primary"
										value="Consultar"> <span
											class="glyphicon glyphicon-search"> </span> Consultar
									</span> <span id="btnSubmeteFormulario" style="display: none;"
										class="btn btn-primary" value="Consultar"> <span
											class="glyphicon glyphicon-search"> </span> Consultar
									</span>

									</span>
								</div>
							</div>

						</div>

					</form>



					<div class="row">

						<hr>

						<div class="col-md-12">

							<div class="row">

								<div class="col-md-12">

									<table width="100%" class="table table-bordred table-striped">

										<thead>
											<tr>
												<th>Propósito</th>
												<th>Pesquisador</th>
												<th>Visitante(s)</th>
												<th>Status</th>
												<th>Ações</th>
											</tr>
										</thead>

										<tbody class="js-propostas-table-body"></tbody>

									</table>

								</div>

							</div>

							<!-- </div> -->

							<div style="margin-top: 20px;" id="paginacao"></div>

						</div>

						<hr>


						<div class="col-md-12">

							<a style="float: right;" class="btn btn-default"
								href="<c:url value='/visitantes/visitas/formularioVisita.action'/>">
								Incluir </a>

						</div>


					</div>

				</div>

			</div>

		</div>


	</div>


</body>
</html>