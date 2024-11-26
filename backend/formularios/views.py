from django.shortcuts import render,redirect
from django.http import JsonResponse
from backend.mongo.mongodb import MONGO_DB
import os
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bson import ObjectId  

class FormularioAPI(APIView):
    def get(self, request):
        formularios = list(MONGO_DB['formularios'].find())

        # Convertir ObjectId a string
        for formulario in formularios:
            formulario['_id'] = str(formulario['_id'])

        return Response(formularios)

    def post(self, request):
        try:
            # Obtener datos del formulario
            titulo = request.data.get('titulo')
            tipoFormulario = request.data.get('tipoFormulario')
            fecha = request.data.get('fecha')
            localizacion = request.data.get('localizacion')
            gravedad = request.data.get('gravedad')
            descripcion = request.data.get('descripcion')
            estado = request.data.get('estado')
            imagen = request.FILES.get('imagen')
            run = request.data.get('run')
            correo = request.data.get('correo')

            # Si hay imagen, guardar en el sistema de archivos
            file_url = None
            if imagen:
                fs = FileSystemStorage()
                filename = fs.save(imagen.name, imagen)
                file_url = fs.url(filename)
                # Crear la URL completa solo si hay imagen
                full_url = f'http://127.0.0.1:8000{file_url}'
            else:
                full_url = None  

            # Insertar los datos en MongoDB
            data = {
                "titulo": titulo,
                "tipoFormulario": tipoFormulario,
                "fecha": fecha,
                "localizacion": localizacion,
                "gravedad": gravedad,
                "descripcion":descripcion,
                "estado":estado,
                "imagen_url": full_url,
                "run": run,
                "correo": correo
            }
            MONGO_DB['formularios'].insert_one(data)
            return Response({"message": "Formulario agregado correctamente", "file_url": full_url}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FormularioDetalleAPI(APIView):
    def get(self, request, id):
        try:
            # Convertir el id de string a ObjectId
            formulario_id = ObjectId(id)
            formulario = MONGO_DB['formularios'].find_one({"_id": formulario_id})

            if formulario:
                formulario['_id'] = str(formulario['_id'])  # Convertir ObjectId a string antes de enviarlo
                return Response(formulario)
            return Response({"message": "Formulario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
