Stats for [Everdo](https://everdo.net/). A version free to use for by anybody
is avaiable [on Github](https://eric1234.github.io/stats_for_everdo).

[Example Screenshot](stats.png)

Features
========

* **Client-side** - Your data stays on your machine
* **Safe** - Operates on an export copy of your DB so no chance of corruption
* **Web-based** - Nothing to install

Filters
=======

* **Date Filter** - Focus on just the time frame of your interest
* **Rolling Avg** - Sometimes activity can be erratic making it hard to see
  the pattern in the noise. A rolling average over a period of 7 days (the
  default) will smooth out the graphs to see the patterns. Reduce to 1 day
  to effectively disable and see the raw data.
* **Recurring Task Filter** - Recurring tasks generally are maintenance tasks.
  Filter those out to see how you are doing on tasks that move you forward not
  just tasks that are helping you tread water.
* **Project Tasks Filter** - Your project tasks tend to be the items that help
  you move your goals forward. Focus on all those things and not the little
  items that pop up.

Graphs
======

* **Creation/Completion Counts** - Are you keeping up? See how many tasks you
  are creating each day vs completing?
* **Task/Project Counts** - See how your total number of open tasks and/or
  projects change. Are you making progress? How much is on your plate?
* **Tag Distribution** - What area/labels are getting the most focus? What is
  getting the least focus? Is that distribution in line with your goals?
* **Turnaround Time** - How long are tasks staying open? Do you add stuff that
  stays on your list forever and perhaps you need to be more realistic? Is that
  turnaround time increasing or decreasing?
* **Top Oldest Tasks/Projects** - What tasks/projects have been on your list the
  longest? Perhaps time to remove them or do them?

Usage
=====

1. Export your data as JSON
2. Open [the webpage](https://eric1234.github.io/stats_for_everdo)
3. Choose your JSON file with the file selector
4. Adjust your filter option as needed

Development
===========

Site built with Node/NPM. Suggest [asdf](https://asdf-vm.com/) or
[nodenv](https://github.com/nodenv/nodenv) as it will easily allow you to match
the version used for development. Once that is setup install the dependencies
with:

```sh
npm install
```

Start up the application with:

```sh
npm run dev
```

Finally open your web-browser to http://localhost:5000.
