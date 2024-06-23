module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/npm',
            {
                npmPublish: false,
            }
        ],
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
        [
            '@semantic-release/exec',
            {
                prepareCmd: 'pnpm run update-version'
            }
        ]
        [
        '@semantic-release/git',
        {
            assets: ['package.json', 'src/version.ts'],
            message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
        }
        ],
        '@semantic-release/github'
    ]
};