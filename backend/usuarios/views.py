from django.shortcuts import render
from rest_framework import viewsets
from .serializer import UsuarioSerializer, RolSerializer
from .models import Usuario, Rol

# Create your views here.
class RolView(viewsets.ModelViewSet):
    serializer_class = RolSerializer
    queryset = Rol.objects.all()
class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
    