# Frontmatter Validator

A simple cli to validate all frontmatter files including .md .mdx extension.

Simply `npm i -g frontmatter-validator`

And then simply run `frontmatter-validator ./path/to/folder --schema ./path/to/schema.json --extensions .md,.mdx`

Frontmatter Validator will pass in every single file with extension '.md', '.mdx' searching for empty values and replacing him with default values present in `frontmatter-schema.json` file

#### Schema Json File

```json
{
  "draft": false,
  "hero": "/hero.png",
  "categories": ["Category"]
}
```

#### Example before validation

```yml
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
## An Code example with ...
```

#### Example after validation

```yml
---
title: Code Example
date: "2019-06-06"
draft: true
example: false
path: /posts/code-example
tags:
  - Tag
 categories:
++  - Category
++ hero: /hero.png
---
## An Code example with ...
```

## Arguments used

| name         | what is ?                                      | optional? | default value               |     |
| ------------ | ---------------------------------------------- | --------- | --------------------------- | --- |
| --schema     | Path to schema.json file                       | yes       | "./frontmatter-schema.json" |     |
| --path       | Path to folder or file with extension provided | yes       | current dir "./"            |     |
| --extensions | Allowed File Extensions list                   | yes       | ".md,.mdx"                  |     |
