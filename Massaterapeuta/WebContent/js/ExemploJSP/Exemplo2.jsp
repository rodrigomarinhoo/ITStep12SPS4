<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Conclusão do Visitante</title>

</head>
<body>

	<input type="hidden" id="authorizationToken" value="${token}" />
	<input type="hidden" id="idVisitante" value="${idVisitante}" />
	<input type="hidden" id="locale" value="${locale}" />

	<div class="alert alert-default"
		style="background-image: linear-gradient(to bottom, #e8e8e8 20%, #EEE 100%); height: 60px;">
		<p id="proposito" style="font-size: 20px;"></p>
	</div>

	<div class="container" style="width: 100%; height: 600px;">

		<div class="row" style="margin-top: -10px;">
			<div class="col-md-12">
				<p id="textoInformativo" style="font-size: 15px">
					<!-- Texto com Instruções para o Visitante -->
				</p>
			</div>
		</div>

		<div class="row">
			<div id="documentosConclusao" class="col-md-12">
				<!-- Tabela com os Documentos a serem anexados pelo Visitante -->
			</div>
		</div>

		<div class="row">
			<div id="gerarCertificado" class="col-md-12"
				style="text-align: right;">
				<!-- Botão de Gerar Certificado -->
			</div>
		</div>

	</div>

	<script src="<c:url value='/pub/js/visitantes/utilitario.js'/>"></script>
	<script src="<c:url value='/pub/componentes/js/commons/i18n.js'/>"></script>
	<script
		src="<c:url value='/pub/componentes/uploadDocumentos/1.0/uploadDocumentos.js'/>"></script>
	<script
		src="<c:url value='/pub/js/visitantes/services/VisitanteService.js'/>"></script>
	<script
		src="<c:url value='/pub/js/visitantes/controllers/ConclusaoVisitanteController.js'/>"></script>

	<script>
		new ConclusaoVisitanteController($("#idVisitante").val());
	</script>

</body>
</html>