import os
from tech_blend_app import app

if __name__ == '__main__':
    os.environ['FLASK_APP'] = 'tech_blend_app.app'
    app.run(debug=True)
