const ffmpeg = require('fluent-ffmpeg');

/**
 * Apply audio filters using FFMPEG.
 * @param {string} inputPath - The path to the input audio file.
 * @param {string} outputPath - The path to save the output file.
 * @param {string[]} filterOptions - The FFMPEG filter options.
 * @returns {Promise<string>} - A promise that resolves with the output file path.
 */
function applyAudioFilter(inputPath, outputPath, filterOptions) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .audioFilters(filterOptions)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err))
            .save(outputPath);
    });
}

module.exports = applyAudioFilter;
