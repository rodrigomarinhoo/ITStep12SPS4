function carregaAbaDadosInscricao(exibeCarregando) {
	habilitaTodasAsAbas();

	$("#panel_dados_cadastro").hide();
	$("#painel_dados_inscricao").show();
	$("#painel_documentos").hide();
	$("#painel_resumo").hide();

	if ($("#visitante").val() == "") {
		carregaAbaDadosPessoais(false);
	} else {
		window.history.pushState({}, "", $("#URL_BASE").val()
				+ "visitantes/inscricaoCandidato.action?visita="
				+ $("#visita").val() + "&pessoa=" + $("#pessoa").val()
				+ "&aba=dadosCandidatura-2");

		$("#passo").val("2");
		$("#aba").val("dadosCandidatura-2");

		// window.history.pushState("data","Title",new_url);
		// document.title=url;

		$("#pdi_mensagensErro").hide();
		$("#pdi_mensagensErro").html("");
		$("#tab_dados_inscricao").addClass("active");
		$("#painel_dados_inscricao").show();

		if (exibeCarregando) {
			carregando();
		}

		$(document).off("change", "#categorias").on(
				"change",
				"#categorias",
				function(e) {

					$.ajax({
						type : "GET",
						url : url_visitantes() + "/categorias/" + $(this).val()
								+ "/verificaApresentacao",
						dataType : "json",
						async : true,
						headers : {
							"Authorization" : $("#authorizationToken").val()
						},
						success : function(data, textStatus, xhr) {

							if (data.apresentacao == true) {
								$("#tituloApresentacaoBody").show();
								$("#tituloApresentacaoHeader").show();
							} else {
								$("#tituloApresentacaoBody").hide();
								$("#tituloApresentacaoHeader").hide();
							}

						}
					});

				});

		$(document).off("change", "#necessitaAuxilioFinanceiro").on("change",
				"#necessitaAuxilioFinanceiro", function(e) {

					if ($(this).val() == "true") {
						$("#divSolicitacaoAuxilioFinanceiro").show();
					} else {
						$("#divSolicitacaoAuxilioFinanceiro").hide();
					}

				});

		$.ajax({
			type : "GET",
			data : $("#formDadosInscricao").serialize(),
			url : url_visitantes() + "/visitantes/candidatura/inscricao",
			dataType : "json",
			async : true,
			headers : {
				"Authorization" : $("#authorizationToken").val()
			},
			success : function(data, textStatus, xhr) {

				if (data.ok == true) {
					$("#dataInicio").val(data.obj.dataInicio);
					$("#dataFim").val(data.obj.dataFim);
					$("#pesquisadoresComQuemIraInteragir").val(
							data.obj.idPesquisadorComQuemIraInteragir);
					$("#outroPesquisadorComQuemIraInteragir").val(
							data.obj.outroPesquisadorComQuemIraInteragir);
					$("#areasDePesquisa").val(data.obj.idAreaPesquisa);
					$("#categorias").val(data.obj.idCategoria);
					$("#categorias").change();
					$("#tituloApresentacao").val(data.obj.tituloApresentacao);
					$("#necessitaAuxilioFinanceiro").val(
							data.obj.necessitaAuxilioFinanceiro + "");
					$("#necessitaAuxilioFinanceiro").change();
					$("#tipoAuxilioQuantidade").val(
							data.obj.tipoAuxilioQuantidade);

				}
			}
		});

		carregamentoConcluido();

		$(document).off("click", "#salvarPasso2").on(
				"click",
				"#salvarPasso2",
				function(e) {

					carregando();

					$("#pdi_mensagensErro").hide();
					$("#pdi_mensagensErro").html("");

					/*
					 * alert( $("#necessitaAuxilioFinanceiro").val() ); alert(
					 * $("#tipoAuxilioQuantidade").val() );
					 */

					$.ajax({
						type : "POST",
						data : $("#formDadosInscricao").serialize(),
						url : url_visitantes()
								+ "/visitantes/candidatura/inscricao",
						dataType : "json",
						async : true,
						headers : {
							"Authorization" : $("#authorizationToken").val()
						},
						success : function(data, textStatus, xhr) {
							if (data.ok == false) {
								$.each(data.msg, function(i, item) {
									$("#pdi_mensagensErro").append(
											"<li>" + item + "</li>");
								});

								carregamentoConcluido();

								$("#pdi_mensagensErro").show();

							} else {
								habilitaTodasAsAbas();

								$("#painel_dados_inscricao").hide();

								carregaAbaDocumentos(false);

							}
						}
					});

				});

		$(document).off("click", "#voltarPasso1").on("click", "#voltarPasso1",
				function(e) {

					habilitaTodasAsAbas();

					carregaAbaDadosPessoais(true);

					$("#painel_dados_inscricao").hide();

				});

		$(document).off("click", ".btn-number").on("click", ".btn-number",
				function(e) {
					e.preventDefault();

					fieldName = $(this).attr('data-field');
					type = $(this).attr('data-type');
					var input = $("input[name='" + fieldName + "']");
					var currentVal = parseInt(input.val());
					if (!isNaN(currentVal)) {
						if (type == 'minus') {

							if (currentVal > input.attr('min')) {
								input.val(currentVal - 1).change();
							}
							if (parseInt(input.val()) == input.attr('min')) {
								$(this).attr('disabled', true);
							}

						} else if (type == 'plus') {

							if (currentVal < input.attr('max')) {
								input.val(currentVal + 1).change();
							}
							if (parseInt(input.val()) == input.attr('max')) {
								$(this).attr('disabled', true);
							}

						}
					} else {
						input.val(0);
					}
				});

		$('.input-number').focusin(function() {
			$(this).data('oldValue', $(this).val());
		});

		$(document).off("change", ".input-number").on(
				"change",
				".input-number",
				function(e) {

					minValue = parseInt($(this).attr('min'));
					maxValue = parseInt($(this).attr('max'));
					valueCurrent = parseInt($(this).val());

					name = $(this).attr('name');
					if (valueCurrent >= minValue) {
						$(
								".btn-number[data-type='minus'][data-field='"
										+ name + "']").removeAttr('disabled')
					} else {
						alert('Sorry, the minimum value was reached');
						$(this).val($(this).data('oldValue'));
					}
					if (valueCurrent <= maxValue) {
						$(
								".btn-number[data-type='plus'][data-field='"
										+ name + "']").removeAttr('disabled')
					} else {
						alert('Sorry, the maximum value was reached');
						$(this).val($(this).data('oldValue'));
					}

				});

		$(".input-number").keydown(
				function(e) {
					// Allow: backspace, delete, tab, escape, enter and .
					if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 190 ]) !== -1
							||
							// Allow: Ctrl+A
							(e.keyCode == 65 && e.ctrlKey === true) ||
							// Allow: home, end, left, right
							(e.keyCode >= 35 && e.keyCode <= 39)) {
						// let it happen, don't do anything
						return;
					}
					// Ensure that it is a number and stop the keypress
					if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
							&& (e.keyCode < 96 || e.keyCode > 105)) {
						e.preventDefault();
					}
				});

	}

}