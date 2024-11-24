from django.urls import path, include
from rest_framework import routers
from usuarios import views
from rest_framework.documentation import include_docs_urls

# Configuración del router
router = routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioView, 'usuarios')  # Registra la vista de usuarios
router.register(r'roles', views.RolView, 'roles')  # Registra la vista de roles
router.register(r'cuadrillas', views.CuadrillaView, 'cuadrillas')
router.register(r'integrantescuadrillas', views.IntegranteCuadrillaView, 'integrantescuadrillas')
router.register(r'tareas', views.TareasView, 'tareas')
router.register(r'incidencias', views.IncidenciasView, 'incidencias')
router.register(r'tiposformulario', views.TipoFormularioView, 'tiposformulario')
router.register(r'tickets', views.TicketsView, 'tickets')

# Rutas de la app usuarios
urlpatterns = [
    path('', include(router.urls)),  # Incluye todas las rutas del router
    path('docs/', include_docs_urls(title='Usuarios API')),  # Documentación opcional}
    path('api/auth/login/', views.login, name='login')
]
