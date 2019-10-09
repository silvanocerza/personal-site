+++
title = "Cute Code Access"
link = "https://github.com/silvanocerza/CuteCodeAccess"
description = "Unreal Engine 4 plugin to use Qt Creator as its IDE"

categories = ["c++", "unreal engine"]
layout = "portfolio"
+++

When I started learning Unreal Engine I spent most of my time trying to fight against Visual Studio instead of learning the engine since I mostly work on Linux using Qt Creator.

There is no official support for Qt Creator on Windows, so I decided to roll up my sleeves and create a plugin that would handle it.
Unreal Engine's support of Visual Studio is a plugin on its own so I decided to use that as an inspiration, much like that one Cute Code Access parses the project directory to generate Qt Creator's project files.

For the plugin to work correctly the setup is minimal, a Qt Creator's Kit must be configured with the Unreal Engine's toolchain otherwise the necessary project files can't be generated and the user would have to manually configure the project every time.

The plugin can be installed from the [Unreal Engine Marketplace](https://www.unrealengine.com/marketplace/en-US/cute-code-accessor) or directly from [source from Github](https://github.com/silvanocerza/CuteCodeAccess).
