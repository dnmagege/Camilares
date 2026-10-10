const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const sharp = require('sharp')

const projectRoot = path.resolve(__dirname, '..')
const sourceRoot = path.join(projectRoot, 'private-media', 'camila-review', 'categories')
const heroSourceDirectory = path.join(projectRoot, 'private-media', 'camila-review', 'hero')
const logoSourceFile = path.join(projectRoot, 'private-media', 'camila-review', 'Logo', 'CamilaRavelleAlpha.png')
const publicRoot = path.join(projectRoot, 'public', 'camila')
const logoOutputName = 'camila-ravelle-logo.png'
const heroManifestFile = path.join(projectRoot, 'data', 'hero-image-manifest.js')
const categories = ['fashion', 'fitness', 'lifestyle', 'travel']
const publicSourceFolders = [...categories, 'unclassified']
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const premiumSourceDirectory = path.join(sourceRoot, 'private-review')
const premiumManifestFile = path.join(projectRoot, 'data', 'premium-preview-manifest.js')

function toSlug(fileName) {
  return path.basename(fileName, path.extname(fileName))
    .toLowerCase()
    .replace(/\((\d+)\)/g, '-$1')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function main() {
  // Keep the committed, optimized public copies usable on deployment hosts,
  // where the private source archive is intentionally not checked in.
  if (!fs.existsSync(sourceRoot)) {
    console.log('Private image source is absent; keeping the existing generated public images.')
    return
  }

  const inputs = []
  const outputNames = new Set()
  for (const category of publicSourceFolders) {
    const directory = path.join(sourceRoot, category)
    if (!fs.existsSync(directory)) continue

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isFile() || !supportedExtensions.has(path.extname(entry.name).toLowerCase())) continue
      const extension = path.extname(entry.name).toLowerCase()
      const outputExtension = extension === '.png' ? '.webp' : extension
      const outputName = `${category}/${toSlug(entry.name)}${outputExtension}`
      if (outputNames.has(outputName.toLowerCase())) {
        throw new Error(`Image output name collision: ${outputName}`)
      }
      outputNames.add(outputName.toLowerCase())
      inputs.push({ category, fileName: entry.name, extension, outputName, inputPath: path.join(directory, entry.name) })
    }
  }

  if (inputs.length === 0 || categories.some((category) => !inputs.some((image) => image.category === category))) {
    throw new Error('Expected at least one image in each public category source folder.')
  }

  if (!fs.existsSync(heroSourceDirectory)) {
    throw new Error(`Hero image source directory does not exist: ${heroSourceDirectory}`)
  }
  const heroSourceFiles = fs.readdirSync(heroSourceDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, 'en'))
  if (heroSourceFiles.length === 0) {
    throw new Error(`No supported carousel images found in ${heroSourceDirectory}`)
  }
  const heroInputs = heroSourceFiles.map((fileName, index) => {
    return {
      inputPath: path.join(heroSourceDirectory, fileName),
      outputName: `hero/${toSlug(fileName)}.webp`,
      alt: `Camila Ravelle, homepage portrait ${index + 1}`,
    }
  })

  const premiumSourceFiles = fs.existsSync(premiumSourceDirectory)
    ? fs.readdirSync(premiumSourceDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right, 'en'))
    : []
  const premiumInputs = premiumSourceFiles.map((fileName, index) => ({
    inputPath: path.join(premiumSourceDirectory, fileName),
    outputName: `premium-preview/preview-${String(index + 1).padStart(2, '0')}.webp`,
  }))

  const stagingRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'camila-public-images-'))
  try {
    if (fs.existsSync(logoSourceFile)) {
      await sharp(logoSourceFile).rotate().png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(path.join(stagingRoot, logoOutputName))
    }

    let sourceBytes = 0
    let outputBytes = 0
    let convertedCount = 0
    for (const image of inputs) {
      const stagingPath = path.join(stagingRoot, image.outputName)
      fs.mkdirSync(path.dirname(stagingPath), { recursive: true })
      const sourceStats = fs.statSync(image.inputPath)
      sourceBytes += sourceStats.size

      if (image.extension === '.png') {
        const result = await sharp(image.inputPath).rotate().webp({ quality: 82, effort: 5 }).toFile(stagingPath)
        outputBytes += result.size
        convertedCount += 1
      } else {
        // Decode each source before publishing so corrupt files fail safely before cleanup.
        await sharp(image.inputPath).metadata()
        fs.copyFileSync(image.inputPath, stagingPath)
        outputBytes += sourceStats.size
      }
    }

    let heroSourceBytes = 0
    let heroOutputBytes = 0
    let heroConvertedCount = 0
    for (const image of heroInputs) {
      const stagingPath = path.join(stagingRoot, image.outputName)
      fs.mkdirSync(path.dirname(stagingPath), { recursive: true })
      const sourceStats = fs.statSync(image.inputPath)
      heroSourceBytes += sourceStats.size

      const result = await sharp(image.inputPath)
        .rotate()
        .flop()
        .webp({ quality: 82, effort: 5 })
        .toFile(stagingPath)
      heroOutputBytes += result.size
      heroConvertedCount += 1
    }

    let premiumSourceBytes = 0
    let premiumOutputBytes = 0
    for (const image of premiumInputs) {
      const stagingPath = path.join(stagingRoot, image.outputName)
      fs.mkdirSync(path.dirname(stagingPath), { recursive: true })
      premiumSourceBytes += fs.statSync(image.inputPath).size
      const result = await sharp(image.inputPath)
        .rotate()
        .resize({ width: 320, height: 400, fit: 'cover', withoutEnlargement: true })
        .blur(30)
        .webp({ quality: 38, effort: 6 })
        .toFile(stagingPath)
      premiumOutputBytes += result.size
    }

    // Only replace public image files after every source has been validated and staged.
    function removePublicImages(directory) {
      if (!fs.existsSync(directory)) return
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const entryPath = path.join(directory, entry.name)
        if (entry.isDirectory()) removePublicImages(entryPath)
        else if (supportedExtensions.has(path.extname(entry.name).toLowerCase())) fs.rmSync(entryPath)
      }
    }
    for (const directoryName of [...publicSourceFolders, 'hero', 'premium-preview']) {
      removePublicImages(path.join(publicRoot, directoryName))
    }

    for (const image of [...inputs, ...heroInputs, ...premiumInputs]) {
      const stagedPath = path.join(stagingRoot, image.outputName)
      const publicPath = path.join(publicRoot, image.outputName)
      fs.mkdirSync(path.dirname(publicPath), { recursive: true })
      fs.copyFileSync(stagedPath, publicPath)
    }
    if (fs.existsSync(logoSourceFile)) {
      fs.copyFileSync(path.join(stagingRoot, logoOutputName), path.join(publicRoot, logoOutputName))
    }

    const premiumManifest = [
      '// Generated by scripts/prepare-public-images.js; do not edit manually.',
      '// These public files are permanently blurred derivatives of categories/private-review/.',
      `export const premiumPreviewImages = ${JSON.stringify(premiumInputs.map((image) => `/camila/${image.outputName}`), null, 2)}`,
      '',
    ].join('\n')
    fs.writeFileSync(premiumManifestFile, premiumManifest, 'utf8')
    const heroManifest = [
      '// Generated by scripts/prepare-public-images.js; do not edit manually.',
      '// Carousel images are optimized copies of private-media/camila-review/hero/.',
      `export const heroImages = ${JSON.stringify(heroInputs.map(({ outputName, alt }) => ({ src: `/camila/${outputName}`, alt })), null, 2)}`,
      '',
    ].join('\n')
    fs.writeFileSync(heroManifestFile, heroManifest, 'utf8')

    const savedPercent = sourceBytes === 0 ? 0 : Math.round((1 - outputBytes / sourceBytes) * 100)
    console.log(`Published all ${inputs.length} category images; converted ${convertedCount} PNGs to WebP.`)
    console.log(`Image payload: ${(sourceBytes / 1024 / 1024).toFixed(1)} MB -> ${(outputBytes / 1024 / 1024).toFixed(1)} MB (${savedPercent}% smaller).`)
    console.log(`Generated ${heroInputs.length} horizontally mirrored WebP carousel images from the hero folder (${(heroSourceBytes / 1024 / 1024).toFixed(1)} MB -> ${(heroOutputBytes / 1024 / 1024).toFixed(1)} MB).`)
    console.log(`Generated ${premiumInputs.length} irreversibly blurred Premium teasers (${(premiumSourceBytes / 1024 / 1024).toFixed(1)} MB of private originals -> ${(premiumOutputBytes / 1024).toFixed(1)} KB of blurred WebP).`)
    console.log(`Generated ${premiumInputs.length} blurred previews from categories/private-review/; source originals are not copied to public/.`)
    if (fs.existsSync(logoSourceFile)) console.log(`Published the Camila Ravelle logo from the private Logo folder as ${logoOutputName}.`)
  } finally {
    fs.rmSync(stagingRoot, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
