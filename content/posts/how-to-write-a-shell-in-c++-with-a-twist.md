+++
title = "How to write a shell in C++ with a twist"
date = "2019-04-10T13:41:35+02:00"
draft = true

tags = ["Python", "C++"]

[[resources]]
    name = "featured-image"
    src = "images/"

+++

Writing a shell from scratch is one of those topics that has been treated over and over, it would be kind of an overkill to write another article about it. That's why I decided to introduce a twist in the usual tutorial, we'll write a shell that can also execute Python by directly embedding the CPython interpreter.

<!--more-->

This article is heavily inspired by Stephen Brennan's article [Tutorial - Write a shell in C](https://brennan.io/2015/01/16/write-a-shell-in-c/), so kudos to him.

You can find the link to the Github project at end of the article.

## First steps

There's a lot going in a full featured shell but we'll try to keep it simple, we won't handle configuration files and more advanced aspects for example; our shell will start and be ready to receive inputs right away.

{{< highlight cpp >}}
int main(int argc, char *argv[]) {

  // Starts shell loop
  loop();

  return 0;
}
{{</ highlight >}}

`loop()` will contain all the logic of our shell, it will read the user inputs, evaluate them and wait for the next input until it's closed.

## On and on and on

Now we need to implement our main shell loop, what will this loop do? In our case most of its time is spent on two things:

* **Reading** the user input
* **Running** the previously read input

{{< highlight cpp >}}
void loop() {
  std::string currentLine;
  bool running = true;

  while (running) {
    std::cout << "> ";
    std::getline(std::cin, currentLine);
    running = execute(currentLine);
  }
}
{{</ highlight >}}