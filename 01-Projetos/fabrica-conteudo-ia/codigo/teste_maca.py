"""Teste do Sprint 1: a maçã sendo desenhada em 3 passos e pintada com lápis de cor.

Gera quadros com pycairo e monta o MP4 com ffmpeg. Sem voz (só o som do lápis).
Uso: python3 teste_maca.py <pasta_saida>
"""
import math, os, subprocess, sys, random
import numpy as np
import cairo

W, H, FPS = 1920, 1080, 30
OUT = sys.argv[1] if len(sys.argv) > 1 else "saida"
os.makedirs(OUT, exist_ok=True)
FR = os.path.join(OUT, "quadros")
os.makedirs(FR, exist_ok=True)
random.seed(7)
np.random.seed(7)

# ---------- geometria ----------
def bezier(p0, p1, p2, p3, n=60):
    t = np.linspace(0, 1, n)[:, None]
    return (1-t)**3*p0 + 3*(1-t)**2*t*p1 + 3*(1-t)*t**2*p2 + t**3*p3

def caminho(segs):
    pts = [bezier(*[np.array(p, float) for p in s]) for s in segs]
    return np.concatenate([p if i == 0 else p[1:] for i, p in enumerate(pts)])

CX, CY = 960, 600
# corpo da maçã (começa na covinha de cima, vai pela direita, volta pela esquerda)
corpo = caminho([
    [(960, 395), (1040, 330), (1250, 330), (1265, 560)],
    [(1265, 560), (1280, 780), (1110, 900), (1010, 860)],
    [(1010, 860), (985, 850), (935, 850), (910, 860)],
    [(910, 860), (810, 900), (640, 780), (655, 560)],
    [(655, 560), (670, 330), (880, 330), (960, 395)],
])
cabo = caminho([[(960, 400), (955, 350), (965, 300), (990, 265)]])
folha = caminho([
    [(978, 320), (1010, 250), (1090, 235), (1130, 255)],
    [(1130, 255), (1100, 310), (1030, 335), (978, 320)],
])
nervura = caminho([[(985, 315), (1030, 290), (1080, 268), (1120, 258)]])

PASSOS = [corpo, cabo, np.concatenate([folha, nervura[::-1][:1], nervura])]

def comprimento(p):
    return np.concatenate([[0], np.cumsum(np.linalg.norm(np.diff(p, axis=0), axis=1))])

def parcial(p, frac):
    L = comprimento(p); alvo = L[-1] * frac
    k = np.searchsorted(L, alvo)
    if k <= 0: return p[:1]
    if k >= len(p): return p
    a = (alvo - L[k-1]) / max(L[k] - L[k-1], 1e-6)
    return np.vstack([p[:k], p[k-1] + a * (p[k] - p[k-1])])

# ---------- papel ----------
papel = np.full((H, W, 4), 255, np.uint8)
ruido = (np.random.rand(H, W) * 10).astype(np.uint8)
papel[..., 0] = 240 - ruido; papel[..., 1] = 248 - ruido; papel[..., 2] = 253 - ruido  # BGRA: papel creme
papel_surf = cairo.ImageSurface.create_for_data(papel, cairo.FORMAT_ARGB32, W, H)

# ---------- hachura de lápis de cor (pré-calculada) ----------
def hachura(bbox, ang, passo=7, jit=2.5):
    x0, y0, x1, y1 = bbox
    cx, cy = (x0+x1)/2, (y0+y1)/2; r = math.hypot(x1-x0, y1-y0)/2 + 20
    linhas = []
    d = -r; ida = True
    ca, sa = math.cos(ang), math.sin(ang)
    while d < r:
        a = (cx + d*-sa - r*ca, cy + d*ca - r*sa)
        b = (cx + d*-sa + r*ca, cy + d*ca + r*sa)
        if not ida: a, b = b, a
        linhas.append((a, b, random.uniform(-jit, jit)))
        d += passo; ida = not ida
    return linhas

def bbox(p, m=10):
    return (p[:, 0].min()-m, p[:, 1].min()-m, p[:, 0].max()+m, p[:, 1].max()+m)

H_CORPO = hachura(bbox(corpo), math.radians(-35)) + hachura(bbox(corpo), math.radians(30), 11)
H_CABO = hachura(bbox(cabo, 25), math.radians(70), 6)
H_FOLHA = hachura(bbox(folha), math.radians(-20), 6)

import cv2

class Pintura:
    """Pinta a hachura aos poucos numa camada que persiste (rápido) e diz onde está a ponta do lápis."""
    def __init__(self, forma, linhas, cor):
        self.forma, self.linhas, self.cor, self.feitas = forma, linhas, cor, 0
        self.poly = forma.astype(np.float32).reshape(-1, 1, 2)
        self.ponta = None

    def dentro(self, a, b):
        pts = [(a[0] + (b[0]-a[0])*u, a[1] + (b[1]-a[1])*u) for u in np.linspace(0, 1, 80)]
        ok = [p for p in pts if cv2.pointPolygonTest(self.poly, p, True) > 8]
        return ok

    def avanca(self, ctx, frac):
        alvo = int(len(self.linhas) * min(frac, 1))
        if alvo <= self.feitas: return
        ctx.save(); ctx.new_path(); ctx.move_to(*self.forma[0])
        for x, y in self.forma[1:]: ctx.line_to(x, y)
        ctx.close_path(); ctx.clip()
        r, g, b = self.cor
        for i in range(self.feitas, alvo):
            a, bb, j = self.linhas[i]
            rnd = random.Random(i)
            ctx.set_source_rgba(r, g, b, 0.55 + 0.25 * rnd.random())
            ctx.set_line_width(5.5 + j * 0.4)
            ctx.move_to(a[0] + j, a[1] - j); ctx.line_to(bb[0] - j, bb[1] + j); ctx.stroke()
        ctx.restore()
        ok = self.dentro(*self.linhas[alvo-1][:2])
        if ok: self.ponta = ok[-1]
        self.feitas = alvo

def traco(ctx, p, larg=13):
    if len(p) < 2: return
    ctx.set_source_rgb(0.12, 0.12, 0.13)
    ctx.set_line_width(larg); ctx.set_line_cap(cairo.LINE_CAP_ROUND); ctx.set_line_join(cairo.LINE_JOIN_ROUND)
    ctx.move_to(*p[0])
    for x, y in p[1:]: ctx.line_to(x, y)
    ctx.stroke()

def lapis(ctx, x, y, cor=(0.15, 0.15, 0.15)):
    """Lápis desenhado com a ponta em (x, y), inclinado."""
    ctx.save(); ctx.translate(x, y); ctx.rotate(math.radians(-50))
    # sombra
    ctx.set_source_rgba(0, 0, 0, 0.12)
    ctx.rectangle(14, 6, 330, 34); ctx.fill()
    # ponta de grafite / cor
    ctx.set_source_rgb(*cor); ctx.move_to(0, 0); ctx.line_to(22, -8); ctx.line_to(22, 8); ctx.close_path(); ctx.fill()
    # madeira
    ctx.set_source_rgb(0.96, 0.82, 0.6); ctx.move_to(22, -8); ctx.line_to(60, -17); ctx.line_to(60, 17); ctx.line_to(22, 8); ctx.close_path(); ctx.fill()
    # corpo
    ctx.set_source_rgb(*[min(1, c * 0.85 + 0.15) for c in cor]) if cor != (0.15, 0.15, 0.15) else ctx.set_source_rgb(0.98, 0.78, 0.2)
    ctx.rectangle(60, -17, 260, 34); ctx.fill()
    ctx.set_source_rgba(1, 1, 1, 0.35); ctx.rectangle(60, -17, 260, 9); ctx.fill()
    # borracha
    ctx.set_source_rgb(0.75, 0.75, 0.78); ctx.rectangle(320, -17, 22, 34); ctx.fill()
    ctx.set_source_rgb(0.98, 0.6, 0.65); ctx.rectangle(342, -17, 30, 34); ctx.fill()
    ctx.restore()

# ---------- linha do tempo (segundos) ----------
T = dict(c1=(1.0, 5.0), c2=(7.0, 8.2), c3=(9.7, 11.7),
         p_corpo=(13.2, 20.7), p_cabo=(20.9, 21.9), p_folha=(22.1, 24.1), brilho=(24.3, 24.8), fim=27.0)

def prog(t, k):
    a, b = T[k]; return min(max((t - a) / (b - a), 0), 1)

VERM, MARROM, VERDE = (0.86, 0.12, 0.13), (0.45, 0.27, 0.12), (0.25, 0.65, 0.2)
n_frames = int(T["fim"] * FPS)
eventos_som = []  # (inicio, fim, tipo)
for k, tipo in [("c1", "risco"), ("c2", "risco"), ("c3", "risco"), ("p_corpo", "pintar"), ("p_cabo", "pintar"), ("p_folha", "pintar")]:
    eventos_som.append((*T[k], tipo))
eventos_som.append((T["brilho"][0], T["brilho"][0] + 0.6, "plim"))

camada = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H); cc = cairo.Context(camada)
P_CORPO, P_FOLHA = Pintura(corpo, H_CORPO, VERM), Pintura(folha, H_FOLHA, VERDE)
for f in range(n_frames):
    t = f / FPS
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H); ctx = cairo.Context(s)
    ctx.set_source_surface(papel_surf); ctx.paint()
    ponta = None; cor_lapis = (0.15, 0.15, 0.15)
    for P, k in [(P_CORPO, "p_corpo"), (P_FOLHA, "p_folha")]:
        fr = prog(t, k); P.avanca(cc, fr)
        if 0 < fr < 1 and P.ponta: ponta, cor_lapis = P.ponta, P.cor
    ctx.set_source_surface(camada); ctx.paint()
    pc = prog(t, "p_cabo")
    if pc > 0:
        traco_cabo = parcial(cabo, pc)
        ctx.set_source_rgba(*MARROM, 0.9); ctx.set_line_width(20); ctx.set_line_cap(cairo.LINE_CAP_ROUND)
        ctx.move_to(*traco_cabo[0]); [ctx.line_to(x, y) for x, y in traco_cabo[1:]]; ctx.stroke()
        if pc < 1: ponta, cor_lapis = tuple(traco_cabo[-1]), MARROM
    pb = prog(t, "brilho")
    if pb > 0:
        ctx.save(); ctx.set_source_rgba(1, 1, 1, 0.85 * pb); ctx.set_line_width(22); ctx.set_line_cap(cairo.LINE_CAP_ROUND)
        ctx.arc(960, 600, 230, math.radians(200), math.radians(235)); ctx.stroke()
        ctx.arc(960, 600, 230, math.radians(243), math.radians(250)); ctx.stroke(); ctx.restore()
    for k, p in zip(["c1", "c2", "c3"], PASSOS):
        fr = prog(t, k)
        if fr > 0:
            pp_ = parcial(p, fr); traco(ctx, pp_)
            if fr < 1: ponta = tuple(pp_[-1]); cor_lapis = (0.15, 0.15, 0.15)
    if ponta is not None:
        lapis(ctx, ponta[0], ponta[1], cor_lapis)
    s.write_to_png(os.path.join(FR, f"{f:05d}.png"))

# ---------- som: lápis riscando + plim ----------
SR = 44100
audio = np.zeros(int(T["fim"] * SR))
for a, b, tipo in eventos_som:
    i0, i1 = int(a * SR), int(b * SR); n = i1 - i0
    tt = np.arange(n) / SR
    if tipo in ("risco", "pintar"):
        ru = np.random.randn(n)
        # filtro passa-alta simples + "arranhado" modulado
        ru = np.diff(np.concatenate([[0], ru]))
        mod = 0.55 + 0.45 * np.abs(np.sin(2 * np.pi * (3.2 if tipo == "risco" else 5.5) * tt))
        env = np.minimum(1, np.minimum(tt / 0.05, (n / SR - tt) / 0.08))
        audio[i0:i1] += ru * mod * env * (0.05 if tipo == "risco" else 0.035)
    else:
        for fq, amp in [(1568, 0.25), (2093, 0.18), (3136, 0.08)]:
            audio[i0:i1] += amp * np.sin(2 * np.pi * fq * tt) * np.exp(-tt * 6)
audio = np.clip(audio, -1, 1)
wav = os.path.join(OUT, "som.wav")
import wave
with wave.open(wav, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((audio * 32767).astype(np.int16).tobytes())

subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(FR, "%05d.png"),
                "-i", wav, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-c:a", "aac", "-b:a", "128k",
                "-shortest", os.path.join(OUT, "teste_maca.mp4")], check=True)
print("ok", os.path.join(OUT, "teste_maca.mp4"))
