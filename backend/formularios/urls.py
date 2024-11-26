from django.urls import path,include
from formularios import views
from .views import FormularioAPI,FormularioDetalleAPI
from django.conf import settings
from django.conf.urls.static import static

formularioss_url_patterns = [
    path('api/formularios/', FormularioAPI.as_view(), name='formulario_api'),
    path('api/formularios/<str:id>/', FormularioDetalleAPI.as_view(), name='formulario_detalle'),  
    

]
if settings.DEBUG:  # Solo en desarrollo
    formularioss_url_patterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
