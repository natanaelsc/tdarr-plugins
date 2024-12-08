const details = () => ({
  id: "xMQVOiiXj",
  Stage: 'Post-processing',
  Name: "Notify Discord",
  Type: "Video",
  Operation: "Transcode",
  Description: "Notify Discord",
  Version: '1.00',
  Link: "",
  Tags: '3rd party,post-processing,notify',
  Inputs: [
    {
      name: 'discord_webhook_url',
      type: 'string',
      inputUI: {
        type: 'text',
      },
      tooltip: `
            Enter the Discord WebHook URL

            \\nExample:\\n
            https://discord.com/api/webhooks/token
            `,
    },
    {
      name: 'discord_webhook_username',
      type: 'string',
      defaultValue: 'Tdarr',
      inputUI: {
        type: 'text',
      },
      tooltip: `
            Enter the Discord Bot Username

            \\nExample:\\n
            Tdarr
            `,
    },
    {
      name: 'discord_webhook_avatar_url',
      type: 'string',
      defaultValue: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/tdarr.png',
      inputUI: {
        type: 'text',
      },
      tooltip: `
            Enter the Discord WebHook Avatar URL

            \\nExample:\\n
            https://avatars.githubusercontent.com/u/1234567?s=200&v=4
            `,
    },
  ]
});

const plugin = async (file, librarySettings, inputs, otherArguments) => {
  const lib = require('../methods/lib')();
  inputs = lib.loadDefaultValues(inputs, details);

  const response = { infoLog: '', }

  if (!inputs.discord_webhook_url) return response.infoLog += `☒ You must provide a Discord WebHook URL \n`;

  await sendMessage(inputs, file, response);

  return response;
}

const sendMessage = async (inputs, file, response) => {

  const resp = await fetch(inputs.discord_webhook_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({
      username: inputs.discord_webhook_username,
      avatar_url: inputs.discord_webhook_avatar_url,
      embeds: [embed(file)],
    }),
  });

  if (resp.status !== 204) return response.infoLog += `☒Failed to send message: (${resp.status} - ${resp.statusText}) \n`;

  response.infoLog += `☑Message sent successfully \n`;
};

const embed = (file) => {
  return {
    title: "Transcode Complete Successfully",
    description: file.meta.FileName,
    color: 5763719,
    fields: [
      {
        name: "Resolution",
        value: file.video_resolution,
        inline: true
      },
      {
        name: "Codec",
        value: file.video_codec_name,
        inline: true
      },
      {
        name: "Size",
        value: file.meta.FileSize,
        inline: true
      },
      {
        name: "MIMEType",
        value: file.meta.MIMEType,
        inline: true
      },
      {
        name: "Container",
        value: file.meta.FileType,
        inline: true
      },
      {
        name: "Audio",
        value: getAudios(file)
      },
      {
        name: "Subtitles",
        value: getSubtitles(file)
      },
      {
        name: "File",
        value: `\`\`\`${file.file}\`\`\``,
      }
    ],
    timestamp: new Date().toISOString(),
  }
}

const getAudios = (file) => {
  let audios = [];
  file.ffProbeData.streams.forEach(stream => {
    if (stream.codec_type === "audio") audios.push(`${formatLanguage(stream.tags.language)} ${stream.channels} Channels ${formatBitrate(stream.bit_rate)}`);
  });
  return audios.join("\n") || "None";
}

const getSubtitles = (file) => {
  let subtitles = [];
  file.ffProbeData.streams.forEach(stream => {
    if (stream.codec_type === "subtitle") subtitles.push(formatLanguage(stream.tags.language));
  });
  return subtitles.join(" | ") || "None";
}

const formatLanguage = (language) => {
  if (language === "por") return "Portuguese (BR)";
  if (language === "spa") return "Spanish";
  if (language === "kor") return "Korean";
  if (language === "jpn") return "Japanese";
  if (language === "eng") return "English";
  if (language === "rus") return "Russian";
  if (language === "und") return "Unknown";
}

const formatBitrate = (bitrate) => {
  if (bitrate > 1000000) return `${(bitrate / 1000000)} Mb/s`;
  if (bitrate > 1000) return `${(bitrate / 1000)} kb/s`;
  return `${bitrate} b/s`;
}

module.exports.details = details;
module.exports.plugin = plugin;
