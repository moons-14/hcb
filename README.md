# Hyper Command Browser
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g hcb
$ hcb COMMAND
running command...
$ hcb (--version)
hcb/0.4.25 linux-x64 node-v20.11.0
$ hcb --help [COMMAND]
USAGE
  $ hcb COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hcb hello PERSON`](#hcb-hello-person)
* [`hcb hello world`](#hcb-hello-world)
* [`hcb help [COMMAND]`](#hcb-help-command)
* [`hcb plugins`](#hcb-plugins)
* [`hcb plugins:install PLUGIN...`](#hcb-pluginsinstall-plugin)
* [`hcb plugins:inspect PLUGIN...`](#hcb-pluginsinspect-plugin)
* [`hcb plugins:install PLUGIN...`](#hcb-pluginsinstall-plugin-1)
* [`hcb plugins:link PLUGIN`](#hcb-pluginslink-plugin)
* [`hcb plugins:uninstall PLUGIN...`](#hcb-pluginsuninstall-plugin)
* [`hcb plugins reset`](#hcb-plugins-reset)
* [`hcb plugins:uninstall PLUGIN...`](#hcb-pluginsuninstall-plugin-1)
* [`hcb plugins:uninstall PLUGIN...`](#hcb-pluginsuninstall-plugin-2)
* [`hcb plugins update`](#hcb-plugins-update)

## `hcb hello PERSON`

Say hello

```
USAGE
  $ hcb hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/moons-14/hcb/blob/v0.4.25/src/commands/hello/index.ts)_

## `hcb hello world`

Say hello world

```
USAGE
  $ hcb hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ hcb hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/moons-14/hcb/blob/v0.4.25/src/commands/hello/world.ts)_

## `hcb help [COMMAND]`

Display help for hcb.

```
USAGE
  $ hcb help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for hcb.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.20/src/commands/help.ts)_

## `hcb plugins`

List installed plugins.

```
USAGE
  $ hcb plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ hcb plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/index.ts)_

## `hcb plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ hcb plugins add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ hcb plugins add

EXAMPLES
  $ hcb plugins add myplugin 

  $ hcb plugins add https://github.com/someuser/someplugin

  $ hcb plugins add someuser/someplugin
```

## `hcb plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ hcb plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ hcb plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/inspect.ts)_

## `hcb plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ hcb plugins install PLUGIN...

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ hcb plugins add

EXAMPLES
  $ hcb plugins install myplugin 

  $ hcb plugins install https://github.com/someuser/someplugin

  $ hcb plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/install.ts)_

## `hcb plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ hcb plugins link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ hcb plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/link.ts)_

## `hcb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hcb plugins remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hcb plugins unlink
  $ hcb plugins remove

EXAMPLES
  $ hcb plugins remove myplugin
```

## `hcb plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ hcb plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/reset.ts)_

## `hcb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hcb plugins uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hcb plugins unlink
  $ hcb plugins remove

EXAMPLES
  $ hcb plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/uninstall.ts)_

## `hcb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hcb plugins unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hcb plugins unlink
  $ hcb plugins remove

EXAMPLES
  $ hcb plugins unlink myplugin
```

## `hcb plugins update`

Update installed plugins.

```
USAGE
  $ hcb plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.10/src/commands/plugins/update.ts)_
<!-- commandsstop -->
