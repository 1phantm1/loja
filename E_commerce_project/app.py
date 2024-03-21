from flask import Flask, render_template, request, redirect, url_for, session
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Email, Length, EqualTo
from flask_bcrypt import Bcrypt
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="sk.env")

app = Flask(__name__, template_folder='templates')
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
bcrypt = Bcrypt(app)

class RegistrationForm(FlaskForm):
    name = StringField("Nome completo", validators=[InputRequired()])
    mail = StringField("Email", validators=[InputRequired(), Email()])
    password = PasswordField("Senha", validators=[InputRequired(), Length(min=8)])
    confirm_pass = PasswordField("Confirmar senha", validators=[InputRequired(), EqualTo("password")])
    submit = SubmitField("Criar conta")

@app.route("/criar-conta.html", methods=["GET", "POST"])
def criar_conta():
    form = RegistrationForm()
    if form.validate_on_submit():
        name = form.name.data
        mail = form.mail.data
        password = bcrypt.generate_password_hash(form.password.data).decode("utf-8")
        session["email"] = mail
        return redirect(url_for("index"))
    return render_template("criar-conta.html", form=form)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)