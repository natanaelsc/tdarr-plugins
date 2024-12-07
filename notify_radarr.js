const details = () => ({
  id: 'F-66uDztf',
  Stage: 'Post-processing',
  Name: 'Notify Radarr',
  Type: 'Video',
  Operation: 'Transcode',
  Description: 'Notify Radarr\n\n',
  Version: '1.00',
  Tags: '3rd party,post-processing,notify,arr',
  Inputs: [
    {
      name: 'radarr_ip',
      type: 'string',
      defaultValue: 'localhost',
      inputUI: {
        type: 'text',
      },
      tooltip: `Enter the server IP address

            \\nExample:\\n
            192.168.0.10
            `,
    },
    {
      name: 'radarr_port',
      type: 'number',
      defaultValue: 7878,
      inputUI: {
        type: 'text',
      },
      tooltip: `Enter the port Radarr is using

            \\nExample:\\n
            7878
            `,
    },
    {
      name: 'radarr_api_key',
      type: 'string',
      defaultValue: '3ff1ae1c39a2a2a397315e15266dea48',
      inputUI: {
        type: 'text',
      },
      tooltip: `Enter the Radarr API key. You can find it on Radarr at /settings/general

            \\nExample:\\n
            3ff1ae1c39a2a2a397315e15266dea48
            `,
    },
  ],
})

const plugin = async (file, librarySettings, inputs, otherArguments) => {
  const lib = require('../methods/lib')();
  inputs = lib.loadDefaultValues(inputs, details);

  const response = { infoLog: '', }

  await notifyArr(inputs, file, response);

  return response;
}

const notifyArr = async (inputs, file, response) => {

  // Get Radarr configuration
  const { baseURL, headers, command } = arrConfig(inputs);

  // Get movie terms
  const { folderName, terms, imdb } = getTerms(file);

  // Lookup movie
  let resp = await fetch(`${baseURL}/movie/lookup?term=${encodeURI(terms)}`, { headers, })

  // Check if response is successful
  if (resp.status !== 200) return response.infoLog += `☒Failed to connect to Radarr. (${resp.statusText})\n`;

  // Get movie data
  const data = await resp.json();

  if (!data.length) return response.infoLog += `☒Failed to find ${folderName} in Radarr.\n`;

  const movie = data.find(m => m.folderName.includes(folderName) && m.imdbId === imdb);

  // Check if movie exists
  if (!movie) return response.infoLog += `☒Failed to find ${folderName} in Radarr.\n`;

  const { movieId } = movie.movieFile;

  // Refresh media folder
  resp = await fetch(`${baseURL}/command`, { method: 'POST', headers, body: setBody(command.refresh, [movieId]) });

  // Check if response is successful
  if (resp.status !== 201) return response.infoLog += `☒Failed to refresh ${folderName}. (${resp.statusText})\n`;

  setTimeout(async () => {

    // Rename file
    resp = await fetch(`${baseURL}/command`, { method: 'POST', headers, body: setBody(command.rename, [movieId]) });

    // Check if response is successful
    if (resp.status !== 201) return response.infoLog += `☒Failed to rename ${folderName}. (${resp.statusText})\n`;

    response.infoLog += `☑Successfully notified Radarr about ${folderName}\n`;

  }, 10000);
};

const arrConfig = (inputs) => {
  return {
    baseURL: `http://${inputs.radarr_ip}:${inputs.radarr_port}/api/v3`,
    headers: setHeaders(inputs.radarr_api_key),
    command: {
      refresh: 'RefreshMovie',
      rename: 'RenameMovie',
    },
  }
}

const setHeaders = (apiKey) => {
  return {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json',
  }
}

const setBody = (service, movieIds) => {
  return JSON.stringify({
    name: service,
    movieIds
  })
}

const getTerms = (file) => {

  // Get movie folder name
  const folderName = file.meta.SourceFile.replace(/(.*\/)([^/]+)\/[^/]+$/, '$2');

  // Get movie terms
  let terms = /^(.*?)\s\((\d{4})\)\s/.exec(folderName); // match title and year
  terms = `${terms[1].replace(/\./g, ' ')} ${terms[2]}`; // replace . with space
  terms = terms.replace(/[^a-zA-Z0-9\s]/g, ''); // remove special characters

  // Get IMDB ID
  const imdb = /{imdb-([^}]+)}/.exec(folderName)[1] ?? "";

  return {
    folderName,
    terms: terms.toLowerCase(),
    imdb,
  };
};

const radarrOptions = {
  baseURL: 'http://localhost:7878/api/v3',
  headers: {
    'X-Api-Key': '3ff1ae1c39a2a2a397315e15266dea48',
    'Content-Type': 'application/json',
  },
  command: {
    refresh: 'RefreshMovie',
    rename: 'RenameMovie',
  },
}

module.exports.details = details;
module.exports.plugin = plugin;
