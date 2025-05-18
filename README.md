# Web Content Manager Application

A web app that provides a central location for writers to store their markdown formatted articles, posts, chapters, etc. and the changes they have made to them over time. I decided to create this after spending several hours organizing the collection of text files and google docs that are what has managed to get saved of my collected wrtings. I prefer to work in plaintext, but I tend to use google docs since this is stored online and I can access it from my phone or laptop. This website should provide a similar interface as google docs for creating content, but expose the formatting options useful for creation of web content  (i.e., just use plaintext / markdown ), and let the user edit the title and metadata fields in place. 

And, of course, it will have a nice means of importing existing collections of content. Starting with the ability to drag and drop a directory tree of text/markdown files, automatically parsing the metadata from these. And I'll try to think of a good way to import from google docs as well... but maybe that will just be a manual process... idk... we'll see.

Here's the list of features I've come up with from my intial planning session.

[ ] Integrated with a variety of LLM/AI functions and other such functions that users should find useful.

[ ] Will allow for the configuration of metadata field collections for each target website, so the program will generate a collection of markdown files ready to add to the content directory of your favorite static site generator.

[ ] Will handle tagging using a tag table, so edits to tag names will reflect across all articles. Destination site export configuration will provide the ability to filter which tags are included. If a destination site does not include one of the tags that an article is tagged with, that tag will be excluded from exports targeting that particular site.

[ ] Will provide recommendations for keyword placement in article content for SEO

[ ] Will provide revision diffing functions

[ ] Will provide serialized change summary export for peer review/edit prior to storing a new revision.

[ ] Will provide outlining organizational tools for creating works of multiple chapters/sections/parts 

[ ] Will provide a means to store image assets associated with content

[ ] Will provide grammar and spellcheck functionality

[ ] Will provide advanced HTML tools for essential markup abilities not provided by markdown.

[ ] Will provide AI/LLM tools that integrate information across individual documents to make recommendations for changes to, creation of additional, or removal of documents.

[ ] I'd love to hear what sort of functionality you would like to see, feel free to submit a feature request. 


## Technology Stack / Architecture

This site should require a relatively small amount of processing power to run, so I've decided to use this as an opportunity to work with technology that favors ease of coding over efficiency for my first iteration. 

### COMPONENTS

#### Front End / UI: React

#### Back End Service Endpoint Handler : Express.JS

#### Database: MongoDB

### CONTAINERIZATION / ORCHESTRATION:

Will set this up to facillitate the easiest possible deployment. I can't imagine this running into a need for multiple load balanced instances of any individual component until there are users numbered in the thousands. This is a text editing website. 


