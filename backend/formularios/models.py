from django.db import models

class Formulario(models.Model):
    titulo = models.CharField(max_length=100, verbose_name="Nombre")
    fecha = models.DateField(verbose_name="Fecha")
    rut = models.CharField(max_length=10, unique=True, verbose_name="RUT")
    correo = models.EmailField(unique=True, verbose_name="Correo Electrónico")
    localizacion = models.CharField(max_length=100, verbose_name="Localización")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de Actualización")

    class Meta:
        verbose_name = 'Formulario'
        verbose_name_plural = 'Formularios'
        ordering = ['titulo']

    def __str__(self):
        return f"{self.titulo} {self.rut}"