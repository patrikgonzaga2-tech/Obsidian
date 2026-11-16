"""Miniaturas do vídeo 01 (1280x720), feitas com as artes do próprio vídeo (grátis).
A: "resultado" — arco-íris completo + 6 frutas + Pingo + DESENHE COMIGO
B: "processo"  — a maçã sendo pintada pelo Pingo (quadro do vídeo) + Pingo grande + DESENHE COMIGO
Uso: python3 miniatura.py <pasta_projeto> <quadro_maca_pintando.png> <pasta_saida>
"""
import math, os, sys
import numpy as np, cairo, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from frutas import FRUTAS

PROJ, QUADRO, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
W, H = 1280, 720
CORES = [(232, 36, 48), (247, 140, 30), (250, 205, 40), (70, 195, 70), (50, 140, 230), (150, 70, 200)]

def fruta_rgba(spec, altura):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, 1920, 1080); c = cairo.Context(s)
    def poly(q, f=True):
        c.move_to(*q[0]); [c.line_to(*r) for r in q[1:]]
        if f: c.close_path()
    for q in spec["corpo"]: poly(q)
    c.set_source_rgb(*[v / 255 for v in spec["cor"]]); c.fill()
    for (o, r) in spec["olhos"]: c.arc(o[0], o[1], r, 0, 2 * math.pi); c.set_source_rgb(1, 1, 1); c.fill()
    for d in spec["detalhes"]:
        c.set_source_rgb(*[v / 255 for v in d["cor"]])
        if d["tipo"] == "area":
            for q in d["forma"]: poly(q)
            c.fill()
        else:
            c.set_line_width(d.get("larg", 24)); c.set_line_cap(cairo.LINE_CAP_ROUND)
            for q in d["forma"]: poly(q, False); c.stroke()
    c.set_source_rgb(.11, .11, .11); c.set_line_width(17); c.set_line_cap(cairo.LINE_CAP_ROUND); c.set_line_join(cairo.LINE_JOIN_ROUND)
    for passo in spec["passos"]:
        for q in passo: poly(q, False); c.stroke()
    for q in spec.get("enfeites", []): poly(q); c.fill()
    for (o, r) in spec["olhos"]: c.arc(o[0] + r * .16, o[1] + r * .16, r * .45, 0, 2 * math.pi); c.fill()
    # brilho
    s.flush(); arr = np.ndarray((1080, 1920, 4), np.uint8, s.get_data()).astype(np.float32)
    a = arr[..., 3] / 255; ys, xs = np.nonzero(a > .05); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    rgb = arr[y0:y1, x0:x1, 2::-1] / np.maximum(a[y0:y1, x0:x1, None], 1e-3); a = a[y0:y1, x0:x1]
    e = altura / (y1 - y0); w_ = int((x1 - x0) * e)
    return cv2.resize(rgb, (w_, altura), interpolation=cv2.INTER_AREA), cv2.resize(a, (w_, altura), interpolation=cv2.INTER_AREA)[..., None]

def cola(img, rgb, a, x, y):
    x, y = int(round(x)), int(round(y)); h, w = a.shape[:2]
    X0, Y0, X1, Y1 = max(x, 0), max(y, 0), min(x + w, W), min(y + h, H)
    if X0 >= X1 or Y0 >= Y1: return
    sa = a[Y0 - y:Y1 - y, X0 - x:X1 - x]; sa = np.where(sa < 0.03, 0, sa); img[Y0:Y1, X0:X1] = img[Y0:Y1, X0:X1] * (1 - sa) + rgb[Y0 - y:Y1 - y, X0 - x:X1 - x] * sa

def sombra(img, a, x, y, forca=0.25, blur=10, dx=8, dy=10):
    p = int(blur * 3); ap = np.pad(a[..., 0], p)  # folga para a sombra não ser cortada na borda
    cola(img, np.zeros(ap.shape + (3,), np.float32), cv2.GaussianBlur(ap, (0, 0), blur)[..., None] * forca, x + dx - p, y + dy - p)

# Pingo recortado, em uma cor
pg = cv2.imread(os.path.join(PROJ, "arte", "pingo", "pingo_opcao_2.jpg")); hh, ww = pg.shape[:2]
ff = np.zeros((hh + 2, ww + 2), np.uint8); tmp = pg.copy()
for q in [(0, 0), (ww - 1, 0), (0, hh - 1), (ww - 1, hh - 1)]: cv2.floodFill(tmp, ff, q, (0, 255, 0), (12,) * 3, (12,) * 3)
m0 = (1 - ff[1:-1, 1:-1]).astype(np.uint8); n_, lab, st, _ = cv2.connectedComponentsWithStats(m0); m0 = (lab == 1 + np.argmax(st[1:, 4])).astype(np.float32)
apg = cv2.GaussianBlur(m0, (0, 0), 1.0); ys, xs = np.nonzero(apg > .5)
pg = pg[ys.min():ys.max(), xs.min():xs.max()][..., ::-1].astype(np.float32); apg = apg[ys.min():ys.max(), xs.min():xs.max(), None]
def pingo(altura):
    e = altura / pg.shape[0]; w_ = int(pg.shape[1] * e)
    return cv2.resize(pg, (w_, altura), interpolation=cv2.INTER_AREA), cv2.resize(apg, (w_, altura))[..., None]

def texto(img, linhas, x, y, tam, cores_letras=True):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H); c = cairo.Context(s)
    c.select_font_face("Fredoka", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD); c.set_font_size(tam)
    k = 0
    for li, linha in enumerate(linhas):
        cx = x; cy = y + li * tam * 1.02
        for ch in linha:
            c.move_to(cx, cy); c.text_path(ch)
            c.set_source_rgb(.1, .1, .12); c.set_line_width(tam * 0.16); c.set_line_join(cairo.LINE_JOIN_ROUND); c.stroke_preserve()
            cor = CORES[k % 6] if cores_letras and ch.strip() else (255, 255, 255)
            c.set_source_rgb(*[v / 255 for v in cor]); c.fill()
            if ch.strip(): k += 1
            cx += c.text_extents(ch).x_advance + tam * 0.02
    s.flush(); arr = np.ndarray((H, W, 4), np.uint8, s.get_data()).astype(np.float32)
    a = arr[..., 3:4] / 255; rgb = arr[..., 2::-1] / np.maximum(a, 1e-3)
    sombra(img, a, 0, 0, 0.35, 6, 6, 8); cola(img, rgb, a, 0, 0)

def fundo():
    yy, xx = np.mgrid[:H, :W].astype(np.float32)
    d = np.sqrt((xx - 860) ** 2 + (yy - 330) ** 2) / 900
    base = np.array([255, 251, 236], np.float32) * (1 - d[..., None] * 0.15) + np.array([255, 236, 200], np.float32) * (d[..., None] * 0.15)
    return base

# ---------------- A: resultado ----------------
img = fundo()
s = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H); c = cairo.Context(s)
cx, cy = 905, 420
for i, cor in enumerate(CORES):
    r = 340 - i * 42; c.set_line_width(44); c.set_source_rgb(*[v / 255 for v in cor]); c.arc(cx, cy, r, math.pi, 2 * math.pi); c.stroke()
s.flush(); arr = np.ndarray((H, W, 4), np.uint8, s.get_data()).astype(np.float32); a = arr[..., 3:4] / 255
sombra(img, a, 0, 0, 0.18, 8); cola(img, arr[..., 2::-1] / np.maximum(a, 1e-3), a, 0, 0)
xs_ = np.linspace(600, 1210, 6)
for i, (fn, x) in enumerate(zip(FRUTAS, xs_)):
    rgb, a = fruta_rgba(fn(), 125 if fn().get("nome") != "banana" else 100)
    yb = 600 if i % 2 == 0 else 615
    sombra(img, a, x - rgb.shape[1] / 2, yb - rgb.shape[0], 0.25, 6, 4, 6); cola(img, rgb, a, x - rgb.shape[1] / 2, yb - rgb.shape[0])
rgb, a = pingo(400); sombra(img, a, 70, 300, 0.25, 10); cola(img, rgb, a, 70, 300)
texto(img, ["DESENHE", "COMIGO"], 40, 120, 110)
cv2.imwrite(os.path.join(OUT, "miniatura_A_resultado.png"), np.clip(img, 0, 255).astype(np.uint8)[..., ::-1])

# ---------------- B: processo ----------------
img = fundo()
q = cv2.imread(QUADRO)[..., ::-1].astype(np.float32)   # 1920x1080 do vídeo
crop = q[200:930, 560:1250]  # a maçã sendo pintada
e = 650 / crop.shape[0]; crop = cv2.resize(crop, (int(crop.shape[1] * e), 650), interpolation=cv2.INTER_AREA)
m = (crop.mean(2) < 245).astype(np.float32); m = cv2.dilate(m, np.ones((9, 9), np.uint8)); m = cv2.GaussianBlur(m, (0, 0), 2)
# fecha o miolo branco da maçã para não "furar" no fundo creme
cnts, _ = cv2.findContours((m > .5).astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cheio = np.zeros_like(m); cv2.drawContours(cheio, cnts, -1, 1.0, -1); cheio = cv2.GaussianBlur(cheio, (0, 0), 1.5)[..., None]
sombra(img, cheio, 470, 40, 0.18, 10); cola(img, crop, cheio, 470, 40)
rgb, a = pingo(330); sombra(img, a, 1000, 330, 0.25, 10)
M = cv2.getRotationMatrix2D((rgb.shape[1] / 2, rgb.shape[0] / 2), -14, 1)
rgb = cv2.warpAffine(rgb, M, (rgb.shape[1], rgb.shape[0])); a = cv2.warpAffine(a[..., 0], M, (rgb.shape[1], rgb.shape[0]))[..., None]
cola(img, rgb, a, 1000, 330)
texto(img, ["DESENHE", "COMIGO"], 40, 150, 110)
cv2.imwrite(os.path.join(OUT, "miniatura_B_processo.png"), np.clip(img, 0, 255).astype(np.uint8)[..., ::-1])
print("ok")
