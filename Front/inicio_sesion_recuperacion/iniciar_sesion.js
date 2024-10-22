//USUARIOS

//USUARIO 1 (ADMIN)
correo_ADMIN = 'admin@correo.com'
clave_ADMIN = 'admin'

//USUARIO 2 (DIRECTOR MUNICIPALIDAD)
correo_DireMuni = 'dire_muni@correo.com'
clave_DireMuni = 'dire_muni'

//USUARIO 3 (DIRECTOR OBRA)
correo_DireObra = 'dire_obra@correo.com'
clave_DireObra = 'dire_obra'

//USUARIO 4 (GESTOR TERRITORIAL)
correo_Gestor = 'gestor@correo.com'
clave_Gestor = 'gestor'

//USUARIO 5 (CUADRILLAS)
correo_Cuadrillas = 'cuadrillas@correo.com'
clave_Cuadrillas = 'cuadrillas'

lista = [correo_ADMIN,correo_DireMuni,correo_DireObra,correo_Gestor,correo_Cuadrillas]

formulario = document.getElementById('formulario_iniciar')

function iniciarsesion(e){
    e.preventDefault();
    correo = document.getElementById('email').value
    clave = document.getElementById('password').value
    
    //Validar que el correo ingresado es un usuario
    if(lista.includes(correo)){
        console.log('Siesta')

        //SI ES ADMIN
        if(correo == correo_ADMIN && clave == clave_ADMIN){
            window.location.href ='../inicioadmin_dashboard.html'
        }

        //SI ES DIRECTOR MUNI
        if(correo == correo_DireMuni && clave == clave_DireMuni){
            window.location.href ='../paginas_etc/DirectorMuni/iniciodirector_dashboard.html'
        }

        //SI ES DIRECTOR OBRA
        if(correo == correo_DireObra && clave == clave_DireObra){
            window.location.href ='../paginas_etc/DirectorObras/iniciodireobra_dashboard.html'
        }

        //SI ES GESTOR TERRITORIAL ../paginas_etc/GestorTerritorial/GestorTerrit1
        if(correo == correo_Gestor && clave == clave_Gestor){
            window.location.href ='../paginas_etc/GestorTerritorial/GestorTerrit1.html'
        }

        //SI ES CUADRILLAS
        if(correo == correo_Cuadrillas && clave == clave_Cuadrillas){
            window.location.href ='../paginas_etc/Resolutores/inicioresolutor_dashboard.html'
        }

    }else{
        console.log('noesta')
        
    }

}