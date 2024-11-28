from django.db import models

class Rol(models.Model):
    nombre = models.CharField(max_length=50, verbose_name="Nombre del Rol")

    class Meta:
        verbose_name = 'Rol'
        verbose_name_plural = 'Roles'
        ordering = ['nombre']

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    apellido = models.CharField(max_length=100, verbose_name="Apellido")
    fecha_nacimiento = models.DateField(verbose_name="Fecha de Nacimiento")
    run = models.CharField(max_length=10, unique=True, verbose_name="RUN")
    correo = models.EmailField(unique=True, verbose_name="Correo Electrónico")
    contraseña = models.CharField(max_length=128, verbose_name="Contraseña")
    rol = models.CharField(max_length=100, verbose_name="Rol")
    first_session = models.CharField(max_length = 5, default='Si')
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de Actualización")

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} - {self.apellido}" 

class TipoFormulario(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    
    class Meta: 
        verbose_name = 'Tipo de Formulario'
        verbose_name_plural = 'Tipos de Formularios'
        ordering = ['nombre']
    
    def __str__(self):
        return self.nombre


class Incidencias(models.Model):
    tipo = models.ForeignKey(TipoFormulario, on_delete=models.CASCADE, verbose_name="Tipo de Formulario")
    titulo = models.CharField(max_length=100, verbose_name="Nombre")
    fecha = models.DateField(verbose_name="Fecha")
    localizacion = models.CharField(max_length=100, verbose_name="Localización")
    gravedad = models.CharField(max_length=100, verbose_name="Nivel de gravedad")
    descripcion = models.TextField(verbose_name="Descripción")
    imagenes = models.ImageField(upload_to='imagenes/', verbose_name="Imágenes", blank=True, null=True)
    estado = models.CharField(max_length=100, default='Sin iniciar', verbose_name="Estado")
    gestor = models.ForeignKey('Usuario', on_delete=models.CASCADE, verbose_name="Gestor territorial")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de Actualización")
    
    class Meta:
        verbose_name = 'Incidencia'
        verbose_name_plural = 'Incidencias'
        ordering = ['titulo']
    
    def __str__(self):
        return self.titulo


class Cuadrillas(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    area_trabajo = models.CharField(max_length=100, verbose_name="Área de Trabajo")
    estado = models.CharField(max_length=100, default='Activo', verbose_name="Estado")
    
    class Meta:
        verbose_name = 'Cuadrilla'
        verbose_name_plural = 'Cuadrillas'
        ordering = ['nombre']
    
    def __str__(self):
        return f"{self.nombre} - {self.area_trabajo}"  # Devuelve una cadena


class Tareas(models.Model):
    cuadrilla = models.ForeignKey(Cuadrillas, on_delete=models.CASCADE, verbose_name="Cuadrilla")
    titulo = models.CharField(max_length=100, verbose_name="Nombre")
    descripcion = models.TextField(verbose_name="Descripción")
    estado = models.CharField(max_length=100, default='Sin iniciar', verbose_name="Estado")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de Actualización")
    incidencia = models.CharField(max_length=200,verbose_name="id incidencia")
    
    class Meta:
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'
        ordering = ['titulo']
    
    def __str__(self):
        return self.titulo


class IntegranteCuadrilla(models.Model):
    cuadrilla = models.ForeignKey(Cuadrillas, on_delete=models.CASCADE, verbose_name="Cuadrilla")
    usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE, verbose_name="Usuario")
    
    class Meta:
        verbose_name = 'Integrante de Cuadrilla'
        verbose_name_plural = 'Integrantes de Cuadrillas'
        ordering = ['cuadrilla']
    
    def __str__(self):
        return f"{self.usuario} - {self.cuadrilla.nombre}"  # Devuelve una cadena descriptiva

class Tickets(models.Model):
    usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE, verbose_name="Usuario")
    tipo = models.CharField(max_length=100, verbose_name="Tipo de Ticket")
    descripcion = models.TextField(verbose_name="Descripción")
    estado = models.CharField(max_length=100, default='Abierto', verbose_name="Estado")
    urgencia = models.CharField(max_length=100, default='Baja', verbose_name="Urgencia")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de Actualización")
    
    class Meta:
        verbose_name = 'Ticket'
        verbose_name_plural = 'Tickets'
        ordering = ['tipo']
    
    def __str__(self):
        return self.tipo