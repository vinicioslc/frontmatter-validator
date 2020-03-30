# Frontmatter Validator

A simple cli to validate all frontmatter files including .md .mdx extension.

Simply `npm i -g frontmatter-normalizer`

And then run `frontmatter-normalizer ./path/to/posts/folder/`

Frontmatter Validator will pass in every single file with extension '.md', '.mdx' searching for empty values and replacing him with default values present in `frontmatter-schema.json` file

#### Example before validation

```shell
---
title: Code Example
date: "2019-06-06"
draft: true
example: false
path: /posts/code-example
tags:
  - Tag
categories: []
---

## An Code example with PrismJS

...
```

#### Example after validation

```shell
---
title: Code Example
date: '2019-06-06'
draft: true
example: false
path: /posts/code-example
tags:
  - Tag
categories:
  - Category
hero: /hero.png
---

## An Code example with PrismJS
...
```
