email
================

A web component for [Appmaker](https://github.com/mozilla-appmaker/appmaker).

Appmaker import:
```
<link rel="import" href="/email">
```

# Submitting this to Github (using Github Pages)

* Step 1: go to github and create a repo (e.g. 'component-test') -- do _not_ initialize it (don't check the checkbox)
* Step 2: note the URL (it will be of the form: git@github.com:secretrobotron/component-email.git)
* Step 3: run the following steps:

```
  git init
  git add .
  git commit -m "first commit"
  git checkout -b gh-pages
  git branch -d master
  git remote add origin git@github.com:secretrobotron/component-email.git
  git push -u origin gh-pages
```

* You should be able to test that your component is being served by going to `http://secretrobotron.github.io/component-email/component.css