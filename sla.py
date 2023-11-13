
import tkinter as tk
from PIL import Image, ImageTk
import cv2
import numpy as np

def Simples(rotacao_image, angulo):
    altura, largura = rotacao_image.shape[0], rotacao_image.shape[1]
    Y,X = altura/2, largura /2 
    rotacao_matriz = cv2.getRotationMatrix2D((X,Y),angulo, 1.0)
    rotatinimage=cv2.warpAffine(rotacao_image, rotacao_matriz,(largura,altura))
    return rotatinimage

# def complexo(rotacao_image, angulo):
#     altura, largura = rotacao_image.shape[0], rotacao_image.shape[1]
#     Y,X = altura/2, largura/2
#     rotacao_matriz = cv2.getRotationMatrix2D((Y,X),angulo, 1.0)
#     coseno = np.abs(rotacao_matriz[0][0])
#     seno = np.abs(rotacao_matriz[0][1])
#     nova_altura = int((altura * seno)+(largura * coseno))
#     nova_largura = int((altura * coseno)+(largura * seno))
#     rotacao_matriz[0][2] += (nova_largura/2)-X    
#     rotacao_matriz[1][2] += (nova_largura/2)-Y
#     rotatinngimage = cv2.warpAffine(
#         rotacao_image, rotacao_matriz, (nova_largura,nova_altura)
#         return rotatinngimage
#     )

img_usu = cv2.imread("usuario.png", 1)
Normal = Simples(img_usu,40)
cv2.imshow("Imagem", img_usu)
cv2.imshow("Simples", Normal)
cv2.waitKey(0)
cv2.destroyAllWindows()

# Criando a janela
root = tk.Tk()
root.title("Imagem no Centro")

# Carregando e redimensionando a imagem
image = Image.open("./img/usuario.png")
image = image.resize((200, 200))
photo = ImageTk.PhotoImage(image)

# Criando o componente de label para exibir a imagem
label = tk.Label(root, image=photo)
label.pack(padx=5, pady=5)

# Definindo o tamanho da janela
root.geometry("1024x800")

lbl_nome = tk.Label(root, text="Nome:")
entry_nome = tk.Entry(root)

lbl_idade = tk.Label(root, text="Sobrenome:")
entry_idade = tk.Entry(root)

lbl_email = tk.Label(root, text="E-mail:")
entry_email = tk.Entry(root)


btn_cad = tk.Button(root, text="Editar")
btn_editImg = tk.Button(root, text="Editar IMG")
btn_excluir = tk.Button(root, text="Excluir")
btn_girar = tk.Button(root, text="Girar IMG", command=Simples)

lbl_nome.pack()
entry_nome.pack()

lbl_idade.pack()
entry_idade.pack()

lbl_email.pack()
entry_email.pack()

btn_cad.pack()
btn_editImg.pack()
btn_excluir.pack()
btn_girar.pack()

# Executando o loop principal
root.mainloop()
