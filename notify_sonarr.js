const details = () => ({
  id: 'vV1Vc3S1K',
  Stage: 'Post-processing',
  Name: 'Notify Sonarr',
  Type: 'Video',
  Operation: 'Transcode',
  Description: 'Notify Sonarr \n\n',
  Version: '1.00',
  Tags: '3rd party,post-processing,notify,arr',
  Inputs: [
    {
      name: 'sonarr_ip',
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
      name: 'sonarr_port',
      type: 'number',
      defaultValue: 8989,
      inputUI: {
        type: 'text',
      },
      tooltip: `Enter the port Sonarr is using

            \\nExample:\\n
            8989
            `,
    },
    {
      name: 'sonarr_api_key',
      type: 'string',
      defaultValue: '3ff1ae1c39a2a2a397315e15266dea48',
      inputUI: {
        type: 'text',
      },
      tooltip: `Enter the Sonarr API key. You can find it on Sonarr at /settings/general

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

  // Get Sonarr configuration
  const { baseURL, headers, command } = arrConfig(inputs);

  // Get serie terms
  const { folderName, terms, imdb } = getTerms(file);

  // Lookup series
  let resp = await fetch(`${baseURL}/series/lookup?term=${encodeURI(terms)}`, { headers, });

  // Check if response is successful
  if (resp.status !== 200) return response.infoLog += `☒Failed to connect to Sonarr. (${resp.statusText})\n`;

  // Get series data
  const data = await resp.json();

  if (!data.length) return response.infoLog += `☒No matching series found in Sonarr.\n`;

  const serie = data.find(s => s.id !== null && s.id !== undefined && s.path.includes(folderName) && s.imdbId === imdb);

  // Check if series exists
  if (!serie) return response.infoLog += `☒No matching series ${folderName} found in Sonarr.\n`;

  const seriesId = serie.id;

  // Refresh media folder
  resp = await fetch(`${baseURL}/command`, { method: 'POST', headers, body: setBody(command.refresh, seriesId) });

  // Check if response is successful
  if (resp.status !== 201) return response.infoLog += `☒Failed to refresh ${folderName}. (${resp.statusText})\n`;

  setTimeout(async () => {

    // Rename files
    resp = await fetch(`${baseURL}/command`, { method: 'POST', headers, body: setBody(command.rename, seriesId) });

    // Check if response is successful
    if (resp.status !== 201) return response.infoLog += `☒Failed to rename ${folderName}. (${resp.statusText})\n`;

    response.infoLog += `☑Successfully notified Sonarr about ${folderName}\n`;

  }, 10000);
};

const arrConfig = (inputs) => {
  return {
    baseURL: `http://${inputs.sonarr_ip}:${inputs.sonarr_port}/api/v3`,
    headers: setHeaders(inputs.sonarr_api_key),
    command: {
      refresh: 'RefreshSeries',
      rename: 'RenameSeries',
    },
  }
}

const setHeaders = (apiKey) => {
  return {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json',
  }
}

const setBody = (service, seriesId) => {
  return JSON.stringify({
    name: service,
    seriesId
  })
}

const getTerms = (file) => {

  // Get serie folder name
  const folderName = file.meta.SourceFile.match(/\/([^/]+)\/S\d+/)[1];

  // Get serie terms
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

module.exports.details = details;
module.exports.plugin = plugin;
