Mohawk-CalGen
=============

A bookmarklet that will parse the contents of a Mohawk College student timetable page and produce a .ics calendar file for download. 

To use, you will need to create a bookmark in your web browser, use the code below as the URL.

```
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://googledrive.com/host/0B4FcNEHQvQ0sb2RCQVZNRm43M0E?'+new Date().getTime();})();
```
With your bookmark created, navigate to your Mohawk College timetable page and click the bookmark. This should trigger a download of a calendar file to use as you please.

