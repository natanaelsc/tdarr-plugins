# My Tdarr plugin suite

This is a collection of plugins for [Tdarr](https://home.tdarr.io), created or modified by me.

They may contain bugs. Feel free to use them, for me they are very useful.

## Plugins

### [Notify Discord](notify_discord.js)

This plugin sends a message to a Discord webhook when a task is completed. The message contains information about the file that was processed.

You need to create a webhook in your Discord server and paste the URL in the plugin settings.

### [Notify Radarr](notify_radarr.js)

This plugin sends a command to Radarr to refresh the movie folder and rename the files. It is useful when you are processing movies and want to update the library.

You need to paste the Radarr API key and URL in the plugin settings.

### [Notify Sonarr](notify_sonarr.js)

This plugin sends a command to Sonarr to refresh the TV show folder and rename the files. It is useful when you are processing TV shows and want to update the library.

You need to paste the Sonarr API key and URL in the plugin settings.

### [Transcode File](transcode_file.js)

This plugin transcodes the file to a new format. You can pass the desired options in the plugin settings.

## How to use them

1. Copy the plugin code

2. Go to Tdarr -> Classic Plugins -> Creator -> Create plugin.

3. After creating the plugin, go to Tdarr -> Classic Plugins -> Local.

4. Click on the plugin you just created, copy the plugin ID and paste the code in the plugin. Change the plugin ID to the one you just copied.

5. Save the plugin and apply it to your library.
