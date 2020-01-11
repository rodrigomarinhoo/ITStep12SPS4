<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Relatório de Gestão</title>
<style>
#ui-datepicker-div {
	z-index: 9999 !important;
}
</style>
</head>
<body>
	<div class="container-fluid">
		<h2>Relatório de Gestão</h2>
		<input type="hidden" id="authorizationToken" value="${token}" />
		<div class="panel panel-default">
			<div class="panel-heading">
				<b>Filtro</b> <span id="btnMostraFiltros"
					style="float: left; display: none; cursor: pointer; font-size: 14px; margin-right: 8px;"
					class="btn-mostra-filtro"> <i
					class="glyphicon glyphicon-filter"></i>
				</span> <span id="btnOcultarFiltros"
					style="float: left; cursor: pointer; margin-right: 8px;"
					class=" btn-mostra-filtro"> <i
					class="glyphicon glyphicon-chevron-up"></i>
				</span>
			</div>
			<div id="body_filtro" class="panel-body">
				<div class="row">
					<div class="form-group col-lg-12">
						<div id="mensagem_validacao" class="alert alert-danger"
							style="display: none;">Todos os campos são obrigatórios.
							Verifique se estão preenchidos corretamente.</div>
					</div>
				</div>

				<form id="form-filtro">
					<div class="row">
						<div class="form-group col-lg-2">
							<label for="dataInicio">Período</label> <span class="required">*</span>
							<input type="text" class="form-control datas" name="dataInicio"
								id="dataInicio" maxlength="10" style="width: 110%;">
						</div>
						<div
							style="margin-top: 27px; padding: 0px; text-align: center; width: 40px;"
							class="col-lg-1">
							<strong style="margin-left: 32px !important;">à</strong>
						</div>
						<div class="form-group col-lg-2" style="margin-top: 22px;">
							<input type="text" class="form-control datas" name="dataFim"
								id="dataFim" maxlength="10"">
						</div>
						<div class="form-group col-lg-2">
							<label for="tipo">Tipo</label> <span class="required">*</span> <select
								class="form-control" id="tipo">
								<option value="">Selecione</option>
							</select>
						</div>
						<div class="col-lg-5" style="margin-top: 0px;">
							<div class="form-group">
								<label for="categoria">Categoria</label> <span class="required">*</span>
								<select id="categorias" multiple="multiple" class="form-control"></select>
							</div>
							<input id="btnConsultar" type="submit" class="btn btn-primary"
								value="Consultar" style="float: right;">
						</div>
					</div>
				</form>
			</div>
		</div>
		<div id="resultado" style="display: none;">
			<div class="panel panel-default">
				<div class="panel-heading">Resultado</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-lg-12">
							<table
								class="table table-bordered table-striped table-hover table-condensed">
								<thead>
									<tr>
										<th>Categoria</th>
										<th>Nº Pesquisadores</th>
										<th>Nº Dias</th>
									</tr>
								</thead>
								<tbody id="resumo"></tbody>
								<tfoot>
									<tr id="totalizador-fake">
										<td><b>Total</b></td>
										<td id="numero-visitantes-fake"></td>
										<td id="numero-dias-fake"></td>
									</tr>
									<tr id="totalizador">
										<td><b>Total</b></td>
										<td id="numero-visitantes"></td>
										<td id="numero-dias"></td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3" style="cursor: pointer;">
							<p>
								<span id="btnExpandirComprimir"
									style="text-decoration: underline;"> <span
									class="glyphicon glyphicon-collapse-up"></span>Ocultar
									detalhamento de categorias
								</span>
							</p>
						</div>
						<div class="col-lg-9"></div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="panel-group resultado-consulta"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript"
		src="<c:url value='/pub/tecnologias/jquery/jquery.maskedinput.min.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/componentes/js/commons/DateUtils.js'/>"></script>
	<script type="text/javascript"
		src="<c:url value="/pub/js/visitantes/utilitario.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value='/pub/js/visitantes/relatorioGestao.js'/>"></script>
</body>
</html>