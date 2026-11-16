"""Pingo Pinta · Vídeo 01 completo: abertura + 6 frutas do arco-íris + final.

Mecanismo Pingo: a mão desenha o contorno (a criança desenha junto); o Pingo pergunta a cor, diz
"Pinga, pinga, Pingo… <cor>!", pula dentro do desenho e pinta escorregando; a fruta voa para o arco-íris
e acende a sua faixa; no fim o arco-íris completo cresce no meio da tela.
Uso: python3 video01_completo.py <pasta_projeto> <saida.mp4> [segundos_max_para_teste]
"""
import math, os, subprocess, sys, wave
import numpy as np, cairo, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from frutas import FRUTAS, FALAS

PROJ = sys.argv[1]; SAIDA = sys.argv[2]; TMAX = float(sys.argv[3]) if len(sys.argv) > 3 else None
TINI = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0  # só para teste rápido de um trecho
ARTE = os.path.join(PROJ, "arte"); AUDIO = os.path.join(PROJ, "audio", "video01")
W, H, FPS, SR = 1920, 1080, 30, 44100
rng = np.random.default_rng(11)
def suave(x): x = min(max(x, 0.0), 1.0); return x * x * (3 - 2 * x)

# ======================= áudio das falas =======================
_cache = {}
def aud(nome):
    if nome not in _cache:
        raw = subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(AUDIO, nome + ".mp3"), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                             capture_output=True, check=True).stdout
        _cache[nome] = np.frombuffer(raw, np.float32).copy()
    return _cache[nome]
def dur(nome): return len(aud(nome)) / SR
FALAS_TL = []  # (início, nome)
def fala(t, nome): FALAS_TL.append((t, nome)); return t + dur(nome)

# ======================= cairo / composição =======================
def a8_view(s): s.flush(); return np.ndarray((s.get_height(), s.get_stride()), np.uint8, s.get_data())
def mascara_polys(polys, buracos=()):
    s = cairo.ImageSurface(cairo.FORMAT_A8, W, H); c = cairo.Context(s)
    for q in polys: c.move_to(*q[0]); [c.line_to(*r) for r in q[1:]]; c.close_path()
    c.fill()
    c.set_operator(cairo.OPERATOR_CLEAR)
    for q in buracos: c.move_to(*q[0]); [c.line_to(*r) for r in q[1:]]; c.close_path(); c.fill()
    return a8_view(s)[:, :W].astype(np.float32) / 255
def mascara_traco(strokes, larg):
    m = np.zeros((H, W), np.float32)
    for q in strokes: cv2.polylines(m, [q.astype(np.int32)], False, 1.0, larg, cv2.LINE_AA)
    return m
def tinta(cor, regiao):
    d = cv2.distanceTransform((regiao > 0.5).astype(np.uint8), cv2.DIST_L2, 5)
    return np.array(cor, np.float32)[None, None] * (0.80 + 0.20 * np.clip(d / 70, 0, 1))[..., None]
def zigue_mask(regiao, passo=40, celula=200, ang=-30, margem=10, seed=4):
    r_ = np.random.default_rng(seed); d = cv2.distanceTransform((regiao > 0.5).astype(np.uint8), cv2.DIST_L2, 5)
    ys, xs = np.nonzero(regiao > 0.5); x0, x1, y0, y1 = xs.min() - 20, xs.max() + 20, ys.min() - 20, ys.max() + 20
    def ok(q):
        x, y = int(q[0]), int(q[1]); return 0 <= x < W and 0 <= y < H and d[y, x] > margem
    pts = []
    for li, cy in enumerate(np.arange(y0, y1, celula)):
        cols = np.arange(x0, x1, celula); cols = cols if li % 2 == 0 else cols[::-1]
        for cx in cols:
            a = math.radians(ang + r_.uniform(-20, 20)); ca, sa = math.cos(a), math.sin(a); ida = True; m = celula * 0.75
            for dd in np.arange(-m, m, passo):
                u = np.linspace(-m, m, 30) if ida else np.linspace(m, -m, 30)
                lin = np.c_[cx + celula / 2 - dd * sa + u * ca, cy + celula / 2 + dd * ca + u * sa]
                v = [q for q in lin if ok(q)]
                if v: pts.extend(v); ida = not ida
    if not pts:  # região muito pequena: passa pelo meio dela
        return np.array([[xs.mean() - 5, ys.mean()], [xs.mean() + 5, ys.mean()]])
    q = np.array(pts); k = min(7, len(q))
    qs = np.vstack([np.convolve(q[:, i], np.ones(k) / k, "same") for i in range(2)]).T; qs[:k] = q[:k]; qs[-k:] = q[-k:]
    return qs
def comp(q): return np.concatenate([[0], np.cumsum(np.linalg.norm(np.diff(q, axis=0), axis=1))])
def ponto_em(q, L, d):
    k = int(np.clip(np.searchsorted(L, d), 1, len(q) - 1)); a = (d - L[k-1]) / max(L[k] - L[k-1], 1e-6)
    return q[k-1] + a * (q[k] - q[k-1]), k
def cola(img, rgb, a, x, y):
    x, y = int(round(x)), int(round(y)); h, w = a.shape[:2]
    X0, Y0, X1, Y1 = max(x, 0), max(y, 0), min(x + w, W), min(y + h, H)
    if X0 >= X1 or Y0 >= Y1: return
    sa = a[Y0 - y:Y1 - y, X0 - x:X1 - x]; img[Y0:Y1, X0:X1] = img[Y0:Y1, X0:X1] * (1 - sa) + rgb[Y0 - y:Y1 - y, X0 - x:X1 - x] * sa

PAPEL = 255.0
tela = np.full((H, W, 3), PAPEL, np.float32)

# ======================= Pingo =======================
pg = cv2.imread(os.path.join(ARTE, "pingo", "pingo_opcao_2.jpg")); hh, ww = pg.shape[:2]
ff = np.zeros((hh + 2, ww + 2), np.uint8); tmp = pg.copy()
for q in [(0, 0), (ww - 1, 0), (0, hh - 1), (ww - 1, hh - 1)]: cv2.floodFill(tmp, ff, q, (0, 255, 0), (12,) * 3, (12,) * 3)
apg = cv2.GaussianBlur((1 - ff[1:-1, 1:-1]).astype(np.float32), (0, 0), 1.0)
ys, xs = np.nonzero(apg > 0.5); pg = pg[ys.min():ys.max(), xs.min():xs.max()]; apg = apg[ys.min():ys.max(), xs.min():xs.max()]
hsv = cv2.cvtColor(pg, cv2.COLOR_BGR2HSV).astype(np.float32); hH, sH, vH = hsv[..., 0], hsv[..., 1], hsv[..., 2]
VERMELHA = ((hH < 12) | (hH > 165)) & (sH > 60) & (vH > 60)
CORES_PINGO = {"neutro": (105, 0.10, 1.32), "vermelho": (0, 1, 1), "laranja": (14, 1, 1.05), "amarelo": (27, .95, 1.15),
               "verde": (55, .85, .85), "azul": (105, .95, 1), "roxo": (140, .8, .85), "marrom": (12, .75, .58),
               "verde_escuro": (58, .9, .55), "azul_escuro": (110, .95, .55)}
def pingo_cor(nome):
    th, sm, vm = CORES_PINGO[nome]; o = hsv.copy(); dh = 0 if nome == "neutro" else np.where(hH > 90, hH - 180, hH)
    o[..., 0] = np.where(VERMELHA, (th + dh) % 180, hH); o[..., 1] = np.where(VERMELHA, np.clip(sH * sm, 0, 255), sH)
    o[..., 2] = np.where(VERMELHA, np.clip(vH * vm, 0, 255), vH)
    return cv2.cvtColor(o.astype(np.uint8), cv2.COLOR_HSV2BGR)[..., ::-1].astype(np.float32)
PINGO = {n: pingo_cor(n) for n in CORES_PINGO}; PA = apg[..., None]; PH = pg.shape[0]
def desenha_pingo(img, cor, cx, base_y, altura, sx=1.0, sy=1.0, ang=0.0):
    e = altura / PH; w_, h_ = max(int(pg.shape[1] * e * sx), 2), max(int(PH * e * sy), 2)
    rgb = cv2.resize(PINGO[cor], (w_, h_), interpolation=cv2.INTER_AREA); a = cv2.resize(PA, (w_, h_))[..., None]
    if ang:
        M = cv2.getRotationMatrix2D((w_ / 2, h_ / 2), ang, 1); rgb = cv2.warpAffine(rgb, M, (w_, h_)); a = cv2.warpAffine(a[..., 0], M, (w_, h_))[..., None]
    sh = np.zeros((int(h_ * 0.12) + 4, w_), np.float32)
    cv2.ellipse(sh, (w_ // 2, sh.shape[0] // 2), (int(w_ * 0.38), max(int(h_ * 0.04), 1)), 0, 0, 360, 0.18, -1)
    cola(img, np.zeros(sh.shape + (3,), np.float32), cv2.GaussianBlur(sh, (0, 0), 4)[..., None], cx - w_ / 2, base_y - sh.shape[0] / 2)
    cola(img, rgb, a, cx - w_ / 2, base_y - h_)

# ======================= mão =======================
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

# ======================= arco-íris =======================
ARCO_C = np.array([1665.0, 330.0])
ARCO_CORES = [(232, 36, 48), (247, 140, 30), (250, 205, 40), (70, 195, 70), (50, 140, 230), (150, 70, 200)]
NOMES_CORES = ["vermelho", "laranja", "amarelo", "verde", "azul", "roxo"]
def slot_local(i): return (20 + 42 + i * 84 - 8, 315)
def arco_sprite(cheias, enchendo, minis, pulsos):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, 560, 420); c = cairo.Context(s); cx, cy = 280, 250
    for i, cor in enumerate(ARCO_CORES):
        r = 215 - i * 25; lw = 22 + 10 * pulsos.get(i, 0)
        c.set_line_width(22); c.set_source_rgb(0.92, 0.92, 0.93); c.arc(cx, cy, r, math.pi, 2 * math.pi); c.stroke()
        frac = 1.0 if i in cheias else (enchendo[1] if enchendo and enchendo[0] == i else 0)
        if frac > 0:
            c.set_line_width(lw); k = 1 + 0.25 * pulsos.get(i, 0)
            c.set_source_rgb(*[min(1, v / 255 * k) for v in cor]); c.arc(cx, cy, r, math.pi, math.pi + math.pi * frac); c.stroke()
    for i, cor in enumerate(ARCO_CORES):
        x, y = slot_local(i)
        c.set_source_rgba(*[v / 255 for v in cor], 0.20); c.arc(x, y, 34, 0, 2 * math.pi); c.fill()
        c.set_dash([6, 6]); c.set_line_width(3); c.set_source_rgb(*[v / 255 for v in cor]); c.arc(x, y, 34, 0, 2 * math.pi); c.stroke(); c.set_dash([])
    s.flush(); arr = np.ndarray((420, 560, 4), np.uint8, s.get_data()).astype(np.float32)
    a = arr[..., 3:4] / 255; rgb = arr[..., 2::-1] / np.maximum(a, 1e-3)
    for (rgbm, am, i) in minis:
        x, y = slot_local(i); xx, yy = int(x - am.shape[1] / 2), int(y - am.shape[0] / 2)
        sub = (slice(yy, yy + am.shape[0]), slice(xx, xx + am.shape[1]))
        rgb[sub] = rgb[sub] * (1 - am) + rgbm * am; a[sub] = np.maximum(a[sub], am)
    return rgb, a
def desenha_arco(img, escala, centro, cheias, enchendo, minis, pulsos=None):
    rgb, a = arco_sprite(cheias, enchendo, minis, pulsos or {})
    if escala != 1.0:
        w_, h_ = int(560 * escala), int(420 * escala); rgb = cv2.resize(rgb, (w_, h_)); a = cv2.resize(a[..., 0], (w_, h_))[..., None]
    cola(img, rgb, a, centro[0] - 280 * escala, centro[1] - 250 * escala)

# ======================= respingos, balão, confete =======================
def respingos(img, cx, cy, cor, u, n=10, dist=170):
    if not 0 < u < 1: return
    for k in range(n):
        a = k / n * 2 * math.pi + 0.3; d = 40 + dist * suave(u); r = 14 * (1 - u) + 3
        x, y = cx + d * math.cos(a), cy + d * math.sin(a) + 60 * u * u; sz = int(2 * r + 4)
        m = np.zeros((sz, sz), np.float32); cv2.circle(m, (sz // 2, sz // 2), int(r), 1.0, -1); m = cv2.GaussianBlur(m, (0, 0), 1)
        cola(img, np.full((sz, sz, 3), cor, np.float32), m[..., None] * (1 - u * 0.5), x - sz / 2, y - sz / 2)
def balao(img, x, y, txt, alfa):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, 220, 200); c = cairo.Context(s)
    c.set_source_rgb(1, 1, 1); c.arc(110, 90, 75, 0, 2 * math.pi); c.fill_preserve(); c.set_line_width(6); c.set_source_rgb(.15, .15, .15); c.stroke()
    c.move_to(60, 150); c.line_to(40, 195); c.line_to(95, 160); c.close_path(); c.set_source_rgb(1, 1, 1); c.fill_preserve(); c.set_source_rgb(.15, .15, .15); c.stroke()
    c.select_font_face("DejaVu Sans", 0, 1); c.set_font_size(100); e = c.text_extents(txt)
    c.move_to(110 - e.width / 2 - e.x_bearing, 90 + e.height / 2); c.set_source_rgb(.9, .15, .2); c.show_text(txt)
    s.flush(); arr = np.ndarray((200, 220, 4), np.uint8, s.get_data()).astype(np.float32)
    cola(img, arr[..., 2::-1] / np.maximum(arr[..., 3:4] / 255, 1e-3), arr[..., 3:4] / 255 * alfa, x, y)

# ======================= linha do tempo global =======================
CASA = np.array([250.0, 1000.0]); ALT = 300; FORA = np.array([1500.0, 1250.0])
COR_EV = []        # (t, cor_do_pingo)
RESP_EV = []       # (t, cor_rgb, posição ou None=no Pingo)
SFX = []           # (t, tipo, extra)
ESPERA = []        # (início, fim, mostrar_balao_desde)
SALTOS = []        # (início, fim, de, para, alt_de, alt_para, giro)
PINTANDO = []      # (início, fim, fruta, índice_da_pintura)
PARADO = []        # (início, fim, posição dos pés, altura)  — Pingo esperando dentro do desenho

# ----- abertura com o GANCHO A (escolhido pelo Patrik em 16/11) -----
# 1º segundo: o arco-íris COMPLETO com as 6 frutas e o Pingo trocando de cor ("olha o que a gente vai fazer").
# Depois a tela "volta": o arco-íris encolhe para o canto e esvazia, e o desenho começa.
def mini_fruta(spec, altura=62):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H); c = cairo.Context(s)
    def poly(q, fechado=True):
        c.move_to(*q[0]); [c.line_to(*r) for r in q[1:]]
        if fechado: c.close_path()
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
    s.flush(); arr = np.ndarray((H, W, 4), np.uint8, s.get_data()).astype(np.float32)
    a = arr[..., 3] / 255; ys_, xs_ = np.nonzero(a > .05); y0, y1, x0, x1 = ys_.min(), ys_.max() + 1, xs_.min(), xs_.max() + 1
    rgb = arr[y0:y1, x0:x1, 2::-1] / np.maximum(a[y0:y1, x0:x1, None], 1e-3); a = a[y0:y1, x0:x1]
    e = altura / (y1 - y0); w_, h_ = max(int((x1 - x0) * e), 2), altura
    return cv2.resize(rgb, (w_, h_), interpolation=cv2.INTER_AREA), cv2.resize(a, (w_, h_), interpolation=cv2.INTER_AREA)[..., None]
MINIS_GANCHO = [(*mini_fruta(fn()), i) for i, fn in enumerate(FRUTAS)]
CENTRO_GRANDE = np.array([1000.0, 560.0])

t = 0.3
t = fala(t, "gancho_a") + 0.5
GANCHO = (0.0, t)
CORES_ABERTURA = GANCHO
for k in range(int(t / 0.45)): COR_EV.append((k * 0.45, NOMES_CORES[k % 6])); SFX.append((k * 0.45, "pinga", .12))
SFX.append((0.0, "sininho", .18))
VOLTA = (t, t + 1.2); SFX.append((VOLTA[0], "whoosh", VOLTA[1])); COR_EV.append((VOLTA[0] + 0.6, "neutro")); SFX.append((VOLTA[1], "pinga", .25))
t = VOLTA[1] + 0.2
t = fala(t, "fala_01") + 0.3
t = fala(t, "comecar") + 0.35
ARCO_APARECE = (0.0, 0.001)
t -= 0.2

# ======================= frutas =======================
class Fruta:
    def __init__(self, spec, idx, t):
        self.s = spec; self.idx = idx; F = FALAS[spec["nome"]]; self.ev = ev = {}
        self.preparada = False
        # ---- tempos ----
        ev["mao_entra"] = (t, t + 0.7); t += 0.7
        t0 = t; t = fala(t + 0.1, F["s1"]); ev["c0"] = (t0 + 0.2, max(t0 + 3.8, t)); t = ev["c0"][1] + 1.6
        t = fala(t, F["ok1"]) + 0.4
        t0 = t; t = fala(t, F["s2"]); ev["c1"] = (t0 + 0.3, max(t0 + 3.3, t)); t = ev["c1"][1] + 1.6
        t = fala(t, F["ok2"]) + 0.4
        t0 = t; t = fala(t, F["s3"]); ev["c2"] = (t0 + 0.3, max(t0 + 3.3, t)); t = ev["c2"][1] + 0.3
        ev["mao_sai"] = (t, t + 0.7); t += 0.4
        t = fala(t, F["revela"]) + 0.4
        tp = t; t = fala(t, F["pergunta"]); ESPERA.append((t, t + 2.4, tp)); t += 2.4
        tm = t; t = fala(t, F["magia"]) + 0.3; tv = tm + dur(F["magia"]) * 0.72
        COR_EV.append((tv, spec["pingo"])); RESP_EV.append((tv, spec["cor"], (CASA[0], CASA[1] - 150))); SFX.append((tv, "pinga", .35))
        t = fala(t, F["pintar"]); ev["pula_dentro"] = (t - 0.9, t - 0.1)
        self.t_pinta0 = ev["pula_dentro"][1]
        t_det = None; self._fdetalhe = F["detalhe"]
        ev["fala_det_ini"] = None
        self.t_after_body_guess = t
        self.F = F; self.t = t
        self.slot = idx

    def preparar(self):
        """Geometria pesada: máscaras, texturas, caminhos (feito uma vez, antes da fruta começar)."""
        s = self.s; self.contorno = cairo.ImageSurface(cairo.FORMAT_A8, W, H); cc = self.cc = cairo.Context(self.contorno)
        cc.set_line_width(17); cc.set_line_cap(cairo.LINE_CAP_ROUND); cc.set_line_join(cairo.LINE_JOIN_ROUND)
        olhos = [np.array([[o[0] + r * math.cos(a), o[1] + r * math.sin(a)] for a in np.linspace(0, 2 * math.pi, 60)]) for o, r in s["olhos"]]
        self.olhos_mask = mascara_polys(olhos)
        reg_corpo = np.clip(mascara_polys(s["corpo"]) - mascara_polys(s.get("buracos", [])) - self.olhos_mask, 0, 1) if s.get("buracos") else \
            np.clip(mascara_polys(s["corpo"]) - self.olhos_mask, 0, 1)
        self.pinturas = [dict(reg=reg_corpo, tex=tinta(s["cor"], reg_corpo), cam=zigue_mask(reg_corpo), larg=80,
                              surf=cairo.ImageSurface(cairo.FORMAT_A8, W, H), feito=0.0, pingo=s["pingo"])]
        for k, d in enumerate(s["detalhes"]):
            if d["tipo"] == "area":
                reg = mascara_polys(d["forma"]); cam_ = zigue_mask(reg, passo=20, celula=80, margem=4, seed=10 + k); larg = 40
            else:
                reg = mascara_traco(d["forma"], d.get("larg", 24)); cam_ = np.vstack(d["forma"]); larg = d.get("larg", 24) + 4
            self.pinturas.append(dict(reg=reg, tex=tinta(d["cor"], reg) if d["tipo"] == "area" else np.full((H, W, 3), d["cor"], np.float32),
                                      cam=cam_, larg=larg, surf=cairo.ImageSurface(cairo.FORMAT_A8, W, H), feito=0.0, pingo=d["pingo"]))
        for p in self.pinturas: p["L"] = comp(p["cam"])
        self.tracos = [[(q, comp(q)) for q in passo] for passo in s["passos"]]
        self.feito = [[0.0] * len(p) for p in self.tracos]; self.pupilas = False
        ys, xs = np.nonzero(mascara_polys(s["corpo"]) > 0.5); self.centro = (xs.mean(), ys.mean()); self.raio = (xs.max() - xs.min()) / 2
        self.preparada = True

    def agenda_resto(self):
        """Depois de saber o tamanho do caminho do corpo, agenda pintura, detalhes, voo e próxima."""
        ev = self.ev; s = self.s; F = self.F
        L = self.pinturas[0]["L"][-1]; Dbody = float(np.clip(7.0 * L / 13000.0, 4.5, 8.0))
        ev["p0"] = (self.t_pinta0, self.t_pinta0 + Dbody); t = ev["p0"][1] + 0.2
        PINTANDO.append((*ev["p0"], self, 0))
        td = t; t = fala(t, F["detalhe"]); fim_det = t
        prev_end = self.pinturas[0]["cam"][-1]; prev_t = ev["p0"][1]
        for k, d in enumerate(s["detalhes"]):
            ini = td + d["off"]; p = self.pinturas[k + 1]
            alvo = p["cam"][0]
            COR_EV.append((ini, d["pingo"])); RESP_EV.append((ini, d["cor"], (alvo[0], alvo[1] - 20))); SFX.append((ini, "pinga", .3))
            SALTOS.append((prev_t, ini + 0.15, prev_end, alvo, 150, 150, 0))
            ev[f"p{k+1}"] = (ini + 0.2, ini + 0.2 + d["dur"]); PINTANDO.append((*ev[f"p{k+1}"], self, k + 1))
            prev_end = p["cam"][-1]; prev_t = ev[f"p{k+1}"][1]; fim_det = max(fim_det, prev_t)
        ev["pula_fora"] = (fim_det + 0.1, fim_det + 0.8)
        SALTOS.append((ev["pula_fora"][0], ev["pula_fora"][1], prev_end, CASA, 150, ALT, 360))
        COR_EV.append((ev["pula_fora"][1], s["pingo"])); SFX.append((ev["pula_fora"][0], "boing", .2))
        t = ev["pula_fora"][1] + 0.2
        tf = t; t = fala(t, F["fim"]) + 0.2
        ev["brilho"] = tf + 0.3; ev["voa"] = (tf + 1.7, tf + 3.0); ev["faixa"] = (ev["voa"][1], ev["voa"][1] + 0.8)
        SFX.append((ev["brilho"], "sininho", .18)); SFX.append((ev["faixa"][0], "sininho", .22))
        t = max(t, ev["faixa"][1] + 0.3)
        if F["proxima"]:
            COR_EV.append((t, "neutro")); SFX.append((t, "pinga", .2)); t = fala(t, F["proxima"]) + 0.6
        self.fim = t
        for k in ("c0", "c1", "c2"): SFX.append((*ev[k], "risco"))
        for k in [k for k in ev if k.startswith("p") and k[1:].isdigit()]: SFX.append((*ev[k], "pinta"))
        SALTOS.append((ev["pula_dentro"][0], ev["pula_dentro"][1], CASA, self.pinturas[0]["cam"][0], ALT, 150, -360))
        SFX.append((ev["pula_dentro"][1], "pinga", .3))
        return t

    # ---- desenho incremental ----
    def recompor(self, x0, y0, x1, y1):
        x0, y0, x1, y1 = max(int(x0), 0), max(int(y0), 0), min(int(x1), W), min(int(y1), H)
        if x0 >= x1 or y0 >= y1: return
        b = np.full((y1 - y0, x1 - x0, 3), PAPEL, np.float32)
        for p in self.pinturas:
            m = a8_view(p["surf"])[y0:y1, x0:x1].astype(np.float32) / 255 * p["reg"][y0:y1, x0:x1]
            b = b * (1 - m[..., None]) + p["tex"][y0:y1, x0:x1] * m[..., None]
        k = a8_view(self.contorno)[y0:y1, x0:x1].astype(np.float32)[..., None] / 255
        tela[y0:y1, x0:x1] = b * (1 - k) + 28 * k
    def contorno_ate(self, i, frac):
        tr = self.tracos[i]; tot = sum(L[-1] for _, L in tr) + 120 * (len(tr) - 1); alvo = frac * tot; ponta = tr[-1][0][-1]
        for j, (q, L) in enumerate(tr):
            ini = sum(tr[k][1][-1] + 120 for k in range(j)); loc = min(max(alvo - ini, 0), L[-1])
            if loc > self.feito[i][j] + 1e-6:
                a, k1 = ponto_em(q, L, self.feito[i][j]); b, k2 = ponto_em(q, L, loc); seg = np.vstack([a, q[k1:k2], b])
                self.cc.move_to(*seg[0]); [self.cc.line_to(*r) for r in seg[1:]]; self.cc.set_source_rgba(0, 0, 0, 1); self.cc.stroke()
                self.recompor(seg[:, 0].min() - 15, seg[:, 1].min() - 15, seg[:, 0].max() + 15, seg[:, 1].max() + 15); self.feito[i][j] = loc
            if ini - 120 <= alvo <= ini + L[-1]:
                if alvo >= ini: ponta = ponto_em(q, L, loc)[0]
                else: prev = tr[j - 1][0][-1]; ponta = prev + suave((alvo - ini + 120) / 120) * (q[0] - prev)
        if i == 0 and frac >= 1 and self.s.get("enfeites") and not getattr(self, "_enf", False):
            for q in self.s["enfeites"]: self.cc.move_to(*q[0]); [self.cc.line_to(*r) for r in q[1:]]; self.cc.close_path(); self.cc.fill()
            self.recompor(0, 0, W, H); self._enf = True
        if i == 2 and frac >= 1 and not self.pupilas:
            for o, r in self.s["olhos"]: self.cc.arc(o[0] + r * .16, o[1] + r * .16, r * .45, 0, 2 * math.pi); self.cc.fill()
            self.recompor(0, 0, W, H); self.pupilas = True
        return ponta
    def pinta_ate(self, k, frac):
        p = self.pinturas[k]; alvo = frac * p["L"][-1]
        if alvo > p["feito"] + 1e-6:
            a, k1 = ponto_em(p["cam"], p["L"], p["feito"]); b, k2 = ponto_em(p["cam"], p["L"], alvo); seg = np.vstack([a, p["cam"][k1:k2], b])
            c = cairo.Context(p["surf"]); c.set_line_width(p["larg"]); c.set_line_cap(cairo.LINE_CAP_ROUND); c.set_line_join(cairo.LINE_JOIN_ROUND)
            c.move_to(*seg[0]); [c.line_to(*r) for r in seg[1:]]; c.stroke(); p["feito"] = alvo
            self.recompor(seg[:, 0].min() - p["larg"], seg[:, 1].min() - p["larg"], seg[:, 0].max() + p["larg"], seg[:, 1].max() + p["larg"])
        return ponto_em(p["cam"], p["L"], alvo)[0]
    def faz_brilho(self):
        cx, cy = self.centro; r = self.raio * 0.78; d = cv2.distanceTransform((self.pinturas[0]["reg"] > .5).astype(np.uint8), cv2.DIST_L2, 5)
        s = cairo.ImageSurface(cairo.FORMAT_A8, W, H); c = cairo.Context(s); c.set_line_width(24); c.set_line_cap(cairo.LINE_CAP_ROUND)
        pts = [(cx + r * math.cos(math.radians(a)), cy + r * math.sin(math.radians(a))) for a in np.linspace(198, 236, 30)]
        pts = [q for q in pts if 0 <= int(q[0]) < W and 0 <= int(q[1]) < H and d[int(q[1]), int(q[0])] > 25]
        if len(pts) > 2:
            c.move_to(*pts[0]); [c.line_to(*q) for q in pts[1:]]; c.stroke()
            m = a8_view(s)[:, :W].astype(np.float32)[..., None] / 255 * 0.9; tela[:] = tela * (1 - m) + 255 * m
        alfa = np.clip(sum(p["reg"] for p in self.pinturas) + a8_view(self.contorno)[:, :W] / 255 + self.olhos_mask, 0, 1)
        alfa = cv2.dilate(alfa, np.ones((5, 5), np.uint8)); ys, xs = np.nonzero(alfa > .05)
        bb = (xs.min(), ys.min(), xs.max(), ys.max())
        self.sprite = (tela[bb[1]:bb[3], bb[0]:bb[2]].copy(), alfa[bb[1]:bb[3], bb[0]:bb[2], None].copy(), bb)
    def libera(self):
        for p in self.pinturas: p["reg"] = p["tex"] = None

# monta a linha do tempo de todas as frutas (precisa preparar cada uma para saber o tamanho do caminho)
frutas = []
for i, fn in enumerate(FRUTAS):
    f = Fruta(fn(), i, t); f.preparar(); t = f.agenda_resto(); f.libera(); f.preparada = False; frutas.append(f)

# ----- final -----
FINAL = {}
FINAL["cresce"] = (t, t + 1.4); t1 = t; t = fala(t, "final_1") + 0.3; SFX.append((t1, "sininho", .22))
t2 = t; t = fala(t, "final_2") + 0.3; d2 = dur("final_2")
FINAL["pulsos"] = [t2 + d2 * x for x in (0.02, 0.18, 0.34, 0.50, 0.66, 0.86)]
for k, tp in enumerate(FINAL["pulsos"]): COR_EV.append((tp, NOMES_CORES[k])); SFX.append((tp, "pinga", .15))
t3 = t; t = fala(t, "final_3") + 0.3; FINAL["confete"] = t3; SFX.append((t3, "sininho", .25)); SFX.append((t3 + .5, "sininho", .2))
t4 = t; t = fala(t, "final_4"); FINAL["tchau"] = t4; COR_EV.append((t4, "neutro"))
DUR = t + 2.0
if TMAX: DUR = min(DUR, TMAX)
COR_EV.sort(key=lambda x: x[0])
print(f"duração total: {DUR:.1f} s · frutas começam em", [round(f.ev['mao_entra'][0], 1) for f in frutas], flush=True)

# ======================= som =======================
N = int(DUR * SR) + 2 * SR; voz = np.zeros(N, np.float32); fxs = np.zeros(N, np.float32)
for (t0, nome) in FALAS_TL:
    a = int(t0 * SR); x = aud(nome)[:max(0, N - a)]; voz[a:a + len(x)] += x
def ruido(a, b, vol, mod, alta=True):
    i0, i1 = int(a * SR), min(int(b * SR), N); n = i1 - i0
    if n <= 0: return
    tt = np.arange(n) / SR; r = rng.normal(0, 1, n)
    r = np.diff(np.r_[0, r]) if alta else np.convolve(r, np.ones(30) / 30, "same") * 4
    env = np.minimum(1, np.minimum(tt / .05, (n / SR - tt) / .08)); fxs[i0:i1] += r * (.6 + .4 * np.abs(np.sin(2 * np.pi * mod * tt))) * env * vol
def toque(a, f_fn, dura, decai, vol):
    i0 = int(a * SR); n = min(int(dura * SR), N - i0)
    if n <= 0: return
    tt = np.arange(n) / SR; fxs[i0:i0 + n] += vol * np.sin(2 * np.pi * np.cumsum(f_fn(tt)) / SR) * np.exp(-tt * decai)
for ev_ in SFX:
    if ev_[1] == "risco": ruido(ev_[0], ev_[2], .04, 2.6)
    elif ev_[1] == "pinta": ruido(ev_[0], ev_[2], .05, 3.5, False)
    elif ev_[1] == "pinga": toque(ev_[0], lambda tt: 1400 * np.exp(-tt * 18) + 380, .35, 9, ev_[2])
    elif ev_[1] == "boing": toque(ev_[0], lambda tt: 220 + 500 * tt, .4, 6, ev_[2])
    elif ev_[1] == "whoosh": ruido(ev_[0], ev_[2], .07, 0.8)
    elif ev_[1] == "sininho":
        for k, fq in enumerate([1047, 1319, 1568, 2093]): toque(ev_[0] + k * .09, lambda tt, fq=fq: np.full_like(tt, fq), 1.2, 4, ev_[2])
env_voz = np.convolve(np.abs(voz), np.ones(1200) / 1200, "same")

# ======================= render =======================
def cor_em(tt):
    c = "neutro"
    for (te, nome) in COR_EV:
        if te <= tt: c = nome
        else: break
    return c
proc = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
                         "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", SAIDA + ".v.mp4"], stdin=subprocess.PIPE)
minis = []; cheias = set(); ponta_mao = FORA.copy(); atual = None; NF = int(DUR * FPS)
for fr in range(int(TINI * FPS), NF):
    tt = fr / FPS
    # fruta da vez
    f = next((x for x in frutas if x.ev["mao_entra"][0] <= tt < x.fim), None)
    if f is not None and f is not atual:
        if atual is not None: atual.libera()
        tela[:] = PAPEL; f.preparar(); f.pupilas = False; f._enf = False; atual = f
        for p in f.pinturas: p["feito"] = 0.0
        f.feito = [[0.0] * len(p) for p in f.tracos]; f.voou = False; f.sprite = None
    img = tela.copy(); mao_on = False; pintando = None; ev = f.ev if f else {}
    if f:
        def p(k): a, b = ev[k]; return min(max((tt - a) / (b - a), 0), 1)
        if ev["mao_entra"][0] <= tt < ev["mao_entra"][1]: ponta_mao = FORA + suave(p("mao_entra")) * (f.tracos[0][0][0][0] - FORA); mao_on = True
        for i, k in enumerate(("c0", "c1", "c2")):
            if ev[k][0] <= tt < ev[k][1] + 0.4 and (f.feito[i][-1] < f.tracos[i][-1][1][-1] - 0.5 or (i == 2 and not f.pupilas)
                                                    or (i == 0 and f.s.get("enfeites") and not f._enf and tt >= ev[k][1])):
                ponta_mao = f.contorno_ate(i, p(k)); mao_on = True
        if ev["mao_entra"][1] <= tt < ev["mao_sai"][0]: mao_on = True
        if ev["mao_sai"][0] <= tt < ev["mao_sai"][1]: ponta_mao = ponta_mao + suave(p("mao_sai")) * (FORA - ponta_mao) * 0.35; mao_on = True
        for (a, b, fr_, k) in PINTANDO:
            if fr_ is f and a <= tt < b + 0.2:
                pos = f.pinta_ate(k, min((tt - a) / (b - a), 1))
                if tt < b: pintando = pos
        if tt >= ev["brilho"] and f.sprite is None: f.faz_brilho(); img = tela.copy()
        if f.sprite is not None and tt >= ev["voa"][0] and not f.voou:
            rgbf, af, bb = f.sprite; u = suave(p("voa"))
            tela[:] = PAPEL; img = tela.copy()
            x0c, y0c = (bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2; sxl, syl = slot_local(f.slot)
            sx_, sy_ = ARCO_C[0] - 280 + sxl, ARCO_C[1] - 250 + syl
            esc = 1 - u * (1 - 62 / (bb[3] - bb[1])); x = x0c + (sx_ - x0c) * u; y = y0c + (sy_ - y0c) * u - 180 * math.sin(math.pi * u)
            w_, h_ = max(int(rgbf.shape[1] * esc), 2), max(int(rgbf.shape[0] * esc), 2)
            cola(img, cv2.resize(rgbf, (w_, h_)), cv2.resize(af[..., 0], (w_, h_))[..., None], x - w_ / 2, y - h_ / 2)
            if p("voa") >= 1:
                minis.append((cv2.resize(rgbf, (w_, h_)), cv2.resize(af[..., 0], (w_, h_))[..., None], f.slot)); f.voou = True
    # arco-íris
    if tt < VOLTA[1]:  # gancho: arco-íris completo no meio, depois volta para o canto e esvazia
        if tt < VOLTA[0]:
            esc, centro, n = 2.0, CENTRO_GRANDE, 6
            k = int(tt / 0.45) % 6; pulsos = {k: math.sin(((tt / 0.45) % 1) * math.pi)}
        else:
            u = suave((tt - VOLTA[0]) / (VOLTA[1] - VOLTA[0])); esc = 2.0 - u; centro = CENTRO_GRANDE + u * (ARCO_C - CENTRO_GRANDE)
            n = int(round(6 * (1 - u))); pulsos = {}
        desenha_arco(img, esc, centro, set(range(n)), None, MINIS_GANCHO[:n], pulsos)
    elif tt >= ARCO_APARECE[0]:
        u = min(max((tt - ARCO_APARECE[0]) / (ARCO_APARECE[1] - ARCO_APARECE[0]), 0), 1)
        esc = 0.2 + 0.8 * suave(u) + 0.08 * math.sin(u * math.pi); centro = ARCO_C.copy(); enchendo = None; pulsos = {}
        for x in frutas:
            if x.voou if hasattr(x, "voou") else False:
                if tt >= x.ev["faixa"][1]: cheias.add(x.slot)
                elif tt >= x.ev["faixa"][0]: enchendo = (x.slot, suave((tt - x.ev["faixa"][0]) / 0.8))
        if tt >= FINAL["cresce"][0]:
            u2 = suave((tt - FINAL["cresce"][0]) / (FINAL["cresce"][1] - FINAL["cresce"][0])); esc = 1 + 1.0 * u2
            centro = ARCO_C + u2 * (np.array([1000.0, 560.0]) - ARCO_C)
            for k, tp in enumerate(FINAL["pulsos"]):
                if 0 <= tt - tp < 0.6: pulsos[k] = math.sin((tt - tp) / 0.6 * math.pi)
        desenha_arco(img, esc, centro, cheias, enchendo, minis, pulsos)
        if tt >= FINAL["confete"]:
            u3 = (tt - FINAL["confete"]) / 1.4
            for k, cor in enumerate(ARCO_CORES):
                respingos(img, 1000 + 260 * math.cos(k), 420 + 120 * math.sin(k * 1.7), cor, u3 - k * 0.06, n=8, dist=220)
    # Pingo
    cor = cor_em(tt); sq = 1 + min(env_voz[min(int(tt * SR), N - 1)] * 2.2, 0.08) * math.sin(tt * 26)
    salto = next((s_ for s_ in SALTOS if s_[0] <= tt < s_[1]), None)
    parado = None
    if pintando is not None:
        desenha_pingo(img, cor, pintando[0], pintando[1] + 75, 150, 1 + .06 * math.sin(tt * 20), 1 - .06 * math.sin(tt * 20), ang=math.sin(tt * 18) * 8)
    elif salto is not None:
        a, b, de, para, h1, h2, giro = salto; u = suave((tt - a) / (b - a))
        de = np.array(de) + ((0, 75) if h1 == 150 else (0, 0)); para = np.array(para) + ((0, 75) if h2 == 150 else (0, 0))
        x = de[0] + (para[0] - de[0]) * u; yb = de[1] + (para[1] - de[1]) * u - (260 if h1 != h2 else 120) * math.sin(math.pi * u)
        desenha_pingo(img, cor, x, yb, h1 + (h2 - h1) * u, ang=giro * u)
    elif f and ev["p0"][0] <= tt < ev["pula_fora"][0]:
        q = next((x["cam"][-1] for k_, x in enumerate(f.pinturas) if True), None)
        # entre pinturas sem salto: fica no fim da última pintura feita
        ult = max([k for (a, b, fr_, k) in PINTANDO if fr_ is f and b <= tt] or [0]); q = f.pinturas[ult]["cam"][-1]
        desenha_pingo(img, cor, q[0], q[1] + 75, 150, 1, 1 + .05 * math.sin(tt * 12))
    else:
        pulo = abs(math.sin(tt * 9)) * 40 if CORES_ABERTURA[0] <= tt < CORES_ABERTURA[1] else 0
        if tt >= FINAL["confete"]: pulo = abs(math.sin(tt * 7)) * 50
        esp = next((e for e in ESPERA if e[0] <= tt < e[1]), None)
        desenha_pingo(img, cor, CASA[0], CASA[1] - pulo, ALT, 1 / sq, sq, ang=8 * math.sin(tt * 2.5) if esp else 0)
    for (te, cor_rgb, pos) in RESP_EV:
        u = (tt - te) / 0.6
        if 0 < u < 1:
            q = pos if pos is not None else ((CASA[0], CASA[1] - 150) if pintando is None and salto is None else (pintando if pintando is not None else (CASA[0], CASA[1] - 150)))
            respingos(img, q[0], q[1], cor_rgb, u)
    for (a, b, tp) in ESPERA:
        if tp <= tt < b: balao(img, CASA[0] + 90, CASA[1] - 520, "?", min(1, (tt - tp) / .3))
    if mao_on: mao(img, ponta_mao)
    proc.stdin.write(np.clip(img, 0, 255).astype(np.uint8).tobytes())
    if fr % (FPS * 30) == 0: print(f"  {tt:.0f}s / {DUR:.0f}s", flush=True)
proc.stdin.close(); proc.wait()

mix = voz + fxs * 0.8; mix = mix / max(1.0, np.abs(mix).max() / 0.95)
with wave.open(SAIDA + ".wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix[:int(DUR * SR)], -1, 1) * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", SAIDA + ".v.mp4", "-i", SAIDA + ".wav", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", SAIDA], check=True)
os.remove(SAIDA + ".v.mp4"); os.remove(SAIDA + ".wav")
print("ok", SAIDA, f"{DUR:.1f}s")
