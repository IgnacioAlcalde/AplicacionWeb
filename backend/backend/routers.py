#Direcciona las operaciones de lectura de la aplicación 'formularios' a MongoDB.
class MongoRouter:
    def db_for_read(self, model, **hints):

        if model._meta.app_label == 'formularios':
            return 'mongo'  # La base de datos configurada para MongoDB en settings.py
        return 'default'  # La base de datos principal (PostgreSQL) para las demás apps

#Direcciona las operaciones de escritura de la aplicación 'formularios' a MongoDB.
    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'formularios':
            return 'mongo'
        return 'default'

#Controla si Django debe permitir migraciones en una base de datos específica.
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'formularios':
            # Solo permite migraciones de 'formularios' en MongoDB
            return db == 'mongo'
        # Para todas las demás apps, permite migraciones solo en PostgreSQL
        return db == 'default'
