# NormalGest

NormalGest es una aplicación sencilla para la gestión de pagos semanales de alumnos, diseñada para facilitar el registro de recaudaciones y generar reportes en formato PDF. Ideal para administradores de pequeños grupos que necesitan un seguimiento claro y eficiente.

## Características
- Registro de pagos semanales por alumno.
- Generación automática de reportes en PDF con la opción de exportar.
- Interfaz sencilla y fácil de usar.
- Diseño adaptado para escritorio y dispositivos móviles.

## Requisitos

- Navegador web moderno.
- Editor de texto para hacer cambios (opcional).

## Instalación

Sigue estos pasos para clonar e iniciar el proyecto localmente:

```bash
# Clona el repositorio en tu máquina local
git clone https://github.com/theguzmantcher/NormalGest.git
```
```bash
# Entra en el directorio del proyecto
cd NormalGest
```
```bash
# Abre el archivo index.html en tu navegador
open index.html
```
## Uso

### 1. Registro de Pagos
- **Ingresa los datos del administrador**: nombre, grado, grupo, licenciatura, y mes.
- **Agrega los nombres de los alumnos**: Usa el formulario para agregar los nombres de los alumnos que harán los pagos.
- **Selecciona los pagos realizados por semana**: Marca las casillas correspondientes para indicar los pagos que se han hecho.
- **Visualiza los totales**: La tabla de pagos mostrará los totales recaudados por semana y por alumno.

### 2. Generación de Reportes
- **Exportar PDF**: Haz clic en el botón **"Exportar PDF"** para generar un reporte de los pagos en formato PDF.
- El **PDF generado** incluirá:
  - Nombres de los alumnos.
  - Semanas en las que se ha pagado.
  - El total recaudado por cada alumno.
  - Total general de la recaudación semanal.

## Funcionalidades Clave

- **Agregar Alumno**: Permite ingresar el nombre de un alumno y agregarlo a la lista de pagos.
- **Eliminar Alumno**: Permite eliminar un alumno de la lista si ya no es necesario seguir su registro.
- **Generar Reporte**: Genera un informe en PDF con todos los pagos registrados hasta el momento.
- **Interfaz Responsive**: Adaptable tanto para uso en ordenadores como en dispositivos móviles.

## Contribuir

Si deseas contribuir a este proyecto, puedes seguir los pasos a continuación:

```bash
# Crea una nueva rama para tu funcionalidad
git checkout -b nueva-funcionalidad

# Agrega tus cambios
git add .

# Confirma tus cambios
git commit -m "Agrega nueva funcionalidad"

# Sube los cambios a tu repositorio
git push origin nueva-funcionalidad

# Crea un Pull Request en GitHub
