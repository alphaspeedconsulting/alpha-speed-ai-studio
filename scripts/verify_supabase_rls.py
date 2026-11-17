#!/usr/bin/env python3
"""
Verify Supabase RLS for published_posts: anon can read social (Instagram/TikTok) rows
and cannot insert (service role only).

Environment (first match wins per variable):
  ALPHAAI_SUPABASE_URL / ALPHAAI_SUPABASE_ANON_KEY
  VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
Also loads .env from cwd or repo root (parent of scripts/).
"""

from __future__ import annotations

import json
import os
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

try:
    import certifi

    _SSL_CTX = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    _SSL_CTX = ssl.create_default_context()


def _load_dotenv() -> None:
    here = Path(__file__).resolve()
    candidates = [Path.cwd() / ".env", here.parent.parent / ".env"]
    for path in candidates:
        if not path.is_file():
            continue
        with path.open(encoding="utf-8") as f:
            for raw in f:
                line = raw.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, _, val = line.partition("=")
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key and key not in os.environ:
                    os.environ[key] = val


def _get_url_key() -> tuple[str, str]:
    url = (
        os.environ.get("ALPHAAI_SUPABASE_URL")
        or os.environ.get("VITE_SUPABASE_URL")
        or ""
    ).strip()
    key = (
        os.environ.get("ALPHAAI_SUPABASE_ANON_KEY")
        or os.environ.get("VITE_SUPABASE_ANON_KEY")
        or ""
    ).strip()
    return url, key


def _request_json(method: str, url: str, key: str, body: dict | None = None) -> tuple[int, dict | list | None, str]:
    data = None
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Accept": "application/json",
    }
    if body is not None:
        payload = json.dumps(body).encode("utf-8")
        data = payload
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30, context=_SSL_CTX) as resp:
            raw = resp.read().decode("utf-8")
            status = resp.status
            if not raw:
                return status, None, ""
            return status, json.loads(raw), raw
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(err_body) if err_body else None
        except json.JSONDecodeError:
            parsed = None
        return e.code, parsed, err_body


def main() -> int:
    _load_dotenv()
    url, key = _get_url_key()
    if not url or not key:
        print(
            "Missing Supabase URL or anon key. Set ALPHAAI_SUPABASE_URL and "
            "ALPHAAI_SUPABASE_ANON_KEY (or VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).",
            file=sys.stderr,
        )
        return 1

    print(f"Probing Supabase project: {url}")

    base = url.rstrip("/")
    # Same filter as src/pages/Reels.tsx: instagram or tiktok
    social_q = urllib.parse.urlencode(
        {
            "select": "id,platform,image_url,caption,post_url,posted_at",
            "or": "(platform.ilike.instagram,platform.ilike.tiktok)",
            "order": "posted_at.desc",
            "limit": "9",
        }
    )
    social_url = f"{base}/rest/v1/published_posts?{social_q}"

    status, payload, raw = _request_json("GET", social_url, key)
    if status != 200:
        print(f"  published_posts (social filter): HTTP {status}", file=sys.stderr)
        print(raw[:2000] if raw else "", file=sys.stderr)
        return 1

    rows = payload if isinstance(payload, list) else []
    ig = sum(1 for r in rows if str(r.get("platform", "")).lower() == "instagram")
    tt = sum(1 for r in rows if str(r.get("platform", "")).lower() == "tiktok")
    print(f"  published_posts (anon SELECT, Instagram/TikTok): OK — {len(rows)} row(s) (instagram={ig}, tiktok={tt})")

    # RLS: anon INSERT should fail (no policy for anon on published_posts)
    probe_body = {
        "platform": "tiktok",
        "image_url": None,
        "caption": "RLS probe — should not persist",
        "post_url": "https://example.com/rls-probe",
        "posted_at": "2020-01-01T00:00:00Z",
    }
    insert_url = f"{base}/rest/v1/published_posts"
    ins_status, ins_payload, ins_raw = _request_json("POST", insert_url, key, probe_body)
    if ins_status in (401, 403):
        print(f"  published_posts (anon INSERT blocked): OK — HTTP {ins_status} (expected under RLS)")
    elif ins_status in (200, 201):
        print(
            "  published_posts (anon INSERT): UNEXPECTED SUCCESS — anon should not insert. Check RLS policies.",
            file=sys.stderr,
        )
        return 1
    else:
        print(f"  published_posts (anon INSERT): HTTP {ins_status} — {ins_raw[:500]}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
