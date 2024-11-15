from django.shortcuts import render

from rest_framework import viewsets
from .models import Formulario

class FormularioView(viewsets.ModelViewSet):
    queryset = Formulario.objects.all()

    