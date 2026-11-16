"""Identidade visual do canal Pingo Pinta (grátis, com as artes do canal).
- foto de perfil 800x800 (YouTube) e 1080x1080 (Instagram/TikTok): pensada para o recorte redondo
- banner do YouTube 2560x1440 com tudo importante dentro da área segura (1546x423 no centro)
Uso: python3 identidade.py <pasta_projeto> <pasta_saida>
"""
import math, os, sys
import numpy as np, cairo, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from frutas import FRUTAS

PROJ, OUT = sys.argv[1], sys.argv[2]
CORES = [(232, 36, 48), (247, 140, 30), (250, 205, 40), (70, 195, 70), (50, 140, 230), (150, 70, 200)]

# ---------- peças ----------
pg = cv2.imread(os.path.join(PROJ, "arte", "pingo", "pingo_opcao_2.jpg")); hh, ww = pg.shape[:2]
ff = np.zeros((hh + 2, ww + 2), np.uint8); tmp = pg.copy()
for q in [(0, 0), (ww - 1, 0), (0, hh - 1), (ww - 1, hh - 1)]: cv2.floodFill(tmp, ff, q, (0, 255, 0), (12,) * 3, (12,) * 3)
m0 = (1 - ff[1:-1, 1:-1]).astype(np.uint8); n_, lab, st, _ = cv2.connectedComponentsWithStats(m0); m0 = (lab == 1 + np.argmax(st[1:, 4])).astype(np.float32)
apg = cv2.GaussianBlur(m0, (0, 0), 1.0); ys, xs = np.nonzero(apg > .5)
PG = pg[ys.min():ys.max(), xs.min():xs.max()][..., ::-1].astype(np.float32); PA = apg[ys.min():ys.max(), xs.min():xs.max()]

def pingo(altura):
    e = altura / PG.shape[0]; w_ = int(PG.shape[1] * e)
    return cv2.resize(PG, (w_, altura), interpolation=cv2.INTER_AREA), cv2.resize(PA, (w_, altura), interpolation=cv2.INTER_AREA)[..., None]

def cola(img, rgb, a, x, y):
    H, W = img.shape[:2]; x, y = int(round(x)), int(round(y)); h, w = a.shape[:2]
    X0, Y0, X1, Y1 = max(x, 0), max(y, 0), min(x + w, W), min(y + h, H)
    if X0 >= X1 or Y0 >= Y1: return
    sa = a[Y0 - y:Y1 - y, X0 - x:X1 - x]; sa = np.where(sa < 0.03, 0, sa)
    img[Y0:Y1, X0:X1] = img[Y0:Y1, X0:X1] * (1 - sa) + rgb[Y0 - y:Y1 - y, X0 - x:X1 - x] * sa

def sombra(img, a, x, y, forca=0.22, blur=12, dx=10, dy=14):
    p = int(blur * 3); ap = np.pad(a[..., 0], p)
    cola(img, np.zeros(ap.shape + (3,), np.float32), cv2.GaussianBlur(ap, (0, 0), blur)[..., None] * forca, x + dx - p, y + dy - p)

def camada(W, H, desenho):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H); c = cairo.Context(s); desenho(c); s.flush()
    arr = np.ndarray((H, W, 4), np.uint8, s.get_data()).astype(np.float32); a = arr[..., 3:4] / 255
    return arr[..., 2::-1] / np.maximum(a, 1e-3), a

def fruta_rgba(spec, altura):
    def d(c):
        def poly(q, f=True):
            c.move_to(*q[0]); [c.line_to(*r) for r in q[1:]]
            if f: c.close_path()
        for q in spec["corpo"]: poly(q)
        c.set_source_rgb(*[v / 255 for v in spec["cor"]]); c.fill()
        for (o, r) in spec["olhos"]: c.arc(o[0], o[1], r, 0, 2 * math.pi); c.set_source_rgb(1, 1, 1); c.fill()
        for dd in spec["detalhes"]:
            c.set_source_rgb(*[v / 255 for v in dd["cor"]])
            if dd["tipo"] == "area":
                for q in dd["forma"]: poly(q)
                c.fill()
            else:
                c.set_line_width(dd.get("larg", 24)); c.set_line_cap(cairo.LINE_CAP_ROUND)
                for q in dd["forma"]: poly(q, False); c.stroke()
        c.set_source_rgb(.11, .11, .11); c.set_line_width(17); c.set_line_cap(cairo.LINE_CAP_ROUND); c.set_line_join(cairo.LINE_JOIN_ROUND)
        for passo in spec["passos"]:
            for q in passo: poly(q, False); c.stroke()
        for q in spec.get("enfeites", []): poly(q); c.fill()
        for (o, r) in spec["olhos"]: c.arc(o[0] + r * .16, o[1] + r * .16, r * .45, 0, 2 * math.pi); c.fill()
    rgb, a = camada(1920, 1080, d); ys, xs = np.nonzero(a[..., 0] > .05)
    rgb, a = rgb[ys.min():ys.max() + 1, xs.min():xs.max() + 1], a[ys.min():ys.max() + 1, xs.min():xs.max() + 1, 0]
    e = altura / rgb.shape[0]; w_ = int(rgb.shape[1] * e)
    return cv2.resize(rgb, (w_, altura), interpolation=cv2.INTER_AREA), cv2.resize(a, (w_, altura), interpolation=cv2.INTER_AREA)[..., None]

def texto_colorido(W, H, linhas, x, y, tam, branco=False, centro=False, espaco=0.02):
    def d(c):
        c.select_font_face("Fredoka", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD); c.set_font_size(tam); k = 0
        for li, linha in enumerate(linhas):
            larg = sum(c.text_extents(ch).x_advance + tam * espaco for ch in linha)
            cx = x - larg / 2 if centro else x; cy = y + li * tam * 1.05
            for ch in linha:
                c.move_to(cx, cy); c.text_path(ch)
                c.set_source_rgb(.1, .1, .12); c.set_line_width(tam * 0.15); c.set_line_join(cairo.LINE_JOIN_ROUND); c.stroke_preserve()
                cor = (255, 255, 255) if branco or not ch.strip() else CORES[k % 6]
                c.set_source_rgb(*[v / 255 for v in cor]); c.fill()
                if ch.strip(): k += 1
                cx += c.text_extents(ch).x_advance + tam * espaco
    return camada(W, H, d)

def gotinhas(img, n, seed, rmin, rmax, alfa=0.35):
    H, W = img.shape[:2]; r_ = np.random.default_rng(seed)
    def d(c):
        for _ in range(n):
            x, y, r = r_.uniform(0, W), r_.uniform(0, H), r_.uniform(rmin, rmax); cor = CORES[r_.integers(6)]
            c.set_source_rgba(*[v / 255 for v in cor], alfa)
            c.move_to(x, y - r * 1.6); c.curve_to(x + r * 0.9, y - r * 0.4, x + r, y + r, x, y + r); c.curve_to(x - r, y + r, x - r * 0.9, y - r * 0.4, x, y - r * 1.6); c.fill()
    rgb, a = camada(W, H, d); cola(img, rgb, a, 0, 0)

def fundo(W, H):
    yy, xx = np.mgrid[:H, :W].astype(np.float32); d = np.sqrt((xx - W / 2) ** 2 + (yy - H / 2) ** 2) / max(W, H)
    return np.array([255, 251, 236], np.float32) * (1 - d[..., None] * 0.25) + np.array([255, 228, 190], np.float32) * (d[..., None] * 0.25)

def salva(img, nome): cv2.imwrite(os.path.join(OUT, nome), np.clip(img, 0, 255).astype(np.uint8)[..., ::-1])

# ---------- foto de perfil ----------
for S, nome in [(800, "perfil_youtube_800.png"), (1080, "perfil_instagram_1080.png")]:
    img = fundo(S, S)
    def anel(c):  # anel de arco-íris (fica dentro do círculo de recorte)
        for i, cor in enumerate(CORES):
            c.set_line_width(S * 0.028); c.set_source_rgb(*[v / 255 for v in cor]); c.arc(S / 2, S / 2, S * 0.47 - i * S * 0.028, 0, 2 * math.pi); c.stroke()
    rgb, a = camada(S, S, anel); cola(img, rgb, a, 0, 0)
    def miolo(c): c.set_source_rgb(1, 0.985, 0.94); c.arc(S / 2, S / 2, S * 0.47 - 6 * S * 0.028 + S * 0.014, 0, 2 * math.pi); c.fill()
    rgb, a = camada(S, S, miolo); cola(img, rgb, a, 0, 0)
    rgb, a = pingo(int(S * 0.56)); x, y = S / 2 - rgb.shape[1] / 2, S * 0.21
    sombra(img, a, x, y, 0.2, S / 70); cola(img, rgb, a, x, y)
    salva(img, nome)

# ---------- banner do YouTube ----------
W, H = 2560, 1440
img = fundo(W, H); gotinhas(img, 70, 3, 14, 34, 0.30)
# área segura: x 507..2053, y 508..931 (1546x423) — tudo que importa fica aqui
def arco(c):
    for i, cor in enumerate(CORES):
        r = 330 - i * 28; c.set_line_width(28); c.set_source_rgb(*[v / 255 for v in cor]); c.arc(1280, 900, r, math.pi, 2 * math.pi); c.stroke()
rgb, a = camada(W, H, arco); sombra(img, a, 0, 0, 0.12, 10); cola(img, rgb, a, 0, 0)
rgb, a = texto_colorido(W, H, ["Pingo Pinta"], 1280, 735, 140, centro=True); sombra(img, a, 0, 0, 0.3, 6, 6, 8); cola(img, rgb, a, 0, 0)
def frase(c):
    c.select_font_face("Fredoka", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD); c.set_font_size(48); t = "Desenhe junto e aprenda as cores!"
    e = c.text_extents(t); c.move_to(1280 - e.width / 2 - e.x_bearing, 845); c.text_path(t)
    c.set_source_rgb(.1, .1, .12); c.set_line_width(9); c.set_line_join(cairo.LINE_JOIN_ROUND); c.stroke_preserve(); c.set_source_rgb(1, 1, 1); c.fill()
rgb, a = camada(W, H, frase); cola(img, rgb, a, 0, 0)
rgb, a = pingo(370); sombra(img, a, 540, 545, 0.22, 10); cola(img, rgb, a, 540, 545)
for i, (fn, x) in enumerate(zip(FRUTAS, [1745, 1865, 1985] * 2)):
    rgb, a = fruta_rgba(fn(), 112 if fn()["nome"] != "banana" else 80)
    yb = 690 if i < 3 else 905
    sombra(img, a, x - rgb.shape[1] / 2, yb - rgb.shape[0], 0.2, 6, 4, 6); cola(img, rgb, a, x - rgb.shape[1] / 2, yb - rgb.shape[0])
salva(img, "banner_youtube_2560x1440.png")
# prévia com a área segura marcada (só para conferir, não é para subir)
prev = img.copy(); cv2.rectangle(prev, (507, 508), (2053, 931), (0, 120, 255), 4); salva(prev, "banner_PREVIA_area_segura.png")
print("ok")
