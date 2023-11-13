import cv2
import numpy as np
import tkinter as tk
from tkinter import Tk, Label, PhotoImage
import os
from tkinter import filedialog
from PIL import Image, ImageTk

class Header(tk.Frame):
    def __init__(self, parent, *args, **kwargs):
        super().__init__(parent, *args, **kwargs)

        self.label = tk.Label(self,  bg="lightgray", font=("Arial", 20))
        self.label.pack(fill=tk.X, padx=10, pady=10)

class App(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Editar Perfil")
        self.geometry("1024x800")

        self.header = Header(self)
        self.header.pack(fill=tk.X)

        image = Image.open("./img/usuario.png")
        image = image.resize((200, 200), )
        photo = ImageTk.PhotoImage(image)

        # Criando o componente de label para exibir a imagem
        label = tk.Label(self, image=photo)
        label.pack(padx=5, pady=5)

        lbl_nome = tk.Label(self, text="Nome:")
        entry_nome = tk.Entry(self)

        lbl_idade = tk.Label(self, text="Sobrenome:")
        entry_idade = tk.Entry(self)

        lbl_email = tk.Label(self, text="E-mail:")
        entry_email = tk.Entry(self)
        

        btn_cad = tk.Button(self, text="Editar")
        btn_editImg = tk.Button(self, text="Editar IMG")
        btn_excluir = tk.Button(self, text="Excluir")
        btn_girar = tk.Button(self, text="Girar IMG")
        
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
        
        self.content = tk.Frame(self)
        self.content.pack(fill=tk.BOTH, expand=True)

        self.footer = tk.Label(self, bg="gray", fg="white", font=("Arial", 14))
        self.footer.pack(fill=tk.X, padx=10, pady=10)

if __name__ == "__main__":
    
    janela = App()
    janela.mainloop()