# Incident: 2025-04-06 16:57:00 UTC

## Summary

```md
At around 16:57 UTC on 2025-04-06, Grafana sent an alert of Pizza's failing to create. This problem was investigated, discovered, and resolved in a very timely manner. Further details are as seen below.
```

## Detection

```md
This incident was detected when the Pizza purchase failure alert was triggered and JWT Pizza DevOps team was paged.

However, it appears the detection system was too loose, or there are bugs in the tracking of pizza failures where it does not clear old failures. Since the incident, and its subsequent fix, this alert has gone off a few other times. A fix will be pushed to ensure that this alert only goes off when there is an actual issue, but in this case it turned out well.
```

## Impact

```md
For 10 minutes between 16:57 UTC and 17:07 UTC on 04/26/25, users were unable to order any kinds of pizzas.
```

## Timeline

```md
All times are UTC.

- _16:57_ - Grafana sent an alert about the pizza creations failing
- _17:00_ - Caleb Calderwood responded to the alert and investigated on the prooduction site
- _17:05_ - Caleb Calderwood discovered a link within the response of the pizza creation endpoint in the network tab
- _17:07_ - Link was clicked and no further errors occured
```

## Response

```md
After receiving a alert at 16:57 UTC, Caleb Calderwood came online at 17:00 UTC on the production site.

This engineer discovered a link within the response of the pizza creation endpoint in the network tab, clicked the link, and no further errors occured.
```

## Root cause

```md
The root cause of the issue appeared to be a 3rd party which was preventing access to creating pizzas, potentially stopping through a form of middleware. Clicking the link appeased said 3rd company for now. Changes could be identified for how they were able to cause this issue.
```

## Resolution

```md
The service of pizza creations was restored by clicking a link that was stored in the response of the pizza creation request. This was discovered while the engineer was investigating on the production website as to why the pizzas were failing to create. The engineer looked on the network tab, and quickly discovered the link.
```

## Prevention

```md
This same problem has only occured once; however, it seems easy for the 3rd party to cause the problem again. Steps should be enacted to discover how this issue occured, and removing the method used to cause the pizza creation blocking.
```

## Action items

```md
1. Investigate code to discover where the issue lies
2. Push out a fix to remove access for the 3rd party company
3. Reach out to the 3rd party and ask them to try and block pizzas again, and see if the fix worked
```
