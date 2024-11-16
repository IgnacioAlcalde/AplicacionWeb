from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .serializer import *
from .models import *

# ViewSets para manejar CRUD de Usuario y Rol
class RolView(viewsets.ModelViewSet):
    serializer_class = RolSerializer
    queryset = Rol.objects.all()


class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class TipoFormularioView(viewsets.ModelViewSet):
    serializer_class = TipoFormularioSerializer
    queryset = TipoFormulario.objects.all()

class IncidenciasView(viewsets.ModelViewSet):
    serializer_class = IncidenciasSerializer
    queryset = Incidencias.objects.all()
    
class CuadrillaView(viewsets.ModelViewSet):
    serializer_class = CuadrillasSerializer
    queryset = Cuadrillas.objects.all()

class TareasView(viewsets.ModelViewSet):
    serializer_class = TareasSerializer
    queryset = Tareas.objects.all()
class IntegranteCuadrillaView(viewsets.ModelViewSet):    
    serializer_class = IntegranteCuadrillaSerializer
    queryset = IntegranteCuadrilla.objects.all()
    

# Vista para manejo de login
@api_view(['POST'])
def login(request):
    """
    Vista para autenticar a un usuario basado en correo y contraseña.
    """
    data = request.data  # Obtiene los datos enviados en el cuerpo de la solicitud
    correo = data.get('correo')
    contraseña = data.get('contraseña')

    try:
        # Buscar el usuario por correo
        usuario = Usuario.objects.get(correo=correo)

        # Verificar si la contraseña coincide (texto plano en tu caso)
        if usuario.contraseña == contraseña:  # Cambia 'clave' si tu modelo tiene un campo distinto para contraseña
            # Retorna éxito y rol del usuario
            return JsonResponse({
                'success': True,
                'rol': usuario.rol,  # Ajusta si tu relación de rol es distinta
                'redirect_url': obtener_url_por_rol(usuario.rol)  # Define la URL de redirección según el rol
            })

        # Si la contraseña no coincide
        return JsonResponse({'success': False, 'error': 'Contraseña incorrecta'}, status=401)

    except Usuario.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Usuario no encontrado'}, status=404)


def obtener_url_por_rol(rol_nombre):
    """
    Devuelve la URL de redirección basada en el rol del usuario.
    """
    rutas = {
        'Administrador': '/director-municipalidad/inicio',
        'Director municipalidad': '/director-municipalidad/inicio',
        'Director de obras': '/director-obra/inicio',
        'Gestor territorial': '/gestor-territorial/inicio',
        'Cuadrilla': '/cuadrilla/inicio',
    }
    return rutas.get(rol_nombre, '/')
