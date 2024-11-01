from django.db import models

class Rol(models.Model):
    nombre_rol = models.CharField(max_length=50, verbose_name="Nombre del Rol")

    class Meta:
        verbose_name = 'Rol'
        verbose_name_plural = 'Roles'

    def __str__(self):
        return self.nombre_rol

class Usuario(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    apellido = models.CharField(max_length=100, verbose_name="Apellido")
    fecha_nacimiento = models.DateField(verbose_name="Fecha de Nacimiento")
    run = models.CharField(max_length=10, unique=True, verbose_name="RUN")
    correo = models.EmailField(unique=True, verbose_name="Correo Electrónico")
    contraseña = models.CharField(max_length=128, verbose_name="Contraseña")
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, verbose_name="Rol")
    first_session = models.CharField(max_length = 240,null=True, blank=True, default='Si')
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de Actualización")

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
