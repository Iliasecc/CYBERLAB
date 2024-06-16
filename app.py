import PyPDF2
from openai import OpenAI
from flask import Flask, render_template, request, redirect
import os
import socket
import zipfile
import time


app = Flask(__name__)

# Chemin vers le répertoire d'uploads
UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Définir le répertoire d'uploads dans l'application Flask
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Fonction pour extraire le texte d'un PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
    return text

# Fonction pour envoyer le texte extrait à OpenAI pour générer un feedback et une note
def generate_feedback_and_rating(text):
    client = OpenAI(api_key="sk-proj-6jp5KvuxPxvuwhTurBCXT3BlbkFJ4E6S9iobIKLNfExOPUtG")
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "J'aimerais recevoir ton feedback sur le compte rendu que j'ai rédigé pour les travaux pratiques portant sur le bras robotique NED2 de Niryo dans le contexte de l'industrie 4.0. Pour cela, je souhaiterais que tu examines les aspects suivants : pertinence des informations fournies sur les fonctionnalités et les performances du bras robotique NED2, clarté et précision de la présentation des résultats des expérimentations et des tests effectués, analyse approfondie des défis rencontrés et des solutions proposées lors de la mise en œuvre des travaux pratiques, pertinence des conclusions tirées et des recommandations formulées pour l'amélioration des performances du système. Je te serais reconnaissant de me fournir tes commentaires structurés de manière claire et concise, en environ 150 mots"},
            {"role": "user", "content": text}
        ]
    )
    completion_note = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content":"attribue à ce compte rendu une note sur 20. Donne que la note n'ajoute aucun commentaire je veux en reponse d un numéro sur 20." },
            {"role": "user", "content": text}
        ]
    )
    feedback = completion.choices[0].message.content
    note = completion_note.choices[0].message.content
    return feedback, note

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        if 'pdf' not in request.files:
            return render_template('index.html', error='Aucun fichier téléchargé')
        
        pdf_file = request.files['pdf']

        if pdf_file.filename == '':
            return render_template('index.html', error='Aucun fichier sélectionné')

        pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], pdf_file.filename)
        pdf_file.save(pdf_path)

        pdf_text = extract_text_from_pdf(pdf_path)

        feedback, note = generate_feedback_and_rating(pdf_text)

        os.remove(pdf_path)

        return render_template('submit.html', feedback=feedback, note=note)
    else:
        return render_template('submit.html')


@app.route('/index1')
def index1():
    return render_template('index1.html')

@app.route('/index2')
def index2():
    return render_template('index2.html')

@app.route('/indexx', methods=['GET', 'POST'])
def indexx():
    if request.method == 'POST':
        if 'python_code' not in request.files:
            return render_template('indexx.html', error='Aucun fichier téléchargé')

        zip_file = request.files['python_code']

        if zip_file.filename == '':
            return render_template('indexx.html', error='Aucun fichier sélectionné')

        zip_file_path = os.path.join(app.config['UPLOAD_FOLDER'], zip_file.filename)
        zip_file.save(zip_file_path)

        with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
            zip_ref.extract("main.py")

        file_name = "main.py"

        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect(("localhost", 9999))

        with open(file_name, "rb") as file:
            file_size = os.path.getsize(file_name)
            client.send(file_name.encode())
            time.sleep(0.1)
            client.send(str(file_size).encode())
            

            while True:
                data = file.read(1024)
                if not data:
                    break
                client.sendall(data)
                time.sleep(0.1)

        client.close()
        os.remove(zip_file_path)

        return render_template('indexx.html', etat_code='Fichier transmis')

    return render_template('indexx.html', etat_code='')


@app.route('/profile')  
def profile():
    return render_template('profile.html')

@app.route('/team')
def team():
    return render_template('TEAM.html')
@app.route('/quizz')
def quizz():
    return render_template('quizz.html')
@app.route('/quizz3')
def quizz3():
    return render_template('quizz3.html')
@app.route('/submitt')
def submitt():
    return render_template('submitt.html')@app.route('/submitt3')
@app.route('/submitt3')
def submitt3():
    return render_template('submitt3.html')
@app.route('/index3', methods=['GET', 'POST'])
def index3():
    if request.method == 'POST':
        if 'python_code' not in request.files:
            return render_template('index3.html', error='Aucun fichier téléchargé')

        zip_file = request.files['python_code']

        if zip_file.filename == '':
            return render_template('index3.html', error='Aucun fichier sélectionné')

        zip_file_path = os.path.join(app.config['UPLOAD_FOLDER'], zip_file.filename)
        zip_file.save(zip_file_path)

        with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
            zip_ref.extract("main.py")

        file_name = "main.py"

        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect(("172.16.3.11", 9999))

        with open(file_name, "rb") as file:
            file_size = os.path.getsize(file_name)
            client.send(file_name.encode())
            time.sleep(0.1)
            client.send(str(file_size).encode())
            

            while True:
                data = file.read(1024)
                if not data:
                    break
                client.sendall(data)
                time.sleep(0.1)

        client.close()
        os.remove(zip_file_path)

        return render_template('index3.html', etat_code='Fichier transmis')

    return render_template('index3.html', etat_code='')
@app.route('/index4', methods=['GET', 'POST'])
def index4():
    if request.method == 'POST':
        if 'python_code' not in request.files:
            return render_template('index4.html', error='Aucun fichier téléchargé')

        zip_file = request.files['python_code']

        if zip_file.filename == '':
            return render_template('index4.html', error='Aucun fichier sélectionné')

        zip_file_path = os.path.join(app.config['UPLOAD_FOLDER'], zip_file.filename)
        zip_file.save(zip_file_path)

        with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
            zip_ref.extract("main.py")

        file_name = "main.py"

        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect(("172.16.3.11", 9999))

        with open(file_name, "rb") as file:
            file_size = os.path.getsize(file_name)
            client.send(file_name.encode())
            time.sleep(0.1)
            client.send(str(file_size).encode())
            

            while True:
                data = file.read(1024)
                if not data:
                    break
                client.sendall(data)
                time.sleep(0.1)

        client.close()
        os.remove(zip_file_path)

        return render_template('index4.html', etat_code='Fichier transmis')

    return render_template('index4.html', etat_code='')
if __name__ == '__main__':
    app.run(debug=False)
