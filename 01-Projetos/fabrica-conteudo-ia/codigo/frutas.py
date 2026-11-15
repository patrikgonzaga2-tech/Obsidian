"""Desenhos das 6 frutas do vídeo 01 (vetor), cada uma em 3 passos com carinha.

Coordenadas no quadro 1920x1080; a fruta fica no meio-esquerda (centro ~900, 600), longe do Pingo
(canto inferior esquerdo) e do arco-íris (canto superior direito).
"""
import math
import numpy as np

def bez(p0, p1, p2, p3, n=70):
    t = np.linspace(0, 1, n)[:, None]; p0, p1, p2, p3 = map(lambda q: np.array(q, float), (p0, p1, p2, p3))
    return (1-t)**3*p0 + 3*(1-t)**2*t*p1 + 3*(1-t)*t**2*p2 + t**3*p3
def cam(segs, dx=0, dy=0):
    o = [bez(*s) for s in segs]; return np.concatenate([x if i == 0 else x[1:] for i, x in enumerate(o)]) + (dx, dy)
def circ(c, r, a0=-90, a1=270, n=None):
    n = n or max(30, int(abs(a1 - a0) / 3)); a = np.radians(np.linspace(a0, a1, n))
    return np.c_[c[0] + r*np.cos(a), c[1] + r*np.sin(a)]
def estrela(c, r1, r2, pontas=5, rot=-90):
    pts = []
    for k in range(pontas * 2 + 1):
        r = r1 if k % 2 == 0 else r2; a = math.radians(rot + k * 180 / pontas); pts.append((c[0] + r*math.cos(a), c[1] + r*math.sin(a)))
    return np.array(pts)
def folha(base, ponta, larg):
    b, p = np.array(base, float), np.array(ponta, float); d = p - b; n = np.array([-d[1], d[0]]) / (np.linalg.norm(d) + 1e-6)
    m1 = b + d * 0.3 + n * larg; m2 = b + d * 0.75 + n * larg * 0.8; m3 = b + d * 0.75 - n * larg * 0.8; m4 = b + d * 0.3 - n * larg
    return cam([[b, m1, m2, p], [p, m3, m4, b]])

VERM, LARANJA, AMARELO, VERDE, AZUL, ROXO = (232, 36, 48), (247, 140, 30), (250, 205, 40), (70, 195, 70), (50, 140, 230), (150, 70, 200)
MARROM, VERDE_FOLHA, VERDE_ESCURO, AZUL_ESCURO = (140, 85, 40), (70, 195, 70), (30, 130, 45), (25, 70, 160)

def maca():
    DX, DY = -60, 10
    corpo = cam([[(960, 395), (1040, 330), (1250, 330), (1265, 560)], [(1265, 560), (1280, 780), (1110, 900), (1010, 860)],
                 [(1010, 860), (985, 850), (935, 850), (910, 860)], [(910, 860), (810, 900), (640, 780), (655, 560)],
                 [(655, 560), (670, 330), (880, 330), (960, 395)]], DX, DY)
    cabo = cam([[(960, 400), (955, 350), (965, 300), (990, 262)]], DX, DY)
    fo = cam([[(978, 318), (1010, 250), (1090, 232), (1135, 252)], [(1135, 252), (1105, 310), (1030, 336), (978, 318)]], DX, DY)
    OE, OD = (825, 585), (975, 585); sor = circ((900, 650), 62, 25, 155)
    return dict(nome="maçã", cor=VERM, pingo="vermelho", corpo=[corpo], olhos=[(OE, 38), (OD, 38)], sorriso=sor,
                passos=[[corpo], [cabo, fo], [circ(OE, 38), circ(OD, 38), sor]],
                detalhes=[dict(tipo="area", forma=[fo], cor=VERDE_FOLHA, pingo="verde", off=0.25, dur=1.55),
                          dict(tipo="traco", forma=[cabo], cor=MARROM, pingo="marrom", off=2.05, dur=0.9, larg=26)])

def laranja():
    c, R = (900, 610), 265
    corpo = circ(c, R, -90, 270, 140)
    cabo = cam([[(900, 345), (898, 325), (902, 305), (906, 290)]])
    fo = folha((906, 300), (1015, 255), 32)
    OE, OD = (825, 600), (975, 600); sor = circ((900, 665), 62, 25, 155)
    poros = []  # pontinhos da casca (fazem parte do passo 1, só para dar textura)
    for (x, y) in [(760, 470), (1040, 480), (735, 760), (1065, 770), (900, 820)]:
        poros.append(circ((x, y), 5, 0, 360, 12))
    return dict(nome="laranja", cor=LARANJA, pingo="laranja", corpo=[corpo], olhos=[(OE, 38), (OD, 38)], sorriso=sor,
                passos=[[corpo], [cabo, fo], [circ(OE, 38), circ(OD, 38), sor]], enfeites=poros,
                detalhes=[dict(tipo="area", forma=[fo], cor=VERDE_FOLHA, pingo="verde", off=0.25, dur=1.55),
                          dict(tipo="traco", forma=[cabo], cor=MARROM, pingo="marrom", off=2.05, dur=0.9, larg=24)])

def banana():
    L, R = (610, 440), (1190, 400)
    fora = cam([[L, (630, 880), (1170, 880), R]])
    dentro = cam([[R, (1060, 620), (740, 620), L]])
    corpo = np.vstack([fora, dentro[1:]])
    pc = np.array([(1176, 408), (1206, 394), (1240, 338), (1214, 324), (1176, 408)], float)  # cabinho da banana
    pc = np.vstack([np.linspace(pc[i], pc[i + 1], 12) for i in range(4)])
    pb = circ((594, 452), 19, 0, 360, 30)  # pontinha de baixo
    OE, OD = (835, 665), (965, 665); sor = circ((900, 705), 46, 25, 155)
    return dict(nome="banana", cor=AMARELO, pingo="amarelo", corpo=[corpo], olhos=[(OE, 30), (OD, 30)], sorriso=sor,
                passos=[[fora, dentro], [pc, pb], [circ(OE, 30), circ(OD, 30), sor]],
                detalhes=[dict(tipo="area", forma=[pc, pb], cor=MARROM, pingo="marrom", off=0.9, dur=1.3)])

def pera():
    corpo = cam([[(900, 335), (975, 335), (995, 430), (975, 480)], [(975, 480), (1150, 560), (1185, 865), (900, 870)],
                 [(900, 870), (615, 865), (650, 560), (825, 480)], [(825, 480), (805, 430), (825, 335), (900, 335)]])
    cabo = cam([[(900, 340), (899, 315), (903, 290), (910, 270)]])
    fo = folha((906, 292), (1005, 250), 30)
    OE, OD = (840, 655), (960, 655); sor = circ((900, 720), 58, 25, 155)
    return dict(nome="pera", cor=VERDE, pingo="verde", corpo=[corpo], olhos=[(OE, 36), (OD, 36)], sorriso=sor,
                passos=[[corpo], [cabo, fo], [circ(OE, 36), circ(OD, 36), sor]],
                detalhes=[dict(tipo="area", forma=[fo], cor=VERDE_ESCURO, pingo="verde_escuro", off=0.3, dur=1.6),
                          dict(tipo="traco", forma=[cabo], cor=MARROM, pingo="marrom", off=2.6, dur=0.9, larg=24)])

def mirtilo():
    c, R = (900, 625), 255
    corpo = circ(c, R, -90, 270, 140)
    coroa = estrela((900, 445), 72, 34)
    OE, OD = (825, 620), (975, 620); sor = circ((900, 695), 60, 25, 155)
    return dict(nome="mirtilo", cor=AZUL, pingo="azul", corpo=[corpo], olhos=[(OE, 38), (OD, 38)], sorriso=sor,
                buracos=[coroa], passos=[[corpo], [coroa], [circ(OE, 38), circ(OD, 38), sor]],
                detalhes=[dict(tipo="area", forma=[coroa], cor=AZUL_ESCURO, pingo="azul_escuro", off=0.9, dur=1.2)])

def uva():
    r = 112; cs = [(690, 440), (900, 440), (1110, 440), (795, 625), (1005, 625), (900, 810)]
    bolas = [circ(cc, r, -90, 270, 90) for cc in cs]
    cabo = cam([[(900, 330), (898, 300), (903, 272), (912, 250)]])
    fo = folha((906, 275), (795, 225), 30)
    OE, OD = (862, 430), (938, 430); sor = circ((900, 462), 36, 25, 155)
    return dict(nome="uva", cor=ROXO, pingo="roxo", corpo=bolas, olhos=[(OE, 26), (OD, 26)], sorriso=sor,
                passos=[bolas, [cabo, fo], [circ(OE, 26), circ(OD, 26), sor]],
                detalhes=[dict(tipo="area", forma=[fo], cor=VERDE_FOLHA, pingo="verde", off=0.25, dur=1.55),
                          dict(tipo="traco", forma=[cabo], cor=MARROM, pingo="marrom", off=2.05, dur=0.9, larg=24)])

FRUTAS = [maca, laranja, banana, pera, mirtilo, uva]

# falas de cada fruta (arquivos em audio/video01/). Repetições usam o mesmo áudio de propósito (economia),
# mas a ordem das frases de incentivo varia de fruta para fruta.
FALAS = {
    "maçã":    dict(s1="fala_04", ok1="fala_05", s2="fala_06", ok2="fala_07", s3="fala_08", revela="fala_09", pergunta="fala_10",
                    magia="fala_11", pintar="fala_12", detalhe="fala_13", fim="fala_14", proxima="fala_15"),
    "laranja": dict(s1="laranja_s1", ok1="pool_ok3", s2="laranja_s2", ok2="fala_07", s3="pool_carinha2", revela="laranja_revela",
                    pergunta="laranja_pergunta", magia="laranja_magia", pintar="pool_pintar2", detalhe="fala_13", fim="laranja_fim",
                    proxima="pool_proxima2"),
    "banana":  dict(s1="banana_s1", ok1="fala_05", s2="banana_s2", ok2="pool_ok4", s3="fala_08", revela="banana_revela",
                    pergunta="banana_pergunta", magia="banana_magia", pintar="fala_12", detalhe="banana_detalhe", fim="banana_fim",
                    proxima="fala_15"),
    "pera":    dict(s1="pera_s1", ok1="pool_ok3", s2="pera_s2", ok2="fala_07", s3="pool_carinha2", revela="pera_revela",
                    pergunta="pera_pergunta", magia="pera_magia", pintar="pool_pintar2", detalhe="pera_detalhe", fim="pera_fim",
                    proxima="pool_proxima2"),
    "mirtilo": dict(s1="fala_04", ok1="fala_05", s2="mirtilo_s2", ok2="pool_ok4", s3="fala_08", revela="mirtilo_revela",
                    pergunta="mirtilo_pergunta", magia="mirtilo_magia", pintar="fala_12", detalhe="mirtilo_detalhe", fim="mirtilo_fim",
                    proxima="fala_15"),
    "uva":     dict(s1="uva_s1", ok1="pool_ok3", s2="uva_s2", ok2="fala_07", s3="pool_carinha2", revela="uva_revela",
                    pergunta="uva_pergunta", magia="uva_magia", pintar="pool_pintar2", detalhe="fala_13", fim="uva_fim", proxima=None),
}
