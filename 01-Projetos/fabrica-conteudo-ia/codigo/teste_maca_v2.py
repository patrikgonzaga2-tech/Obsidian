"""Teste v2 da maçã, no estilo da referência (Chiki Art) enviada pelo Patrik em 15/11.

- mão de verdade (foto recortada) segurando canetão para o contorno e pincel para pintar
- contorno preto grosso em 3 passos: bolinha, cabinho + folha, carinha
- pintura com GLITTER (cor viva com brilho), potes de tinta glitter nas laterais
- final: fundo de nuvens em tom pastel, brilhos, o Pingo aparece e o nome da fruta
Quadros vão direto para o ffmpeg (sem PNG), para ser rápido.
Uso: python3 teste_maca_v2.py <pasta_arte> <saida.mp4>
"""
import math, os, subprocess, sys, wave
import numpy as np, cairo, cv2

ARTE = sys.argv[1]; SAIDA = sys.argv[2]
W, H, FPS = 1920, 1080, 30
rng = np.random.default_rng(3)

# ---------------- geometria ----------------
def bez(p0, p1, p2, p3, n=70):
    t = np.linspace(0, 1, n)[:, None]
    p0, p1, p2, p3 = map(lambda p: np.array(p, float), (p0, p1, p2, p3))
    return (1-t)**3*p0 + 3*(1-t)**2*t*p1 + 3*(1-t)*t**2*p2 + t**3*p3
def cam(segs):
    out = [bez(*s) for s in segs]
    return np.concatenate([o if i == 0 else o[1:] for i, o in enumerate(out)])
def circ(c, r, a0=-90, a1=270, n=90):
    a = np.radians(np.linspace(a0, a1, n)); return np.c_[c[0] + r*np.cos(a), c[1] + r*np.sin(a)]

corpo = cam([[(960, 395), (1040, 330), (1250, 330), (1265, 560)],
             [(1265, 560), (1280, 780), (1110, 900), (1010, 860)],
             [(1010, 860), (985, 850), (935, 850), (910, 860)],
             [(910, 860), (810, 900), (640, 780), (655, 560)],
             [(655, 560), (670, 330), (880, 330), (960, 395)]])
cabo = cam([[(960, 400), (955, 350), (965, 300), (990, 262)]])
folha = cam([[(978, 318), (1010, 250), (1090, 232), (1135, 252)],
             [(1135, 252), (1105, 310), (1030, 336), (978, 318)]])
olhoE, olhoD = (885, 575), (1035, 575)
OLHO_R = 38
sorriso = circ((960, 640), 62, 25, 155, 50)

# cada passo = lista de traços (o canetão levanta entre eles)
PASSOS = [[corpo], [cabo, folha], [circ(olhoE, OLHO_R), circ(olhoD, OLHO_R), sorriso]]

def comp(p): return np.concatenate([[0], np.cumsum(np.linalg.norm(np.diff(p, axis=0), axis=1))])
def ponto_em(p, L, d):
    k = int(np.clip(np.searchsorted(L, d), 1, len(p) - 1)); a = (d - L[k-1]) / max(L[k] - L[k-1], 1e-6)
    return p[k-1] + a * (p[k] - p[k-1]), k

# ---------------- texturas ----------------
def tex_glitter(cor, tam=512, seed=0):
    r = np.random.default_rng(seed)
    base = np.array(cor, np.float32)[None, None, :] * np.ones((tam, tam, 1), np.float32)
    n = cv2.GaussianBlur(r.normal(0, 1, (tam, tam)).astype(np.float32), (0, 0), 0.8)
    t = base * (1 + 0.22 * n[..., None])
    u = r.random((tam, tam))
    claro = cv2.GaussianBlur((u < 0.035).astype(np.float32), (0, 0), 0.6) * 2.2
    escuro = cv2.GaussianBlur((u > 0.975).astype(np.float32), (0, 0), 0.6) * 1.6
    t = t * (1 - np.clip(escuro, 0, 0.55)[..., None]) + (255 - t) * np.clip(claro, 0, 0.8)[..., None]
    t = np.clip(t, 0, 255)
    return np.tile(t, (H // tam + 1, W // tam + 1, 1))[:H, :W]

# cores em RGB
VERM, VERDE, MARROM = (225, 30, 45), (60, 190, 60), (130, 75, 35)
TEX = {k: tex_glitter(c, seed=i) for i, (k, c) in enumerate([("verm", VERM), ("verde", VERDE), ("marrom", MARROM)])}

# ---------------- cenário: papel branco + potes de glitter ----------------
fundo = np.full((H, W, 3), 255, np.float32)
POTES_E = [(250, 200, 30), (60, 190, 60), (40, 190, 230), (245, 140, 30), (40, 200, 190)]
POTES_D = [(140, 50, 200), (225, 225, 230), (140, 80, 40), (240, 90, 170), (225, 30, 45)]
for col, cores in [(105, POTES_E), (W - 105, POTES_D)]:
    for i, c in enumerate(cores):
        cy = 140 + i * 200
        yy, xx = np.ogrid[:H, :W]; d = np.sqrt((xx - col) ** 2 + (yy - cy) ** 2)
        sombra = np.clip((70 - np.sqrt((xx - col - 6) ** 2 + (yy - cy - 8) ** 2)) / 8, 0, 1)
        fundo *= (1 - 0.12 * sombra[..., None])
        aro = np.clip((72 - d) / 2, 0, 1) - np.clip((62 - d) / 2, 0, 1)
        fundo = fundo * (1 - aro[..., None]) + 205 * aro[..., None]
        m = np.clip((62 - d) / 2, 0, 1)[..., None]
        fundo = fundo * (1 - m) + tex_glitter(c, seed=10 + i + col) * m

# nuvens do final
yy, xx = np.mgrid[:H, :W].astype(np.float32)
g = (xx / W * 0.7 + yy / H * 0.3)[..., None]
nuvens = (1 - g) * np.array([255, 185, 220], np.float32) + g * np.array([175, 220, 255], np.float32)
blob = np.zeros((H, W), np.float32)
for _ in range(14):
    cx, cy = rng.uniform(0, W), rng.uniform(0, H); rx, ry = rng.uniform(120, 260), rng.uniform(60, 120)
    cv2.ellipse(blob, (int(cx), int(cy)), (int(rx), int(ry)), 0, 0, 360, 1.0, -1)
blob = cv2.GaussianBlur(blob, (0, 0), 35)
nuvens = nuvens * (1 - 0.75 * np.clip(blob, 0, 1)[..., None]) + 255 * 0.75 * np.clip(blob, 0, 1)[..., None]

# ---------------- mãos e Pingo ----------------
def carrega_mao(arq, ponta, escala):
    im = cv2.imread(os.path.join(ARTE, "maos", arq), cv2.IMREAD_UNCHANGED)
    # alonga o antebraço para fora da foto (o corte do pulso nunca aparece na tela)
    h0, w0 = im.shape[:2]; pad = 900
    big = np.zeros((h0 + pad, w0 + pad, 4), np.uint8); big[:h0, :w0] = im
    faixa = im.copy(); faixa[:, :, 3] = 0
    faixa[h0 - 14:, :, 3] = im[h0 - 14:, :, 3]; faixa[:, w0 - 14:, 3] = np.maximum(faixa[:, w0 - 14:, 3], im[:, w0 - 14:, 3])
    dx, dy = 0.42, 0.91  # direção do braço (para baixo e um pouco à direita)
    for k in range(1, pad, 2):
        ox, oy = int(k * dx), int(k * dy)
        reg = big[oy:oy + h0, ox:ox + w0]; m = faixa[..., 3:4].astype(np.float32) / 255
        sem = reg[..., 3:4] == 0
        reg[:] = np.where(sem & (m > 0), faixa, reg)
    im = big
    im = cv2.resize(im, None, fx=escala, fy=escala, interpolation=cv2.INTER_AREA)
    rgb = im[..., :3][..., ::-1].astype(np.float32); a = im[..., 3:4].astype(np.float32) / 255
    return rgb, a, (ponta[0] * escala, ponta[1] * escala)
MAO_CANETA = carrega_mao("mao_caneta.png", (324, 329), 0.95)
MAO_PINCEL = carrega_mao("mao_pincel.png", (251, 240), 0.95)

pg = cv2.imread(os.path.join(ARTE, "pingo", "pingo_opcao_2.jpg"))
hh, ww = pg.shape[:2]; ff = np.zeros((hh + 2, ww + 2), np.uint8); m = pg.copy()
for p in [(0, 0), (ww - 1, 0), (0, hh - 1), (ww - 1, hh - 1)]:
    cv2.floodFill(m, ff, p, (0, 255, 0), (12, 12, 12), (12, 12, 12))
a_pg = cv2.GaussianBlur((1 - ff[1:-1, 1:-1]).astype(np.float32), (0, 0), 1.0)
ys, xs = np.nonzero(a_pg > 0.5); y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
PINGO = (pg[y0:y1, x0:x1][..., ::-1].astype(np.float32), a_pg[y0:y1, x0:x1, None])

def cola(img, rgb, a, x, y, esc=1.0):
    if esc != 1.0:
        rgb = cv2.resize(rgb, None, fx=esc, fy=esc); a = cv2.resize(a[..., 0], None, fx=esc, fy=esc)[..., None]
    x, y = int(round(x)), int(round(y)); h, w = a.shape[:2]
    X0, Y0, X1, Y1 = max(x, 0), max(y, 0), min(x + w, W), min(y + h, H)
    if X0 >= X1 or Y0 >= Y1: return
    sub_a = a[Y0 - y:Y1 - y, X0 - x:X1 - x]; sub = rgb[Y0 - y:Y1 - y, X0 - x:X1 - x]
    img[Y0:Y1, X0:X1] = img[Y0:Y1, X0:X1] * (1 - sub_a) + sub * sub_a

def mao(img, M, ponto, sombra=True):
    rgb, a, (tx, ty) = M; x, y = ponto[0] - tx, ponto[1] - ty
    if sombra:  # sombra suave da mão no papel
        sa = cv2.GaussianBlur(a[..., 0], (0, 0), 14)[..., None] * 0.18
        cola(img, np.zeros_like(rgb), sa, x + 25, y + 30)
    cola(img, rgb, a, x, y)

# ---------------- camadas que crescem ----------------
contorno = cairo.ImageSurface(cairo.FORMAT_A8, W, H); cc = cairo.Context(contorno)
cc.set_line_width(17); cc.set_line_cap(cairo.LINE_CAP_ROUND); cc.set_line_join(cairo.LINE_JOIN_ROUND)
def a8(surf):
    surf.flush(); st = surf.get_stride()
    return np.ndarray((H, st), np.uint8, surf.get_data())[:, :W].astype(np.float32) / 255

def mascara_regiao(forma, buracos=()):
    s = cairo.ImageSurface(cairo.FORMAT_A8, W, H); c = cairo.Context(s)
    c.set_fill_rule(cairo.FILL_RULE_EVEN_ODD)
    for p in [forma, *buracos]:
        c.move_to(*p[0]); [c.line_to(*q) for q in p[1:]]; c.close_path()
    c.fill(); return a8(s)

def caminho_pincel(forma, buracos=(), passo=30, ang=-30, celula=190):
    """Pinceladas em zigue-zague curto, uma área de cada vez (como uma pessoa pinta)."""
    poly = forma.astype(np.float32).reshape(-1, 1, 2)
    def dentro(p): return (cv2.pointPolygonTest(poly, (float(p[0]), float(p[1])), True) > 6
                           and all(np.hypot(*(p - np.array(b))) > r + 6 for b, r in buracos))
    x0, y0 = forma.min(0) - 20; x1, y1 = forma.max(0) + 20
    cols = np.arange(x0, x1, celula); lins = np.arange(y0, y1, celula); pts = []
    r_ = np.random.default_rng(5)
    for li, cy in enumerate(lins):
        ordem = cols if li % 2 == 0 else cols[::-1]
        for cx in ordem:
            a = math.radians(ang + r_.uniform(-25, 25)); ca, sa = math.cos(a), math.sin(a)
            ida = True; m = celula * 0.75
            for d in np.arange(-m, m, passo):
                u = np.linspace(-m, m, 40) if ida else np.linspace(m, -m, 40)
                lin = np.c_[cx + celula / 2 - d * sa + u * ca, cy + celula / 2 + d * ca + u * sa]
                lin += r_.normal(0, 2.5, lin.shape)
                ok = [q for q in lin if dentro(q)]
                if ok: pts.extend(ok); ida = not ida
    return np.array(pts)

PINTURAS = [  # (nome, caminho, máscara da região, textura, largura do pincel)
    ("corpo", caminho_pincel(corpo, [(olhoE, OLHO_R), (olhoD, OLHO_R)]),
     mascara_regiao(corpo, [circ(olhoE, OLHO_R), circ(olhoD, OLHO_R)]), "verm", 62),
    ("folha", caminho_pincel(folha, passo=20, ang=-25, celula=90), mascara_regiao(folha), "verde", 40),
    ("cabo", cabo.copy(), None, "marrom", 22),
]
tinta = {n: cairo.ImageSurface(cairo.FORMAT_A8, W, H) for n, *_ in PINTURAS}

# ---------------- linha do tempo ----------------
T = [  # (início, fim, ação, dado)
    (0.0, 0.8, "entra", ("caneta", 0)),
    (0.8, 4.8, "contorno", 0), (4.8, 6.3, "pausa", None),
    (6.3, 8.8, "contorno", 1), (8.8, 10.3, "pausa", None),
    (10.3, 13.3, "contorno", 2), (13.3, 14.0, "sai", "caneta"), (14.0, 15.0, "pausa", None),
    (15.0, 15.6, "entra", ("pincel", 0)),
    (15.6, 23.6, "pinta", 0), (23.6, 25.6, "pinta", 1), (25.6, 26.8, "pinta", 2),
    (26.8, 27.5, "sai", "pincel"), (27.5, 28.0, "pausa", None),
    (28.0, 33.5, "final", None),
]
DUR = T[-1][1]
def suave(x): x = min(max(x, 0), 1); return x * x * (3 - 2 * x)

# pré-calcula traços do contorno (com o "pulo" entre traços)
def roteiro_contorno(i):
    tracos = PASSOS[i]; Ls = [comp(p) for p in tracos]
    tot = sum(L[-1] for L in Ls) + 120 * (len(tracos) - 1)
    return tracos, Ls, tot
CONT = [roteiro_contorno(i) for i in range(3)]
desenhado = [[0.0] * len(c[0]) for c in CONT]  # quanto de cada traço já foi feito

def avanca_contorno(i, frac):
    tracos, Ls, tot = CONT[i]; alvo = frac * tot; ponta = None
    for j, (p, L) in enumerate(zip(tracos, Ls)):
        ini = sum(Ls[k][-1] + 120 for k in range(j))
        loc = min(max(alvo - ini, 0), L[-1])
        if loc > desenhado[i][j]:
            a, _ = ponto_em(p, L, desenhado[i][j]); b, k2 = ponto_em(p, L, loc)
            k1 = int(np.searchsorted(L, desenhado[i][j]))
            cc.move_to(*a); [cc.line_to(*q) for q in p[k1:k2]]; cc.line_to(*b); cc.set_source_rgba(0, 0, 0, 1); cc.stroke()
            desenhado[i][j] = loc
        if alvo >= ini - 120 and alvo <= ini + L[-1]:
            ponta = ponto_em(p, L, loc)[0] if alvo >= ini else None
            if ponta is None:  # pulando para o próximo traço: mão em trânsito
                prev = tracos[j - 1][-1]; u = (alvo - (ini - 120)) / 120
                ponta = prev + suave(u) * (p[0] - prev)
    if ponta is None: ponta = tracos[-1][-1]
    if i == 2 and frac >= 1 and not getattr(avanca_contorno, "pupilas", False):
        for c0 in (olhoE, olhoD):  # pupilas pintadas de preto + brilho fica para o desenho final
            cc.arc(c0[0] + 6, c0[1] + 6, 17, 0, 2 * math.pi); cc.fill()
        avanca_contorno.pupilas = True
    return ponta

pint_feito = [0.0, 0.0, 0.0]
def avanca_pintura(i, frac):
    nome, cam_, regiao, _, larg = PINTURAS[i]; L = comp(cam_); alvo = frac * L[-1]
    c = cairo.Context(tinta[nome]); c.set_line_width(larg); c.set_line_cap(cairo.LINE_CAP_ROUND); c.set_line_join(cairo.LINE_JOIN_ROUND)
    if alvo > pint_feito[i]:
        a, k1 = ponto_em(cam_, L, pint_feito[i]); b, k2 = ponto_em(cam_, L, alvo)
        c.move_to(*a); [c.line_to(*q) for q in cam_[k1:k2]]; c.line_to(*b); c.stroke(); pint_feito[i] = alvo
    return ponto_em(cam_, L, alvo)[0]

FORA = {"caneta": np.array([1500, 1250.0]), "pincel": np.array([1500, 1250.0])}

# brilhos do final
BRILHOS = [(rng.uniform(300, 1620), rng.uniform(120, 960), rng.uniform(0, 6.28), rng.uniform(10, 26)) for _ in range(26)]
def estrela(img, x, y, r, a):
    s = cairo.ImageSurface(cairo.FORMAT_A8, 2 * int(r) + 4, 2 * int(r) + 4); c = cairo.Context(s); o = r + 2
    c.move_to(o, o - r); c.curve_to(o, o, o, o, o + r, o); c.curve_to(o, o, o, o, o, o + r)
    c.curve_to(o, o, o, o, o - r, o); c.curve_to(o, o, o, o, o, o - r); c.fill()
    m = a8_small(s)[..., None] * a
    cola(img, np.full(m.shape[:2] + (3,), 255, np.float32), m, x - o, y - o)
def a8_small(s):
    s.flush(); st = s.get_stride(); h, w = s.get_height(), s.get_width()
    return np.ndarray((h, st), np.uint8, s.get_data())[:, :w].astype(np.float32) / 255

def texto(img, txt, cx, cy, alfa):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H); c = cairo.Context(s)
    c.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD); c.set_font_size(110)
    e = c.text_extents(txt); c.move_to(cx - e.width / 2 - e.x_bearing, cy + e.height / 2)
    c.text_path(txt); c.set_source_rgb(0.88, 0.12, 0.18); c.set_line_width(16); c.set_line_join(cairo.LINE_JOIN_ROUND)
    c.stroke_preserve(); c.set_source_rgb(1, 1, 1); c.fill()
    s.flush(); arr = np.ndarray((H, W, 4), np.uint8, s.get_data()).astype(np.float32)
    a = arr[..., 3:4] / 255 * alfa; rgb = arr[..., 2::-1] / np.maximum(arr[..., 3:4] / 255, 1e-3)
    img[:] = img * (1 - a) + rgb * a

# ---------------- som ----------------
SR = 44100; audio = np.zeros(int(DUR * SR) + SR)
def ruido(a, b, vol, freq_mod, passa_alta=True):
    i0, i1 = int(a * SR), int(b * SR); n = i1 - i0; t = np.arange(n) / SR
    r = rng.normal(0, 1, n)
    if passa_alta: r = np.diff(np.r_[0, r])
    else: r = np.convolve(r, np.ones(12) / 12, "same")
    env = np.minimum(1, np.minimum(t / 0.05, (n / SR - t) / 0.08))
    audio[i0:i1] += r * (0.6 + 0.4 * np.abs(np.sin(2 * np.pi * freq_mod * t))) * env * vol
def plim(a, vol=0.22):
    i0 = int(a * SR); n = int(1.2 * SR); t = np.arange(n) / SR
    for k, fq in enumerate([1568, 2093, 2637, 3136]):
        tt = np.clip(t - k * 0.07, 0, None)
        audio[i0:i0 + n] += vol * (t > k * 0.07) * np.sin(2 * np.pi * fq * tt) * np.exp(-tt * 5)
for a, b, acao, d in T:
    if acao == "contorno": ruido(a, b, 0.045, 2.6)
    if acao == "pinta": ruido(a, b, 0.05, 1.8, passa_alta=False)
plim(28.2); plim(29.4, 0.15)

# ---------------- render ----------------
proc = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
                         "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                         "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p",
                         SAIDA + ".video.mp4"], stdin=subprocess.PIPE)
ultimo = {"caneta": FORA["caneta"], "pincel": FORA["pincel"]}
for f in range(int(DUR * FPS)):
    t = f / FPS
    seg = next(s for s in T if s[0] <= t < s[1]) if t < DUR else T[-1]
    a, b, acao, d = seg; u = (t - a) / (b - a)
    img = fundo.copy(); ponto = None; qual = None
    if acao == "contorno":
        ponto = avanca_contorno(d, suave(u) * 0.15 + u * 0.85); qual = "caneta"
    elif acao == "pinta":
        ponto = avanca_pintura(d, u); qual = "pincel"
    elif acao == "entra":
        qual, k = d; alvo = PASSOS[0][0][0] if qual == "caneta" else PINTURAS[0][1][0]
        ponto = FORA[qual] + suave(u) * (alvo - FORA[qual])
    elif acao == "sai":
        qual = d; ponto = ultimo[qual] + suave(u) * (FORA[qual] - ultimo[qual])
    if ponto is not None: ultimo[qual] = np.array(ponto)
    # tinta (glitter) e contorno
    for nome, _, regiao, tx, _ in PINTURAS:
        m = a8(tinta[nome])
        if regiao is not None: m = m * regiao
        if m.any(): img = img * (1 - m[..., None]) + TEX[tx] * m[..., None]
    k = a8(contorno)[..., None]; img = img * (1 - k) + 25 * k
    if acao == "final":
        v = suave(u / 0.18)  # transição para as nuvens
        cena = img.copy()
        # tira os potes no final: recompõe a fruta sobre as nuvens
        fruta_a = np.clip(sum((a8(tinta[n]) * (r if r is not None else 1)) for n, _, r, _, _ in PINTURAS) + a8(contorno), 0, 1)
        fruta_a = cv2.dilate(fruta_a, np.ones((3, 3), np.uint8))
        olhos = mascara_regiao(circ(olhoE, OLHO_R)) + mascara_regiao(circ(olhoD, OLHO_R))
        fruta_a = np.clip(fruta_a + olhos, 0, 1)[..., None]
        z = 1 + 0.08 * suave(u / 0.3)
        M = cv2.getRotationMatrix2D((960, 600), 0, z)
        fr = cv2.warpAffine(cena, M, (W, H), borderValue=(255, 255, 255))
        fa = cv2.warpAffine(fruta_a[..., 0], M, (W, H))[..., None]
        ceu = nuvens * v + fundo * (1 - v)
        img = ceu * (1 - fa) + fr * fa
        # brilho branco na maçã
        if u > 0.12:
            s = cairo.ImageSurface(cairo.FORMAT_A8, W, H); c = cairo.Context(s); c.set_line_width(24); c.set_line_cap(cairo.LINE_CAP_ROUND)
            c.arc(960, 600, 250 * z, math.radians(198), math.radians(232)); c.stroke()
            mm = a8(s)[..., None] * 0.85 * suave((u - 0.12) / 0.1); img = img * (1 - mm) + 255 * mm
        for (x, y, ph, r) in BRILHOS:
            al = max(0, math.sin(t * 4 + ph)) * suave((u - 0.1) / 0.2)
            if al > 0.02: estrela(img, x, y, r, al)
        # Pingo aparece pulando
        if u > 0.25:
            p = suave((u - 0.25) / 0.12); pul = abs(math.sin((t - 29.4) * 5)) * 18 * (u < 0.6)
            rgb, aa = PINGO; esc = 330 / rgb.shape[0] * (0.6 + 0.4 * p)
            cola(img, rgb, aa * p, 1430, 860 - rgb.shape[0] * esc - pul, esc)
        if u > 0.32: texto(img, "Maçã", 960, 985, suave((u - 0.32) / 0.1))
    if qual is not None and acao != "final":
        mao(img, MAO_CANETA if qual == "caneta" else MAO_PINCEL, ultimo[qual])
    proc.stdin.write(np.clip(img, 0, 255).astype(np.uint8).tobytes())
proc.stdin.close(); proc.wait()

audio = np.clip(audio[:int(DUR * SR)], -1, 1)
with wave.open(SAIDA + ".wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((audio * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", SAIDA + ".video.mp4", "-i", SAIDA + ".wav",
                "-c:v", "copy", "-c:a", "aac", "-b:a", "128k", "-shortest", SAIDA], check=True)
os.remove(SAIDA + ".video.mp4"); os.remove(SAIDA + ".wav")
print("ok", SAIDA)
