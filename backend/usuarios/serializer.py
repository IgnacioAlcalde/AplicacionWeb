from rest_framework import serializers
from .models import Usuario, Rol

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
            #'contraseña', 
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