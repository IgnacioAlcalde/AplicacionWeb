from rest_framework import serializers
from .models import *

class FormularioSerializer(serializers.Serializer):
    titulo = serializers.CharField(max_length=100)
    tipoFormulario = serializers.CharField(max_length=100)
    fecha = serializers.DateField()
    localizacion = serializers.CharField(max_length=255)
    gravedad = serializers.ChoiceField(choices=['Baja', 'Media', 'Alta'])
    descripcion = serializers.CharField(max_length = 200)
    estado = serializers.ChoiceField(choices=['Sin iniciar', 'En progeso', 'Finalizado'])
    imagen_url = serializers.URLField()
    run = serializers.CharField(max_length=10)
    correo = serializers.EmailField()