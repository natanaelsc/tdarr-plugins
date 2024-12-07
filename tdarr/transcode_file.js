const details = () => ({
  id: "mPu-PIUrg",
  Stage: "Pre-processing",
  Name: "Transcode",
  Type: "Video",
  Operation: "Transcode",
  Description: `High Quality FFMPEG transcoding settings. \n\n`,
  Version: "1.00",
  Tags: "pre-processing,ffmpeg,h265,h264,hevc,10bit,transcode",
  Inputs: [
    {
      name: 'try_use_gpu',
      type: 'boolean',
      defaultValue: true,
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
      name: 'enable_10bit',
      type: 'boolean',
      defaultValue: false,
      inputUI: { type: 'dropdown', options: ['true', 'false'] },
      tooltip: `Specify if output file should be 10bit.\\n`,
    },
    {
      name: 'video_profile',
      type: 'string',
      defaultValue: 'auto',
      inputUI: { type: 'dropdown', options: ['auto', 'main', 'main10', 'main12', 'main444',] },
      tooltip: `Specify the video profile.\\n
            Options:\\n
            auto - Automatically select the profile based on the other settings\\n
            main - for most videos\\n
            main10 - for 10-bit videos\\n
            main12 - for 12-bit videos\\n
            main444 - for videos with 4:4:4 chroma subsampling\\n`,
    },
    {
      name: 'video_level',
      type: 'string',
      defaultValue: 'auto',
      inputUI: { type: 'dropdown', options: ['auto', '3.0', '3.1', '4.0', '4.1', '5.0', '5.1', '5.2', '6.0', '6.1', '6.2',] },
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
      defaultValue: 'medium',
      inputUI: { type: 'dropdown', options: ['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'] },
      tooltip: `Enter the desired preset value\\n
            A preset is a collection of options that will provide a certain encoding speed to compression ratio.\\n
            A slower preset will provide better compression. This means that, for example, if you target a certain file size or constant bit rate, you will achieve better quality with a slower preset.\\n
            Similarly, for constant quality encoding, you will simply save bitrate by choosing a slower preset.\\n
            Use the slowest preset that you have patience for.
            `,
    },
    {
      name: 'video_crf',
      type: 'number',
      defaultValue: 23,
      inputUI: { type: 'text' },
      tooltip: `Enter the desired CRF value.\\n
            The range of the CRF scale is 0–51, where 0 is lossless, 23 is the default, and 51 is worst quality possible.\\n
            A lower value generally leads to higher quality, and a subjectively sane range is 17–28.\\n
            Consider 17 or 18 to be visually lossless or nearly so; it should look the same or nearly the same as the input but it isn't technically lossless.`
    },
    {
      name: 'audio_codec',
      type: 'string',
      defaultValue: 'original',
      inputUI: { type: 'dropdown', options: ['original', 'libopus', 'aac', 'ac3', 'eac3',] },
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
            If you prefer to use a variable bitrate, enter the desired quality in VBR format.\\n
            \\nExample:\\n
            vbr:5\\n
            The quality range is from 0 to 10, where 0 is the highest quality and 10 is the lowest quality.\\n`,
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
      defaultValue: '0',
      inputUI: { type: 'text' },
      tooltip: `Enter any custom parameters you would like to use for x264-params or x265-params.\\n
                Options:\\n
                Set to 0 - This will not use any custom parameters.\\n
                Set a defined custom parameter.\\n
                Options:\\n
                animation - aq-mode=3!:psy-rd=1.5:aq-strength=0.9:deblock=0,0:bframes=8:limit-sao\\n
                anime - aq-mode=3!:psy-rd=1.5:aq-strength=0.9:deblock=0,0:bframes=8:limit-sao\\n
                movie - no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1\\n
                shows - no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1\\n
                Set any custom parameters you would like to use.\\n
                \\nExample:\\n
                no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1\\n`,
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
    ffmpegMode: true,
    reQueueAfter: false,
    infoLog: '',
  }

  // If the file is not a video, function will be stopped immediately
  if (file.fileMedium !== "video") {
    response.processFile = false;
    response.infoLog += "☒ File is not a video! \n";
    return response;
  }

  // If the file is not in the original library file, function will be stopped immediately
  if (file.file !== otherArguments.originalLibraryFile.file) {
    response.processFile = false;
    return response;
  }

  // Get device encoder
  const device = await getEncoder(inputs, otherArguments);

  var extra_arguments = '';

  // Remove metadata or use movflags use_metadata_tags?
  extra_arguments += inputs.remove_metadata === true ? '-map_metadata -1 ' : '-movflags use_metadata_tags ';

  // Ignore unknown streams?
  if (inputs.ignore_unknown === true) extra_arguments += '-ignore_unknown ';

  // Add genpts to fix unknown timestamp, if container is ts or avi
  if (inputs.container === 'ts' || inputs.container === 'avi') extra_arguments += '-fflags +genpts ';

  // Add more extra arguments if provided
  if (inputs.extra_arguments) extra_arguments += inputs.extra_arguments;

  // Transcoding options
  response.preset = `${device.inputArgs ? device.inputArgs : ''} <io> `
    + `-map 0 -c:v ${device.encoder} ${videoSettings(inputs)} `
    // + `${bitrateSettings(inputs, file)} `
    + `${audioSettings(inputs)} `
    + `${subtitleSettings(inputs)} `
    + `-max_muxing_queue_size 9999 `
    + `${extra_arguments}`;

  response.processFile = true;
  response.reQueueAfter = true;
  response.infoLog += `☑ File will be transcoded using ${device.encoder}! \n`;

  return response;
}

const videoSettings = (inputs) => {
  // Add preset and crf
  var settings = `-preset ${inputs.video_preset} `;

  // Add x265-params or x264-params
  var params = (inputs.target_codec === 'hevc' ? '-x265-params ' : '-x264-params ');

  // Add crf
  params += `crf=${inputs.video_crf}`;

  // Add profile
  if (inputs.video_profile !== 'auto') settings += `-profile:v ${inputs.video_profile} `;

  // Add level
  if (inputs.video_level !== 'auto') {
    settings += `-level ${inputs.video_level} `;
    // Add tier if level is set to 3.0 or higher
    if (parseFloat(inputs.video_level) >= 3.0) settings += `-tier high `;
  }

  // Add 10bit
  if (inputs.enable_10bit === true) settings += '-pix_fmt p010le ';

  // Add tune if it is supported
  if (inputs.video_tune !== 'none' && suportedTuneOptions.includes(inputs.video_tune)) params += `:tune=${inputs.video_tune}`;

  if (inputs.custom_parameters !== '0' && inputs.custom_parameters !== '') {
    // Add custom parameters
    if (definedCustomParameters[inputs.custom_parameters] === undefined) params += `:${inputs.custom_parameters}`;
    // Add defined custom parameters
    if (definedCustomParameters[inputs.custom_parameters]) params += `:${definedCustomParameters[inputs.custom_parameters]}`;
  }

  return settings += `${params} `;
}

const audioSettings = (inputs) => {
  if (inputs.audio_codec !== 'original') {
    // Set audio codec
    var settings = `-c:a ${inputs.audio_codec} `;
    // Set VBR audio bitrate
    if (inputs.audio_bitrate.includes('vbr')) {
      const [, quality] = inputs.audio_bitrate.split(":");
      settings += `-vbr on -q:a ${quality ? quality : 5} `;
    }
    // Set CBR audio bitrate
    if (parseInt(inputs.audio_bitrate) > 0) settings += `-b:a ${inputs.audio_bitrate}k `;

    return settings;
  }
  return '-c:a copy ';
};

const subtitleSettings = (inputs) => inputs.remove_subtitle === true ? '-sn ' : '-c:s copy ';

const getEncoder = async (inputs, otherArguments) => {

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

const getDuration = (file) => {
  let duration = 0;
  if (file.ffProbeData?.format?.duration) {
    duration = parseFloat(file.ffProbeData?.format?.duration);
  } else if (file.meta.Duration) {
    duration = file.meta.Duration;
  } else {
    duration = file.ffProbeData.streams[0].duration;
  }
  return duration;
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

// Supported -tune options
const suportedTuneOptions = ["film", "animation", "grain", "stillimage", "fastdecode", "zerolatency"];

// Defined custom parameters
const definedCustomParameters = {
  "animation": "aq-mode=3:psy-rd=1.5:aq-strength=0.9:deblock=0,0:bframes=8:limit-sao",
  "anime": "aq-mode=3:psy-rd=1.5:aq-strength=0.9:deblock=0,0:bframes=8:limit-sao",
  "movie": "no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1",
  "shows": "no-sao:no-strong-intra-smoothing:bframes=8:psy-rd=2:psy-rdoq=5:aq-mode=3:deblock=-1,-1",
};

module.exports.details = details;
module.exports.plugin = plugin;
