# Cherche une photo libre (Wikimedia Commons) par produit du salon de thé et la télécharge.
import json, urllib.request, urllib.parse, sys, re, time
UA = {'User-Agent': 'LeMondeDuMacaronVillefranche-site/1.0 (https://le-monde-du-macaron-villefranche.pages.dev)'}
def api(params):
    u = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode({**params, 'format': 'json'})
    return json.load(urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30))
OK = re.compile(r'^(CC0|Public domain|CC BY(-SA)? [0-9.]+)', re.I)
req = {'gaufres': 'belgian waffle', 'boissons-gourmandes': 'frappe coffee whipped cream', 'patisseries': 'eclair pastry'}
out = json.load(open('scripts/collecte/commons.json', encoding='utf-8'))
for pid, q in req.items():
    r = api({'action': 'query', 'generator': 'search', 'gsrsearch': f'filetype:bitmap {q}', 'gsrnamespace': 6, 'gsrlimit': 15,
             'prop': 'imageinfo', 'iiprop': 'url|extmetadata|size', 'iiurlwidth': 1280})
    pages = sorted(r.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 99))
    for p in pages:
        ii = p['imageinfo'][0]; m = ii.get('extmetadata', {})
        lic = m.get('LicenseShortName', {}).get('value', '')
        if not OK.match(lic) or ii.get('width', 0) < 900 or not p['title'].lower().endswith(('.jpg', '.jpeg')): continue
        art = re.sub('<[^>]+>', '', m.get('Artist', {}).get('value', 'inconnu')).strip()
        dest = f'assets/photos/salon-{pid}.jpg'
        urllib.request.urlretrieve(ii['thumburl'], dest) if False else open(dest, 'wb').write(urllib.request.urlopen(urllib.request.Request(ii['thumburl'], headers=UA), timeout=60).read())
        out[pid] = {'fichier': dest, 'titre': p['title'], 'page': ii['descriptionurl'], 'auteur': art, 'licence': lic}
        time.sleep(3); break
json.dump(out, open('scripts/collecte/commons.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for k, v in out.items(): print(k, '|', v['titre'][:60], '|', v['licence'], '|', v['auteur'][:40])
