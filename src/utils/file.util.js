const fs = require('fs')

async function readJSON(fileURI) {
  const data = await read(fileURI)
  return data ? JSON.parse(data) : null
}

async function read(fileURI) {
  return new Promise(resolve => {
    try {
      fs.exists(fileURI, exists => {
        if (!exists) resolve(null)
        fs.readFile(fileURI, 'utf8', function (err, data) {
          if (!err) {
            resolve(data)
          } else {
            resolve(null)
          }
        })
      })
    } catch (error) {
      resolve(null)
    }
  })
}
function write(fileURI, data) {
  return new Promise(resolve => {
    fs.writeFile(fileURI, data, err => {
      if (err) resolve(null)
      resolve()
    })
  })
}
async function writeJSON(fileURI, json) {
  await write(fileURI, JSON.stringify(json, null, 2))
}

async function addLines(fileURI, lines) {
  let data = await read(fileURI)
  if (!data) data = ''
  for (const line of lines)
    data = (data && `${data  }\n` || '')  + line 
  await write(fileURI, data)
}

module.exports = { read, readJSON, write, writeJSON, addLines }

/********************* Propiedad de Métrica Móvil SA de CV **************************/