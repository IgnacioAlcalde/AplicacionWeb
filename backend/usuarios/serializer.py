from rest_framework import serializers
from .models import Usuario, Rol

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['nombre_rol']

class UsuarioSerializer(serializers.ModelSerializer):
    rol = RolSerializer()  # Para incluir el detalle del rol en la representación del usuario

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
        # Extrae el rol de validated_data
        rol_data = validated_data.pop('rol')
        # Crea el rol si no existe
        rol, created = Rol.objects.get_or_create(**rol_data)
        # Crea el usuario y asigna el rol
        usuario = Usuario.objects.create(rol=rol, **validated_data)
        return usuario

    def update(self, instance, validated_data):
        rol_data = validated_data.pop('rol', None)
        if rol_data:
            rol, created = Rol.objects.get_or_create(**rol_data)
            instance.rol = rol

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
