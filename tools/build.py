#!/usr/bin/env python3
"""Ensambla index.html (un solo archivo autónomo) a partir de src/ y assets/.

Uso:
    python3 tools/build.py            # escribe index.html en la raíz
    python3 tools/build.py --check    # no escribe; falla si index.html no coincide con lo que se generaría
    python3 tools/build.py --out RUTA # escribe en otra ruta

El resultado es determinista: mismas entradas -> mismos bytes. Solo usa la
biblioteca estándar de Python 3. El orden de ensamblado está en src/manifest.txt.

Entradas especiales del manifiesto (generan una sola línea de JavaScript):
    @atlas-meta <ruta.json>  ->  const ATLAS_META = <json compacto>;
    @atlas-src  <ruta.webp>  ->  const ATLAS_SRC = 'data:image/webp;base64,<...>';
Las rutas de las entradas especiales son relativas a la raíz del repositorio;
las demás, relativas a src/.
"""
import argparse
import base64
import hashlib
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
MANIFEST = os.path.join(SRC, 'manifest.txt')


def read_manifest():
    entries = []
    with open(MANIFEST, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                entries.append(line)
    return entries


def part_bytes(entry):
    if entry.startswith('@atlas-meta '):
        path = os.path.join(ROOT, entry.split(None, 1)[1])
        with open(path, encoding='utf-8') as f:
            meta = json.load(f)
        js = 'const ATLAS_META = ' + json.dumps(meta, separators=(',', ':'), ensure_ascii=False) + ';\n'
        return js.encode('utf-8')
    if entry.startswith('@atlas-src '):
        path = os.path.join(ROOT, entry.split(None, 1)[1])
        with open(path, 'rb') as f:
            data = base64.b64encode(f.read()).decode('ascii')
        return ("const ATLAS_SRC = 'data:image/webp;base64," + data + "';\n").encode('ascii')
    if entry.startswith('@'):
        raise SystemExit('Entrada especial desconocida en el manifiesto: ' + entry)
    with open(os.path.join(SRC, entry), 'rb') as f:
        data = f.read()
    if b'\r' in data:
        raise SystemExit('Fin de línea CRLF en ' + entry + ': usa LF')
    return data


def build():
    return b''.join(part_bytes(e) for e in read_manifest())


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--check', action='store_true', help='comprueba que index.html coincide sin escribir')
    ap.add_argument('--out', default=os.path.join(ROOT, 'index.html'))
    args = ap.parse_args()
    out = build()
    digest = hashlib.sha256(out).hexdigest()
    if args.check:
        try:
            with open(args.out, 'rb') as f:
                cur = f.read()
        except FileNotFoundError:
            cur = b''
        if cur != out:
            print('DIFERENTE: %s no coincide con el resultado de src/ (sha256 esperado %s)' % (args.out, digest))
            sys.exit(1)
        print('OK: %s coincide (%d bytes, sha256 %s)' % (args.out, len(out), digest))
        return
    with open(args.out, 'wb') as f:
        f.write(out)
    print('Escrito %s (%d bytes, sha256 %s)' % (args.out, len(out), digest))


if __name__ == '__main__':
    main()
