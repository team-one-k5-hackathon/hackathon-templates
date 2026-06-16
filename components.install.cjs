#!/usr/bin/env node

// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Load the configuration file
const componentsListFile = path.join(__dirname, 'components-list.json');
const componentsList = JSON.parse(fs.readFileSync(componentsListFile, 'utf8'));

/**
 * Installs components from a specific registry
 * @param {Object} registry - The registry configuration
 */
function installComponents(registry) {
    console.log('----------------------------------------------------');
    console.log("🚀 Installing components from:");
    console.log(`- Registry: ${registry.name}`)
    console.log(`- Base URL: ${registry.url}\n`);

    if (registry.components.length === 0) {
        console.log(`ℹ️ No components specified for ${registry.name}`);
        return;
    }

    // Create a base command for this source
    const baseCommand = `npx shadcn add ${registry.url}`;

    // Install each component
    registry.components.forEach(component => {
        try {
            console.log(`⚙️ Installing ${component}...`);
            const command = `${baseCommand}/${component}.json`;

            // Execute the command
            execSync(command, { stdio: 'inherit' });
            console.log(`✅  Successfully installed ${component}\n`);
        } catch (error) {
            console.error(`❌ Failed to install ${component}: ${error.message}\n`);
        }
    });
}

/**
 * Main function to run the installer
 */
function main() {
    console.log('====================================================');
    console.log('📦 Shadcn/ui Registries Components Installer\n');

    // Check if the configuration has any sources
    if (!componentsList || !Array.isArray(componentsList) || componentsList.length === 0) {
        console.error('❌ Invalid configuration file. Please check the format.');
        process.exit(1);
    }

    // Process each source in the configuration
    componentsList.forEach(registry => {
        installComponents(registry);
    });

    console.log('\n🎉 Installation complete!');
}

// Run the main function
main();