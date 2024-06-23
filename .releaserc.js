module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        [
            '@semantic-release/exec',
            {
                prepareCmd: 'pnpm run update-version'
            }
        ],
        '@semantic-release/github',
        [
            '@semantic-release/git',
            {
                assets: ['package.json', 'src/version.ts'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
            }
        ]
    ]
};