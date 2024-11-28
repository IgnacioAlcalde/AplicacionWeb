# AplicacionWeb

Para empezar con react es necesario abrir una consola y dirigirse a la carpeta "aplicacion"
si es primera vez que lo corres es necesario usar el comando "npm install"(mientras estas en la carpeta aplicacion), despues instalar lo sgte "npm install react-router-dom react-hot-toast react-hook-form react-icons axios bootstrap leaflet chart.js react-chartjs-2"
Una vez esté todo instalado para iniciar es necesario usar el comando "npm run dev" y desde ahí abrir la pagina presionando "http://localhost:5173/" con click+Ctrl

# AplicacionWeb

Este proyecto combina **React** para el frontend y **Django** como backend. Utiliza **Miniconda** para la gestión del entorno virtual y un archivo `requirements.txt` para instalar las librerías necesarias del backend.

### Pasos para configurar y ejecutar:

#### **Entorno**

1. Asegúrate de tener **Miniconda** instalado en tu sistema.
2. Crea un entorno virtual con `conda create -n <nombre_entorno> python=3.11>`.
3. Activa el entorno con `conda activate <nombre_entorno>`.
4. Instala las dependencias del proyecto con:

   - pip install -r requirements.txt

#### **Frontend - React**

1. Abre una consola y dirígete a la carpeta `aplicacion`.
2. Si es la primera vez, instala las dependencias con `npm install` (mientras estas en la carpeta aplicacion).
3. Instala las librerías adicionales necesarias con :
   - `npm install react-router-dom react-hot-toast react-hook-form react-icons axios bootstrap leaflet chart.js react-chartjs-2`
4. Inicia el servidor de desarrollo con el comando `npm run dev` y abrir la pagina presionando `http://localhost:5173/` con click+Ctrl.

#### **Backend - Django**

1. Crear una base de datos en postgreSQL
2. Editar el archivo settings.py en "DATABASES" agregar los datos faltantes, con los correspondientes de su base de datos
3. Abre una consola y dirígete a la carpeta `backend`
4. Corre el servidor de Django con el comando:
   - python manage.py makemigrations
   - python manage.py migrate 
   - python manage.py runserver
5. Insertar los datos de "DatosUsuarios.sql" en su base de datos para tener los usuarios iniciales
6. Puedes acceder al backend desde el enlace que aparece en la consola (por defecto: `http://127.0.0.1:8000/`).
