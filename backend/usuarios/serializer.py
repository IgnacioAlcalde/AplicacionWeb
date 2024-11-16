from rest_framework import serializers
from .models import *

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['nombre']

class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = [
            'id', 
            'nombre', 
            'apellido', 
            'fecha_nacimiento', 
            'run', 
            'correo', 
            'contraseña', 
            'rol', 
            'first_session', 
            'created', 
            'updated'
        ]
        read_only_fields = ['created', 'updated']  # Marcar como solo lectura si se necesita

    def create(self, validated_data):
        nombre = validated_data.pop('rol')  # Obtener el nombre del rol directamente
        # Asignar el nombre del rol a la instancia de usuario
        validated_data['rol'] = nombre  # Guardar el nombre del rol en lugar del objeto

        # Crear el usuario
        usuario = Usuario.objects.create(**validated_data)
        return usuario

    def update(self, instance, validated_data):
        nombre = validated_data.pop('rol', None)
        if nombre:
            instance.rol = nombre  # Asigna directamente el nombre del rol

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
    

class TipoFormularioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoFormulario
        fields = '__all__'  # Incluye todos los campos del modelo

class IncidenciasSerializer(serializers.ModelSerializer):
    tipo_nombre = serializers.CharField(source='tipo.nombre', read_only=True)  # Campo adicional para mostrar el nombre del tipo
    gestor_nombre = serializers.CharField(source='gestor.nombre', read_only=True)  # Campo adicional para mostrar el nombre del gestor

    class Meta:
        model = Incidencias
        fields = '__all__'

class CuadrillasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuadrillas
        fields = '__all__'

class TareasSerializer(serializers.ModelSerializer):
    incidencia_titulo = serializers.CharField(source='incidencia.titulo', read_only=True)  # Campo adicional para mostrar el título de la incidencia
    cuadrilla_nombre = serializers.CharField(source='cuadrilla.nombre', read_only=True)  # Campo adicional para mostrar el nombre de la cuadrilla

    class Meta:
        model = Tareas
        fields = '__all__'

class IntegranteCuadrillaSerializer(serializers.ModelSerializer):
    cuadrilla_nombre = serializers.CharField(source='cuadrilla.nombre', read_only=True)  # Campo adicional para mostrar el nombre de la cuadrilla
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)  # Campo adicional para mostrar el nombre del usuario

    class Meta:
        model = IntegranteCuadrilla
        fields = '__all__'
