# Frontmatter Validator

![Github Actions CI](https://github.com/vinicioslc/frontmatter-validator/workflows/Node.js%20CI/badge.svg?branch=master)

A simple cli to validate all frontmatter files including .md .mdx extension.

Simply `npm i -g frontmatter-validator`

And then simply run `frontmatter-validator --path ./md/or/dir --schema ./path/to/schema.json --extensions .md,.mdx`

Frontmatter Validator will pass in every single file with extension '.md', '.mdx' searching for empty values and replacing him with default values present in `frontmatter-schema.json` file

## Cli available arguments

| name         | what is ?                                      | optional? | default value               |     |
| ------------ | ---------------------------------------------- | --------- | --------------------------- | --- |
| --schema     | Path to schema.json file                       | yes       | "./frontmatter-schema.json" |     |
| --path       | Path to folder or file with extension provided | yes       | current dir "./"            |     |
| --extensions | Allowed File Extensions list                   | yes       | ".md,.mdx"                  |     |

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
`post-example.md`
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
`post-example.md`
    ---
    title: Code Example
    date: "2019-06-06"
    draft: true
    example: false
    path: /posts/code-example
    tags:
      - Tag
++  categories:
++    - Category
++  hero: /hero.png
    ---
    ## An Code example with ...
```

## Enviroment variables support ^-^

Now you can inject some variables like filename `{FILENAME}` this will be replaced by filename from file readed.

> for while only works with string

## Variables available

| name      | what is ?                                            |
| --------- | ---------------------------------------------------- |
| FILENAME  | Filename extracted with path.basename(filePath)      |
| FILE_EXT  | File Extension extracted with path.extname(filePath) |
| {ANY_ENV} | Any env present in ``process.env` variable           |

#### Schema Json File With Variables

```json
`frontmatter-schema.json`
{
  "draft": false,
  "hero": "/hero.png",
  "path": "/posts/{FILENAME}-post",
  "categories": ["Category"]
}
```

#### Example Before validation

```yml
`post-example.md`
    ---
    title: Code Example
    date: "2019-06-06"
    draft: true
    example: false
    ---
    ## An Code example with ...
```

#### Example After validation

```yml
`post-example.md`
    ---
    title: Code Example
    date: "2019-06-06"
    draft: true
    example: false
++  path: /posts/post-example-post
    ---
    ## An Code example with ...
```
