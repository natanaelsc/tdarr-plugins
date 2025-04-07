const details = () => ({
  id: "mPu-PIUrg",
  Stage: "Pre-processing",
  Name: "Transcode Video File",
  Type: "Video",
  Operation: "Transcode",
  Description: `High Quality FFMPEG transcoding settings. \n\n`,
  Version: "2.11",
  Tags: "pre-processing,ffmpeg,h265,h264,hevc,10bit,transcode",
  Inputs: [
    {
      name: 'try_use_gpu',
      type: 'boolean',
      defaultValue: false,
      inputUI: { type: 'dropdown', options: ['true', 'false'] },
      tooltip: 'If enabled then will use GPU if possible.',
    },
    {
      name: 'container',
      type: 'string',
      defaultValue: 'original',
      inputUI: { type: 'dropdown', options: ['original', 'mkv', 'mp4', 'avi', 'ts',] },
      tooltip: 'Specify output container of file.\\n',
    },
    {
      name: 'target_codec',
      type: 'string',
      defaultValue: 'hevc',
      inputUI: { type: 'dropdown', options: ['hevc', 'h264',] },
      tooltip: 'Specify the codec to use.',
    },
    {
      name: 'target_bitrate_multiplier',
      type: 'number',
      inputUI: { type: 'text' },
      tooltip: `Specify the multiplier to use to calculate the target bitrate.\\n
                A value of 1 will keep the same bitrate.\\n
                A value of 0.5 will half the bitrate.\\n`,
    },
    {
      name: 'enable_10bit',
      type: 'boolean',
      defaultValue: true,
      inputUI: { type: 'dropdown', options: ['true', 'false'] },
      tooltip: `Specify if output file should be 10bit.\\n`,
    },
    {
      name: 'video_profile',
      type: 'string',
      defaultValue: 'auto',
      inputUI: { type: 'dropdown', options: ['auto', 'main', 'main10', 'main12'] },
      tooltip: `Specify the video profile.\\n
                Options:\\n
                auto - Automatically select the profile based on the other settings\\n
                main - for most videos\\n
                main10 - for 10-bit videos\\n
                main12 - for 12-bit videos\\n`,
    },
    {
      name: 'video_level',
      type: 'string',
      defaultValue: 'auto',
      inputUI: { type: 'dropdown', options: ['auto', '3.0', '3.1', '4.0', '4.1', '5.0', '5.1', '5.2', '6.0'] },
      tooltip: `Specify the video level.\\n
                Options:\\n
                auto - Automatically select the level based on the other settings\\n
                3.0 - for 480p videos at 30fps.\\n
                4.0 - for 720p videos\\n
                4.1 - for 720p videos at higher bitrates\\n
                4.2 - for 1080p videos\\n
                5.0 - for 1080p videos at 60fps or 4K videos\\n
                5.1 - for 4K videos\\n
                5.2 - for 4K videos at higher bitrates\\n
                6.0 - for 8K videos\\n`,
    },
    {
      name: 'video_tune',
      type: 'string',
      defaultValue: 'none',
      inputUI: { type: 'dropdown', options: ['none', 'film', 'animation', 'grain', 'stillimage', 'fastdecode', 'zerolatency'] },
      tooltip: `Enter the desired tune value.\\n
                Options:\\n
                film - use for high quality movie content; lowers deblocking\\n
                animation - good for cartoons; uses higher deblocking and more reference frames\\n
                grain - preserves the grain structure in old, grainy film material\\n
                stillimage - good for slideshow-like content\\n
                fastdecode - allows faster decoding by disabling certain filters\\n
                zerolatency - good for fast encoding and low-latency streaming\\n
                psnr - ignore this as it is only used for codec development\\n
                ssim - ignore this as it is only used for codec development\\n`,
    },
    {
      name: 'video_preset',
      type: 'string',
      defaultValue: 'none',
      inputUI: { type: 'dropdown', options: ['none', 'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'] },
      tooltip: `Enter the desired preset value\\n
                A preset is a collection of options that will provide a certain encoding speed to compression ratio.\\n
                A slower preset will provide better compression. This means that, for example, if you target a certain file size or constant bit rate, you will achieve better quality with a slower preset.\\n
                Similarly, for constant quality encoding, you will simply save bitrate by choosing a slower preset.\\n
                Use the slowest preset that you have patience for.\\n`,
    },
    {
      name: 'video_crf',
      type: 'number',
      inputUI: { type: 'text' },
      tooltip: `Enter the desired CRF value.\\n
                The range of the CRF scale is 0–51, where 0 is lossless, 23 is the default, and 51 is worst quality possible\\n
                A lower value generally leads to higher quality, and a subjectively sane range is 17–28.\\n
                Consider 17 or 18 to be visually lossless or nearly so; it should look the same or nearly the same as the input but it isn't technically lossless.\\n`,
    },
    {
      name: 'audio_codec',
      type: 'string',
      defaultValue: 'original',
      inputUI: { type: 'dropdown', options: ['original', 'mp3', 'mp2', 'opus', 'ac3', 'aac', 'dca', 'eac3', 'truehd', 'flac'] },
      tooltip: 'Enter the desired audio codec value.',
    },
    {
      name: 'audio_bitrate',
      type: 'string',
      inputUI: { type: 'text' },
      tooltip: `Enter the desired audio bitrate in kbps\\n
                If you want to use a custom bitrate, enter the desired bitrate in kbps.\\n
                \\nExample:\\n
                192\\n
                Some standard bitrates are:\\n
                Opus: 64, 96, 128, 192\\n
                AAC: 96, 128, 192, 256\\n
                AC3: 192, 384, 640\\n
                EAC3: 192, 384, 640\\n
                If you prefer to use a variable bitrate, enter the desired quality in VBR format.\\n
                \\nExample:\\n
                vbr:5\\n
                The quality range is from 0 to 10, where 0 is the highest quality and 10 is the lowest quality.\\n\\n`,
    },
    {
      name: 'remove_subtitle',
      type: 'boolean',
      defaultValue: false,
      inputUI: { type: 'dropdown', options: ['true', 'false'] },
      tooltip: 'Specify if output file should have subtitles removed.',
    },
    {
      name: 'remove_metadata',
      type: 'boolean',
      defaultValue: false,
      inputUI: { type: 'dropdown', options: ['true', 'false'] },
      tooltip: 'Specify if output file should have metadata removed.',
    },
    {
      name: 'ignore_unknown',
      type: 'boolean',
      defaultValue: false,
      inputUI: { type: 'dropdown', options: ['true', 'false'] },
      tooltip: 'Specify if output file should ignore unknown streams.',
    },
    {
      name: 'custom_parameters',
      type: 'string',
      inputUI: { type: 'text' },
      tooltip: `Enter any custom parameters you would like to use for x264-params or x265-params.\\n
                Set any custom parameters you would like to use.\\n
                \\nExample:\\n
                no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1\\n
                Options Defined:\\n
                animation - aq-mode=3!:psy-rd=1.5:aq-strength=0.9:deblock=0,0:bframes=8:limit-sao\\n
                anime - aq-mode=3!:psy-rd=1.5:aq-strength=0.9:deblock=0,0:bframes=8:limit-sao\\n
                movie - no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1\\n
                shows - no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1\\n
                \\nExample:\\n
                anime\\n`,
    },
    {
      name: 'extra_arguments',
      type: 'string',
      inputUI: { type: 'text' },
      tooltip: 'Enter any extra arguments you would like to pass to FFmpeg.',
    },
  ],
});

const plugin = async (file, librarySettings, inputs, otherArguments) => {
  const lib = require('../methods/lib')();
  inputs = lib.loadDefaultValues(inputs, details);

  const response = {
    processFile: false,
    preset: '',
    container: inputs.container === 'original' ? `.${file.container}` : `.${inputs.container}`,
    handBrakeMode: false,
    FFmpegMode: false,
    reQueueAfter: false,
    infoLog: '',
  }

  // If the file is not a video, function will be stopped immediately
  if (file.fileMedium !== "video") {
    response.infoLog += "☒ File is not a video!\n";
    return response;
  }

  // If the file is not in the original library file, function will be stopped immediately
  if (file.file !== otherArguments.originalLibraryFile.file) {
    response.infoLog += "☒ File is not the original library file!\n";
    return response;
  }

  let bitrate_options = '';

  if (inputs.target_bitrate_multiplier) {
    const currentBitrate = getCurrentBitrate(file);
    const targetBitrate = currentBitrate * inputs.target_bitrate_multiplier;

    if (targetBitrate === 0) {
      response.infoLog += '☒ Target bitrate could not be calculated. Skipping this plugin.\n';
      return response;
    }

    bitrate_options = bitrateOptions(currentBitrate, targetBitrate);
  }

  // Get device encoder
  const device = await getDeviceEncoder(inputs, otherArguments);

  // If no suitable encoder is found, function will be stopped immediately
  if (!device) {
    response.infoLog += '☒ No suitable encoder found. Skipping this plugin.\n';
    return response;
  }

  // Set extra arguments
  let extra_arguments = '-max_muxing_queue_size 9999 ';

  // Remove metadata or use movflags use_metadata_tags?
  extra_arguments += inputs.remove_metadata === true ? '-map_metadata -1 ' : '-movflags use_metadata_tags ';

  // Ignore unknown streams?
  if (inputs.ignore_unknown === true)
    extra_arguments += '-ignore_unknown ';

  // Add genpts to fix unknown timestamp, if container is ts or avi
  if (inputs.container === 'ts' || inputs.container === 'avi')
    extra_arguments += '-fflags +genpts ';

  // Add more extra arguments if provided
  if (inputs.extra_arguments)
    extra_arguments += inputs.extra_arguments

  // Transcoding options
  response.preset = `${device.inputArgs ? device.inputArgs : ''} <io> `
    + `-map 0:v:0 -c:v ${device.encoder} `
    + `${videoOptions(inputs)} ${bitrate_options} `
    + `${audioOptions(inputs, file)} `
    + `${subtitleOptions(inputs)} `
    + `${extra_arguments}`;

  response.processFile = true;
  response.FFmpegMode = true;
  response.reQueueAfter = true;
  response.infoLog += `☑ File will be transcoded using ${device.encoder}!\n`;

  return response;
}

const videoOptions = (inputs) => {
  // Add preset
  let videoOptions = inputs.video_preset !== 'none' ? `-preset ${inputs.video_preset} ` : '';

  // Add profile
  if (inputs.video_profile !== 'auto')
    videoOptions += `-profile:v ${inputs.video_profile} `;

  // Add level
  if (inputs.video_level !== 'auto') {
    videoOptions += `-level ${inputs.video_level} `;

    // Add tier if level is set to 3.0 or higher
    if (parseFloat(inputs.video_level) >= 3.0)
      videoOptions += `-tier high `;
  }

  // Add 10bit
  if (inputs.enable_10bit === true)
    videoOptions += '-pix_fmt p010le ';

  // Add crf
  if (inputs.video_crf)
    videoOptions += `-crf ${inputs.video_crf} `;

  // Add tune
  if (inputs.video_tune !== 'none' && tuneOptions.includes(inputs.video_tune))
    videoOptions += `-tune ${inputs.video_tune} `;

  // Add custom parameters if provided
  if (inputs.custom_parameters) {

    // Set x264-params or x265-params
    videoOptions += inputs.target_codec === 'hevc' ? '-x265-params ' : '-x264-params ';

    // Add custom parameters
    if (definedCustomParameters[inputs.custom_parameters] === undefined)
      videoOptions += inputs.custom_parameters;

    // Add defined custom parameters
    if (definedCustomParameters[inputs.custom_parameters])
      videoOptions += definedCustomParameters[inputs.custom_parameters];
  }

  return videoOptions;
}

const audioOptions = (inputs, file) => {
  if (inputs.audio_codec !== 'original') {
    let audioOptions = '';
    let audioStreamCount = 0;
    // Loop through all audio streams
    for (let index = 0; index < file.ffProbeData.streams.length; index++) {
      let currentStream = file.ffProbeData.streams[index];
      // If the stream is an audio stream
      if (currentStream.codec_type.toLowerCase() === 'audio' &&
        currentStream.codec_name) {
        // If the audio codec is greater than the desired audio codec
        if (audioCodecs[currentStream.codec_name.toLowerCase()] > audioCodecs[inputs.audio_codec]) {
          // Set the audio codec to the desired audio codec
          audioOptions += `-map 0:a:${audioStreamCount} -c:a:${audioStreamCount} ${audioEncoders[inputs.audio_codec]} `;
          // Set VBR audio bitrate
          if (inputs.audio_bitrate.includes('vbr')) {
            const [, quality] = inputs.audio_bitrate.split(":");
            audioOptions += `-q:a:${audioStreamCount} ${quality ? quality : 5} `;
          }
          // Set CBR audio bitrate
          if (parseInt(inputs.audio_bitrate) > 0)
            audioOptions += `-b:a:${audioStreamCount} ${inputs.audio_bitrate}k `;
        } else {
          // Copy the audio stream
          audioOptions += `-map 0:a:${audioStreamCount} -c:a:${audioStreamCount} copy `;
        }
        audioStreamCount++;
      }
    }
    return audioOptions;
  }
  return '-map 0:a? -c:a copy ';
};

const subtitleOptions = (inputs) => inputs.remove_subtitle === true ? '-sn ' : '-map 0:s? -c:s copy ';

const bitrateOptions = (currentBitrate, targetBitrate) => {
  const minimumBitrate = (targetBitrate * 0.7);
  const maximumBitrate = (targetBitrate * 1.3);
  return `-b:v ${targetBitrate} -minrate ${minimumBitrate} -maxrate ${maximumBitrate} -bufsize ${currentBitrate} `;
}

const getCurrentBitrate = (file) => {
  let duration = 0;
  // Get duration in seconds
  if (file.ffProbeData?.format?.duration) {
    duration = parseFloat(file.ffProbeData?.format?.duration);
  } else if (file.meta.Duration) {
    duration = file.meta.Duration;
  } else {
    duration = file.ffProbeData.streams[0].duration;
  }
  // Use the same calculation used for currentBitrate but divide it in half to get targetBitrate.
  // Logic of h265 can be half the bitrate as h264 without losing quality.
  return (file.file_size * 1024 * 1024 * 8) / duration;
};

const getDeviceEncoder = async (inputs, otherArguments) => {

  // Check if the target codec is hevc or h264 and if the worker type is gpu
  if (otherArguments.workerType && otherArguments.workerType.includes('gpu') && inputs.try_use_gpu && (inputs.target_codec === 'hevc' || inputs.target_codec === 'h264')) {

    // Filter out the GPU encoders that are not supported by the target codec
    const filteredGpuEncoders = gpuEncoders.filter((device) => device.encoder.includes(inputs.target_codec));

    for (const gpuEncoder of filteredGpuEncoders) {
      // Check if the GPU encoders are supported by the system and enabled
      gpuEncoder.enabled = await hasEncoder(otherArguments.ffmpegPath, gpuEncoder.encoder, gpuEncoder.inputArgs, gpuEncoder.filter);
    }

    // Filter out the GPU encoders that are enabled
    const enabledDevices = gpuEncoders.filter((device) => device.enabled === true);

    // If there are enabled devices, use the first one
    if (enabledDevices.length > 0) {
      return {
        encoder: enabledDevices[0].encoder,
        inputArgs: enabledDevices[0].inputArgs,
      };
    };
  }

  // If no GPU encoders are enabled, use the CPU encoder
  if (inputs.target_codec === 'hevc') return { encoder: 'libx265' };

  // If no GPU encoders are enabled, use the CPU encoder
  if (inputs.target_codec === 'h264') return { encoder: 'libx264' };
};

const hasEncoder = async (ffmpegPath, encoder, inputArgs, filter) => {

  const { exec } = require('child_process');

  let isEnabled = false;

  try {
    isEnabled = await new Promise((resolve) => {

      const command = `${ffmpegPath} ${inputArgs || ''} -f lavfi -i color=c=black:s=256x256:d=1:r=30` + ` ${filter || ''}` + ` -c:v ${encoder} -f null /dev/null`;

      exec(command, (error) => {
        if (error) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  } catch (err) {
    console.log(err);
  }

  return isEnabled;
};

const gpuEncoders = [
  {
    encoder: 'hevc_nvenc',
    enabled: false,
  },
  {
    encoder: 'hevc_amf',
    enabled: false,
  },
  {
    encoder: 'hevc_vaapi',
    inputArgs: '-hwaccel vaapi -hwaccel_device /dev/dri/renderD128 -hwaccel_output_format vaapi',
    enabled: false,
    filter: '-vf format=nv12,hwupload',
  },
  {
    encoder: 'hevc_qsv',
    enabled: false,
  },
  {
    encoder: 'hevc_videotoolbox',
    enabled: false,
  },
  {
    encoder: 'h264_nvenc',
    enabled: false,
  },
  {
    encoder: 'h264_amf',
    enabled: false,
  },
  {
    encoder: 'h264_vaapi',
    inputArgs: '-hwaccel vaapi -hwaccel_device /dev/dri/renderD128 -hwaccel_output_format vaapi',
    enabled: false,
    filter: '-vf format=nv12,hwupload',
  },
  {
    encoder: 'h264_qsv',
    enabled: false,
  },
  {
    encoder: 'h264_videotoolbox',
    enabled: false,
  },
];

// Supported tune options
const tuneOptions = ["film", "animation", "grain", "stillimage", "fastdecode", "zerolatency"];

// Defined custom parameters
const definedCustomParameters = {
  "animation": "aq-mode=3:psy-rd=1.5:aq-strength=0.9:deblock=0,0:bframes=8:limit-sao",
  "anime": "aq-mode=3:psy-rd=1.5:aq-strength=0.9:deblock=0,0:bframes=8:limit-sao",
  "movie": "no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1",
  "shows": "no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1",
};

// Audio codecs and their priority
const audioCodecs = {
  "mp3": 1,
  "mp2": 1,
  "opus": 1,
  "aac": 1,
  "ac3": 2,
  "dca": 3,
  "dts": 3,
  "dts-es": 3,
  "eac3": 4,
  "truehd": 8,
  "flac": 9,
}

// Audio encoders
const audioEncoders = {
  'mp3': 'libmp3lame',
  'mp2': 'mp2',
  'opus': 'libopus',
  'ac3': 'ac3',
  'aac': 'aac',
  'dca': 'dca',
  'eac3': 'eac3',
  'truehd': 'truehd',
  'flac': 'flac',
}

module.exports.details = details;
module.exports.plugin = plugin;
