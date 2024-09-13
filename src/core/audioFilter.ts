import ffmpeg from 'fluent-ffmpeg';

/**
 * Apply audio filters using FFMPEG.
 * @param inputPath - The path to the input audio file.
 * @param outputPath - The path to save the output file.
 * @param filterOptions - The FFMPEG filter options.
 * @returns A promise that resolves with the output file path.
 */
export function applyAudioFilter(inputPath: string, outputPath: string, filterOptions: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .audioFilters(filterOptions)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err))
            .save(outputPath);
    });
}
