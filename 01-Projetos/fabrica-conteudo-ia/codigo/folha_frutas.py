"""Gera a folha com as 6 frutas prontas (contorno + cores) e a versão só contorno (página de livro)."""
import sys, math, numpy as np, cairo
sys.path.insert(0, __file__.rsplit("/", 1)[0])
from frutas import FRUTAS
W, H = 1920, 1080
def poly(c, pts, fechado=True):
    c.move_to(*pts[0]); [c.line_to(*p) for p in pts[1:]]
    if fechado: c.close_path()
def render(f, colorido=True):
    s = cairo.ImageSurface(cairo.FORMAT_RGB24, W, H); c = cairo.Context(s); c.set_source_rgb(1, 1, 1); c.paint()
    if colorido:
        c.set_fill_rule(cairo.FILL_RULE_WINDING)
        for p in f["corpo"]: poly(c, p)
        c.set_source_rgb(*[v / 255 for v in f["cor"]]); c.fill()
        for (o, r) in f["olhos"]: c.arc(o[0], o[1], r, 0, 2 * math.pi); c.set_source_rgb(1, 1, 1); c.fill()
        for d in f["detalhes"]:
            c.set_source_rgb(*[v / 255 for v in d["cor"]])
            if d["tipo"] == "area":
                for p in d["forma"]: poly(c, p)
                c.fill()
            else:
                c.set_line_width(d.get("larg", 24)); c.set_line_cap(cairo.LINE_CAP_ROUND)
                for p in d["forma"]: poly(c, p, False); c.stroke()
    c.set_source_rgb(.11, .11, .11); c.set_line_width(17); c.set_line_cap(cairo.LINE_CAP_ROUND); c.set_line_join(cairo.LINE_JOIN_ROUND)
    for passo in f["passos"]:
        for p in passo:
            fechado = np.linalg.norm(p[0] - p[-1]) < 2; poly(c, p, False); c.stroke()
    for p in f.get("enfeites", []): poly(c, p); c.fill()
    for (o, r) in f["olhos"]: c.arc(o[0] + r * .16, o[1] + r * .16, r * .45, 0, 2 * math.pi); c.fill()
    s.flush(); a = np.ndarray((H, W, 4), np.uint8, s.get_data())[..., 2::-1].copy(); return a
from PIL import Image
out = sys.argv[1]
tiles = [Image.fromarray(render(fn())).crop((480, 160, 1360, 940)).resize((440, 390)) for fn in FRUTAS]
folha = Image.new("RGB", (440 * 3, 390 * 2), "white")
for i, t in enumerate(tiles): folha.paste(t, ((i % 3) * 440, (i // 3) * 390))
folha.save(out + "/frutas_video01_coloridas.png")
tiles = [Image.fromarray(render(fn(), False)).crop((480, 160, 1360, 940)).resize((440, 390)) for fn in FRUTAS]
folha = Image.new("RGB", (440 * 3, 390 * 2), "white")
for i, t in enumerate(tiles): folha.paste(t, ((i % 3) * 440, (i // 3) * 390))
folha.save(out + "/frutas_video01_contorno.png"); print("ok")
