from django.urls import path, include
from rest_framework import routers
from usuarios import views
from rest_framework.documentation import include_docs_urls
router = routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioView, 'usuarios')
router.register(r'roles', views.RolView, 'roles')  # Agrega RolView
urlpatterns = [
    path('', include(router.urls)),
    path('docs/', include_docs_urls(title='Usuarios API'))
]
