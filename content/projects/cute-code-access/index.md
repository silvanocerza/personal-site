+++
title = "Cute Code Access"
draft = true

categories = ["c++", "unreal engine"]


[[resources]]
    name = "featured-image"
    src = "cute-code-accessor.jpg"
+++

Cute Code Access is a plugin for Unreal Engine 4 that enables the user of Qt Creator as its IDE.

When I started learning Unreal Engine I spent most of my time trying to fight against Visual Studio instead of learning the engine since I mostly work on Linux using Qt Creator.

There is no official support for Qt Creator on Windows, so I decided to roll up my sleeves and create a plugin that would handle it.
Unreal Engine's support of Visual Studio is a plugin on its own so I decided to use that as an inspiration, much like that one Cute Code Access parses the project directory to generate Qt Creator's project files.

For the plugin to work correctly the setup is minimal, a Qt Creator's Kit must be configured with the Unreal Engine's toolchain otherwise the necessary project files can't be generated and the user would have to manually configure the project every time.

The plugin can be installed from the [Unreal Engine Marketplace](0) or directly from [source from Github](1).

[0]: https://www.unrealengine.com/marketplace/en-US/cute-code-accessor
[1]: https://github.com/silvanocerza/CuteCodeAccess