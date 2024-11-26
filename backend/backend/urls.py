from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from formularios.urls import formularioss_url_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('usuarios.urls')),
    path("formularios/",include(formularioss_url_patterns))

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)