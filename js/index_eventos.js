
	
	/* F7 PARA COMPRIMIR O CTRL + B */
	

	/*-------------------------------------------------------------------------------------------------------*/
	/*----------------------------------------- USED APPS IN THE PAGE ---------------------------------------*/
	/*-------------------------------------------------------------------------------------------------------*/	

	//	NAME		UTILITY

	//	ICOMOON 	PARA CONVERTIR IMAGENES (.SVG) A FUENTE DE ICONO
	//				PARA DESCARGAR GALERIA DE FUENTE DE ICONOS

					https://icomoon.io/app/#/select

	/*-------------------------------------------------------------------------------------------------------*/
	/*------------------------------------------ VARIABLES  GENERALES ---------------------------------------*/
	/*-------------------------------------------------------------------------------------------------------*/

		// VARIABLE QUE CONTARA LOS CLICS EN EL ""AUTOPLAY""
		var Autoplay_countClic;

		// VARIABLE PARA CONTAR LOS SEGUNDOS
		var Tiempo_corriendo_interval;

		// CONTADOR QUE DIRA QUE LA FUNCION ""TIEMPO CORRIENDO"" SE ESTA EJECUTANDO
		var Counter_runTime;

	/*-------------------------------------------------------------------------------------------------------*/
	/*----------------------------------------------- FUNCIONES ---------------------------------------------*/
	/*-------------------------------------------------------------------------------------------------------*/


		//--------------- PROYECTO SLIDER DE IMAGENES Y BARRA DE PROGRESO ---------------

		var seconds_animate_interval;
		var Progress_Sec_Animate = 0;	// VALOR POR DEFECTO
		var time_animate = 10000;		// VALOR POR DEFECTO
		// DETECTA CUANDO SALISTE DE LA PAGINA
		var Wind_blur;
		// DETECTA CUANDO SE HACE "UNHOVER" EN LAS IMAGENES DEL SLIDER
		var ImgSlider_unhover = 1;
		// DETECTA CUANDO LA BARRA DE PROGRESO ESTA PAUSADO EN STOP O EN PLAY
		var ProgressAni_Status;

		function BarProgress_animate(){

			// FUNCION PARA CONTAR 10 MINUTOS
			// EL SET-INTERVAL TERMINA CUANDO EL ANIMATE(Bar-Progress) TERMINA
			seconds_animate_interval = setInterval(function(){

				// EL "Progress_Sec_Animate" siempre debe ser de "" <=10 ""
				// de lo contrario hay error
				Progress_Sec_Animate++;
				
			},1000);

			$("#Bar-Progress").animate({
				'width':'100%',
			},time_animate, 'linear', function(){
				$("#Bar-Progress").css({'width':'0'});
				$("#slider_images-show").append($(".images-slider:first-child"));

				clearInterval(seconds_animate_interval);
				// SI TODO VA BIEN SIEMPRE DEBE SALIR "10 SEGUNDOS"
				console.log(Progress_Sec_Animate);
				// AQUI VA DEPENDER O PUEDEN SER LOS 10000 (MS) COMPLETOS O SI HUBO UNA PAUSA,
				// INDICARA LOS MILISEGUNDOS QUE FALTABAN PARA COMPLETAR LOS 10000 (MS)
				console.log(time_animate);

				Progress_Sec_Animate = 0;
				time_animate = 10000;

				BarProgress_animate();
			});	

		}

		$('.images-slider').mouseenter(function(){
			ImgSlider_unhover = 0;

			if (Autoplay_countClic == 1) {
				clearInterval(seconds_animate_interval);
				// LOS SEGUNDOS QUE PAUSASTES Y QUE AUMENTARAS AL CICLO COMPLETO DE "10 SEGUNDOS"
				console.log(Progress_Sec_Animate);
				time_animate = 10000 - (Progress_Sec_Animate * 1000);
				// NOTA
				// SI SALE "0" NO HAY PROBLEMA QUIERE DECIR QUE TOMO JUSTO EL MOMENTO
				// --> CUANDO TERMINO EL TIEMPO DE ANIMACION DEL ANIMATE
				// LOS MILISEGUNDOS QUE FALTA COMPLETAR EL CICLO DE "10000 MILISEGUNDOS"
				console.log(time_animate);

				$("#Bar-Progress").stop(true, false);

			}
	
		});
		$('.images-slider').mouseleave(function(){
			ImgSlider_unhover = 1;

			if (Autoplay_countClic == 1) {
				BarProgress_animate();
			}

		});

		$(window).blur(function(){
			clearInterval(seconds_animate_interval);
			// LOS SEGUNDOS QUE PAUSASTES Y QUE AUMENTARAS AL CICLO COMPLETO DE "10 SEGUNDOS"
			console.log(Progress_Sec_Animate);
			time_animate = 10000 - (Progress_Sec_Animate * 1000);
			// NOTA
			// SI SALE "0" NO HAY PROBLEMA QUIERE DECIR QUE TOMO JUSTO EL MOMENTO
			// --> CUANDO TERMINO EL TIEMPO DE ANIMACION DEL ANIMATE
			// LOS MILISEGUNDOS QUE FALTA COMPLETAR EL CICLO DE "10000 MILISEGUNDOS"
			console.log(time_animate);

			$("#Bar-Progress").stop(true, false);
			Wind_blur = 1;
			//console.log("blur")
			ProgressAni_Status = "pause";
		});
		$(window).focus(function(){
			if (Wind_blur == 1 && Counter_runTime == 0) {		
				if (ProgressAni_Status == "pause") {
					
					BarProgress_animate();
					Wind_blur = 0;
					console.log("focus");
					
				}
			}
		});
		$(window).mouseenter(function(){
			if (Wind_blur == 1 && Counter_runTime == 0) {
				if (ProgressAni_Status == "pause") {

					BarProgress_animate();
					Wind_blur = 0;
					console.log("hover");

				}
			}
		});

		//--------------- PROYECTO SLIDER DE IMAGENES Y BARRA DE PROGRESO ---------------


		var tiempo = { hora: 0, minuto: 0, segundo: 0 };

		function Tiempo_corriendo(){

			// Segundos
            tiempo.segundo++;

            if(tiempo.segundo >= 60)
            {
                tiempo.segundo = 0;
                tiempo.minuto++;
            }      

            // Minutos
            if(tiempo.minuto >= 60)
            {
                tiempo.minuto = 0;
                tiempo.hora++;
            }

            console.log(tiempo.segundo);
            console.log("Minutos: "+tiempo.minuto);
            console.log("Horas: "+tiempo.hora);

            // FUNCION ADICIONAL PARA LLEGAR A LOS 10 SEGUNDOS
            if (tiempo.segundo >=10 && ImgSlider_unhover == 1) 
            {	
            	clearInterval(Tiempo_corriendo_interval);
            	tiempo.segundo = 0;
            	Counter_runTime = 0;

            	BarProgress_animate();
            	Autoplay_countClic = 1;
            	ProgressAni_Status = "play";

            	$("#autoplay-icon").css('color','rgba(167, 24, 24, 0.95)');
            	$("#pause-icon").css('color','#ffffffc7');
            }

		}


		//--------------- PROYECTO ANIMACION O EFECTO REBOTE ---------------

		// INDICA SI SE ESTA EJECUTANDO LA FUNCION "ANIMACION_REBOTE" 
		var execution_rebote = 0;

		// FUNCION QUE SE EJECUTA JUNTO CON LAS FUNCIONES DE "MOUSEENTER" Y "MOUSELEAVE"
		function animacion_Rebote(elemento1, elemento2, elemento3) {

			execution_rebote = 1;

			// TE VA AH DEVOLVER EL OBJETO MATRIX
			// QUE SON LAS COMBINACIONES = SCALE SKEW TRANSLATE ROTATE
			// scaleX.rotate(), skewY.rotate(), skewX.rotate(), scaleY.rotate(), translateX(), translateY()
			let Elem_Transform_initial = elemento1.css('transform');
			//alert(Elem_Transform_initial);

			let Elem_bottom_initial = elemento1.css('bottom');

			// ELEMENTOS QUE VAMOS A ANIMAR "#AUTOPLAY-ICON" "#PAUSE-ICON"
			// IMPORTANTE : BOTTOM(5px)	, transition: all 0.5s ease
		  	elemento1.animate({
		  		bottom: '+=7'
		  	}, 50, function(){

		  		$(this).css('transform','rotate(60deg)');

		  		$(this).delay(200).animate({
		  			bottom: '-=7'
		  		}, 50, function(){

		  			$(this).delay(200).animate({
		  				bottom: '+=3'
		  			}, 50, function(){

		  				$(this).css('transform','rotate(-60deg)');

		  				$(this).delay(200).animate({
		  					bottom: '-=3'
		  				}, 50, function(){

  							if (elemento1.attr('id') == "pause-icon") {

  								if (Autoplay_countClic == 1) {
  									elemento1.css('color','#ffffffc7');
  									$("#autoplay-icon").css('color','color','rgba(167, 24, 24, 0.95)');
  								}else {
  									elemento1.css('color','color','rgba(167, 24, 24, 0.95)');
  									$("#autoplay-icon").css('color','#ffffffc7');
  								}
  								
  							}else
  							if(elemento1.attr('id') == "autoplay-icon"){

  								if (Autoplay_countClic == 1) {
  									elemento1.css('color','color','rgba(167, 24, 24, 0.95)');
  									$("#pause-icon").css('color','#ffffffc7');
  								}else {
  									elemento1.css('color','#ffffffc7');
  									$("#pause-icon").css('color','color','rgba(167, 24, 24, 0.95)');
  								}
  							}

  							// "#AUTOPLAY-ICON" "#PAUSE-ICON" : BOTTOM(5px)
  							// REGRESAMOS A SU POSICION ACTUAL
  							$(this).css('transform',Elem_Transform_initial);
  							$(this).css('bottom',Elem_bottom_initial);

  							execution_rebote = 0;

		  				});
		  			});
		  		});
		  	});

		}

		//--------------- PROYECTO ANIMACION O EFECTO REBOTE ---------------


	/*-------------------------------------------------------------------------------------------------------*/
	/*---------------------------------------- AL INICIO DEL DOCUMENTO --------------------------------------*/
	/*-------------------------------------------------------------------------------------------------------*/	

	// DOCUMENT READY SE EJECUTA CUANDO TODO EL CONTENIDO HTML ESTA LISTO
	// PERO ANTES DE LA CARGA DE IMAGENES Y OTROS RECURSOS

	$(document).ready(function(){

		BarProgress_animate();
		Autoplay_countClic = 1;

		Counter_runTime = 0;

	});

	/*-------------------------------------------------------------------------------------------------------*/
	/*------------------------------------------- FUNCIONES DIVERSAS ----------------------------------------*/
	/*-------------------------------------------------------------------------------------------------------*/

	$('#autoplay-icon').mouseenter(function(){

		if (Autoplay_countClic == 0) {

			$(this).css('color','rgb(245, 104, 50)');

			if ($(this).css('bottom') == '5px' && execution_rebote == 0) {
				animacion_Rebote($('#autoplay-icon'));
			}

		}

	});

	$('#pause-icon').mouseenter(function(){

		if (Autoplay_countClic == 1) {

			$(this).css('color','rgb(245, 104, 50)')

			if ($(this).css('bottom') == '5px' && execution_rebote == 0) {	
				animacion_Rebote($('#pause-icon'));
			}

		}

	});

	/*-------------------------------------------------------------------------------------------------------*/
	/*---------------------------------------- CONDICIONALES  CON CLICK -------------------------------------*/
	/*-------------------------------------------------------------------------------------------------------*/

	$("#siguiente-imagen").on('click',function(){

		$("#Bar-Progress").stop(true, false).css('width','0');
		Autoplay_countClic = 0;
		
		clearInterval(seconds_animate_interval);
		Progress_Sec_Animate = 0;
		time_animate = 10000;

		$(this).css('pointer-events','none');
		$("#imagen-anterior").css('pointer-events','none');
		$("#autoplay-icon").css('pointer-events','none');
		$("#pause-icon").css('pointer-events','none');

		$("#pause-icon").css('color','rgba(167, 24, 24, 0.95)');
		$("#autoplay-icon").css('color','#ffffffc7');

		$(".images-slider:nth-child(2)").animate({

			'margin-left':'-100%'

		},2000, function(){
			$("#slider_images-show").append($(".images-slider:first-child"));
			$(".images-slider:first-child").css('margin-left','initial');

			$("#siguiente-imagen").css('pointer-events','initial');
			$("#imagen-anterior").css('pointer-events','initial');
			$("#autoplay-icon").css('pointer-events','initial');
			$("#pause-icon").css('pointer-events','initial');
		});

		//----------------------- TIEMPO CORRIENDO -----------------------
		if (Counter_runTime == 0) {

			Tiempo_corriendo_interval = setInterval(Tiempo_corriendo,1000);
			Counter_runTime = 1;

		}else{
			clearInterval(Tiempo_corriendo_interval);
			tiempo.segundo = 0;
			Tiempo_corriendo_interval = setInterval(Tiempo_corriendo,1000);
		}
		//----------------------- TIEMPO CORRIENDO -----------------------

	});

	$("#imagen-anterior").on('click',function(){

		$("#Bar-Progress").stop(true, false).css('width','0');
		Autoplay_countClic = 0;

		clearInterval(seconds_animate_interval);
		Progress_Sec_Animate = 0;
		time_animate = 10000;

		$(this).css('pointer-events','none');
		$("#siguiente-imagen").css('pointer-events','none');
		$("#autoplay-icon").css('pointer-events','none');
		$("#pause-icon").css('pointer-events','none');

		$("#pause-icon").css('color','rgba(167, 24, 24, 0.95)');
		$("#autoplay-icon").css('color','#ffffffc7');

		$(".images-slider:nth-child(3)").css({'margin-left':'-300%'});
		$(".images-slider:nth-child(3)").animate({

			'margin-left':'-200%'

		},2000, function(){
			$("#slider_images-show").prepend($(".images-slider:last-child"));
			$(".images-slider:first-child").css({'margin-left':'initial'});

			$("#siguiente-imagen").css('pointer-events','initial');
			$("#imagen-anterior").css('pointer-events','initial');
			$("#autoplay-icon").css('pointer-events','initial');
			$("#pause-icon").css('pointer-events','initial');
		});

		//----------------------- TIEMPO CORRIENDO -----------------------
		if (Counter_runTime == 0) {

			Tiempo_corriendo_interval = setInterval(Tiempo_corriendo,1000);
			Counter_runTime = 1;

		}else{
			clearInterval(Tiempo_corriendo_interval);
			tiempo.segundo = 0;
			Tiempo_corriendo_interval = setInterval(Tiempo_corriendo,1000);
		}
		//----------------------- TIEMPO CORRIENDO -----------------------

	});

	$("#autoplay-icon").on('click',function(){

		// CONDICION PARA NO HACER CLIC VARIAS VECES EN EL ""AUTOPLAY""
		if (Autoplay_countClic == 0) {

			$(this).css('color','rgba(167, 24, 24, 0.95)');
			$("#pause-icon").css('color','#ffffffc7');

			BarProgress_animate();
			Autoplay_countClic = 1;

			clearInterval(Tiempo_corriendo_interval);
			tiempo.segundo = 0;
			Counter_runTime = 0;

		}

	});

	$("#pause-icon").on('click',function(){

		// CONDICION PARA NO HACER CLIC VARIAS VECES EN EL ""PAUSE""
		if (Autoplay_countClic == 1) {

			$(this).css('color','rgba(167, 24, 24, 0.95)');
			$("#autoplay-icon").css('color','#ffffffc7');

			$("#Bar-Progress").stop(true, false).css('width','0');
			Autoplay_countClic = 0;

			clearInterval(seconds_animate_interval);
			Progress_Sec_Animate = 0;
			time_animate = 10000;

			//----------------------- TIEMPO CORRIENDO -----------------------
			if (Counter_runTime == 0) {

				Tiempo_corriendo_interval = setInterval(Tiempo_corriendo,1000);
				Counter_runTime = 1;

			}
			//----------------------- TIEMPO CORRIENDO -----------------------

		}

	});
