#!/usr/bin/env node

const TARGET_USERNAME = process.argv.splice(2);

if (!TARGET_USERNAME[0]) {
    console.error("Username expected, none given");

    return 1
};

// modules
const https = require('https');
const fs = require('fs');
const clone = require('git-clone');

// send request to grab repos
const options = {
    hostname: "api.github.com",
    path: `/users/${TARGET_USERNAME}/repos`,
    headers: {"user-agent": ""}
};

https.get(options, (response) => {
    let rawData = '';

    response.setEncoding('utf8');

    response.on('data', (chunk) => {
        rawData += chunk;
    });

    response.on('end', () => {
        const repos = JSON.parse(rawData);

        for (let repo of repos) {
            const { name, description, html_url, fork, language } = repo;
            const path = `repos/${TARGET_USERNAME}/${name}`;

            clone(html_url, path, null, (err) => {
                if (err) console.error(err);

                fs.writeFile(`${path}/__REPO_INFO.txt`, `REPO INFO\n\ndescription: ${description}\nisFork: ${fork}\nlanguage: ${language}`, 'utf8', (err) => {if (err) throw err});
                console.log(`cloned ${name}`);
            });
        };
    });
}).on('error', (err) => console.error(err));