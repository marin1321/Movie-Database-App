# Movie Database Application

## Descripción
Una aplicación para gestionar una base de datos de películas, clasificar películas por diferentes criterios, y crear playlists para navegar entre ellas.

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/marin1321/Movie-Database-App.git
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Corre el servidor:
    ```bash
    npm start
    ```

# Movie Database API

## Endpoints

### 1. `/movies/popularity`
- **Descripción**: Devuelve una lista de películas ordenadas por popularidad.
- **Método**: `GET`
- **Parámetros**:
  - `page` (opcional, predeterminado: 1): El número de página que se desea obtener.
  - `limit` (opcional, predeterminado: 10): El número de películas por página.
- **Ejemplo**: GET /movies/popularity?page=2&limit=5

### 2. `/movies/year`
- **Descripción**: Devuelve una lista de películas ordenadas por año.
- **Método**: `GET`
- **Parámetros**:
- `order` (opcional): El orden de las películas, puede ser `asc` o `desc` (predeterminado: `asc`).
- `page` (opcional, predeterminado: 1): El número de página que se desea obtener.
- `limit` (opcional, predeterminado: 10): El número de películas por página.
- **Ejemplo**:GET /movies/year?order=desc&page=1&limit=5

### 3. `/movies/similar`
- **Descripción**: Devuelve una lista de películas similares a la película proporcionada.
- **Método**: `GET`
- **Parámetros**:
- `title` (obligatorio): El título de la película.
- `page` (opcional, predeterminado: 1): El número de página que se desea obtener.
- `limit` (opcional, predeterminado: 10): El número de películas similares por página.
- **Ejemplo**:GET /movies/similar?title=Upgradable%20dynamic%20moratorium&page=1&limit=5

### 4. `/playlist/popularity`
- **Descripción**: Crea una lista de reproducción basada en la popularidad de las películas.
- **Método**: `POST`
- **Cuerpo**:
- No requiere cuerpo.
- **Ejemplo**:POST /playlist/popularity

### 5. `/playlist/year`
- **Descripción**: Crea una lista de reproducción basada en el año de las películas.
- **Método**: `POST`
- **Cuerpo**:
- No requiere cuerpo.
- **Ejemplo**:POST /playlist/year

### 6. `/playlist/current`
- **Descripción**: Devuelve la película actual en la lista de reproducción.
- **Método**: `GET`
- **Ejemplo**:GET /playlist/current

### 7. `/playlist/next`
- **Descripción**: Devuelve la siguiente película en la lista de reproducción.
- **Método**: `GET`
- **Ejemplo**:GET /playlist/next

### 8. `/playlist/previous`
- **Descripción**: Devuelve la película anterior en la lista de reproducción.
- **Método**: `GET`
- **Ejemplo**:GET /playlist/previous

### 9. `/playlist/reset`
- **Descripción**: Reinicia la lista de reproducción.
- **Método**: `POST`
- **Cuerpo**:
- No requiere cuerpo.
- **Ejemplo**:POST /playlist/reset

## Pruebas

Las pruebas unitarias se pueden ejecutar con Jest:
```bash
npm test
