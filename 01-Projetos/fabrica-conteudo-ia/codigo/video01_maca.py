"""Pingo Pinta · Vídeo 01 · Abertura + Maçã (com o mecanismo próprio do canal).

Mecanismo Pingo (15/11):
  1. O PINGO É A TINTA: a mão só desenha o contorno (a criança desenha junto); quem pinta é o Pingo,
     que pula dentro do desenho e escorrega deixando o rastro de cor.
  2. "DE QUE COR É?": o Pingo pergunta, espera a criança responder e diz a frase mágica
     "Pinga, pinga, Pingo... vermelho!" e vira a cor.
  3. COMPLETAR O ARCO-ÍRIS: cada fruta pronta voa para o arco-íris do canto e acende a faixa dela.
Uso: python3 video01_maca.py <pasta_projeto> <saida.mp4>
"""
import math, os, subprocess, sys, wave
import numpy as np, cairo, cv2

PROJ = sys.argv[1]; SAIDA = sys.argv[2]
ARTE = os.path.join(PROJ, "arte"); AUDIO = os.path.join(PROJ, "audio", "video01")
W, H, FPS, SR = 1920, 1080, 30, 44100
rng = np.random.default_rng(11)
def suave(x): x = min(max(x, 0.0), 1.0); return x * x * (3 - 2 * x)

# ======================= falas (duração real de cada uma) =======================
def carrega_mp3(f):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()
FALAS = [carrega_mp3(os.path.join(AUDIO, f"fala_{i:02d}.mp3")) for i in range(1, 16)]
DF = [len(a) / SR for a in FALAS]

# ======================= roteiro de tempo =======================
ev = {}; t = 0.4
def fala(i, gap=0.35):
    global t; ev[f"f{i}"] = (t, t + DF[i - 1]); t += DF[i - 1] + gap; return ev[f"f{i}"]
ev["pingo_entra"] = (0.0, 0.6)
fala(1); fala(2)
ev["cores"] = (ev["f2"][0] + 1.6, ev["f2"][1] + 0.2)
fala(3); ev["arco_aparece"] = (ev["f3"][0] + 0.8, ev["f3"][0] + 2.0)
ev["mao_entra"] = (t - 0.2, t + 0.5); t += 0.5
fala(4, gap=0); ev["c0"] = (ev["f4"][0] + 0.2, ev["f4"][0] + 4.2); t = ev["c0"][1] + 0.5
fala(5, 0.5)
fala(6, gap=0); ev["c1"] = (ev["f6"][0] + 0.3, ev["f6"][0] + 3.6); t = ev["c1"][1] + 0.5
fala(7, 0.5)
fala(8, gap=0); ev["c2"] = (ev["f8"][0] + 0.3, ev["f8"][0] + 3.4); t = ev["c2"][1] + 0.3
ev["mao_sai"] = (t, t + 0.7); t += 0.4
fala(9, 0.4)
fala(10, 0.0); ev["espera"] = (t, t + 2.4); t += 2.4
fala(11, 0.3); ev["vira_verm"] = ev["f11"][0] + DF[10] * 0.72
fala(12, 0.0); ev["pula_dentro"] = (ev["f12"][1] - 0.9, ev["f12"][1] - 0.1)
ev["pinta0"] = (ev["pula_dentro"][1], ev["pula_dentro"][1] + 7.0); t = ev["pinta0"][1] + 0.2
fala(13, 0.3)
ev["vira_verde"] = ev["f13"][0] + 0.25; ev["pinta1"] = (ev["f13"][0] + 0.45, ev["f13"][0] + 2.0)
ev["vira_marrom"] = ev["f13"][0] + 2.05; ev["pinta2"] = (ev["f13"][0] + 2.2, ev["f13"][0] + 3.1)
ev["pula_fora"] = (ev["pinta2"][1] + 0.1, ev["pinta2"][1] + 0.8); t = max(t, ev["pula_fora"][1] + 0.2)
fala(14, 0.2); ev["brilho"] = ev["f14"][0] + 0.3; ev["voa"] = (ev["f14"][0] + 1.7, ev["f14"][0] + 3.0)
ev["faixa"] = (ev["voa"][1], ev["voa"][1] + 0.8); t = max(t, ev["faixa"][1] + 0.3)
fala(15, 0.3); ev["vira_neutro"] = ev["f15"][0]
DUR = t + 1.6

def p(k, tt):
    a, b = ev[k]; return min(max((tt - a) / (b - a), 0), 1)
def dentro_de(k, tt): a, b = ev[k]; return a <= tt < b

# ======================= geometria da maçã =======================
DX, DY = -60, 10
def bez(p0, p1, p2, p3, n=70):
    tt = np.linspace(0, 1, n)[:, None]; p0, p1, p2, p3 = map(lambda q: np.array(q, float), (p0, p1, p2, p3))
    return (1-tt)**3*p0 + 3*(1-tt)**2*tt*p1 + 3*(1-tt)*tt**2*p2 + tt**3*p3
def cam(segs): o = [bez(*s) for s in segs]; return np.concatenate([x if i == 0 else x[1:] for i, x in enumerate(o)]) + (DX, DY)
def circ(c, r, a0=-90, a1=270, n=90):
    a = np.radians(np.linspace(a0, a1, n)); return np.c_[c[0] + r*np.cos(a), c[1] + r*np.sin(a)]
corpo = cam([[(960, 395), (1040, 330), (1250, 330), (1265, 560)], [(1265, 560), (1280, 780), (1110, 900), (1010, 860)],
             [(1010, 860), (985, 850), (935, 850), (910, 860)], [(910, 860), (810, 900), (640, 780), (655, 560)],
             [(655, 560), (670, 330), (880, 330), (960, 395)]])
cabo = cam([[(960, 400), (955, 350), (965, 300), (990, 262)]])
folha = cam([[(978, 318), (1010, 250), (1090, 232), (1135, 252)], [(1135, 252), (1105, 310), (1030, 336), (978, 318)]])
OE, OD, OR = (885 + DX, 575 + DY), (1035 + DX, 575 + DY), 38
sorriso = circ((960 + DX, 640 + DY), 62, 25, 155, 50)
PASSOS = [[corpo], [cabo, folha], [circ(OE, OR), circ(OD, OR), sorriso]]
def comp(q): return np.concatenate([[0], np.cumsum(np.linalg.norm(np.diff(q, axis=0), axis=1))])
def ponto_em(q, L, d):
    k = int(np.clip(np.searchsorted(L, d), 1, len(q) - 1)); a = (d - L[k-1]) / max(L[k] - L[k-1], 1e-6)
    return q[k-1] + a * (q[k] - q[k-1]), k

# ======================= cairo helpers =======================
def a8_view(s): s.flush(); return np.ndarray((s.get_height(), s.get_stride()), np.uint8, s.get_data())
def mascara(formas):
    s = cairo.ImageSurface(cairo.FORMAT_A8, W, H); c = cairo.Context(s); c.set_fill_rule(cairo.FILL_RULE_EVEN_ODD)
    for q in formas: c.move_to(*q[0]); [c.line_to(*r) for r in q[1:]]; c.close_path()
    c.fill(); return a8_view(s)[:, :W].astype(np.float32) / 255

# ======================= tinta do Pingo (brilhante, com volume) =======================
def tinta(cor, regiao):
    d = cv2.distanceTransform((regiao > 0.5).astype(np.uint8), cv2.DIST_L2, 5)
    vol = 0.80 + 0.20 * np.clip(d / 70, 0, 1)
    return np.array(cor, np.float32)[None, None] * vol[..., None]
VERM, VERDE, MARROM = (232, 36, 48), (70, 195, 70), (140, 85, 40)
R_CORPO = mascara([corpo, circ(OE, OR), circ(OD, OR)]); R_FOLHA = mascara([folha])
R_CABO = np.zeros((H, W), np.float32)
cv2.polylines(R_CABO, [cabo.astype(np.int32)], False, 1.0, 22)
PINT = [  # nome, região, textura, caminho, largura
    ["corpo", R_CORPO, tinta(VERM, R_CORPO), None, 80],
    ["folha", R_FOLHA, tinta(VERDE, R_FOLHA), None, 46],
    ["cabo", R_CABO, np.full((H, W, 3), MARROM, np.float32), cabo.copy(), 26],
]
def zigue(forma, buracos=(), passo=40, celula=200, ang=-30):
    poly = forma.astype(np.float32).reshape(-1, 1, 2); r_ = np.random.default_rng(4)
    def ok(q): return cv2.pointPolygonTest(poly, (float(q[0]), float(q[1])), True) > 10 and all(np.hypot(*(q - np.array(b))) > r + 8 for b, r in buracos)
    x0, y0 = forma.min(0) - 20; x1, y1 = forma.max(0) + 20; pts = []
    for li, cy in enumerate(np.arange(y0, y1, celula)):
        cols = np.arange(x0, x1, celula); cols = cols if li % 2 == 0 else cols[::-1]
        for cx in cols:
            a = math.radians(ang + r_.uniform(-20, 20)); ca, sa = math.cos(a), math.sin(a); ida = True; m = celula * 0.75
            for d in np.arange(-m, m, passo):
                u = np.linspace(-m, m, 30) if ida else np.linspace(m, -m, 30)
                lin = np.c_[cx + celula/2 - d*sa + u*ca, cy + celula/2 + d*ca + u*sa]
                v = [q for q in lin if ok(q)]
                if v: pts.extend(v); ida = not ida
    q = np.array(pts)
    # suaviza o caminho para o Pingo escorregar sem trancos
    k = 7; qs = np.vstack([np.convolve(q[:, i], np.ones(k) / k, "same") for i in range(2)]).T; qs[:k] = q[:k]; qs[-k:] = q[-k:]
    return qs
PINT[0][3] = zigue(corpo, [(OE, OR), (OD, OR)]); PINT[1][3] = zigue(folha, passo=24, celula=90)
mask_tinta = [cairo.ImageSurface(cairo.FORMAT_A8, W, H) for _ in PINT]
contorno = cairo.ImageSurface(cairo.FORMAT_A8, W, H); cc = cairo.Context(contorno)
cc.set_line_width(17); cc.set_line_cap(cairo.LINE_CAP_ROUND); cc.set_line_join(cairo.LINE_JOIN_ROUND)

# a "tela" (papel + tinta + contorno) só é recomposta onde mudou
PAPEL = 255.0
tela = np.full((H, W, 3), PAPEL, np.float32)
def recompor(x0, y0, x1, y1):
    x0, y0, x1, y1 = max(int(x0), 0), max(int(y0), 0), min(int(x1), W), min(int(y1), H)
    if x0 >= x1 or y0 >= y1: return
    b = np.full((y1 - y0, x1 - x0, 3), PAPEL, np.float32)
    for (nome, reg, tex, _, _), ms in zip(PINT, mask_tinta):
        m = a8_view(ms)[y0:y1, x0:x1].astype(np.float32) / 255 * reg[y0:y1, x0:x1]
        b = b * (1 - m[..., None]) + tex[y0:y1, x0:x1] * m[..., None]
    k = a8_view(contorno)[y0:y1, x0:x1].astype(np.float32)[..., None] / 255
    tela[y0:y1, x0:x1] = b * (1 - k) + 28 * k

# ======================= Pingo em várias cores =======================
pg = cv2.imread(os.path.join(ARTE, "pingo", "pingo_opcao_2.jpg")); hh, ww = pg.shape[:2]
ff = np.zeros((hh + 2, ww + 2), np.uint8); tmp = pg.copy()
for q in [(0, 0), (ww - 1, 0), (0, hh - 1), (ww - 1, hh - 1)]: cv2.floodFill(tmp, ff, q, (0, 255, 0), (12,) * 3, (12,) * 3)
apg = cv2.GaussianBlur((1 - ff[1:-1, 1:-1]).astype(np.float32), (0, 0), 1.0)
ys, xs = np.nonzero(apg > 0.5); pg = pg[ys.min():ys.max(), xs.min():xs.max()]; apg = apg[ys.min():ys.max(), xs.min():xs.max()]
hsv = cv2.cvtColor(pg, cv2.COLOR_BGR2HSV).astype(np.float32); hH, sH, vH = hsv[..., 0], hsv[..., 1], hsv[..., 2]
VERMELHA = ((hH < 12) | (hH > 165)) & (sH > 60) & (vH > 60)
CORES_PINGO = {"neutro": (0, 0.10, 1.32), "vermelho": (0, 1, 1), "laranja": (14, 1, 1.05), "amarelo": (27, .95, 1.15),
               "verde": (55, .85, .85), "azul": (105, .95, 1), "roxo": (140, .8, .85), "marrom": (12, .75, .58)}
def pingo_cor(nome):
    th, sm, vm = CORES_PINGO[nome]; o = hsv.copy(); dh = np.where(hH > 90, hH - 180, hH)
    o[..., 0] = np.where(VERMELHA, (th + dh) % 180, hH); o[..., 1] = np.where(VERMELHA, np.clip(sH * sm, 0, 255), sH)
    o[..., 2] = np.where(VERMELHA, np.clip(vH * vm, 0, 255), vH)
    if nome == "neutro":  # gotinha "sem cor": quase branca, levemente azulada
        o[..., 0] = np.where(VERMELHA, 105, o[..., 0])
    return cv2.cvtColor(o.astype(np.uint8), cv2.COLOR_HSV2BGR)[..., ::-1].astype(np.float32)
PINGO = {n: pingo_cor(n) for n in CORES_PINGO}
PA = apg[..., None]; PH = pg.shape[0]

def cola(img, rgb, a, x, y):
    x, y = int(round(x)), int(round(y)); h, w = a.shape[:2]
    X0, Y0, X1, Y1 = max(x, 0), max(y, 0), min(x + w, W), min(y + h, H)
    if X0 >= X1 or Y0 >= Y1: return
    sa = a[Y0 - y:Y1 - y, X0 - x:X1 - x]; img[Y0:Y1, X0:X1] = img[Y0:Y1, X0:X1] * (1 - sa) + rgb[Y0 - y:Y1 - y, X0 - x:X1 - x] * sa

def desenha_pingo(img, cor, cx, base_y, altura, sx=1.0, sy=1.0, ang=0.0, alfa=1.0):
    e = altura / PH; w_, h_ = max(int(pg.shape[1] * e * sx), 2), max(int(PH * e * sy), 2)
    rgb = cv2.resize(PINGO[cor], (w_, h_), interpolation=cv2.INTER_AREA); a = cv2.resize(PA, (w_, h_))[..., None] * alfa
    if ang:
        M = cv2.getRotationMatrix2D((w_ / 2, h_ / 2), ang, 1); rgb = cv2.warpAffine(rgb, M, (w_, h_)); a = cv2.warpAffine(a[..., 0], M, (w_, h_))[..., None]
    # sombrinha no chão
    sh = np.zeros((int(h_ * 0.12) + 2, w_, 1), np.float32); cv2.ellipse(sh, (w_ // 2, sh.shape[0] // 2), (int(w_ * 0.38), max(int(h_ * 0.04), 1)), 0, 0, 360, 0.18 * alfa, -1)
    cola(img, np.zeros(sh.shape[:2] + (3,), np.float32), cv2.GaussianBlur(sh, (0, 0), 4)[..., None] if sh.ndim == 2 else cv2.GaussianBlur(sh[..., 0], (0, 0), 4)[..., None], cx - w_ / 2, base_y - sh.shape[0] / 2)
    cola(img, rgb, a, cx - w_ / 2, base_y - h_)

# ======================= mão com canetão =======================
im = cv2.imread(os.path.join(ARTE, "maos", "mao_caneta.png"), cv2.IMREAD_UNCHANGED); h0, w0 = im.shape[:2]; pad = 900
big = np.zeros((h0 + pad, w0 + pad, 4), np.uint8); big[:h0, :w0] = im; fx = im.copy(); fx[:, :, 3] = 0
fx[h0 - 14:, :, 3] = im[h0 - 14:, :, 3]; fx[:, w0 - 14:, 3] = np.maximum(fx[:, w0 - 14:, 3], im[:, w0 - 14:, 3])
for k in range(1, pad, 2):
    ox, oy = int(k * .42), int(k * .91); reg = big[oy:oy + h0, ox:ox + w0]
    reg[:] = np.where((reg[..., 3:4] == 0) & (fx[..., 3:4] > 0), fx, reg)
big = cv2.resize(big, None, fx=0.95, fy=0.95, interpolation=cv2.INTER_AREA)
MAO = (big[..., :3][..., ::-1].astype(np.float32), big[..., 3:4].astype(np.float32) / 255, (324 * .95, 329 * .95))
MAO_SOMBRA = cv2.GaussianBlur(MAO[1][..., 0], (0, 0), 14)[..., None] * 0.16
def mao(img, q):
    rgb, a, (tx, ty) = MAO; x, y = q[0] - tx, q[1] - ty
    cola(img, np.zeros_like(rgb), MAO_SOMBRA, x + 25, y + 30); cola(img, rgb, a, x, y)

# ======================= arco-íris (canto superior direito) =======================
ARCO_C = (1665, 330); ARCO_CORES = [VERM, (247, 140, 30), (250, 205, 40), (70, 195, 70), (50, 140, 230), (150, 70, 200)]
SLOTS = [(1455 + i * 42 * 2.0, 395) for i in range(6)]
def arco(img, tt, escala, faixas_cheias, enchendo, mini_frutas):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, 560, 420); c = cairo.Context(s)
    c.translate(280, 250); c.scale(escala, escala); c.translate(-280, -250)
    cx, cy = 280, 250
    for i, cor in enumerate(ARCO_CORES):
        r = 215 - i * 25
        c.set_line_width(22); c.set_source_rgb(0.92, 0.92, 0.93); c.arc(cx, cy, r, math.pi, 2 * math.pi); c.stroke()
        frac = 1.0 if i < faixas_cheias else (enchendo if i == faixas_cheias else 0)
        if frac > 0:
            c.set_source_rgb(*[v / 255 for v in cor]); c.arc(cx, cy, r, math.pi, math.pi + math.pi * frac); c.stroke()
    for i, cor in enumerate(ARCO_CORES):  # vaguinhas das frutas
        x = 20 + 42 + i * 84 - 8; y = 315
        c.set_source_rgba(*[v / 255 for v in cor], 0.20); c.arc(x, y, 34, 0, 2 * math.pi); c.fill()
        c.set_dash([6, 6]); c.set_line_width(3); c.set_source_rgb(*[v / 255 for v in cor]); c.arc(x, y, 34, 0, 2 * math.pi); c.stroke(); c.set_dash([])
    s.flush(); arr = np.ndarray((420, 560, 4), np.uint8, s.get_data()).astype(np.float32)
    a = arr[..., 3:4] / 255; rgb = arr[..., 2::-1] / np.maximum(a, 1e-3)
    cola(img, rgb, a, ARCO_C[0] - 280, ARCO_C[1] - 250)
    for (rgbm, am, i) in mini_frutas:
        x = ARCO_C[0] - 280 + 20 + 42 + i * 84 - 8; y = ARCO_C[1] - 250 + 315
        cola(img, rgbm, am, x - am.shape[1] / 2, y - am.shape[0] / 2)
def slot_xy(i): return (ARCO_C[0] - 280 + 20 + 42 + i * 84 - 8, ARCO_C[1] - 250 + 315)

# ======================= respingos, balão, brilho =======================
def respingos(img, cx, cy, cor, u):
    if not 0 < u < 1: return
    for k in range(10):
        a = k / 10 * 2 * math.pi + 0.3; d = 40 + 130 * suave(u); r = 14 * (1 - u) + 3
        x, y = cx + d * math.cos(a), cy + d * math.sin(a) + 60 * u * u
        yy0, xx0 = int(y - r - 2), int(x - r - 2); sz = int(2 * r + 4)
        if sz <= 2: continue
        m = np.zeros((sz, sz), np.float32); cv2.circle(m, (sz // 2, sz // 2), int(r), 1.0, -1); m = cv2.GaussianBlur(m, (0, 0), 1)
        cola(img, np.full((sz, sz, 3), cor, np.float32), m[..., None] * (1 - u * 0.5), xx0, yy0)
def balao(img, x, y, txt, alfa):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, 220, 200); c = cairo.Context(s)
    c.set_source_rgb(1, 1, 1); c.arc(110, 90, 75, 0, 2 * math.pi); c.fill_preserve(); c.set_line_width(6); c.set_source_rgb(.15, .15, .15); c.stroke()
    c.move_to(60, 150); c.line_to(40, 195); c.line_to(95, 160); c.close_path(); c.set_source_rgb(1, 1, 1); c.fill_preserve(); c.set_source_rgb(.15, .15, .15); c.stroke()
    c.select_font_face("DejaVu Sans", 0, 1); c.set_font_size(100); e = c.text_extents(txt)
    c.move_to(110 - e.width / 2 - e.x_bearing, 90 + e.height / 2); c.set_source_rgb(.9, .15, .2); c.show_text(txt)
    s.flush(); arr = np.ndarray((200, 220, 4), np.uint8, s.get_data()).astype(np.float32)
    a = arr[..., 3:4] / 255 * alfa; cola(img, arr[..., 2::-1] / np.maximum(arr[..., 3:4] / 255, 1e-3), a, x, y)

# ======================= estado das animações =======================
CONT = []
for tracos in PASSOS:
    Ls = [comp(q) for q in tracos]; CONT.append((tracos, Ls, sum(L[-1] for L in Ls) + 120 * (len(tracos) - 1)))
feito = [[0.0] * len(c[0]) for c in CONT]; pupilas = [False]
def avanca_contorno(i, frac):
    tracos, Ls, tot = CONT[i]; alvo = frac * tot; ponta = tracos[-1][-1]
    for j, (q, L) in enumerate(zip(tracos, Ls)):
        ini = sum(Ls[k][-1] + 120 for k in range(j)); loc = min(max(alvo - ini, 0), L[-1])
        if loc > feito[i][j]:
            a, k1 = ponto_em(q, L, feito[i][j]); b, k2 = ponto_em(q, L, loc)
            seg = np.vstack([a, q[k1:k2], b]); cc.move_to(*seg[0]); [cc.line_to(*r) for r in seg[1:]]; cc.set_source_rgba(0, 0, 0, 1); cc.stroke()
            recompor(seg[:, 0].min() - 15, seg[:, 1].min() - 15, seg[:, 0].max() + 15, seg[:, 1].max() + 15); feito[i][j] = loc
        if ini - 120 <= alvo <= ini + L[-1]:
            if alvo >= ini: ponta = ponto_em(q, L, loc)[0]
            else: prev = tracos[j - 1][-1]; ponta = prev + suave((alvo - ini + 120) / 120) * (q[0] - prev)
    if i == 2 and frac >= 1 and not pupilas[0]:
        for c0 in (OE, OD): cc.arc(c0[0] + 6, c0[1] + 6, 17, 0, 2 * math.pi); cc.fill()
        recompor(OE[0] - 50, OE[1] - 50, OD[0] + 50, OD[1] + 50); pupilas[0] = True
    return ponta
pfeito = [0.0] * 3
def avanca_pintura(i, frac):
    nome, reg, tex, q, larg = PINT[i]; L = comp(q); alvo = frac * L[-1]
    if alvo > pfeito[i]:
        a, k1 = ponto_em(q, L, pfeito[i]); b, k2 = ponto_em(q, L, alvo); seg = np.vstack([a, q[k1:k2], b])
        c = cairo.Context(mask_tinta[i]); c.set_line_width(larg); c.set_line_cap(cairo.LINE_CAP_ROUND); c.set_line_join(cairo.LINE_JOIN_ROUND)
        c.move_to(*seg[0]); [c.line_to(*r) for r in seg[1:]]; c.stroke(); pfeito[i] = alvo
        recompor(seg[:, 0].min() - larg, seg[:, 1].min() - larg, seg[:, 0].max() + larg, seg[:, 1].max() + larg)
    return ponto_em(q, L, alvo)[0]

CASA = np.array([250.0, 1000.0])  # pés do Pingo quando está "em casa"
FORA = np.array([1500.0, 1250.0])

# ======================= som =======================
N = int(DUR * SR) + SR; voz = np.zeros(N, np.float32); fx_ = np.zeros(N, np.float32)
for i in range(15):
    a = int(ev[f"f{i+1}"][0] * SR); voz[a:a + len(FALAS[i])] += FALAS[i]
def ruido(a, b, vol, mod, alta=True):
    i0, i1 = int(a * SR), int(b * SR); n = i1 - i0; tt = np.arange(n) / SR; r = rng.normal(0, 1, n)
    r = np.diff(np.r_[0, r]) if alta else np.convolve(r, np.ones(30) / 30, "same") * 4
    env = np.minimum(1, np.minimum(tt / .05, (n / SR - tt) / .08)); fx_[i0:i1] += r * (.6 + .4 * np.abs(np.sin(2 * np.pi * mod * tt))) * env * vol
def pinga(a, vol=.35):  # o som-assinatura do Pingo: gota caindo
    i0 = int(a * SR); n = int(.35 * SR); tt = np.arange(n) / SR; f = 1400 * np.exp(-tt * 18) + 380
    fx_[i0:i0 + n] += vol * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9)
def sininho(a, vol=.18):
    i0 = int(a * SR); n = int(1.4 * SR); tt = np.arange(n) / SR
    for k, fq in enumerate([1047, 1319, 1568, 2093]):
        t2 = np.clip(tt - k * .09, 0, None); fx_[i0:i0 + n] += vol * (tt > k * .09) * np.sin(2 * np.pi * fq * t2) * np.exp(-t2 * 4)
def boing(a, vol=.25):
    i0 = int(a * SR); n = int(.4 * SR); tt = np.arange(n) / SR; f = 220 + 500 * tt
    fx_[i0:i0 + n] += vol * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 6)
boing(0.05)
for k in ("c0", "c1", "c2"): ruido(*ev[k], .04, 2.6)
for k in ("pinta0", "pinta1", "pinta2"): ruido(*ev[k], .05, 3.5, alta=False)
for k in np.linspace(ev["cores"][0], ev["cores"][1] - .2, 6): pinga(k, .18)
for k in ("vira_verm", "vira_verde", "vira_marrom"): pinga(ev[k])
pinga(ev["pula_dentro"][1], .3); boing(ev["pula_fora"][0], .2); sininho(ev["brilho"]); sininho(ev["faixa"][0], .22); pinga(ev["vira_neutro"], .2)
env_voz = np.abs(voz); env_voz = np.convolve(env_voz, np.ones(1200) / 1200, "same")

# ======================= render =======================
proc = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
                         "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", SAIDA + ".v.mp4"], stdin=subprocess.PIPE)
cor_atual = "neutro"; ponta_mao = FORA.copy(); mini = []; fruta_sprite = None; pos_pingo = CASA.copy(); NF = int(DUR * FPS)
SEQ_CORES = ["vermelho", "laranja", "amarelo", "verde", "azul", "roxo"]
for f in range(NF):
    tt = f / FPS; img = tela.copy()
    # --- contorno e mão ---
    mao_on = False
    if dentro_de("mao_entra", tt): ponta_mao = FORA + suave(p("mao_entra", tt)) * (PASSOS[0][0][0] - FORA); mao_on = True
    for i, k in enumerate(("c0", "c1", "c2")):
        if tt >= ev[k][0] and feito[i][-1] < CONT[i][1][-1][-1]:
            ponta_mao = avanca_contorno(i, p(k, tt)); mao_on = True
    if ev["mao_entra"][1] <= tt < ev["mao_sai"][0]: mao_on = True
    if dentro_de("mao_sai", tt): ponta_mao = ponta_mao + suave(p("mao_sai", tt)) * (FORA - ponta_mao) * 0.35; mao_on = True
    if tt >= ev["c2"][1] and not pupilas[0]: avanca_contorno(2, 1.0)
    if mao_on: img = img  # mão é desenhada por cima de tudo, no fim
    # --- cor do Pingo ---
    if dentro_de("cores", tt): cor_atual = SEQ_CORES[min(int(p("cores", tt) * 6), 5)]
    if tt >= ev["cores"][1]: cor_atual = "neutro"
    if tt >= ev["vira_verm"]: cor_atual = "vermelho"
    if tt >= ev["vira_verde"]: cor_atual = "verde"
    if tt >= ev["vira_marrom"]: cor_atual = "marrom"
    if tt >= ev["pula_fora"][1]: cor_atual = "vermelho"
    if tt >= ev["vira_neutro"]: cor_atual = "neutro"
    # --- pintura pelo Pingo ---
    pintando = None
    for i, k in enumerate(("pinta0", "pinta1", "pinta2")):
        if tt >= ev[k][0] and pfeito[i] < comp(PINT[i][3])[-1] - 1e-3:
            pintando = avanca_pintura(i, p(k, tt))
    # --- brilho e voo da fruta para o arco-íris ---
    if tt >= ev["brilho"] and fruta_sprite is None:
        s = cairo.ImageSurface(cairo.FORMAT_A8, W, H); c = cairo.Context(s); c.set_line_width(24); c.set_line_cap(cairo.LINE_CAP_ROUND)
        c.arc(960 + DX, 600 + DY, 240, math.radians(198), math.radians(232)); c.stroke(); c.arc(960 + DX, 600 + DY, 240, math.radians(240), math.radians(247)); c.stroke()
        m = a8_view(s)[:, :W].astype(np.float32)[..., None] / 255 * 0.9; tela[:] = tela * (1 - m) + 255 * m
        alfa = np.clip(R_CORPO + R_FOLHA + R_CABO + a8_view(contorno)[:, :W] / 255 + mascara([circ(OE, OR), circ(OD, OR)]), 0, 1)
        alfa = cv2.dilate(alfa, np.ones((5, 5), np.uint8))
        ys_, xs_ = np.nonzero(alfa > .05); bb = (xs_.min(), ys_.min(), xs_.max(), ys_.max())
        fruta_sprite = (tela[bb[1]:bb[3], bb[0]:bb[2]].copy(), alfa[bb[1]:bb[3], bb[0]:bb[2], None].copy(), bb)
        img = tela.copy()
    if fruta_sprite is not None and tt >= ev["voa"][0] and not mini:
        rgbf, af, bb = fruta_sprite; u = suave(p("voa", tt))
        if u > 0 and not getattr(sys, "_limpou", False):
            tela[:] = PAPEL; sys._limpou = True
        img = tela.copy()
        x0c, y0c = (bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2; sx_, sy_ = slot_xy(0)
        esc = 1 - u * (1 - 62 / (bb[3] - bb[1])); x = x0c + (sx_ - x0c) * u; y = y0c + (sy_ - y0c) * u - 180 * math.sin(math.pi * u)
        w_, h_ = int(rgbf.shape[1] * esc), int(rgbf.shape[0] * esc)
        cola(img, cv2.resize(rgbf, (w_, h_)), cv2.resize(af[..., 0], (w_, h_))[..., None], x - w_ / 2, y - h_ / 2)
        if p("voa", tt) >= 1: mini.append((cv2.resize(rgbf, (w_, h_)), cv2.resize(af[..., 0], (w_, h_))[..., None], 0))
    # --- arco-íris ---
    if tt >= ev["arco_aparece"][0]:
        esc = 0.2 + 0.8 * suave(p("arco_aparece", tt)) + 0.08 * math.sin(min(p("arco_aparece", tt), 1) * math.pi)
        arco(img, tt, esc, 0, suave(p("faixa", tt)) if tt >= ev["faixa"][0] else 0, mini)
    # --- Pingo ---
    fala_on = env_voz[min(int(tt * SR), N - 1)]
    sq = 1 + min(fala_on * 2.2, 0.08) * math.sin(tt * 26)
    if tt < ev["pingo_entra"][1]:
        u = p("pingo_entra", tt); x = -120 + (CASA[0] + 120) * suave(u); yb = CASA[1] - 220 * math.sin(math.pi * u)
        desenha_pingo(img, cor_atual, x, yb, 300)
    elif ev["pula_dentro"][0] <= tt < ev["pula_dentro"][1]:
        u = suave(p("pula_dentro", tt)); alvo = PINT[0][3][0] + (0, 75)
        x = CASA[0] + (alvo[0] - CASA[0]) * u; yb = CASA[1] + (alvo[1] - CASA[1]) * u - 260 * math.sin(math.pi * u)
        desenha_pingo(img, cor_atual, x, yb, 300 - 150 * u, ang=-360 * u)
    elif pintando is not None:
        balanco = math.sin(tt * 18) * 8
        desenha_pingo(img, cor_atual, pintando[0], pintando[1] + 75, 150, 1 + .06 * math.sin(tt * 20), 1 - .06 * math.sin(tt * 20), ang=balanco)
    elif ev["pinta0"][0] <= tt < ev["pula_fora"][0]:  # entre uma pintura e outra
        q = PINT[1][3][0] if tt < ev["pinta1"][0] else PINT[2][3][0]
        desenha_pingo(img, cor_atual, q[0], q[1] + 75, 150, 1, 1 + .05 * math.sin(tt * 12))
    elif dentro_de("pula_fora", tt):
        u = suave(p("pula_fora", tt)); orig = PINT[2][3][-1] + (0, 75)
        x = orig[0] + (CASA[0] - orig[0]) * u; yb = orig[1] + (CASA[1] - orig[1]) * u - 300 * math.sin(math.pi * u)
        desenha_pingo(img, cor_atual, x, yb, 150 + 150 * u, ang=360 * u)
    else:
        pulo = 0
        if dentro_de("cores", tt): pulo = abs(math.sin(tt * 9)) * 40
        if dentro_de("espera", tt): pulo = 0
        desenha_pingo(img, cor_atual, CASA[0], CASA[1] - pulo, 300, 1 / sq, sq, ang=8 * math.sin(tt * 2.5) if dentro_de("espera", tt) else 0)
    for k, cor in (("vira_verm", VERM), ("vira_verde", VERDE), ("vira_marrom", MARROM)):
        u = (tt - ev[k]) / 0.6
        if 0 < u < 1:
            q = (CASA[0], CASA[1] - 150) if k == "vira_verm" else (pintando if pintando is not None else PINT[1 if k == "vira_verde" else 2][3][0])
            respingos(img, q[0], q[1], cor, u)
    if dentro_de("espera", tt) or dentro_de("f10", tt):
        balao(img, CASA[0] + 90, CASA[1] - 520, "?", min(1, (tt - ev["f10"][0]) / .3))
    if mao_on: mao(img, ponta_mao)
    proc.stdin.write(np.clip(img, 0, 255).astype(np.uint8).tobytes())
proc.stdin.close(); proc.wait()

mix = voz * 1.0 + fx_ * 0.8; mix = mix / max(1.0, np.abs(mix).max() / 0.95)
with wave.open(SAIDA + ".wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix[:int(DUR * SR)], -1, 1) * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", SAIDA + ".v.mp4", "-i", SAIDA + ".wav", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", SAIDA], check=True)
os.remove(SAIDA + ".v.mp4"); os.remove(SAIDA + ".wav")
print("ok", SAIDA, f"{DUR:.1f}s")
