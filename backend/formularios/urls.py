from django.urls import path, include
from rest_framework import routers
from formularios import views
from rest_framework.documentation import include_docs_urls
router = routers.DefaultRouter()
router.register(r'formularios', views.UsuarioView, 'formularios')
urlpatterns = [
    path('', include(router.urls)),
    path('docs/', include_docs_urls(title='Formularios API'))
]
