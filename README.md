# README

**This is a simple Reversi game built in React and Rails**

Visit a working copy of the game https://queso-reversi.herokuapp.com/

***or***

Clone this repository

Open repo directory and make sure you have the correct version of Ruby installed 2.6.1 with the following steps

***Setup Environment***

update brew if installed

`$ brew update`

or

install homebrew

`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

update or install ruby-build

`$ brew upgrade ruby-build`

or

`$ brew install ruby-build`

install ruby 2.6.1

`$ ruby-build 2.6.1`

install chruby -- *ruby version handler*

`$ brew install chruby`

check current ruby version

`$ chruby`

if version not 2.6.1 run

`$ chruby 2.6.1`

if you do not have bundler installed

`$ gem install bundler`

***Start application***

in project directory run

`$ bundle`

`$ rails s`

in second tab in terminal run

`$ yarn run start`

and visit localhost:3000 to see a local copy of the games
