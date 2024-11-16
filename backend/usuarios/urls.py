from django.urls import path, include
from rest_framework import routers
from usuarios import views
from rest_framework.documentation import include_docs_urls

# Configuración del router
router = routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioView, 'usuarios')  # Registra la vista de usuarios
router.register(r'roles', views.RolView, 'roles')  # Registra la vista de roles

# Rutas de la app usuarios
urlpatterns = [
    path('', include(router.urls)),  # Incluye todas las rutas del router
    path('docs/', include_docs_urls(title='Usuarios API'))  # Documentación opcional
]
