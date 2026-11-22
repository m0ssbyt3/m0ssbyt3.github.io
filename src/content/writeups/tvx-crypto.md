---
title: Easiest crypto question on earth's history LOL
description: >-
  I am so tired and this is the first writeup on the website. so enjoy it, even
  tho its easy as fuck and short
date: '2026-11-22'
tags:
  - crypto
  - ctf
  - rsa
published: true
slug: tvx-crypto
platform: TVX
difficulty: easy
---
# Creeper Vault Writeup

## Challenge Files

this challenge gave me 2 files, those are the contents of the file

```
c = 1574928985319013777436289945491687612751672976588545303342361399014858100334313795739

The ciphertext belongs to Vault A.
```

```
=== Creeper Vault A ===
n = 1942668892225729070919461906823520455305416829490420089422957436437580309796491507761
e = 65537

=== Creeper Vault B ===
n = 1942668892225729070919461906823519371241578281403951004079222153957205455266330293941
e = 65537

Both vaults were assembled by the same careless Creeper.
```

## Analysis

If we look at the `n_a` and `n_b`, they look alike, and also looking at the hint **"Both vaults were assembled by the same careless Creeper."** we can know that both `n` values are using a **shared prime**.

We can find that prime by finding the **greatest common divisor** between them two.

## Solution

```python
from math import gcd
from Crypto.Util.number import long_to_bytes

n_a = 1942668892225729070919461906823520455305416829490420089422957436437580309796491507761

n_b = 1942668892225729070919461906823519371241578281403951004079222153957205455266330293941

e = 65537

# consyutrcitng p

p = gcd(n_a,n_b)
q = n_a // p

phi = (p-1) * (q-1)

d = pow(e,-1,phi)

c = 1574928985319013777436289945491687612751672976588545303342361399014858100334313795739

m = pow(c,d,n_a)

print(long_to_bytes(m))
```

what the script does is basically, compute the gcd between both `n`s and then it gives us the values of p and q, which we can then use to continue the rsa process to decrypt the flag.
## Flag

And we get:

```
TVXCTF{the_creeper_reused_a_prime}
```

---

> VERY EASY
