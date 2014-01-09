Mohawk-CalGen
=============

A bookmarklet that will parse the contents of a Mohawk College student timetable page and produce a .ics calendar file for download. 


Bookmark the link below, navigate to your mohawk college timetable page and click the bookmark. That's it! You have now downloaded a calendar file to use as you please.

<a href="javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://millerwebdesign.ca/calgen/cal_gen.js';})();">Bookmarklet Link</a>

Or that's what should happen, a security restriction makes it appear to fail when trying to use it from my current iPage host. That issue will be sorted out in the near future, in the meantime, feel free to host the calGen.js file yourself, and use the code below to access it. 

```
<a href="javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://millerwebdesign  .ca/calgen/cal_gen.js';})();">Bookmarklet Link</a>
```
