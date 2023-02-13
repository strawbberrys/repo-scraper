# repo-scraper

A simple tool to scrape all the repositories of a user and download them into a folder.

## Installation

First either download or clone the repository.
```
git clone https://github.com/strawbberrys/repo-scraper.git
```

Then navigate to the path.
```
cd repo-scraper
```

And install it globally using npm.
```
npm i -g ./
```

## Usage

After installation, simply run the ``scrape-repo`` command in your terminal with a github username.

```
scrape-repos strawbberrys
```

The repositories will then be downloaded to the path where you ran the command in a folder named repositories, inside of that folder will be the username of the person you scraped repositories from.