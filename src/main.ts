import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as path from 'path';
import * as os from 'os';

async function run(): Promise<void> {
  try {
    // Get the version input from the action
    const version = core.getInput('version', { required: true });
    core.info(`Setting up covdbg version ${version}`);

    // Check if we're on Windows
    const platform = os.platform();
    if (platform !== 'win32') {
      throw new Error(`This action currently only supports Windows runners. Current platform: ${platform}`);
    }

    // Construct the download URL for covdbg
    // Assuming the release is hosted at https://github.com/covdbg/covdbg/releases/download/v{version}/covdbg-windows-x64.zip
    const downloadUrl = `https://github.com/covdbg/covdbg/releases/download/v${version}/covdbg-windows-x64.zip`;
    core.info(`Downloading covdbg from ${downloadUrl}`);

    // Download the tool
    const downloadPath = await tc.downloadTool(downloadUrl);
    core.info(`Downloaded to ${downloadPath}`);

    // Extract the zip archive
    const extractPath = await tc.extractZip(downloadPath);
    core.info(`Extracted to ${extractPath}`);

    // Cache the tool for future runs
    const cachedPath = await tc.cacheDir(extractPath, 'covdbg', version);
    core.info(`Cached at ${cachedPath}`);

    // Add the tool to the PATH
    core.addPath(cachedPath);
    core.info(`Added ${cachedPath} to PATH`);

    // Set the output
    core.setOutput('covdbg-path', cachedPath);
    
    core.info('Successfully set up covdbg');
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('An unknown error occurred');
    }
  }
}

run();
