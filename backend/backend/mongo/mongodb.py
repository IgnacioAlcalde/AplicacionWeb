from pymongo.mongo_client import MongoClient

url = "mongodb+srv://Franciscomunoz:holamundo123@clusterprueba.t81pg.mongodb.net/?retryWrites=true&w=majority&appName=clusterprueba"



try:
    # Crear conexión con MongoDB
    conexion = MongoClient(url)

    # Intentar obtener una lista de bases de datos para verificar la conexión
    conexion.admin.command('ping')
    print("Conexión exitosa a MongoDB!")

    # Selección de la base de datos
    MONGO_DB = conexion['urban_sensor']

except ConnectionError as e:
    print(f"Error de conexión: {e}")
except Exception as e:
    print(f"Hubo un error inesperado: {e}")