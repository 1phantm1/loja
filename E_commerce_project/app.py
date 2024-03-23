from flask import Flask, render_template, request, redirect, url_for, session
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Email, Length, EqualTo
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="sk.env")

# Criação da aplicação Flask
app = Flask(__name__, template_folder='templates')

# Configuração da chave secreta
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# Configuração do banco de dados
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicialização do SQLAlchemy
db = SQLAlchemy(app)

# Inicialização do Bcrypt
bcrypt = Bcrypt(app)

# Definição do modelo de usuário
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

# Definição do formulário de registro
class RegistrationForm(FlaskForm):
    name = StringField("name", validators=[InputRequired()])
    mail = StringField("mail", validators=[InputRequired(), Email()])
    address = StringField("address", validators=[InputRequired()])
    password = PasswordField("password", validators=[InputRequired(), Length(min=8)])
    confirm_pass = PasswordField("confirm_pass", validators=[InputRequired(), EqualTo("password")])
    submit = SubmitField("Criar conta")

# Rota para criar conta
@app.route("/criar_conta.html", methods=["POST", "GET"])
def criar_conta():
    form = RegistrationForm()
    if form.validate_on_submit():
        name = form.name.data
        mail = form.mail.data
        address = form.address.data
        password = bcrypt.generate_password_hash(form.password.data).decode("utf-8")
        session["email"] = mail

        # Salvar usuário no banco de dados
        new_user = User(username=name, email=mail)
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for("index"))

    return render_template("criar_conta.html", form=form)

# Rota da página inicial
@app.route("/")
def index():
    return render_template("index.html")

# Execução da aplicação
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
