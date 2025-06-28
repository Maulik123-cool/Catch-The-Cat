import tkinter as tk
import random
import time

class CatchTheCatGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Catch the Cat 🐱")
        self.score = 0
        self.time_left = 30
        self.cat_button = None
        self.running = False

        self.label = tk.Label(root, text="Score: 0", font=("Comic Sans MS", 18))
        self.label.pack()

        self.time_label = tk.Label(root, text="Time: 30s", font=("Comic Sans MS", 14))
        self.time_label.pack()

        self.canvas = tk.Canvas(root, width=300, height=300, bg="black")
        self.canvas.pack()

        self.start_btn = tk.Button(root, text="Start Game", font=("Arial", 14), command=self.start_game)
        self.start_btn.pack(pady=10)

    def start_game(self):
        if self.running:
            return
        self.running = True
        self.score = 0
        self.time_left = 30
        self.label.config(text="Score: 0")
        self.time_label.config(text="Time: 30s")
        self.move_cat()
        self.countdown()

    def move_cat(self):
        if not self.running:
            return
        if self.cat_button:
            self.canvas.delete(self.cat_button)
        x = random.randint(0, 250)
        y = random.randint(0, 250)
        self.cat_button = self.canvas.create_oval(x, y, x+50, y+50, fill="orange", outline="white")
        self.canvas.tag_bind(self.cat_button, "<Button-1>", self.catch_cat)
        self.root.after(800, self.move_cat)

    def catch_cat(self, event):
        if not self.running:
            return
        self.score += 1
        self.label.config(text=f"Score: {self.score}")
        self.canvas.delete(self.cat_button)

    def countdown(self):
        if self.time_left <= 0:
            self.running = False
            self.canvas.delete("all")
            self.label.config(text=f"Final Score: {self.score}")
            self.time_label.config(text="Time: 0s")
            return
        self.time_left -= 1
        self.time_label.config(text=f"Time: {self.time_left}s")
        self.root.after(1000, self.countdown)

# Run the game
if __name__ == "__main__":
    root = tk.Tk()
    game = CatchTheCatGame(root)
    root.mainloop()
    