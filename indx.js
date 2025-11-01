const fs = require('fs');
const path = require('path');

function readServices(dir) {
  const files = fs.readdirSync(dir);
  const result = {};
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      result[file] = readServices(fullPath);
    } else if (file.endsWith('.json')) {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      const key = file.replace('.json', '');
      result[key] = data;
    }
  });
  return result;
}

const dataDir = path.join(__dirname, 'public/data');
const servicesData = {};
const platforms = fs.readdirSync(dataDir);

platforms.forEach(platform => {
  const platformDir = path.join(dataDir, platform);

  // 👉 Si no es un directorio, lo saltamos
  if (!fs.statSync(platformDir).isDirectory()) {
    console.log(`⏭️  Saltando archivo: ${platform}`);
    return;
  }

  servicesData[platform] = { icon: platform, categories: {} };
  const categories = fs.readdirSync(platformDir);

  categories.forEach(category => {
    const categoryDir = path.join(platformDir, category);

    // también verificamos aquí
    if (!fs.statSync(categoryDir).isDirectory()) {
      console.log(`⏭️  Saltando archivo: ${category}`);
      return;
    }

    servicesData[platform].categories[category] = { subCategories: {} };
    const subCategories = fs.readdirSync(categoryDir);

    subCategories.forEach(subCategory => {
      const subCategoryDir = path.join(categoryDir, subCategory);

      if (fs.statSync(subCategoryDir).isDirectory()) {
        const types = {};
        const typeFiles = fs.readdirSync(subCategoryDir);
        typeFiles.forEach(file => {
          if (file.endsWith('.json')) {
            const data = JSON.parse(fs.readFileSync(path.join(subCategoryDir, file), 'utf8'));
            Object.assign(types, data);
          }
        });
        servicesData[platform].categories[category].subCategories[subCategory] = { types };
      }
    });
  });
});

fs.writeFileSync(
  path.join(__dirname, 'public/services-index.json'),
  JSON.stringify(servicesData, null, 2)
);

console.log('✅ services-index.json generado con éxito');
