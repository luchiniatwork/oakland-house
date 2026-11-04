# Git LFS + jj in this repo

Disclosure packages are large binary PDFs tracked with **Git LFS**. jj has no
usable LFS support (the patched builds are unreliable — see "Why not patched
jj" below), so the PDFs live **outside jj's view**:

- A dedicated orphan branch `disclosures` holds the PDFs as LFS pointers.
- That branch is checked out as a **git worktree** at `disclosures/` (repo
  root). It is in `.gitignore`, so jj and the outer git index ignore it.
- `listings/<slug>/disclosure-package` is a **symlink** to
  `../../disclosures/<slug>`, so all existing browsing paths keep working.
  jj tracks the symlink itself (a tiny text blob) and never descends into it.
- `main`'s history contains **no** disclosure files at all — nothing for jj
  to corrupt.

## Layout

```text
oakland-house/                <- jj-managed repo (branch: main)
  listings/318-capricorn/
    disclosure-package  -> ../../disclosures/318-capricorn   (symlink, tracked)
  disclosures/                <- git worktree (branch: disclosures, gitignored)
    .gitattributes            (*.pdf / *.PDF filter=lfs)
    318-capricorn/*.pdf       (real content; pointers committed)
    6077-skyline/*.pdf
```

## Daily use

- **jj as usual** for everything under `listings/`, docs, etc. Stock jj.
- **Add a disclosure PDF**: drop it into `listings/<slug>/disclosure-package/`
  (lands in the worktree via the symlink), then:

  ```sh
  git -C disclosures add -A
  git -C disclosures commit -m "disclosures: <slug> <what>"
  ```

- **New listing**: `mkdir disclosures/<slug>` and
  `ln -s ../../disclosures/<slug> listings/<slug>/disclosure-package`.
- **Push**:

  ```sh
  git push origin main disclosures   # pre-push hook uploads LFS objects
  # or jj side only: jj git push --bookmark main
  ```

  Do not rely on `jj git push` for the `disclosures` branch — jj skips git
  hooks, so LFS objects would not upload.

## Fresh clone setup

```sh
git clone git@github.com:luchiniatwork/oakland-house.git
cd oakland-house
jj git import                 # if you use jj
git worktree add disclosures disclosures   # branch already exists on origin
git -C disclosures lfs pull   # materialize the real PDFs
```

## Why not patched jj

Community patches (jj-vcs/jj#9068, #9635) make jj skip LFS-filtered *untracked*
files reliably, but for *tracked* filtered files — the normal state after
`git lfs checkout` — snapshots non-deterministically re-recorded raw blobs
into commits in this repo (verified on a clean PR build with all upstream
tests passing). Revisit once jj-vcs/jj#80 lands properly.
