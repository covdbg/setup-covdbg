# setup-covdbg

A GitHub Action to download and setup covdbg on Windows runners.

## Description

This action downloads a specified version of covdbg, extracts it, caches it for future runs, and adds it to the PATH so it can be used in subsequent workflow steps.

## Features

- Downloads a user-specified version of covdbg
- Extracts the downloaded archive
- Caches the tool for faster subsequent runs
- Adds covdbg to the PATH automatically
- Supports Windows runners

## Usage

Add this action to your workflow:

```yaml
steps:
  - name: Setup covdbg
    uses: covdbg/setup-covdbg@v1
    with:
      version: '1.0.0'
  
  - name: Run covdbg
    run: covdbg --version
```

## Inputs

### `version` (required)

The version of covdbg to download and setup. This should be a semantic version string (e.g., `1.0.0`, `2.1.3`).

**Example:**
```yaml
with:
  version: '1.0.0'
```

## Outputs

### `covdbg-path`

The path where covdbg was installed and cached.

**Example usage:**
```yaml
- name: Setup covdbg
  id: setup-covdbg
  uses: covdbg/setup-covdbg@v1
  with:
    version: '1.0.0'

- name: Display installation path
  run: echo "Covdbg installed at ${{ steps.setup-covdbg.outputs.covdbg-path }}"
```

## Complete Example Workflow

```yaml
name: Test covdbg

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: windows-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup covdbg
        uses: covdbg/setup-covdbg@v1
        with:
          version: '1.0.0'
      
      - name: Verify covdbg installation
        run: |
          covdbg --version
          covdbg --help
```

## How It Works

This action uses the GitHub Actions Toolkit, specifically:
- **@actions/core**: For getting inputs, setting outputs, and logging
- **@actions/tool-cache**: For downloading, extracting, and caching the covdbg binary

The action performs the following steps:
1. Reads the `version` input parameter
2. Constructs the download URL for the specified version
3. Downloads the covdbg archive from GitHub releases
4. Extracts the archive
5. Caches the extracted files for future workflow runs
6. Adds the tool to the system PATH
7. Sets the `covdbg-path` output

## Requirements

- Runs on Windows runners (windows-latest, windows-2022, windows-2019)
- Requires Node.js 20 runtime (automatically available on GitHub-hosted runners)

## Development

To build and package the action:

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Package for distribution
npm run package
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
