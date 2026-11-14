import sys, subprocess, numpy as np
from PIL import Image
from scipy import ndimage
src, out = sys.argv[1], sys.argv[2]
img = Image.open(src).convert("L")
W = 1000; img = img.resize((W, int(img.height*W/img.width)), Image.LANCZOS)
g = np.array(img)
white = g > 190
lab, n = ndimage.label(white)
sizes = ndimage.sum(np.ones_like(lab), lab, index=np.arange(1, n+1))
H = g.shape[0]
# região do fundo fora da moldura = a que toca a borda
border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:,0], lab[:,-1]]))) - {0}
pal = [(255,214,102),(129,199,132),(100,181,246),(240,98,146),(255,167,38),(186,104,200),(77,208,225),(174,213,129),(255,138,101),(149,117,205),(255,241,118),(144,202,249)]
objs = ndimage.find_objects(lab)
regs = []
for i,(sl,s) in enumerate(zip(objs, sizes), start=1):
    if i in border or s < 450: continue
    cy = (sl[0].start+sl[0].stop)/2
    regs.append((cy, i, s))
regs.sort()  # de cima para baixo
canvas = np.stack([g]*3, -1).astype(np.uint8)
frames_fill, hold, fps = 240, 75, 30
VW, VH = 1080, 1920
def frame(c):
    bg = np.full((VH, VW, 3), (255,248,231), np.uint8)
    h, w = c.shape[:2]; y0 = (VH-h)//2; x0 = (VW-w)//2
    bg[y0:y0+h, x0:x0+w] = c
    return bg.tobytes()
p = subprocess.Popen(["ffmpeg","-y","-loglevel","error","-f","rawvideo","-pix_fmt","rgb24","-s",f"{VW}x{VH}","-r",str(fps),"-i","-",
     "-c:v","libx264","-pix_fmt","yuv420p","-crf","20",out], stdin=subprocess.PIPE)
for _ in range(15): p.stdin.write(frame(canvas))
per = max(1, int(np.ceil(len(regs)/frames_fill)))
k = 0
for f in range(frames_fill):
    for cy,i,s in regs[k:k+per]:
        m = lab == i
        col = (255,250,240) if s > 0.25*W*H else pal[i % len(pal)]
        canvas[m] = col
    k += per
    p.stdin.write(frame(canvas))
for _ in range(hold): p.stdin.write(frame(canvas))
p.stdin.close(); p.wait()
Image.fromarray(canvas).save(out.replace(".mp4","_final.png"))
print("regioes", len(regs), "saida", out)
