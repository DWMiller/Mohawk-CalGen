function createICS(classes) {
    var events = '';

    // Events will be created repeating until this date
    var repeatUntil = '20150417T230000Z';
        
    $.each(classes, function(index, val) {
        events += eventICS(val,repeatUntil);
    });

    var str =
            'BEGIN:VCALENDAR\n' +
            'PRODID:-//Google Inc//Google Calendar 70.9054//EN\n' +
            'VERSION:2.0\n' +
            'CALSCALE:GREGORIAN\n' +
            'METHOD:PUBLISH\n' +
            'X-WR-CALNAME:test\n' +
            'X-WR-TIMEZONE:America/New_York\n' +
            'X-WR-CALDESC:\n' +
            'BEGIN:VTIMEZONE\n' +
            'TZID:America/New_York\n' +
            'X-LIC-LOCATION:America/New_York\n' +
            'BEGIN:DAYLIGHT\n' +
            'TZOFFSETFROM:-0500\n' +
            'TZOFFSETTO:-0400\n' +
            'TZNAME:EDT\n' +
            'DTSTART:19700308T020000\n' +
            'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\n' +
            'END:DAYLIGHT\n' +
            'BEGIN:STANDARD\n' +
            'TZOFFSETFROM:-0400\n' +
            'TZOFFSETTO:-0500\n' +
            'TZNAME:EST\n' +
            'DTSTART:19701101T020000\n' +
            'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\n' +
            'END:STANDARD\n' +
            'END:VTIMEZONE\n' +
            'BEGIN:VTIMEZONE\n' +
            'TZID:GMT-05:00\n' +
            'X-LIC-LOCATION:GMT-05:00\n' +
            'BEGIN:STANDARD\n' +
            'TZOFFSETFROM:-0500\n' +
            'TZOFFSETTO:-0500\n' +
            'TZNAME:EST\n' +
            'DTSTART:19700101T000000\n' +
            'END:STANDARD\n' +
            'END:VTIMEZONE\n' +
            events +
            'END:VCALENDAR';
    return str;
}


function eventICS(event,repeatUntil) {
    var str =
            'BEGIN:VEVENT\n' +
            'DTSTART;TZID=America/New_York:' + event.timeStart + '\n' +
            'DTEND;TZID=America/New_York:' + event.timeEnd + '\n' +
            'RRULE:FREQ=WEEKLY;UNTIL='+repeatUntil+'\n' +
            //'DTSTAMP:20140108T222220Z\n'+
            'DESCRIPTION:\n' +
            'LOCATION:' + event.location + '\n' +
            'SUMMARY:' + event.course + '\n' +
            'TRANSP:OPAQUE\n' +
            'END:VEVENT\n';
    return str;
}

function ampm(time, ampm)
{
    time = parseInt(time);
    
    if (ampm === 'pm' && time !== 12) {
        time += 12;
    }
    
    return time;
}

/**
 * Using the current date date, determines the date of another day within the same week
 * @param {Integer} dayOfWeek (Mon-Sun)
 * @returns {Date}
 */
function getDateOfWeekday(dayOfWeek) {
    var now = new Date();
    
    var weekday = now.getDay(); // get current day of week    
    var diff = dayOfWeek - weekday; // Find difference in days between passed date and current date
    
    var eventDate = new Date(now.getTime() + (diff * 86400000));
    
    return eventDate;
}

function padZero(val)
{
    if (val < 10)
    {
        val = '0' + val;
    }
    return val;
}

function findDay(course, days)
{
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var courseOffset = course.offsetLeft;

    for (i = 0; i < days.length; i++)
    {
        var val = days[i];

        var dayOffset = val.offsetLeft;

        //console.log(dayOffset + ' vs ' + courseOffset)
        if (dayOffset === courseOffset)
        {
            //console.log($(val).text())
            //console.log(daysOfWeek.indexOf($(val).text()));
            return daysOfWeek.indexOf($(val).text())
        }
    }
    ;
}

(function() {

    // the minimum version of jQuery we want
    var v = "1.11.1";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }

    function initMyBookmarklet() {
        (window.myBookmarklet = function() {

            var classes = [];

            //var $timetable = $('.datadisplaytable');
            var $cells = $('.ddhighlight');
            var $headers = $('.ddheader');

            //var dateNow = new Date();

            $.each($cells, function(index, val) {

                var oneClass = {};

                var weekday = findDay(val, $headers);
                //var weekday =  $(val).parent().children().index($(val));

                var details = $(val).find('p a').html().split('<br>');

                oneClass.course = details[0];

                oneClass.location = details[2].split(' ')[1];

                var times = details[3].split('-');

                var timeStart = times[0].split(' ');
                var timeEnd = times[1].split(' ');

                timeStart[0] = timeStart[0].split(':');
                timeEnd[0] = timeEnd[0].split(':');

                timeStart[0][0] = ampm(timeStart[0][0], timeStart[1]);
                timeEnd[0][0] = ampm(timeEnd[0][0], timeEnd[1]);

                var eventDate = getDateOfWeekday(weekday);
                var eventEnd = new Date(eventDate);

                eventDate.setHours(timeStart[0][0]);
                eventDate.setMinutes(timeStart[0][1]);

                eventEnd.setHours(timeEnd[0][0]);
                eventEnd.setMinutes(timeEnd[0][1]);

                oneClass.demoDate = eventDate + ' / ' + eventEnd;
                oneClass.timeStart = eventDate.getFullYear() + padZero(eventDate.getMonth() + 1) + padZero(eventDate.getDate()) + 'T' + padZero(eventDate.getHours()) + padZero(eventDate.getMinutes()) + '00';
                oneClass.timeEnd = eventEnd.getFullYear() + padZero(eventEnd.getMonth() + 1) + padZero(eventEnd.getDate()) + 'T' + padZero(eventEnd.getHours()) + padZero(eventEnd.getMinutes()) + '00';

                classes[classes.length] = oneClass;
            });
            console.log(classes);

            var ics = createICS(classes);
            console.log(ics);
            window.open("data:text/calendar;charset=utf8," + escape(ics));
        })();
    }
})();

