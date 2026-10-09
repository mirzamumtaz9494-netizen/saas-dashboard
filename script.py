import urllib.request, json
try:
    req = urllib.request.Request('https://api.github.com/users/mirzamumtaz9494-netizen/events/public', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        events = json.loads(resp.read())
        for e in events[:15]:
            if e['type'] == 'CreateEvent':
                print(f"Created: {e['payload']}")
except Exception as e:
    print('Error:', e)
