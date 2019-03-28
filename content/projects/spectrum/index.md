+++
title = "Spectrum"

categories = ["CSS", "hugo", "bulma"]
+++

An highly customizable Hugo theme based on the CSS framework Bulma.

<!--more-->

Spectrum is a theme for the static site generator [Hugo](https://gohugo.io/), the CSS framework [Bulma](https://bulma.io/) makes it completely responsive and in combination with the lookup order of Hugo templates it can be easily personalized. 

This very site is an example of the Spectrum theme, by default it won't look like this but more like [that](https://themes.gohugo.io/theme/spectrum/). 

To customize the theme you must override one or more Bulma variables; create a `bulma-variables.sass` file in your `<site_root>/assets/css` folder and set any of the variables found on the official [Bulma documentation](https://bulma.io/documentation/customize/variables/). 
It's also possible to add custom CSS, to style any custom layout you might want to create; to do so create a `personal.sass` file in the same folder and put everything in there, all Bulma variables will be available but overriding them won't work.

You can find the theme and more informations on [Github](https://github.com/silvanocerza/spectrum) or on the Hugo themes [showcase](https://themes.gohugo.io/spectrum/).
