const fs = require("fs");
const path = require("path");

// 📂 Carpeta raíz donde están los JSON
const carpetaRaiz = "C:/Users/Elli0t/aumentodeseguidores/public/data";

// 🧠 Multiplica los precios en texto ("$25.50 por 1" → "$51.00 por 1")
function multiplicarPreciosEnTexto(texto) {
  return texto.replace(/\$(\d+(\.\d+)?)\s*por\s*(\d+)/gi, (match, num, _, cantidad) => {
    const nuevo = parseFloat(num) * 2;
    return `$${Number.isInteger(nuevo) ? nuevo : nuevo.toFixed(2)} por ${cantidad}`;
  });
}

// 🔄 Recorre un objeto y multiplica keys, valores y pricePerUnit
function recorrerYActualizar(obj) {
  const nuevasEntradas = {};

  for (let key in obj) {
    const val = obj[key];
    const nuevaKey = multiplicarPreciosEnTexto(key); // cambia el texto del nombre si tiene precio

    if (typeof val === "object" && val !== null) {
      nuevasEntradas[nuevaKey] = recorrerYActualizar(val);
    } else if (key === "pricePerUnit") {
      nuevasEntradas[key] = val * 2;
    } else if (typeof val === "string") {
      nuevasEntradas[key] = multiplicarPreciosEnTexto(val);
    } else {
      nuevasEntradas[key] = val;
    }
  }

  return nuevasEntradas;
}

// 🧰 Procesa un archivo JSON individual
function procesarArchivo(rutaArchivo) {
  try {
    const contenido = fs.readFileSync(rutaArchivo, "utf8");
    const data = JSON.parse(contenido);

    // Crear copia .bak
    const respaldo = `${rutaArchivo}.bak`;
    fs.writeFileSync(respaldo, contenido);
    console.log(`📦 Copia de respaldo creada: ${path.basename(respaldo)}`);

    // Actualizar contenido
    const actualizado = recorrerYActualizar(data);

    // Guardar JSON actualizado
    fs.writeFileSync(rutaArchivo, JSON.stringify(actualizado, null, 2), "utf8");
    console.log(`✅ Archivo actualizado: ${rutaArchivo}\n`);
  } catch (error) {
    console.error(`❌ Error procesando ${rutaArchivo}:`, error.message);
  }
}

// 📁 Busca todos los JSON recursivamente
function obtenerArchivosJSON(directorio) {
  let archivos = [];
  const elementos = fs.readdirSync(directorio, { withFileTypes: true });

  for (const elemento of elementos) {
    const ruta = path.join(directorio, elemento.name);
    if (elemento.isDirectory()) {
      archivos = archivos.concat(obtenerArchivosJSON(ruta)); // busca dentro
    } else if (elemento.isFile() && ruta.endsWith(".json")) {
      archivos.push(ruta);
    }
  }

  return archivos;
}

// 🚀 Inicio
(function main() {
  if (!fs.existsSync(carpetaRaiz)) {
    console.log(`❌ No existe la carpeta: ${carpetaRaiz}`);
    return;
  }

  const archivos = obtenerArchivosJSON(carpetaRaiz);

  if (archivos.length === 0) {
    console.log("⚠️ No se encontraron archivos JSON en ninguna subcarpeta.");
    return;
  }

  console.log(`🔍 Se encontraron ${archivos.length} archivos JSON.\n`);
  archivos.forEach((ruta) => procesarArchivo(ruta));
  console.log("🎯 Proceso completado con éxito.");
})();
