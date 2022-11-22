# I am `i`

A Chrome extension to block the URL which contains cyrillic `і`.

## Background
A fake Ad of `www.gimp.org` has been appeared on Google Search, whose URL was indistinguishable from real URL. ([ref](https://www.reddit.com/r/GIMP/comments/ygbr4o/dangerous_google_ad_disguising_itself_as/))

## Usage
### Development
`$ make`

### Build for release
`$ make prod`

### Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. 

### Docs

* [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)
