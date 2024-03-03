#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const { lstat } = fs.promises;
const path = require('path');

// Use path passed as command argument. Otherwise, use the current directory path.
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if(err){
        console.log(err);
    }
    
    const lstatPromises = filenames.map((filename) => {
        return lstat(path.join(targetDir, filename));
    });

    const stats = await Promise.all(lstatPromises);

    stats.forEach((stat, index) => {
        let filename = filenames[index];
        console.log(stat.isFile() ? filename : chalk.yellow(filename));
    });
});